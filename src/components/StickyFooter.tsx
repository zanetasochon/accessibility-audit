import { Anchor, AppShell, Group, Image, Text } from "@mantine/core";
import { Link } from "react-router-dom";

const YOUTUBE_URL = "https://www.youtube.com/channel/UCXasVW0-mZLLoufw_uH9okA";
const LINKEDIN_URL = "https://www.linkedin.com/in/żaneta-sochoń/";
const FOOTER_ICON_WHITE_FILTER =
  "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(106%) contrast(101%)";
const footerSocialLinkStyles = {
  root: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    borderRadius: "999px",
    backgroundColor: "#0A70FF",
    transition: "transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease",
    "&:hover, &:focus-visible": {
      transform: "translateY(-2px)",
      boxShadow: "0 10px 22px rgba(0,0,0,.14)",
      backgroundColor: "#005CE6",
    },
    "&:active": {
      transform: "translateY(0)",
      boxShadow: "0 4px 10px rgba(0,0,0,.1)",
    },
  },
};

export function StickyFooter() {
  return (
    <AppShell.Footer
      component="footer"
      className="site-footer"
      withBorder={false}
      style={{
        background: "rgba(255, 255, 255, 0.97)",
        borderTop: "1px solid #E9E9E9",
        backdropFilter: "blur(4px)",
      }}
    >
      <Group justify="space-between" px="lg" h="100%" className="sticky-footer-inner">
        <Text size="sm">© {new Date().getFullYear()} DevMentor</Text>

        <Group gap="xl" className="sticky-footer-links">
          <Anchor component={Link} to="/privacy" size="sm">
            Polityka prywatności
          </Anchor>
          <Group gap="lg" className="sticky-footer-socials">
            <Anchor
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              styles={footerSocialLinkStyles}
              className="footer-social-link"
            >
              <Image
                src="/assets/logo-linkedin.png"
                alt="LinkedIn"
                w={18}
                h={18}
                style={{ filter: FOOTER_ICON_WHITE_FILTER }}
              />
            </Anchor>
            <Anchor
              href={YOUTUBE_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              styles={footerSocialLinkStyles}
              className="footer-social-link"
            >
              <Image
                src="/assets/logo-youtube.png"
                alt="YouTube"
                w={18}
                h={18}
                style={{ filter: FOOTER_ICON_WHITE_FILTER }}
              />
            </Anchor>
          </Group>
        </Group>
      </Group>
    </AppShell.Footer>
  );
}
