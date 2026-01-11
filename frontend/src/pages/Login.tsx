import { useState, FormEvent } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Premium easing curve
  const premiumEasing = "cubic-bezier(0.22, 1, 0.36, 1)";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim()) || !password.trim()) {
      return;
    }

    try {
      setSubmitting(true);
      await login(email.trim(), password);
      navigate("/app/dashboard", { replace: true });
    } catch (err) {
      setError("Unable to sign in. Please check your credentials and try again.");
      setSubmitting(false);
    }
  };

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        // Animated gradient background - navy → indigo → teal
        background: `
          radial-gradient(circle at 30% 40%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 70% 60%, rgba(20, 184, 166, 0.12) 0%, transparent 50%),
          linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #312e81 50%, #0f766e 75%, #0f172a 100%)
        `,
        backgroundSize: "200% 200%",
        animation: "gradientShift 35s ease-in-out infinite",
        "@keyframes gradientShift": {
          "0%, 100%": {
            backgroundPosition: "0% 50%"
          },
          "50%": {
            backgroundPosition: "100% 50%"
          }
        },
        // Optional faint noise texture
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
          opacity: 0.25,
          pointerEvents: "none",
          mixBlendMode: "overlay"
        }
      }}
    >
      {/* Top bar with home button */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          p: 3
        }}
      >
        <IconButton
          onClick={() => navigate("/")}
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            bgcolor: "rgba(255, 255, 255, 0.05)",
            border: "1px solid",
            borderColor: "rgba(148, 163, 184, 0.1)",
            backdropFilter: "blur(12px) saturate(160%)",
            transition: `all 0.2s ${premiumEasing}`,
            "&:hover": {
              color: "rgba(255, 255, 255, 0.95)",
              bgcolor: "rgba(255, 255, 255, 0.1)",
              borderColor: "rgba(20, 184, 166, 0.3)",
              transform: "translateY(-1px)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2), 0 0 20px rgba(20, 184, 166, 0.1)"
            }
          }}
          aria-label="Go to home page"
        >
          <HomeIcon />
        </IconButton>
      </Box>

      {/* Center glassmorphism card */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: "480px",
          mx: 3,
          animation: `cardFloatIn 1s ${premiumEasing} forwards`,
          opacity: 0,
          transform: "translateY(20px)",
          "@keyframes cardFloatIn": {
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
        <Box
          sx={{
            position: "relative",
            p: { xs: 4.5, sm: 5.5 },
            borderRadius: 5,
            // Subtle glassmorphism
            background: `
              linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(30, 41, 59, 0.6) 100%)
            `,
            backdropFilter: "blur(24px) saturate(160%)",
            border: "1px solid",
            borderColor: "rgba(148, 163, 184, 0.12)",
            boxShadow: `
              0 20px 60px rgba(0, 0, 0, 0.4),
              0 0 0 1px rgba(255, 255, 255, 0.03) inset,
              0 0 40px rgba(20, 184, 166, 0.08)
            `
          }}
        >
          {/* Branding section */}
          <Box
            sx={{
              mb: 4.5,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2
            }}
          >
            {/* Logo - small, confident */}
            <Box
              component="img"
              src="/spaceflow-logo.jpg"
              alt="SpaceFlow logo"
              sx={{
                height: 40,
                width: "auto",
                display: "block"
              }}
            />
            {/* Product name */}
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "rgba(255, 255, 255, 0.95)"
              }}
            >
              SpaceFlow
            </Typography>
            {/* Tagline */}
            <Typography
              variant="body1"
              sx={{
                color: "rgba(148, 163, 184, 0.7)",
                fontSize: "0.9375rem",
                letterSpacing: "0.01em"
              }}
            >
              AI-powered workspace intelligence
            </Typography>
          </Box>

          {/* Email input form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3
            }}
          >
            <TextField
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              autoFocus
              autoComplete="email"
              placeholder="Enter your work email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon
                      sx={{
                        color: isFocused ? "rgba(20, 184, 166, 0.8)" : "rgba(148, 163, 184, 0.5)",
                        transition: `all 0.2s ${premiumEasing}`
                      }}
                    />
                  </InputAdornment>
                )
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2.5,
                  bgcolor: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid",
                  borderColor: isFocused
                    ? "rgba(20, 184, 166, 0.3)"
                    : "rgba(148, 163, 184, 0.12)",
                  transition: `all 0.2s ${premiumEasing}`,
                  "&:hover": {
                    borderColor: isFocused
                      ? "rgba(20, 184, 166, 0.3)"
                      : "rgba(148, 163, 184, 0.18)",
                    bgcolor: "rgba(255, 255, 255, 0.04)"
                  },
                  "&.Mui-focused": {
                    borderColor: "rgba(20, 184, 166, 0.4)",
                    bgcolor: "rgba(255, 255, 255, 0.04)",
                    boxShadow: `
                      0 0 0 2px rgba(20, 184, 166, 0.1),
                      0 0 16px rgba(20, 184, 166, 0.15)
                    `,
                    animation: "pulseGlow 3s ease-in-out infinite",
                    "@keyframes pulseGlow": {
                      "0%, 100%": {
                        boxShadow: `
                          0 0 0 2px rgba(20, 184, 166, 0.1),
                          0 0 16px rgba(20, 184, 166, 0.15)
                        `
                      },
                      "50%": {
                        boxShadow: `
                          0 0 0 2px rgba(20, 184, 166, 0.15),
                          0 0 20px rgba(20, 184, 166, 0.2)
                        `
                      }
                    }
                  },
                  "& fieldset": {
                    border: "none"
                  }
                },
                "& .MuiInputBase-input": {
                  py: 2,
                  fontSize: "1rem",
                  color: "rgba(255, 255, 255, 0.95)",
                  "&::placeholder": {
                    color: "rgba(148, 163, 184, 0.5)",
                    opacity: 1
                  }
                }
              }}
            />

            <TextField
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="Enter your password"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2.5,
                  bgcolor: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid",
                  borderColor: "rgba(148, 163, 184, 0.12)",
                  "&:hover": {
                    borderColor: "rgba(148, 163, 184, 0.18)",
                    bgcolor: "rgba(255, 255, 255, 0.04)"
                  },
                  "&.Mui-focused": {
                    borderColor: "rgba(20, 184, 166, 0.4)",
                    bgcolor: "rgba(255, 255, 255, 0.04)"
                  },
                  "& fieldset": {
                    border: "none"
                  }
                },
                "& .MuiInputBase-input": {
                  py: 2,
                  fontSize: "1rem",
                  color: "rgba(255, 255, 255, 0.95)",
                  "&::placeholder": {
                    color: "rgba(148, 163, 184, 0.5)",
                    opacity: 1
                  }
                }
              }}
            />

            {error && (
              <Alert
                severity="error"
                sx={{
                  bgcolor: "rgba(248, 113, 113, 0.12)",
                  color: "rgba(254, 242, 242, 0.9)",
                  borderRadius: 2,
                  border: "1px solid rgba(239, 68, 68, 0.4)"
                }}
              >
                {error}
              </Alert>
            )}

            {/* Primary CTA button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!isValidEmail || !email.trim() || !password.trim() || submitting}
              sx={{
                py: 1.75,
                borderRadius: 999,
                fontSize: "1rem",
                fontWeight: 600,
                letterSpacing: "0.02em",
                background: isValidEmail && email.trim()
                  ? "linear-gradient(135deg, #22C55E 0%, #14B8A6 100%)"
                  : "linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(20, 184, 166, 0.3) 100%)",
                color: isValidEmail && email.trim() ? "#020617" : "rgba(148, 163, 184, 0.5)",
                boxShadow: isValidEmail && email.trim()
                  ? "0 0 0 1px rgba(20, 184, 166, 0.4), 0 8px 24px rgba(34, 197, 94, 0.3), 0 0 40px rgba(20, 184, 166, 0.15)"
                  : "none",
                transition: `all 0.2s ${premiumEasing}`,
                "&:hover:not(:disabled)": {
                  transform: "translateY(-1px)",
                  background: "linear-gradient(135deg, #22C55E 0%, #14B8A6 100%)",
                  boxShadow: `
                    0 0 0 1px rgba(20, 184, 166, 0.5),
                    0 12px 32px rgba(34, 197, 94, 0.4),
                    0 0 50px rgba(20, 184, 166, 0.2)
                  `
                },
                "&:active:not(:disabled)": {
                  transform: "translateY(0px)"
                },
                "&:disabled": {
                  cursor: "not-allowed",
                  opacity: 0.5
                }
              }}
            >
              {submitting ? "Signing in..." : "Enter Workspace"}
            </Button>
          </Box>

          {/* Footer helper text */}
          <Box
            sx={{
              mt: 4,
              textAlign: "center"
            }}
          >
            <Typography
              variant="caption"
              sx={{
                display: "block",
                color: "rgba(148, 163, 184, 0.6)",
                fontSize: "0.75rem",
                mb: 0.5,
                letterSpacing: "0.01em"
              }}
            >
              Workspace Admin
            </Typography>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                color: "rgba(148, 163, 184, 0.5)",
                fontSize: "0.6875rem",
                letterSpacing: "0.01em",
                mb: 2
              }}
            >
              Sign in with your SpaceFlow credentials
            </Typography>
            
            {/* Interview Quick Access Credentials */}
            <Box
              sx={{
                mt: 3,
                p: 2,
                borderRadius: 2,
                bgcolor: "rgba(20, 184, 166, 0.08)",
                border: "1px solid",
                borderColor: "rgba(20, 184, 166, 0.2)"
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  color: "rgba(20, 184, 166, 0.9)",
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  mb: 1,
                  letterSpacing: "0.02em",
                  textTransform: "uppercase"
                }}
              >
                Quick Access (Interview)
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  color: "rgba(148, 163, 184, 0.8)",
                  fontSize: "0.75rem",
                  fontFamily: "monospace",
                  mb: 0.5
                }}
              >
                Email: admin@spaceflow.local
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  color: "rgba(148, 163, 184, 0.8)",
                  fontSize: "0.75rem",
                  fontFamily: "monospace"
                }}
              >
                Password: admin123
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
