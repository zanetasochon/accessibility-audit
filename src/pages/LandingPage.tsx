import {
  Accordion,
  Anchor,
  AppShell,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Image,
  List,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconCheck, IconChevronRight } from "@tabler/icons-react";
import { MouseEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ScreeningForm } from "../components/ScreeningForm";
import { StickyFooter } from "../components/StickyFooter";

const primaryHeroButtonStyles = {
  root: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #3388FF, #0A70FF)",
    border: "1px solid #0A70FF",
    boxShadow: "0 12px 24px rgba(0,0,0,.16)",
    fontSize: "15px",
    fontWeight: 600,
    letterSpacing: "0.01em",
    color: "#FFFFFF",
    transition: "transform 180ms ease, box-shadow 180ms ease, filter 180ms ease",
    "&:hover, &:focus-visible": {
      transform: "translateY(-2px) !important",
      boxShadow: "0 20px 40px rgba(0,0,0,.2) !important",
      filter: "saturate(1.05) !important",
      background: "linear-gradient(135deg, #2B7AF2, #005CE6)",
    },
    "&:active": {
      transform: "translateY(0) !important",
      boxShadow: "0 6px 14px rgba(0,0,0,.12) !important",
    },
  },
};

const secondaryHeroButtonStyles = {
  root: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    borderRadius: "12px",
    backgroundColor: "#EEF4FF",
    color: "#0D47A1",
    border: "none",
    fontSize: "15px",
    fontWeight: 600,
    letterSpacing: "0.01em",
    transition: "transform 180ms ease, box-shadow 180ms ease, filter 180ms ease",
    "&:hover, &:focus-visible": {
      transform: "translateY(-2px) !important",
      boxShadow: "0 20px 40px rgba(0,0,0,.2) !important",
      filter: "saturate(1.05) !important",
      backgroundColor: "#E0EAFF",
    },
    "&:active": {
      transform: "translateY(0) !important",
      boxShadow: "0 6px 14px rgba(0,0,0,.12) !important",
    },
  },
};

const headerLinkStyle = {
  fontSize: "16px",
  fontWeight: 500,
  color: "#0F172A",
  textDecoration: "none",
};

const socialIconLinkStyles = {
  root: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderRadius: "999px",
    border: "1px solid #E0A800",
    background: "#E0A800",
    transition: "transform 180ms ease, box-shadow 180ms ease, filter 180ms ease",
    "&:hover, &:focus-visible": {
      transform: "translateY(-2px) !important",
      boxShadow: "0 20px 40px rgba(0,0,0,.2) !important",
      filter: "saturate(1.05) !important",
      background: "#C99600",
      borderColor: "#C99600",
    },
    "&:active": {
      transform: "translateY(0) !important",
      boxShadow: "0 6px 14px rgba(0,0,0,.12) !important",
    },
  },
};

type WhyExpert = {
  name: string;
  imageSrc: string;
  imageAlt: string;
  secondaryImageSrc?: string;
  secondaryImageAlt?: string;
  imageMaxWidth: number;
  imageRightOnDesktop: boolean;
  paragraphs: string[];
  bullets: string[];
};

const whyExperts: WhyExpert[] = [
  {
    name: "Żaneta Sochoń",
    imageSrc: "/assets/photo-zaneta-sochon-white.png",
    imageAlt: "Żaneta Sochoń",
    imageMaxWidth: 460,
    imageRightOnDesktop: false,
    paragraphs: [
      "Nazywam się Żaneta Sochoń. Ukończyłam Wydział Prawa w Białymstoku, Wydział Pedagogiki i Psychologii w Białymstoku oraz równolegle rozwijam kompetencje techniczne na studiach magisterskich w Polsko-Japońskiej Akademii Technik Komputerowych w Warszawie. Jestem certyfikowanym Google UX Designerem oraz audytorem dostępności WCAG. Na co dzień pracuję jako Frontend Engineer w T-mobile Polska projektując i wdrażając rozwiązania zgodne z dyrektywą o dostępności z dnia 28 czerwca 2025 roku.",
      "W ramach komercyjnych audytów pomagam firmom zmniejszać ryzyko kar, ograniczać koszty poprawek i uporządkować priorytety zmian.",
    ],
    bullets: [
      "Łączę perspektywę UX, frontendu i dostępności w jednym procesie.",
      "Komunikuję ryzyka prostym językiem, bez prawniczego żargonu.",
      "Ustalam priorytety działań: co poprawić najpierw, aby szybciej zmniejszyć ryzyko.",
      "Wspieram zespoły produktowe i developerskie we wdrożeniu poprawek.",
      "Pokazuję, które zmiany najszybciej poprawią użyteczność i konwersję.",
    ],
  },
  {
    name: "Mateusz Bogolubow",
    imageSrc: "/assets/photo-mateusz-bogolubow.png",
    imageAlt: "Mateusz Bogolubow",
    secondaryImageSrc: "/assets/photo-mateusz-bogolubow-secondary.png",
    secondaryImageAlt: "Mateusz Bogolubow podczas nagrania",
    imageMaxWidth: 460,
    imageRightOnDesktop: true,
    paragraphs: [
      "Od ponad dekady łączę praktyczne wytwarzanie oprogramowania z edukacją programistów. Zrealizowałem blisko 100 projektów komercyjnych, przeszkoliłem setki osób i konsekwentnie rozwijam standardy jakości w produktach cyfrowych.",
      "W DevMentor skupiam się na podejściu, które daje efekt biznesowy tzn. klarowne priorytety, szybkie decyzje wdrożeniowe i rozwiązania, które są trwałe technicznie, a jednocześnie zrozumiałe dla zespołu.",
    ],
    bullets: [
      "Ponad 10 lat doświadczenia w biznesie software i realizacji projektów komercyjnych.",
      "Ponad 400 osób nauczonych programowania i skutecznie przygotowanych do pracy w IT.",
      "Wyróżnienie Mentor Roku oraz wieloletnia praktyka prowadzenia szkoleń i mentoringu.",
      "Silne zaplecze frontend/fullstack i nacisk na jakość wdrożeń oraz architekturę rozwiązań.",
      "Pragmatyczne podejście zawierające się w rekomendacji gotowych działań, a nie tylko w teorii.",
    ],
  },
];

export function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToSection =
    (sectionId: string) => (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      const section = document.getElementById(sectionId);
      if (!section) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      section.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AppShell header={{ height: 124 }} footer={{ height: 72 }} padding={0} withBorder={false}>
      <Anchor
        href="#main-content"
        className="skip-link"
        underline="never"
        aria-label="Pomiń do treści"
      >
        Pomiń do treści
      </Anchor>

      <AppShell.Header style={{ background: "transparent", borderBottom: "none" }}>
        <Box h="100%" py={0} px={isScrolled ? 0 : "md"}>
          <Paper
            h={isScrolled ? 80 : 88}
            mt={isScrolled ? 0 : "md"}
            radius={isScrolled ? 0 : 25}
            px="lg"
            withBorder={false}
            style={{
              width: "100%",
              maxWidth: isScrolled ? "100%" : "1341px",
              marginInline: "auto",
              background: isScrolled ? "#FFFFFF" : "rgba(33, 33, 33, 0.042)",
              boxShadow: isScrolled
                ? "0 2px 6px rgba(0, 0, 0, 0.06)"
                : "0 4px 4px rgba(0, 0, 0, 0.25)",
              transition:
                "height 240ms ease, margin-top 240ms ease, border-radius 240ms ease, background-color 240ms ease, box-shadow 240ms ease, max-width 240ms ease",
            }}
          >
            <Group h="100%" justify="space-between" wrap="nowrap">
              <Anchor component={Link} to="/" underline="never" aria-label="DevMentor home">
                <Image src="/assets/logo-devmentor.png" alt="devmentor.pl" h={56} w="auto" />
              </Anchor>

              <Group gap="lg" visibleFrom="md">
                <Anchor
                  href="#scope-title"
                  onClick={scrollToSection("scope-title")}
                  underline="never"
                  style={headerLinkStyle}
                  className="nav-link-decore"
                >
                  Co sprawdzamy
                </Anchor>
                <Anchor
                  href="#result-title"
                  onClick={scrollToSection("result-title")}
                  underline="never"
                  style={headerLinkStyle}
                  className="nav-link-decore"
                >
                  Co otrzymasz
                </Anchor>
                <Anchor
                  href="#why-title"
                  onClick={scrollToSection("why-title")}
                  underline="never"
                  style={headerLinkStyle}
                  className="nav-link-decore"
                >
                  Dlaczego DevMentor
                </Anchor>
                <Anchor
                  href="#faq-title"
                  onClick={scrollToSection("faq-title")}
                  underline="never"
                  style={headerLinkStyle}
                  className="nav-link-decore"
                >
                  FAQ
                </Anchor>
              </Group>

              <Group gap="sm" wrap="nowrap">
                <Anchor
                  href="https://www.linkedin.com/in/żaneta-sochoń/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  styles={socialIconLinkStyles}
                  className="header-social-link"
                >
                  <Image src="/assets/logo-linkedin.png" alt="" aria-hidden="true" w={18} h={18} />
                </Anchor>
                <Anchor
                  href="https://www.youtube.com/channel/UCXasVW0-mZLLoufw_uH9okA"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  styles={socialIconLinkStyles}
                  className="header-social-link"
                >
                  <Image src="/assets/logo-youtube.png" alt="" aria-hidden="true" w={18} h={18} />
                </Anchor>
              </Group>
            </Group>
          </Paper>
        </Box>
      </AppShell.Header>

      <AppShell.Main
        component="main"
        id="main-content"
        className="landing-main"
        style={{ position: "relative", paddingBottom: "calc(72px + 2rem)" }}
      >
        <Box
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "min(42vw, 520px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <Image src="/assets/decore-hero.png" alt="" w="100%" h="auto" />
        </Box>

        <Container size="lg" py={56} style={{ position: "relative", zIndex: 1 }}>
          <Stack gap={80}>
            <Box component="section" aria-labelledby="hero-title">
              <Grid align="center" gutter={{ base: 80, md: "xl" }}>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Stack gap="sm" pos="relative" className="hero-copy">
                    <Text
                      size="sm"
                      fw={700}
                      tt="uppercase"
                      c="blue.7"
                      style={{ letterSpacing: "0.12em", zIndex: 1, position: "relative" }}
                    >
                      Audyt dostępności
                    </Text>
                    <Title id="hero-title" order={1}>
                      Szybki{` `}
                      <Box
                        component="span"
                        style={{
                          position: "relative",
                          display: "inline-flex",
                        }}
                      >
                        audyt
                        <Box
                          component="span"
                          aria-hidden="true"
                          style={{
                            position: "absolute",
                            left: 0,
                            bottom: "-18px",
                            width: "140%",
                            height: "30px",
                            backgroundImage: "url('/assets/decore-yellow.png')",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "contain",
                            zIndex: -1,
                          }}
                        />
                      </Box>{" "}
                      dostępności Twojej strony www
                    </Title>
                    <Text size="lg">
                      Dostaniesz wstępny audyt dostępności 1-3 podstron i listę
                      najpilniejszych poprawek.
                    </Text>
                    <Text c="dimmed">
                      To wstępna ocena. Pełny audyt WCAG wymaga pogłębionej
                      analizy.
                    </Text>
                    <Text c="dimmed" size="sm">
                      Za audytem Twojej strony stoi doświadczony człowiek. Zaufaj nam.
                    </Text>
                    <Group mt="sm" className="hero-cta-group">
                      <Button
                        component="a"
                        href="#why-title"
                        onClick={scrollToSection("why-title")}
                        styles={primaryHeroButtonStyles}
                        className="hero-btn-primary hero-cta-button"
                      >
                        Dlaczego DevMentor
                      </Button>
                      <Button
                        component="a"
                        href="#result-title"
                        onClick={scrollToSection("result-title")}
                        styles={secondaryHeroButtonStyles}
                        className="hero-btn-secondary hero-cta-button"
                        rightSection={
                          <Image
                            src="/assets/icon-arrow-right.png"
                            alt=""
                            aria-hidden="true"
                            w={16}
                            h={16}
                          />
                        }
                      >
                        Co otrzymasz
                      </Button>
                    </Group>
                  </Stack>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Paper p="lg" withBorder pos="relative" style={{ zIndex: 1 }} className="hero-form-card">
                    <Stack gap="md">
                      <Title id="form-title" order={2}>
                        Wyślij stronę do bezpłatnego audytu
                      </Title>
                      <Text size="sm" c="dimmed">
                        Odpowiadamy zwykle w 1-2 dni robocze.
                      </Text>
                      <ScreeningForm />
                    </Stack>
                  </Paper>
                </Grid.Col>
              </Grid>
            </Box>

            <Box component="section" aria-labelledby="scope-title">
              <Stack
                gap="md"
                p="lg"
                className="scope-section"
                style={{
                  borderRadius: "var(--mantine-radius-lg)",
                  backgroundColor: "rgba(10, 112, 255, 0.12)",
                }}
              >
                <Text
                  size="sm"
                  fw={700}
                  tt="uppercase"
                  c="blue.7"
                  className="scope-eyebrow"
                  style={{ letterSpacing: "0.12em" }}
                >
                  Audyt dostępności
                </Text>
                <Title id="scope-title" order={2} className="scope-heading">
                  Co sprawdzamy
                </Title>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
                  <List
                    spacing="sm"
                    icon={<IconCheck size={18} aria-hidden="true" />}
                    withPadding
                  >
                    <List.Item>
                      1-3 kluczowe podstrony (np. strona główna, oferta, formularz)
                    </List.Item>
                    <List.Item>
                      Automatyczny skan najczęstszych błędów dostępności
                    </List.Item>
                    <List.Item>
                      Krótka weryfikacja manualna kluczowych interakcji
                    </List.Item>
                  </List>
                  <List
                    spacing="sm"
                    icon={<IconCheck size={18} aria-hidden="true" />}
                    withPadding
                  >
                    <List.Item>Priorytety napraw: wysoki, średni, niski</List.Item>
                    <List.Item>
                      Rekomendacje pierwszych kroków do wdrożenia poprawek
                    </List.Item>
                    <List.Item>
                      Wstępna ocena wpływu problemów na konwersję i doświadczenie użytkownika
                    </List.Item>
                  </List>
                </SimpleGrid>
              </Stack>
            </Box>

            <Box component="section" aria-labelledby="result-title">
              <Stack gap="md">
                <Text
                  size="sm"
                  fw={700}
                  tt="uppercase"
                  c="blue.7"
                  className="result-eyebrow"
                  style={{ letterSpacing: "0.12em" }}
                >
                  Audyt dostępności
                </Text>
                <Title id="result-title" order={2} className="result-heading">
                  Co otrzymasz
                </Title>
                <Grid>
                  <Grid.Col span={{ base: 12, md: 4 }}>
                    <Card
                      withBorder
                      h="100%"
                      className="result-card"
                      styles={{
                        root: {
                          transition:
                            "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
                          "&:hover, &:focus-within": {
                            transform: "translateY(-4px)",
                            boxShadow: "0 18px 34px rgba(0,0,0,.12)",
                            borderColor: "var(--mantine-color-primary-4)",
                          },
                        },
                      }}
                    >
                      <Stack gap="xs">
                        <Title order={3} size="h4">
                          Lista problemów
                        </Title>
                        <Text size="sm">
                          Krótka lista najważniejszych barier dostępności na stronie.
                        </Text>
                      </Stack>
                    </Card>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 4 }}>
                    <Card
                      withBorder
                      h="100%"
                      className="result-card"
                      styles={{
                        root: {
                          transition:
                            "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
                          "&:hover, &:focus-within": {
                            transform: "translateY(-4px)",
                            boxShadow: "0 18px 34px rgba(0,0,0,.12)",
                            borderColor: "var(--mantine-color-primary-4)",
                          },
                        },
                      }}
                    >
                      <Stack gap="xs">
                        <Title order={3} size="h4">
                          Priorytety działań
                        </Title>
                        <Text size="sm">
                          Jasną informację, które poprawki warto wdrożyć najpierw.
                        </Text>
                      </Stack>
                    </Card>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 4 }}>
                    <Card
                      withBorder
                      h="100%"
                      className="result-card"
                      styles={{
                        root: {
                          transition:
                            "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
                          "&:hover, &:focus-within": {
                            transform: "translateY(-4px)",
                            boxShadow: "0 18px 34px rgba(0,0,0,.12)",
                            borderColor: "var(--mantine-color-primary-4)",
                          },
                        },
                      }}
                    >
                      <Stack gap="xs">
                        <Title order={3} size="h4">
                          Rekomendacje
                        </Title>
                        <Text size="sm">
                          Proponowane kolejne kroki, jeśli chcesz przejść do pełnego
                          audytu.
                        </Text>
                      </Stack>
                    </Card>
                  </Grid.Col>
                </Grid>
              </Stack>
            </Box>

            <Box component="section" aria-labelledby="why-title">
              <Stack gap="md">
                <Stack gap="md" pb="xl">
                  <Text
                    size="sm"
                    fw={700}
                    tt="uppercase"
                    c="blue.7"
                    ta="center"
                    className="why-eyebrow"
                    style={{ letterSpacing: "0.12em" }}
                  >
                    Audyt dostępności
                  </Text>
                  <Title id="why-title" order={2} ta="center" className="why-heading">
                    Dlaczego My?
                  </Title>
                </Stack>

                <Stack gap={96}>
                  {whyExperts.map((expert) => (
                    <Grid key={expert.name} gutter={{ base: 80, md: "xl" }} align="center" justify="center">
                    {expert.imageRightOnDesktop ? (
                      <>
                        <Grid.Col span={{ base: 12, md: 7 }} className="why-content">
                          <Stack gap="md" maw={640} mx="auto">
                            <Title order={3}>{expert.name}</Title>
                            {expert.paragraphs.map((paragraph) => (
                              <Text key={paragraph}>{paragraph}</Text>
                            ))}
                            <List
                              spacing="md"
                              icon={<IconChevronRight size={18} aria-hidden="true" />}
                              withPadding
                              className="chevron-list"
                            >
                              {expert.bullets.map((bullet) => (
                                <List.Item key={bullet}>{bullet}</List.Item>
                              ))}
                            </List>
                          </Stack>
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 5 }}>
                          <Stack gap="md" align="center">
                            <Image
                              src={expert.imageSrc}
                              alt={expert.imageAlt}
                              radius="lg"
                              w={expert.imageMaxWidth}
                              maw="100%"
                              fit="contain"
                              style={{
                                marginInline: "auto",
                                backgroundColor: "#ffffff",
                              }}
                            />
                            {expert.secondaryImageSrc && (
                              <Image
                                src={expert.secondaryImageSrc}
                                alt={expert.secondaryImageAlt}
                                radius="lg"
                                w={expert.imageMaxWidth}
                                maw="100%"
                                fit="contain"
                                style={{
                                  marginInline: "auto",
                                  backgroundColor: "#ffffff",
                                }}
                              />
                            )}
                          </Stack>
                        </Grid.Col>
                      </>
                    ) : (
                      <>
                        <Grid.Col span={{ base: 12, md: 5 }}>
                          <Stack gap="md" align="center">
                            <Image
                              src={expert.imageSrc}
                              alt={expert.imageAlt}
                              radius="lg"
                              w={expert.imageMaxWidth}
                              maw="100%"
                              fit="contain"
                              style={{
                                marginInline: "auto",
                                backgroundColor: "#ffffff",
                              }}
                            />
                            {expert.secondaryImageSrc && (
                              <Image
                                src={expert.secondaryImageSrc}
                                alt={expert.secondaryImageAlt}
                                radius="lg"
                                w={expert.imageMaxWidth}
                                maw="100%"
                                fit="contain"
                                style={{
                                  marginInline: "auto",
                                  backgroundColor: "#ffffff",
                                }}
                              />
                            )}
                          </Stack>
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 7 }} className="why-content">
                          <Stack gap="md" maw={640} mx="auto">
                            <Title order={3}>{expert.name}</Title>
                            {expert.paragraphs.map((paragraph) => (
                              <Text key={paragraph}>{paragraph}</Text>
                            ))}
                            <List
                              spacing="md"
                              icon={<IconChevronRight size={18} aria-hidden="true" />}
                              withPadding
                              className="chevron-list"
                            >
                              {expert.bullets.map((bullet) => (
                                <List.Item key={bullet}>{bullet}</List.Item>
                              ))}
                            </List>
                          </Stack>
                        </Grid.Col>
                      </>
                    )}
                    </Grid>
                  ))}
                </Stack>
              </Stack>
            </Box>

            <Box component="section" aria-labelledby="faq-title" className="faq-section">
              <Stack gap="md">
                <Text
                  size="sm"
                  fw={700}
                  tt="uppercase"
                  c="blue.7"
                  className="faq-eyebrow"
                  style={{ letterSpacing: "0.12em" }}
                >
                  Audyt dostępności
                </Text>
                <Title id="faq-title" order={2} className="faq-heading">
                  FAQ
                </Title>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                  <Accordion variant="separated" radius="md">
                    <Accordion.Item value="czas">
                      <Accordion.Control>Ile trwa przygotowanie wyniku?</Accordion.Control>
                      <Accordion.Panel>
                        Zwykle wysyłamy wynik w 1-2 dni robocze od zgłoszenia.
                      </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value="zakres">
                      <Accordion.Control>Jaki jest zakres audytu?</Accordion.Control>
                      <Accordion.Panel>
                        Analizujemy 1-3 podstrony, łącząc automatyczny skan i krótką
                        weryfikację manualną.
                      </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value="wynik">
                      <Accordion.Control>Co dokładnie dostanę?</Accordion.Control>
                      <Accordion.Panel>
                        Listę problemów, priorytety i rekomendacje kolejnych działań.
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion>

                  <Accordion variant="separated" radius="md">
                    <Accordion.Item value="cena">
                      <Accordion.Control>Czy audyt jest darmowy?</Accordion.Control>
                      <Accordion.Panel>
                        Tak, wstępny audyt jest bezpłatny i służy ocenie, czy warto
                        robić pełny audyt.
                      </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value="rodo">
                      <Accordion.Control>Jak przetwarzacie dane osobowe?</Accordion.Control>
                      <Accordion.Panel>
                        Zbieramy tylko URL, e-mail i zgody. Szczegóły znajdziesz w polityce
                        prywatności.
                      </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value="usuniecie">
                      <Accordion.Control>Jak mogę usunąć swoje dane?</Accordion.Control>
                      <Accordion.Panel>
                        Napisz do nas z adresu użytego w formularzu. Usuniemy dane zgodnie z
                        obowiązującymi przepisami.
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion>
                </SimpleGrid>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </AppShell.Main>

      <StickyFooter />
    </AppShell>
  );
}
