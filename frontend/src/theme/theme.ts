import { createTheme, ThemeOptions } from "@mui/material";

/**
 * SpaceFlow Dark
 *
 * Premium, modern SaaS dark theme + motion system
 * - Near-black, blue-violet tinted background
 * - Soft neon green primary accent
 * - Muted indigo secondary
 * - Glassmorphism-lite cards with soft glow
 * - Centralized motion and elevation system
 */
const spaceFlowDarkOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    background: {
      // Deep space with a subtle, desaturated tint
      default: "#020617",
      paper: "rgba(15, 23, 42, 0.94)"
    },
    primary: {
      // Soft neon green accent
      main: "#4ADE80",
      light: "#6EE7B7",
      dark: "#16A34A",
      contrastText: "#020617"
    },
    secondary: {
      // Muted indigo accent
      main: "#6366F1",
      light: "#818CF8",
      dark: "#4F46E5",
      contrastText: "#E5E7EB"
    },
    text: {
      primary: "#F9FAFB",
      secondary: "#9CA3AF",
      disabled: "rgba(156, 163, 175, 0.5)"
    },
    divider: "rgba(148, 163, 184, 0.18)"
  },
  typography: {
    fontFamily: [
      "Inter",
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "sans-serif"
    ].join(","),
    h1: {
      fontSize: "2.75rem",
      fontWeight: 700,
      letterSpacing: "-0.03em"
    },
    h2: {
      fontSize: "2.1rem",
      fontWeight: 700,
      letterSpacing: "-0.02em"
    },
    h3: {
      fontSize: "1.7rem",
      fontWeight: 600,
      letterSpacing: "-0.01em"
    },
    h4: {
      fontSize: "1.4rem",
      fontWeight: 600
    },
    h5: {
      fontSize: "1.15rem",
      fontWeight: 500
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500
    },
    body1: {
      fontSize: "0.96rem",
      lineHeight: 1.6
    },
    body2: {
      fontSize: "0.88rem",
      lineHeight: 1.55
    },
    subtitle1: {
      fontSize: "0.96rem",
      fontWeight: 500,
      letterSpacing: "0.01em"
    },
    subtitle2: {
      fontSize: "0.84rem",
      fontWeight: 500,
      letterSpacing: "0.03em"
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: "0.03em"
    },
    overline: {
      fontSize: "0.7rem",
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      fontWeight: 600,
      color: "#9CA3AF"
    }
  },
  spacing: 8,
  shape: {
    // Unified radius scale; cards/panels can opt into slightly larger radii
    borderRadius: 14
  },
  // Global design tokens exposed via theme for reuse in sx
  // (Using "as any" to avoid overextending MUI's type surface.)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customShadows: {
    subtleGlow: "0 18px 45px rgba(15, 23, 42, 0.7)",
    hoverLift: "0 18px 40px rgba(15, 23, 42, 0.85)",
    focusRing: "0 0 0 1px rgba(74, 222, 128, 0.75)"
  } as any,
  transitions: {
    duration: {
      shortest: 120,
      shorter: 180,
      short: 220,
      standard: 260,
      complex: 320,
      enteringScreen: 260,
      leavingScreen: 220
    },
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.05, 0.7, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
    }
  },
  components: {
    /**
     * Cards / surfaces
     * Glassmorphism-lite + soft glow
     */
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "rgba(148, 163, 184, 0.16)",
          // Lighter, less saturated glass effect
          backgroundImage:
            "linear-gradient(135deg, rgba(15, 23, 42, 0.92), rgba(30, 64, 175, 0.65))",
          backdropFilter: "blur(16px)",
          boxShadow:
            "0 18px 45px rgba(15, 23, 42, 0.7), 0 0 0 1px rgba(15, 23, 42, 0.85)",
          overflow: "hidden",
          transition: (theme) =>
            theme.transitions.create(
              ["transform", "box-shadow", "border-color", "background-image"],
              {
                duration: theme.transitions.duration.short,
                easing: theme.transitions.easing.easeOut
              }
            )
        }
      }
    },

    /**
     * Buttons
     * Primary with subtle neon glow, no harsh borders
     */
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 18,
          paddingBlock: 9,
          fontWeight: 600,
          textTransform: "none",
          letterSpacing: "0.03em",
          transition: (theme) =>
            theme.transitions.create(
              ["background-color", "box-shadow", "transform"],
              {
                duration: theme.transitions.duration.shorter,
                easing: theme.transitions.easing.easeOut
              }
            ),
          "&:hover": {
            transform: "translateY(-1px)"
          },
          "&:focus-visible": (theme) => ({
            outline: "2px solid",
            outlineColor: theme.palette.primary.main,
            outlineOffset: 2
          })
        },
        containedPrimary: {
          backgroundImage:
            "radial-gradient(circle at 0% 0%, rgba(74, 222, 128, 0.35), transparent 55%), linear-gradient(135deg, #22C55E, #4ADE80)",
          color: "#020617",
          boxShadow:
            "0 0 0 1px rgba(74, 222, 128, 0.45), 0 12px 30px rgba(34, 197, 94, 0.55)"
        },
        outlinedPrimary: {
          borderWidth: 1,
          borderColor: "rgba(74, 222, 128, 0.65)",
          backgroundColor: "rgba(15, 23, 42, 0.7)"
        },
        textPrimary: {
          color: "#A7F3D0"
        }
      }
    },

    /**
     * Drawer / sidebar
     * Dark, slightly translucent, integrated with overall background
     */
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px solid rgba(30, 64, 175, 0.35)",
          // Darker, flatter than cards – reduce gradient strength
          backgroundImage:
            "linear-gradient(180deg, rgba(10, 16, 32, 0.98), rgba(15, 23, 42, 0.98))",
          backdropFilter: "blur(14px)",
          boxShadow: "4px 0 24px rgba(0, 0, 0, 0.75)",
          transition: (theme) =>
            theme.transitions.create(["transform", "box-shadow"], {
              duration: theme.transitions.duration.enteringScreen,
              easing: theme.transitions.easing.easeOut
            })
        }
      }
    },

    /**
     * Chart containers
     * Let charts live on the same visual plane as cards
     */
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          borderRadius: 18,
          overflow: "hidden",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 18px 40px rgba(15, 23, 42, 0.9)"
          }
        }
      }
    },

    /**
     * Typography / labels
     * Subtle uppercase section labels for repeated use.
     */
    MuiTypography: {
      styleOverrides: {
        root: {
          "&.section-label": {
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            fontSize: "0.7rem",
            color: "#9CA3AF"
          }
        }
      }
    },

    /**
     * Charts (Recharts containers)
     * Shared dark chart surface tokens via CSS variables for reuse.
     */
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          "--sf-chart-grid-minor": "rgba(148, 163, 184, 0.08)",
          "--sf-chart-grid-major": "rgba(148, 163, 184, 0.18)",
          "--sf-chart-axis-line": "rgba(51, 65, 85, 0.85)",
          "--sf-chart-axis-label": "rgba(255, 255, 255, 0.55)",
          "--sf-chart-tooltip-bg": "rgba(15, 23, 42, 0.98)",
          "--sf-chart-tooltip-border": "rgba(148, 163, 184, 0.7)"
        },
        body: {
          backgroundColor: "#020617",
          color: "#F9FAFB"
        },
        html: {
          backgroundColor: "#020617"
        },
        "#root": {
          backgroundColor: "#020617",
          minHeight: "100vh"
        }
      }
    }
  }
};

export const spaceFlowDarkTheme = createTheme(spaceFlowDarkOptions);


