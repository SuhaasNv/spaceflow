import { useState, FormEvent, useEffect, useRef } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { login } = useAuth();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  // Premium easing curve
  const premiumEasing = "cubic-bezier(0.22, 1, 0.36, 1)";

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    login(email);
    navigate("/app/dashboard", { replace: true });
  };

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const hasValue = email.trim().length > 0;

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        bgcolor: "background.default",
        // Animated gradient background with very slow motion
        background: `
          radial-gradient(circle at ${50 + mousePosition.x * 0.08}% ${50 + mousePosition.y * 0.08}%, rgba(99, 102, 241, 0.22) 0%, transparent 50%),
          radial-gradient(circle at ${30 - mousePosition.x * 0.08}% ${70 + mousePosition.y * 0.08}%, rgba(56, 189, 248, 0.18) 0%, transparent 50%),
          radial-gradient(circle at ${70 + mousePosition.x * 0.08}% ${30 - mousePosition.y * 0.08}%, rgba(139, 92, 246, 0.12) 0%, transparent 50%),
          linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #0f172a 50%, #1e1b4b 75%, #0f172a 100%)
        `,
        backgroundSize: "200% 200%",
        backgroundPosition: "center",
        transition: `background-position 0.6s ${premiumEasing}`,
        // Noise texture overlay
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
          opacity: 0.35,
          pointerEvents: "none",
          mixBlendMode: "overlay"
        }
      }}
    >
      {/* Floating orbs with very slow, subtle motion */}
      <Box
        sx={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)",
          top: "10%",
          left: "10%",
          filter: "blur(70px)",
          animation: "floatOrb1 35s ease-in-out infinite",
          "@keyframes floatOrb1": {
            "0%, 100%": {
              transform: "translate(0, 0) scale(1)",
              opacity: 0.5
            },
            "50%": {
              transform: "translate(40px, -50px) scale(1.08)",
              opacity: 0.65
            }
          }
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, transparent 70%)",
          bottom: "15%",
          right: "15%",
          filter: "blur(60px)",
          animation: "floatOrb2 42s ease-in-out infinite",
          "@keyframes floatOrb2": {
            "0%, 100%": {
              transform: "translate(0, 0) scale(1)",
              opacity: 0.4
            },
            "50%": {
              transform: "translate(-35px, 45px) scale(1.12)",
              opacity: 0.6
            }
          }
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
          top: "50%",
          right: "5%",
          filter: "blur(55px)",
          animation: "floatOrb3 38s ease-in-out infinite",
          "@keyframes floatOrb3": {
            "0%, 100%": {
              transform: "translate(0, 0) scale(1)",
              opacity: 0.35
            },
            "50%": {
              transform: "translate(30px, -40px) scale(1.15)",
              opacity: 0.5
            }
          }
        }}
      />

      {/* Center glassmorphism card */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: "480px",
          mx: 3,
          animation: `cardEntrance 1s ${premiumEasing} forwards`,
          opacity: 0,
          transform: "scale(0.96)",
          "@keyframes cardEntrance": {
            "0%": {
              opacity: 0,
              transform: "scale(0.96) translateY(24px)"
            },
            "100%": {
              opacity: 1,
              transform: "scale(1) translateY(0)"
            }
          }
        }}
      >
        <Box
          sx={{
            position: "relative",
            p: { xs: 4.5, sm: 5.5 },
            borderRadius: 4,
            // Enhanced glassmorphism with inner shadow and gradient overlay
            background: `
              linear-gradient(135deg, rgba(15, 23, 42, 0.78) 0%, rgba(30, 41, 59, 0.68) 100%),
              linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
              linear-gradient(225deg, rgba(56, 189, 248, 0.06) 0%, transparent 50%)
            `,
            backdropFilter: "blur(32px) saturate(180%)",
            border: "1px solid",
            borderColor: "rgba(148, 163, 184, 0.18)",
            boxShadow: `
              0 12px 40px rgba(0, 0, 0, 0.45),
              0 0 0 1px rgba(255, 255, 255, 0.04) inset,
              inset 0 1px 2px rgba(255, 255, 255, 0.06),
              inset 0 -1px 1px rgba(0, 0, 0, 0.2),
              0 0 80px rgba(99, 102, 241, 0.12)
            `,
            // Inner gradient overlay (top-left lighter, bottom-right darker)
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              background: `
                linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, transparent 40%),
                linear-gradient(225deg, transparent 60%, rgba(0, 0, 0, 0.15) 100%)
              `,
              pointerEvents: "none",
              opacity: 0.7
            },
            // Inner glow border
            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              padding: "1px",
              background: "linear-gradient(135deg, rgba(74, 222, 128, 0.15), rgba(99, 102, 241, 0.15), transparent)",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              pointerEvents: "none",
              opacity: 0.5
            }
          }}
        >
          {/* Branding section with staggered animations */}
          <Box
            sx={{
              mb: 4.5,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2.25
            }}
          >
            <Box
              component="img"
              src="/spaceflow-logo.jpg"
              alt="SpaceFlow logo"
              sx={{
                height: 56,
                width: "auto",
                display: "block",
                animation: `fadeInUp 0.8s ${premiumEasing} 0.2s forwards`,
                opacity: 0,
                transform: "translateY(12px)",
                "@keyframes fadeInUp": {
                  "0%": {
                    opacity: 0,
                    transform: "translateY(12px)"
                  },
                  "100%": {
                    opacity: 1,
                    transform: "translateY(0)"
                  }
                }
              }}
            />
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                letterSpacing: "-0.03em",
                background: "linear-gradient(135deg, #F9FAFB 0%, #E5E7EB 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: `fadeInUp 0.8s ${premiumEasing} 0.3s forwards`,
                opacity: 0,
                transform: "translateY(12px)",
                "@keyframes fadeInUp": {
                  "0%": {
                    opacity: 0,
                    transform: "translateY(12px)"
                  },
                  "100%": {
                    opacity: 1,
                    transform: "translateY(0)"
                  }
                }
              }}
            >
              SpaceFlow
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                fontSize: "0.95rem",
                letterSpacing: "0.02em",
                animation: `fadeInUp 0.8s ${premiumEasing} 0.4s forwards`,
                opacity: 0,
                transform: "translateY(12px)",
                "@keyframes fadeInUp": {
                  "0%": {
                    opacity: 0,
                    transform: "translateY(12px)"
                  },
                  "100%": {
                    opacity: 0.75,
                    transform: "translateY(0)"
                  }
                }
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
              gap: 3.5,
              animation: `fadeInUp 0.8s ${premiumEasing} 0.5s forwards`,
              opacity: 0,
              transform: "translateY(12px)",
              "@keyframes fadeInUp": {
                "0%": {
                  opacity: 0,
                  transform: "translateY(12px)"
                },
                "100%": {
                  opacity: 1,
                  transform: "translateY(0)"
                }
              }
            }}
          >
            <Box sx={{ position: "relative" }}>
              <TextField
                fullWidth
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                error={!!error}
                helperText={error}
                autoFocus
                autoComplete="email"
                placeholder="Enter your email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon
                        sx={{
                          color: isFocused ? "primary.main" : "text.secondary",
                          transition: `all 0.25s ${premiumEasing}`,
                          transform: isFocused ? "scale(1.1)" : "scale(1)",
                          filter: isFocused ? "brightness(1.2)" : "brightness(1)"
                        }}
                      />
                    </InputAdornment>
                  )
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    bgcolor: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid",
                    borderColor: isFocused
                      ? "rgba(74, 222, 128, 0.6)"
                      : "rgba(148, 163, 184, 0.12)",
                    transition: `all 0.25s ${premiumEasing}`,
                    "&:hover": {
                      borderColor: isFocused
                        ? "rgba(74, 222, 128, 0.6)"
                        : "rgba(148, 163, 184, 0.25)",
                      bgcolor: "rgba(255, 255, 255, 0.03)"
                    },
                    "&.Mui-focused": {
                      borderColor: "primary.main",
                      bgcolor: "rgba(255, 255, 255, 0.03)",
                      boxShadow: `
                        0 0 0 4px rgba(74, 222, 128, 0.18),
                        0 0 24px rgba(74, 222, 128, 0.25),
                        0 4px 12px rgba(0, 0, 0, 0.15)
                      `
                    },
                    "& fieldset": {
                      border: "none"
                    }
                  },
                  "& .MuiInputBase-input": {
                    py: 1.875,
                    fontSize: "1rem",
                    color: "text.primary",
                    transition: `all 0.25s ${premiumEasing}`,
                    "&::placeholder": {
                      color: "text.secondary",
                      opacity: hasValue ? 0 : 0.55,
                      transition: `opacity 0.25s ${premiumEasing}`
                    }
                  },
                  "& .MuiFormHelperText-root": {
                    mx: 0,
                    mt: 1.25,
                    fontSize: "0.8125rem",
                    opacity: 0.8
                  }
                }}
              />
              {/* Floating label effect */}
              {hasValue && (
                <Typography
                  variant="caption"
                  sx={{
                    position: "absolute",
                    top: -8,
                    left: 12,
                    fontSize: "0.6875rem",
                    color: isFocused ? "primary.main" : "text.secondary",
                    opacity: isFocused ? 0.9 : 0.65,
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    pointerEvents: "none",
                    transition: `all 0.25s ${premiumEasing}`,
                    animation: `fadeInUp 0.25s ${premiumEasing} forwards`,
                    "@keyframes fadeInUp": {
                      "0%": {
                        opacity: 0,
                        transform: "translateY(4px)"
                      },
                      "100%": {
                        opacity: isFocused ? 0.9 : 0.65,
                        transform: "translateY(0)"
                      }
                    }
                  }}
                >
                  Email
                </Typography>
              )}
            </Box>

            {/* Primary CTA button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!isValidEmail || !email.trim()}
              sx={{
                py: 1.875,
                borderRadius: 999,
                fontSize: "1rem",
                fontWeight: 600,
                letterSpacing: "0.03em",
                background: isValidEmail && email.trim()
                  ? "linear-gradient(135deg, #22C55E 0%, #4ADE80 50%, #06B6D4 100%)"
                  : "linear-gradient(135deg, rgba(34, 197, 94, 0.25) 0%, rgba(74, 222, 128, 0.25) 50%, rgba(6, 182, 212, 0.25) 100%)",
                color: isValidEmail && email.trim() ? "#020617" : "text.disabled",
                boxShadow: isValidEmail && email.trim()
                  ? "0 0 0 1px rgba(74, 222, 128, 0.5), 0 8px 24px rgba(34, 197, 94, 0.35), 0 0 40px rgba(74, 222, 128, 0.15)"
                  : "none",
                transition: `all 0.3s ${premiumEasing}`,
                position: "relative",
                overflow: "hidden",
                // Gradient shine effect
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, transparent 50%, transparent 100%)",
                  opacity: 0,
                  transition: `opacity 0.4s ${premiumEasing}, transform 0.6s ${premiumEasing}`,
                  transform: "translateX(-100%)"
                },
                "&:hover:not(:disabled)": {
                  transform: "translateY(-1.5px)",
                  boxShadow: `
                    0 0 0 1px rgba(74, 222, 128, 0.65),
                    0 12px 36px rgba(34, 197, 94, 0.45),
                    0 0 60px rgba(74, 222, 128, 0.25)
                  `,
                  "&::before": {
                    opacity: 1,
                    transform: "translateX(100%)"
                  }
                },
                "&:active:not(:disabled)": {
                  transform: "translateY(0px) scale(0.97)",
                  transition: `transform 0.12s ${premiumEasing}`
                },
                "&:disabled": {
                  cursor: "not-allowed",
                  opacity: 0.5
                }
              }}
            >
              Enter Workspace
            </Button>
          </Box>

          {/* Footer context */}
          <Box
            sx={{
              mt: 4.5,
              pt: 3.5,
              borderTop: "1px solid",
              borderColor: "rgba(148, 163, 184, 0.08)",
              textAlign: "center",
              animation: `fadeIn 0.8s ${premiumEasing} 0.7s forwards`,
              opacity: 0,
              "@keyframes fadeIn": {
                "0%": {
                  opacity: 0
                },
                "100%": {
                  opacity: 1
                }
              }
            }}
          >
            <Typography
              variant="caption"
              sx={{
                display: "block",
                color: "text.secondary",
                fontSize: "0.75rem",
                mb: 0.75,
                letterSpacing: "0.05em",
                opacity: 0.7
              }}
            >
              Workspace Admin • Demo Environment
            </Typography>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                color: "text.secondary",
                fontSize: "0.6875rem",
                opacity: 0.6,
                letterSpacing: "0.03em"
              }}
            >
              No password required
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
