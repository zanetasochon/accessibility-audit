import {
  Alert,
  Anchor,
  Box,
  Button,
  Checkbox,
  Fieldset,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { trackEvent } from "../lib/analytics";

const MAKE_WEBHOOK_URL = "https://hook.eu1.make.com/i8plt1j222q4mw82aseqhiyo8h3x9mu5";
const HOSTNAME_WITH_TLD_REGEX =
  /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+(?:[a-z]{2,63}|xn--[a-z0-9-]{2,59})$/i;

type FormValues = {
  url: string;
  email: string;
  consentContact: boolean;
  website: string;
};

function normalizeWebsiteUrl(value: string): string | null {
  const trimmedValue = value.trim().replace(/\s+/g, "");
  if (!trimmedValue) {
    return null;
  }

  const withProtocol = /^https?:\/\//i.test(trimmedValue)
    ? trimmedValue
    : `https://${trimmedValue}`;

  try {
    const normalized = new URL(withProtocol);
    if (!/^https?:$/i.test(normalized.protocol)) {
      return null;
    }

    if (!HOSTNAME_WITH_TLD_REGEX.test(normalized.hostname)) {
      return null;
    }

    return normalized.toString();
  } catch {
    return null;
  }
}

function extractEmailDomain(email: string): string | null {
  const trimmed = email.trim().toLowerCase();
  const atIndex = trimmed.lastIndexOf("@");
  if (atIndex < 1 || atIndex === trimmed.length - 1) {
    return null;
  }

  return trimmed.slice(atIndex + 1);
}

function normalizeHost(value: string): string {
  return value.toLowerCase().replace(/^www\./, "");
}

function isEmailDomainMatchingWebsite(email: string, websiteUrl: string): boolean {
  const emailDomain = extractEmailDomain(email);
  if (!emailDomain) {
    return false;
  }

  try {
    const websiteHost = normalizeHost(new URL(websiteUrl).hostname);
    const emailHost = normalizeHost(emailDomain);

    return (
      websiteHost === emailHost ||
      websiteHost.endsWith(`.${emailHost}`) ||
      emailHost.endsWith(`.${websiteHost}`)
    );
  } catch {
    return false;
  }
}

type EmailRule = {
  isValid: (email: string) => boolean;
  message: string;
};

const EMAIL_RULES: EmailRule[] = [
  {
    isValid: (email) => email.length > 0,
    message: "Podaj adres e-mail.",
  },
  {
    isValid: (email) => email.includes("@"),
    message: "Adres e-mail musi zawierać znak @.",
  },
  {
    isValid: (email) => email.split("@").length === 2,
    message: "Adres e-mail może zawierać tylko jeden znak @.",
  },
  {
    isValid: (email) => {
      const [localPart = ""] = email.split("@");
      return localPart.length > 0;
    },
    message: "Brakuje części przed znakiem @ (np. imie).",
  },
  {
    isValid: (email) => {
      const [, domainPart = ""] = email.split("@");
      return domainPart.length > 0;
    },
    message: "Brakuje domeny po znaku @ (np. firma.pl).",
  },
  {
    isValid: (email) => {
      const [, domainPart = ""] = email.split("@");
      return domainPart.includes(".");
    },
    message: "Domena e-mail musi zawierać kropkę (np. firma.pl).",
  },
  {
    isValid: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    message: "Wpisz poprawny adres e-mail, np. imie@firma.pl.",
  },
];

function validateEmailFormat(value: string): string | null {
  const email = value.trim();
  return EMAIL_RULES.find((rule) => !rule.isValid(email))?.message ?? null;
}

export function ScreeningForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const formElementRef = useRef<HTMLFormElement | null>(null);
  const successAlertRef = useRef<HTMLDivElement | null>(null);
  const errorAlertRef = useRef<HTMLDivElement | null>(null);

  const form = useForm<FormValues>({
    initialValues: {
      url: "",
      email: "",
      consentContact: false,
      website: "",
    },
    validate: {
      url: (value) => {
        if (!value.trim()) {
          return "Podaj adres URL.";
        }
        if (!normalizeWebsiteUrl(value)) {
          return "Wpisz poprawny adres URL, np. twojadomena.pl.";
        }
        return null;
      },
      email: (value, values) => {
        const formatError = validateEmailFormat(value);
        if (formatError) return formatError;

        const normalizedUrl = normalizeWebsiteUrl(values.url);
        if (normalizedUrl && !isEmailDomainMatchingWebsite(value, normalizedUrl)) {
          return "Użyj adresu e-mail w domenie audytowanej strony.";
        }

        return null;
      },
      consentContact: (value) =>
        value ? null : "Aby wysłać formularz, zaznacz zgodę na kontakt.",
    },
  });

  const focusFirstInvalidControl = (): void => {
    requestAnimationFrame(() => {
      const invalid = formElementRef.current?.querySelector<HTMLElement>(
        "[aria-invalid='true']",
      );
      invalid?.focus();
    });
  };

  const onSubmit = form.onSubmit(
    async (values) => {
      setSubmitError("");
      trackEvent("submit_attempt", { form_version: "v1", page_variant: "default" });

      const normalizedUrl = normalizeWebsiteUrl(values.url);
      if (!normalizedUrl) {
        form.setFieldError("url", "Wpisz poprawny adres URL, np. twojadomena.pl.");
        focusFirstInvalidControl();
        return;
      }

      if (!isEmailDomainMatchingWebsite(values.email, normalizedUrl)) {
        form.setFieldError("email", "Użyj adresu e-mail w domenie audytowanej strony.");
        focusFirstInvalidControl();
        return;
      }

      if (values.website.trim()) {
        setIsSuccess(true);
        return;
      }

      setIsSubmitting(true);
      try {
        const response = await fetch(MAKE_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: values.email.trim(),
            website: normalizedUrl,
          }),
        });

        if (!response.ok) {
          throw new Error("submit_failed");
        }

        trackEvent("submit_success", {
          form_version: "v1",
          page_variant: "default",
        });
        setIsSuccess(true);
        form.reset();
      } catch {
        trackEvent("submit_fail", {
          form_version: "v1",
          page_variant: "default",
          error_type: "network_or_endpoint",
        });
        setSubmitError("Nie udało się wysłać formularza. Spróbuj ponownie za chwilę.");
      } finally {
        setIsSubmitting(false);
      }
    },
    () => {
      const errorFields = Object.keys(form.errors);
      if (errorFields.length === 0) {
        trackEvent("validation_error", {
          form_version: "v1",
          page_variant: "default",
          field_name: "unknown",
          error_type: "client_validation",
        });
      } else {
        errorFields.forEach((fieldName) => {
          trackEvent("validation_error", {
            form_version: "v1",
            page_variant: "default",
            field_name: fieldName,
            error_type: "client_validation",
          });
        });
      }
      focusFirstInvalidControl();
    },
  );

  useEffect(() => {
    if (isSuccess) {
      successAlertRef.current?.focus();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (submitError) {
      errorAlertRef.current?.focus();
    }
  }, [submitError]);

  if (isSuccess) {
    return (
      <Box
        ref={successAlertRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <Alert
          variant="light"
          color="green"
          title="Dziękujemy! Zgłoszenie zostało wysłane."
          icon={<IconCheck size={18} aria-hidden="true" />}
        >
          Dzięki! Zgłoszenie dotarło. Wrócimy do Ciebie z odpowiedzią tak szybko jak to
          możliwe, zwykle w 1-2 dni robocze.
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      component="form"
      ref={formElementRef}
      onSubmit={onSubmit}
      aria-busy={isSubmitting}
      noValidate
    >
      <Stack gap="md">
        <TextInput
          withAsterisk
          label="Adres strony (URL)"
          placeholder="https://twojadomena.pl"
          type="url"
          autoComplete="url"
          {...form.getInputProps("url")}
        />

        <TextInput
          withAsterisk
          label="E-mail do kontaktu"
          placeholder="imie@firma.pl"
          type="email"
          autoComplete="email"
          {...form.getInputProps("email")}
        />

        <Box component="div" className="visually-hidden">
          <TextInput
            tabIndex={-1}
            aria-hidden="true"
            autoComplete="off"
            label="Nie wypełniaj tego pola"
            {...form.getInputProps("website")}
          />
        </Box>

        <Button
          type="submit"
          loading={isSubmitting}
          fullWidth
          styles={{
            root: {
              transition:
                "transform 180ms ease, box-shadow 180ms ease, filter 180ms ease, background-color 180ms ease",
              "&:hover, &:focus-visible": {
                transform: "translateY(-2px) !important",
                boxShadow: "0 20px 40px rgba(0,0,0,.2) !important",
                filter: "saturate(1.05) !important",
              },
              "&:active": {
                transform: "translateY(0) !important",
                boxShadow: "0 6px 14px rgba(0,0,0,.12) !important",
              },
            },
          }}
        >
          Wyślij do audytu dostępności
        </Button>

        <Fieldset variant="unstyled" legend="Zgody">
          <Stack gap="sm" align="center">
            <Checkbox
              required
              label="Wyrażam zgodę na kontakt mailowy w sprawie audytu dostępności i przedstawienie rekomendacji dalszych działań."
              styles={{
                body: {
                  alignItems: "center",
                },
                inner: {
                  alignSelf: "center",
                },
              }}
              {...form.getInputProps("consentContact", { type: "checkbox" })}
            />
          </Stack>
        </Fieldset>

        <Text size="sm" c="dimmed">
          Wysyłając formularz akceptujesz zasady przetwarzania danych opisane w{" "}
          <Anchor component={Link} to="/privacy">
            Polityce prywatności
          </Anchor>
          .
        </Text>

        {submitError && (
          <Box
            ref={errorAlertRef}
            tabIndex={-1}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <Alert
              color="red"
              variant="light"
              icon={<IconAlertCircle size={18} aria-hidden="true" />}
              title="Wystąpił błąd"
            >
              {submitError}
            </Alert>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
