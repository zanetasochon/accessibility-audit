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

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzdarekl";

type FormValues = {
  url: string;
  email: string;
  consentContact: boolean;
  website: string;
};

function normalizeWebsiteUrl(value: string): string | null {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return null;
  }

  const withProtocol = /^https?:\/\//i.test(trimmedValue)
    ? trimmedValue
    : trimmedValue.toLowerCase().startsWith("www.")
      ? `https://${trimmedValue}`
      : null;

  if (!withProtocol) {
    return null;
  }

  try {
    // URL parser validates host + overall URL format.
    const normalized = new URL(withProtocol);
    return normalized.toString();
  } catch {
    return null;
  }
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
          return "Wpisz poprawny adres URL (http://, https:// lub www.).";
        }
        return null;
      },
      email: (value) => {
        if (!value.trim()) {
          return "Podaj adres email.";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return "Wpisz poprawny adres email.";
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
        form.setFieldError("url", "Wpisz poprawny adres URL (http://, https:// lub www.).");
        focusFirstInvalidControl();
        return;
      }

      if (values.website.trim()) {
        setIsSuccess(true);
        return;
      }

      setIsSubmitting(true);
      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            url: normalizedUrl,
            email: values.email.trim(),
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
