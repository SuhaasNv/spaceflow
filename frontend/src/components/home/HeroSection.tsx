import { Box, Typography } from "@mui/material";
import { PrimaryButton } from "../common/PrimaryButton";
import { SectionContainer } from "../common/SectionContainer";

export const HeroSection = () => {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pt: { xs: 12, md: 16 },
        pb: { xs: 8, md: 12 },
        overflow: "hidden",
        // Dark-to-deep-blue gradient background
        background: `
          radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(56, 189, 248, 0.12) 0%, transparent 50%),
          linear-gradient(180deg, #020617 0%, #0f172a 25%, #1e293b 50%, #0f172a 75%, #020617 100%)
        `,
        backgroundSize: "200% 200%",
        backgroundPosition: "center",
        animation: "gradientShift 20s ease infinite",
        "@keyframes gradientShift": {
          "0%, 100%": {
            backgroundPosition: "center center"
          },
          "50%": {
            backgroundPosition: "60% 40%"
          }
        },
        // Subtle noise texture
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
          opacity: 0.3,
          pointerEvents: "none",
          mixBlendMode: "overlay"
        }
      }}
    >
      {/* Subtle ambient glow accents */}
      <Box
        sx={{
          position: "absolute",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(74, 222, 128, 0.08) 0%, transparent 70%)",
          top: "-20%",
          right: "-10%",
          filter: "blur(80px)",
          animation: "floatOrb 25s ease-in-out infinite",
          "@keyframes floatOrb": {
            "0%, 100%": {
              transform: "translate(0, 0) scale(1)",
              opacity: 0.4
            },
            "50%": {
              transform: "translate(50px, -60px) scale(1.1)",
              opacity: 0.6
            }
          }
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.06) 0%, transparent 70%)",
          bottom: "-15%",
          left: "-5%",
          filter: "blur(70px)",
          animation: "floatOrb2 30s ease-in-out infinite",
          "@keyframes floatOrb2": {
            "0%, 100%": {
              transform: "translate(0, 0) scale(1)",
              opacity: 0.3
            },
            "50%": {
              transform: "translate(-40px, 50px) scale(1.15)",
              opacity: 0.5
            }
          }
        }}
      />

      <SectionContainer>
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: { xs: 3, md: 4 },
            animation: "fadeInUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards",
            opacity: 0,
            transform: "translateY(20px)",
            "@keyframes fadeInUp": {
              "0%": {
                opacity: 0,
                transform: "translateY(20px)"
              },
              "100%": {
                opacity: 1,
                transform: "translateY(0)"
              }
            }
          }}
        >
          {/* Logo */}
          <Box
            component="img"
            src="/spaceflow-logo.jpg"
            alt="SpaceFlow logo"
            sx={{
              height: { xs: 48, md: 64 },
              width: "auto",
              display: "block",
              mb: 1,
              animation: "fadeInUp 1s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards",
              opacity: 0,
              transform: "translateY(20px)",
              "@keyframes fadeInUp": {
                "0%": {
                  opacity: 0,
                  transform: "translateY(20px)"
                },
                "100%": {
                  opacity: 1,
                  transform: "translateY(0)"
                }
              }
            }}
          />

          {/* Headline */}
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem", lg: "5.5rem" },
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              color: "text.primary",
              maxWidth: "1000px",
              mb: { xs: 1, md: 2 }
            }}
          >
            AI-powered intelligence for modern workplaces
          </Typography>

          {/* Subtext */}
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1.1rem", md: "1.25rem" },
              lineHeight: 1.6,
              color: "text.secondary",
              maxWidth: "700px",
              mb: { xs: 2, md: 3 },
              fontWeight: 400
            }}
          >
            Understand how space is used, identify patterns, and receive advisory insights to optimize workplace decisions.
          </Typography>

          {/* CTA Button */}
          <Box
            sx={{
              mt: { xs: 1, md: 2 },
              animation: "fadeInUp 1s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards",
              opacity: 0,
              transform: "translateY(20px)",
              "@keyframes fadeInUp": {
                "0%": {
                  opacity: 0,
                  transform: "translateY(20px)"
                },
                "100%": {
                  opacity: 1,
                  transform: "translateY(0)"
                }
              }
            }}
          >
            <PrimaryButton to="/login" size="large">
              Enter Workspace
            </PrimaryButton>
          </Box>
        </Box>
      </SectionContainer>
    </Box>
  );
};




