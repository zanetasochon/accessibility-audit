import { createTheme, rem } from "@mantine/core";

const primary = [
  "#D6E7FF",
  "#ADD0FF",
  "#84B8FF",
  "#5BA0FF",
  "#3388FF",
  "#0A70FF",
  "#005CE6",
  "#0D47A1",
  "#093A84",
  "#062B63",
] as const;

const neutral = [
  "#F5F5F5",
  "#E9E9E9",
  "#DCDCDC",
  "#C8C8C8",
  "#9E9E9E",
  "#7A7A7A",
  "#555555",
  "#2F2F2F",
  "#1B1B1B",
  "#0E0E0E",
] as const;

const success = [
  "#D7F2DF",
  "#AFE5C0",
  "#86D9A0",
  "#5ECC80",
  "#36BF61",
  "#2FA654",
  "#268647",
  "#1D6635",
  "#154925",
  "#0D2F17",
] as const;

const error = [
  "#FFD1D6",
  "#FFB0B8",
  "#FF8F99",
  "#FF6E7B",
  "#FF4D5C",
  "#DB2F3F",
  "#B62533",
  "#8F1B27",
  "#69131C",
  "#420A11",
] as const;

export const appTheme = createTheme({
  primaryColor: "primary",
  primaryShade: 5,
  colors: {
    primary,
    gray: neutral,
    green: success,
    red: error,
  },
  black: "#171717",
  white: "#FFFFFF",
  fontFamily:
    "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
  headings: {
    fontFamily:
      "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
    fontWeight: "700",
    sizes: {
      h1: { fontSize: rem(38.88), lineHeight: "110%" },
      h2: { fontSize: rem(25.344), lineHeight: "110%" },
      h3: { fontSize: rem(25.344), lineHeight: "110%" },
      h4: { fontSize: rem(19.008), lineHeight: "110%" },
      h5: { fontSize: rem(14.4), lineHeight: "110%" },
      h6: { fontSize: rem(12.96), lineHeight: "110%" },
    },
  },
  radius: {
    xs: rem(2),
    sm: rem(4),
    md: rem(8),
    lg: rem(12),
    xl: rem(16),
  },
  spacing: {
    xs: rem(8.64),
    sm: rem(14.4),
    md: rem(17.28),
    lg: rem(23.04),
    xl: rem(34.56),
  },
  shadows: {
    xs: "0 1px 2px rgba(0,0,0,.06)",
    sm: "0 2px 6px rgba(0,0,0,.08)",
    md: "0 4px 10px rgba(0,0,0,.10)",
    lg: "0 8px 18px rgba(0,0,0,.14)",
    xl: "0 12px 24px rgba(0,0,0,.16)",
  },
  breakpoints: {
    xs: "40em",
    sm: "64em",
    md: "80em",
    lg: "90em",
    xl: "100em",
  },
  components: {
    Button: {
      defaultProps: {
        radius: "md",
      },
      styles: {
        root: {
          transition: "transform 180ms ease, box-shadow 180ms ease, filter 180ms ease",
          willChange: "transform, box-shadow, filter",
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
      },
    },
    Paper: {
      defaultProps: {
        radius: "lg",
        shadow: "sm",
      },
    },
    Card: {
      defaultProps: {
        radius: "lg",
        shadow: "sm",
      },
    },
    TextInput: {
      defaultProps: {
        radius: "md",
      },
    },
    Checkbox: {
      defaultProps: {
        radius: "sm",
      },
    },
  },
});
