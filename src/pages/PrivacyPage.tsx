import {
  Anchor,
  AppShell,
  Box,
  Container,
  List,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { StickyFooter } from "../components/StickyFooter";

export function PrivacyPage() {
  return (
    <AppShell header={{ height: 72 }} footer={{ height: 72 }} padding={0}>
      <Anchor
        href="#main-content"
        className="skip-link"
        underline="never"
        aria-label="Pomiń do treści"
      >
        Pomiń do treści
      </Anchor>

      <AppShell.Header>
        <Container size="lg" h="100%">
          <Stack justify="center" h="100%">
            <Anchor component={Link} to="/">
              Wróć do strony głównej
            </Anchor>
          </Stack>
        </Container>
      </AppShell.Header>

      <AppShell.Main component="main" id="main-content" style={{ paddingBottom: "calc(72px + 2rem)" }}>
        <Container size="md" py={56}>
          <Stack gap="md">
            <Title order={1}>Polityka prywatności</Title>
            <Text>
              Niniejsza polityka opisuje zasady przetwarzania danych przesyłanych przez
              formularz „Szybki audyt dostępności”.
            </Text>

            <Box component="section" aria-labelledby="administrator">
              <Stack gap="xs">
                <Title order={3} id="administrator">
                  Administrator danych
                </Title>
                <Text>
                  Administratorem danych jest DevMentor. W sprawach dotyczących danych
                  osobowych skontaktuj się przez adres e-mail podany na stronie.
                </Text>
              </Stack>
            </Box>

            <Box component="section" aria-labelledby="zakres">
              <Stack gap="xs">
                <Title order={3} id="zakres">
                  Zakres danych
                </Title>
                <List withPadding spacing="xs">
                  <List.Item>Adres strony (URL) do screeningu.</List.Item>
                  <List.Item>E-mail kontaktowy.</List.Item>
                  <List.Item>
                    Informacje o zgodach: kontaktowej (obowiązkowej) oraz marketingowej
                    (opcjonalnej).
                  </List.Item>
                </List>
              </Stack>
            </Box>

            <Box component="section" aria-labelledby="cel">
              <Stack gap="xs">
                <Title order={3} id="cel">
                  Cel i podstawa przetwarzania
                </Title>
                <List withPadding spacing="xs">
                  <List.Item>
                    Obsługa zgłoszenia i kontakt w sprawie wyniku screeningu.
                  </List.Item>
                  <List.Item>
                    Wysyłka materiałów edukacyjnych wyłącznie po wyrażeniu opcjonalnej
                    zgody marketingowej.
                  </List.Item>
                </List>
              </Stack>
            </Box>

            <Box component="section" aria-labelledby="retencja">
              <Stack gap="xs">
                <Title order={3} id="retencja">
                  Okres przechowywania danych
                </Title>
                <Text>
                  Dane przechowujemy maksymalnie do 12 miesięcy od ostatniego kontaktu
                  lub krócej, jeśli wcześniej zgłosisz żądanie usunięcia danych.
                </Text>
              </Stack>
            </Box>

            <Box component="section" aria-labelledby="prawa">
              <Stack gap="xs">
                <Title order={3} id="prawa">
                  Twoje prawa
                </Title>
                <List withPadding spacing="xs">
                  <List.Item>Dostęp do danych i ich kopii.</List.Item>
                  <List.Item>Sprostowanie danych.</List.Item>
                  <List.Item>Usunięcie danych lub ograniczenie przetwarzania.</List.Item>
                  <List.Item>Wycofanie zgody marketingowej w dowolnym momencie.</List.Item>
                </List>
              </Stack>
            </Box>

            <Text size="sm" c="dimmed">
              W celu realizacji praw skontaktuj się z nami przez e-mail kontaktowy.
            </Text>
            <Anchor component={Link} to="/">
              Wróć do strony głównej
            </Anchor>
          </Stack>
        </Container>
      </AppShell.Main>
      <StickyFooter />
    </AppShell>
  );
}
