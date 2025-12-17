import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Drawer,
  IconButton,
  LinearProgress,
  Skeleton,
  Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import { aiEngineApi } from "../api/aiEngineApi";

interface AiRecommendation {
  id: string;
  title: string;
  category?: string;
  impactLevel?: string;
  confidencePercent?: number | null;
  primaryReasons?: string[];
}

interface AiRecommendationsContextMeta {
  scopeLabel?: string;
  timeRangeLabel?: string;
}

interface AiRecommendationExplanationViewModel {
  summary: string;
  contributingSignals: string[];
  confidenceNotes?: string | null;
}

const normalizeRecommendationsResponse = (
  response: unknown
): AiRecommendation[] => {
  const raw = response as any;
  
  // TEMP DEBUG: Log normalization process
  // eslint-disable-next-line no-console
  console.log("[TEMP DEBUG LAYER 4] Normalization - raw.recommendations:", raw?.recommendations);
  // eslint-disable-next-line no-console
  console.log("[TEMP DEBUG LAYER 4] Normalization - raw.recommendations isArray:", Array.isArray(raw?.recommendations));
  
  // TEMP DEBUG: Try multiple ways to extract recommendations
  let itemsSource: any[] = [];
  
  if (Array.isArray(raw?.recommendations)) {
    itemsSource = raw.recommendations;
    // eslint-disable-next-line no-console
    console.log("[TEMP DEBUG LAYER 4] Found recommendations as array:", itemsSource);
  } else if (Array.isArray(raw?.items)) {
    itemsSource = raw.items;
    // eslint-disable-next-line no-console
    console.log("[TEMP DEBUG LAYER 4] Found items as array:", itemsSource);
  } else if (Array.isArray(raw)) {
    itemsSource = raw;
    // eslint-disable-next-line no-console
    console.log("[TEMP DEBUG LAYER 4] Response itself is array:", itemsSource);
  } else if (raw?.recommendations && typeof raw.recommendations === "object") {
    // TEMP DEBUG: Handle case where recommendations might be an object instead of array
    // eslint-disable-next-line no-console
    console.log("[TEMP DEBUG LAYER 4] WARNING: recommendations is object, not array:", raw.recommendations);
    itemsSource = [];
  } else {
    // eslint-disable-next-line no-console
    console.log("[TEMP DEBUG LAYER 4] WARNING: No recommendations found in response structure");
    itemsSource = [];
  }

  // TEMP DEBUG: Log itemsSource
  // eslint-disable-next-line no-console
  console.log("[TEMP DEBUG LAYER 4] Normalization - itemsSource:", itemsSource);
  // eslint-disable-next-line no-console
  console.log("[TEMP DEBUG LAYER 4] Normalization - itemsSource length:", itemsSource.length);

  // TODO: Replace this generic normalization with a strongly typed model
  // once the AI Engine recommendations contract is finalized.
  const filtered = (itemsSource as any[]).filter(
    (item) => {
      const hasId = typeof (item as any)?.id === "string" || typeof (item as any)?.recommendationId === "string";
      // TEMP DEBUG: Log filter result for each item
      if (itemsSource.length > 0) {
        // eslint-disable-next-line no-console
        console.log("[TEMP DEBUG LAYER 4] Normalization - filtering item:", item, "hasId:", hasId);
      }
      return item &&
        typeof item === "object" &&
        hasId;
    }
  );
  
  // TEMP DEBUG: Log filtered results
  // eslint-disable-next-line no-console
  console.log("[TEMP DEBUG LAYER 4] Normalization - filtered count:", filtered.length);
  
  return filtered.map((item) => {
      const id =
        (item as any).id ??
        (item as any).recommendationId;

      return {
        id: String(id),
        title:
          typeof (item as any).title === "string"
            ? (item as any).title
            : "Recommendation",
        category:
          typeof (item as any).category === "string"
            ? (item as any).category
            : undefined,
        impactLevel:
          typeof (item as any).impactLevel === "string"
            ? (item as any).impactLevel
            : undefined,
        // NOTE: We do not compute or transform confidence values here – we only
        // surface what the backend provides.
        confidencePercent:
          typeof (item as any).confidence === "number"
            ? (item as any).confidence * 100 // Backend provides 0-1, convert to 0-100 for display
            : typeof (item as any).confidencePercent === "number"
            ? (item as any).confidencePercent
            : null,
        primaryReasons:
          Array.isArray((item as any).primaryReasons) &&
          (item as any).primaryReasons.length > 0
            ? (item as any).primaryReasons.filter(
                (r: unknown) => typeof r === "string"
              )
            : undefined
      };
    });
};

const normalizeExplanationResponse = (
  response: unknown
): AiRecommendationExplanationViewModel => {
  const raw = response as any;

  // TODO: Replace this defensive parsing with a typed model once the
  // explanation payload is finalized.
  const summary =
    typeof raw?.summary === "string"
      ? raw.summary
      : "Explanation is not available for this recommendation.";

  const signalsSource =
    (Array.isArray(raw?.contributingSignals) && raw.contributingSignals) ||
    (Array.isArray(raw?.signals) && raw.signals) ||
    [];

  const contributingSignals = (signalsSource as any[])
    .filter((s) => typeof s === "string")
    .map((s) => s as string);

  const confidenceNotes =
    typeof raw?.confidenceNotes === "string"
      ? raw.confidenceNotes
      : undefined;

  return {
    summary,
    contributingSignals,
    confidenceNotes
  };
};

type ConfidenceVisualLevel = "high" | "medium" | "low";

const getConfidenceVisualLevel = (
  confidencePercent: number
): ConfidenceVisualLevel => {
  // NOTE: The backend is expected to provide a 0–100 confidencePercent value.
  // We do not transform this value – we only apply visual thresholds on the
  // same 0–100 scale for UI coloring.
  if (confidencePercent > 75) {
    return "high";
  }
  if (confidencePercent >= 40) {
    return "medium";
  }
  return "low";
};

const getConfidenceColor = (
  confidencePercent: number | null | undefined
):
  | "inherit"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning" => {
  if (typeof confidencePercent !== "number") {
    return "inherit";
  }

  const level = getConfidenceVisualLevel(confidencePercent);

  if (level === "high") {
    return "success";
  }
  if (level === "medium") {
    return "warning";
  }

  // Low confidence – render with a neutral/gray style via inherit.
  return "inherit";
};

const getConfidenceLabel = (
  confidencePercent: number | null | undefined
): string => {
  if (typeof confidencePercent !== "number") {
    return "Confidence not provided";
  }

  const level = getConfidenceVisualLevel(confidencePercent);

  if (level === "high") {
    return "High";
  }
  if (level === "medium") {
    return "Medium";
  }
  return "Low";
};

const getConfidenceCaption = (
  confidencePercent: number | null | undefined
): string => {
  if (typeof confidencePercent !== "number") {
    return "Confidence was not provided for this suggestion.";
  }

  const level = getConfidenceVisualLevel(confidencePercent);

  if (level === "high") {
    return "Based on strong and consistent patterns in aggregated workspace behaviour. Advisory only.";
  }
  if (level === "medium") {
    return "Based on noticeable patterns in aggregated workspace behaviour and should be cross-checked with your context.";
  }
  return "Based on weaker or noisier patterns in aggregated workspace behaviour. Treat as a light suggestion.";
};

const getSuggestedAction = (rec: AiRecommendation): string | null => {
  if (!rec.title) {
    return null;
  }

  // UI-only, advisory phrasing derived from the recommendation title.
  return `Consider taking a light, non-binding follow-up related to "${rec.title}" with your workspace or operations team.`;
};

export const AiRecommendationsPanel = () => {
  const [recommendations, setRecommendations] = useState<AiRecommendation[]>(
    []
  );
  const [recommendationsContext, setRecommendationsContext] =
    useState<AiRecommendationsContextMeta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeRecommendation, setActiveRecommendation] =
    useState<AiRecommendation | null>(null);
  const [explanationLoading, setExplanationLoading] = useState(false);
  const [explanationError, setExplanationError] = useState<string | null>(null);
  const [explanation, setExplanation] =
    useState<AiRecommendationExplanationViewModel | null>(null);

  const loadRecommendations = async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Wire scope and time range to real workspace selection and filters.
      const response = await aiEngineApi.getRecommendations({
        scope: "WORKSPACE:demo"
      });
      const normalized = normalizeRecommendationsResponse(response);
      const raw = response as any;
      const scopeType = raw?.scope?.type;
      const scopeId = raw?.scope?.id;
      const timeStart = raw?.timeRange?.start;
      const timeEnd = raw?.timeRange?.end;

      setRecommendationsContext({
        scopeLabel:
          typeof scopeType === "string" && typeof scopeId === "string"
            ? `${scopeType} ${scopeId}`
            : undefined,
        timeRangeLabel:
          typeof timeStart === "string" && typeof timeEnd === "string"
            ? `recent activity between ${new Date(
                timeStart
              ).toLocaleDateString()} and ${new Date(
                timeEnd
              ).toLocaleDateString()}`
            : undefined
      });
      setRecommendations(normalized);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Failed to load AI recommendations", e);
      setError("Unable to load AI recommendations.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenExplanation = async (recommendation: AiRecommendation) => {
    setActiveRecommendation(recommendation);
    setDrawerOpen(true);
    setExplanation(null);
    setExplanationError(null);
    setExplanationLoading(true);

    try {
      const response = await aiEngineApi.getRecommendationExplanation(
        recommendation.id
      );
      const normalized = normalizeExplanationResponse(response);
      setExplanation(normalized);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Failed to load recommendation explanation", e);
      setExplanationError(
        "We couldn't load the explanation for this recommendation."
      );
    } finally {
      setExplanationLoading(false);
    }
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    let isMounted = true;

    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        // TODO: Wire scope and time range to real workspace selection and filters.
        const response = await aiEngineApi.getRecommendations({
          scope: "WORKSPACE:demo"
        });
        if (!isMounted) return;

        // TEMP DEBUG: Log raw API response with detailed structure
        // eslint-disable-next-line no-console
        console.log("[TEMP DEBUG LAYER 4] Raw API response:", response);
        // eslint-disable-next-line no-console
        console.log("[TEMP DEBUG LAYER 4] Raw response type:", typeof response);
        // eslint-disable-next-line no-console
        console.log("[TEMP DEBUG LAYER 4] Raw response keys:", Object.keys(response || {}));
        // eslint-disable-next-line no-console
        console.log("[TEMP DEBUG LAYER 4] Raw response.recommendations:", (response as any)?.recommendations);
        // eslint-disable-next-line no-console
        console.log("[TEMP DEBUG LAYER 4] Raw response.recommendations type:", typeof (response as any)?.recommendations);
        // eslint-disable-next-line no-console
        console.log("[TEMP DEBUG LAYER 4] Raw response.recommendations isArray:", Array.isArray((response as any)?.recommendations));
        if (Array.isArray((response as any)?.recommendations)) {
          // eslint-disable-next-line no-console
          console.log("[TEMP DEBUG LAYER 4] Raw response.recommendations length:", (response as any).recommendations.length);
          // eslint-disable-next-line no-console
          console.log("[TEMP DEBUG LAYER 4] Raw response.recommendations[0]:", (response as any).recommendations[0]);
        }

        const normalized = normalizeRecommendationsResponse(response);
        
        // TEMP DEBUG: Log normalized recommendations array
        // eslint-disable-next-line no-console
        console.log("[TEMP DEBUG LAYER 4] Normalized recommendations array:", normalized);
        // eslint-disable-next-line no-console
        console.log("[TEMP DEBUG LAYER 4] Normalized recommendations count:", normalized.length);

        const raw = response as any;
        const scopeType = raw?.scope?.type;
        const scopeId = raw?.scope?.id;
        const timeStart = raw?.timeRange?.start;
        const timeEnd = raw?.timeRange?.end;

        setRecommendationsContext({
          scopeLabel:
            typeof scopeType === "string" && typeof scopeId === "string"
              ? `${scopeType} ${scopeId}`
              : undefined,
          timeRangeLabel:
            typeof timeStart === "string" && typeof timeEnd === "string"
              ? `recent activity between ${new Date(
                  timeStart
                ).toLocaleDateString()} and ${new Date(
                  timeEnd
                ).toLocaleDateString()}`
              : undefined
        });
        setRecommendations(normalized);
      } catch (e) {
        if (!isMounted) return;
        // eslint-disable-next-line no-console
        console.error("Failed to load AI recommendations", e);
        setError("Unable to load AI recommendations.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    run();

    return () => {
      isMounted = false;
    };
  }, []);

  const hasRecommendations = recommendations.length > 0;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2.5
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1.5
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Typography
            variant="overline"
            color="primary.light"
            sx={{ letterSpacing: "0.16em" }}
          >
            SpaceFlow AI
          </Typography>
          <Typography variant="h6">AI Recommendations</Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            <InfoOutlinedIcon fontSize="inherit" />
            Advisory – Not authoritative
          </Typography>
        </Box>
        {error && (
          <Button
            size="small"
            variant="outlined"
            onClick={loadRecommendations}
          >
            Retry
          </Button>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2
        }}
      >
        {loading && (
          <>
            {[0, 1, 2].map((key) => (
              <Box
                key={key}
                sx={(theme) => ({
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "rgba(15, 23, 42, 0.9)",
                  border: `1px solid ${theme.palette.divider}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1
                })}
              >
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="rectangular" height={6} />
                <Skeleton variant="text" width="30%" />
              </Box>
            ))}
          </>
        )}

        {!loading && error && !hasRecommendations && (
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: "rgba(15, 23, 42, 0.9)",
              border: (theme) =>
                `1px solid ${theme.palette.error.light}`,
              display: "flex",
              flexDirection: "column",
              gap: 1
            }}
          >
            <Typography variant="body2" color="error">
              {error}
            </Typography>
            <Button
              size="small"
              variant="outlined"
              onClick={loadRecommendations}
              sx={{ alignSelf: "flex-start" }}
            >
              Retry
            </Button>
          </Box>
        )}

        {!loading && !error && !hasRecommendations && (
          <>
            {/* TEMP DEBUG: Fallback render - red warning box if array length === 0 */}
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: "rgba(211, 47, 47, 0.1)",
                border: (theme) => `2px solid ${theme.palette.error.main}`,
                display: "flex",
                flexDirection: "column",
                gap: 1
              }}
            >
              <Typography variant="body1" color="error" sx={{ fontWeight: 600 }}>
                [TEMP DEBUG] No AI recommendations received from backend
              </Typography>
              <Typography variant="body2" color="error">
                Array length: {recommendations.length}
              </Typography>
            </Box>
            <Box
              sx={(theme) => ({
                p: 2.5,
                borderRadius: 2.5,
                bgcolor: "rgba(15, 23, 42, 0.96)",
                border: `1px dashed ${theme.palette.primary.main}33`,
                boxShadow:
                  "0 18px 40px rgba(15, 23, 42, 0.9), 0 0 0 1px rgba(15, 23, 42, 0.9)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: "-40% -40% auto",
                  background:
                    "radial-gradient(circle at top, rgba(74, 222, 128, 0.16), transparent 60%)",
                  opacity: 0.9,
                  pointerEvents: "none"
                }
              })}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: 1.5
                }}
              >
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    bgcolor: "rgba(15, 23, 42, 0.9)",
                    border: (theme) =>
                      `1px solid ${theme.palette.primary.main}66`,
                    boxShadow:
                      "0 0 0 1px rgba(15, 23, 42, 0.9), 0 0 30px rgba(74, 222, 128, 0.45)",
                    animation: "sfAiGlowPulse 2200ms ease-in-out infinite",
                    "@keyframes sfAiGlowPulse": {
                      "0%": {
                        transform: "scale(1)",
                        boxShadow:
                          "0 0 0 1px rgba(15, 23, 42, 0.9), 0 0 18px rgba(74, 222, 128, 0.4)"
                      },
                      "50%": {
                        transform: "scale(1.04)",
                        boxShadow:
                          "0 0 0 1px rgba(34, 197, 94, 0.7), 0 0 30px rgba(74, 222, 128, 0.8)"
                      },
                      "100%": {
                        transform: "scale(1)",
                        boxShadow:
                          "0 0 0 1px rgba(15, 23, 42, 0.9), 0 0 18px rgba(74, 222, 128, 0.4)"
                      }
                    }
                  }}
                >
                  <LightbulbOutlinedIcon
                    fontSize="medium"
                    sx={{
                      color: "primary.light"
                    }}
                  />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
                  <Typography variant="subtitle1">
                    No AI recommendations just yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    As SpaceFlow observes more workspace activity across bookings,
                    room usage, and access patterns, advisory suggestions will
                    begin to appear here to help you fine-tune your space usage.
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    These insights are optional, advisory-only, and are not a
                    substitute for your own judgment.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </>
        )}

        {!loading &&
          hasRecommendations &&
          recommendations.map((rec) => (
            <Box
              key={rec.id}
              sx={(theme) => ({
                p: 2.1,
                borderRadius: 2.5,
                bgcolor: "rgba(15, 23, 42, 0.92)",
                border: `1px solid ${theme.palette.divider}`,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                transition: theme.transitions.create(
                  ["box-shadow", "transform", "border-color"],
                  {
                    duration: theme.transitions.duration.short
                  }
                ),
                "&:hover": {
                  boxShadow:
                    "0 0 0 1px rgba(74, 222, 128, 0.6), 0 14px 30px rgba(15, 23, 42, 0.95)",
                  transform: "translateY(-2px)",
                  borderColor: theme.palette.primary.light
                }
              })}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 1
                }}
              >
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600 }}
                  >
                    {rec.title}
                  </Typography>
                  {rec.category && (
                    <Chip
                      label={rec.category}
                      size="small"
                      sx={{ mt: 0.5 }}
                    />
                  )}
                </Box>
                {rec.impactLevel && (
                  <Chip
                    label={rec.impactLevel}
                    size="small"
                    color={
                      rec.impactLevel.toLowerCase() === "high"
                        ? "error"
                        : rec.impactLevel.toLowerCase() === "medium"
                        ? "warning"
                        : "default"
                    }
                    sx={{ ml: 1, textTransform: "capitalize" }}
                  />
                )}
              </Box>

              <Box sx={{ mt: 0.5 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mb: 0.5 }}
                >
                  Confidence
                </Typography>
                {typeof rec.confidencePercent === "number" ? (
                  <Box
                    sx={(theme) => ({
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.5,
                      "& .MuiLinearProgress-root": {
                        bgcolor: theme.palette.action.hover
                      },
                      "& .MuiLinearProgress-bar": {
                        transition: theme.transitions.create(
                          "background-color",
                          {
                            duration: theme.transitions.duration.shorter
                          }
                        )
                      }
                    })}
                  >
                    <LinearProgress
                      variant="determinate"
                      // The backend is expected to send a 0–100 value. We use
                      // it directly for the bar and only apply visual
                      // thresholds for coloring.
                      value={rec.confidencePercent}
                      color={getConfidenceColor(rec.confidencePercent)}
                      sx={{
                        height: 6,
                        borderRadius: 3
                      }}
                      aria-label="Recommendation confidence"
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: 0.25,
                        mt: 0.25
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 600,
                          letterSpacing: "0.04em",
                          textTransform: "uppercase"
                        }}
                      >
                        {getConfidenceLabel(rec.confidencePercent)} confidence
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {getConfidenceCaption(rec.confidencePercent)}
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Typography variant="caption" color="text.disabled">
                    No confidence score provided.
                  </Typography>
                )}
              </Box>

              <Box
                sx={{
                  mt: 1,
                  pt: 1.5,
                  borderTop: (theme) =>
                    `1px solid ${theme.palette.divider}33`
                }}
                role="region"
                aria-label="Recommendation context"
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  component="h3"
                  sx={{
                    display: "block",
                    fontWeight: 500,
                    mb: 0.5,
                    fontSize: { xs: "0.6875rem", sm: "0.7rem" },
                    letterSpacing: "0.02em",
                    textTransform: "uppercase"
                  }}
                >
                  Based on
                </Typography>
                {rec.primaryReasons && rec.primaryReasons.length > 0 ? (
                  <Box
                    component="ul"
                    sx={{
                      m: 0,
                      pl: { xs: 1.75, sm: 2 },
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.5,
                      listStyleType: "disc"
                    }}
                    aria-label="High-level patterns used for this recommendation"
                  >
                    {rec.primaryReasons.map((reason, idx) => (
                      <Box
                        key={idx}
                        component="li"
                        sx={{
                          fontSize: { xs: "0.75rem", sm: "0.8125rem" },
                          lineHeight: { xs: 1.4, sm: 1.5 },
                          color: "text.secondary",
                          wordBreak: "break-word",
                          "&::marker": {
                            color: "primary.light",
                            opacity: 0.6
                          }
                        }}
                      >
                        {reason}
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: "0.75rem", sm: "0.8rem" }
                    }}
                  >
                    {recommendationsContext?.timeRangeLabel
                      ? `Aggregated workspace patterns over ${recommendationsContext.timeRangeLabel}.`
                      : "Aggregated workspace patterns over recent activity in this context."}
                  </Typography>
                )}
                <Typography
                  variant="caption"
                  color="text.disabled"
                  sx={{
                    display: "block",
                    mt: 0.75,
                    fontSize: { xs: "0.625rem", sm: "0.6875rem" },
                    fontStyle: "italic"
                  }}
                  role="note"
                  aria-label="Advisory notice"
                >
                  Traceable to high-level, aggregated behaviour only — not raw events or individual people.
                </Typography>
              </Box>

              {(() => {
                const suggested = getSuggestedAction(rec);
                if (!suggested) {
                  return null;
                }

                return (
                  <Box sx={{ mt: 1 }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block", fontWeight: 500, mb: 0.25 }}
                    >
                      Suggested action (advisory, UI-only)
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {suggested}
                    </Typography>
                  </Box>
                );
              })()}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 1
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  Generated by SpaceFlow AI Engine
                </Typography>
                <Button
                  size="small"
                  variant="text"
                  onClick={() => handleOpenExplanation(rec)}
                >
                  Why this?
                </Button>
              </Box>
            </Box>
          ))}
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleCloseDrawer}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: 400 },
            maxWidth: "100%",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2
          }
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-recommendation-explanation-title"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography
              id="ai-recommendation-explanation-title"
              variant="h6"
            >
              Why this recommendation?
            </Typography>
            {activeRecommendation && (
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ wordBreak: "break-word" }}
              >
                {activeRecommendation.title}
              </Typography>
            )}
          </Box>
          <IconButton
            edge="end"
            onClick={handleCloseDrawer}
            aria-label="Close explanation panel"
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {explanationLoading && (
          <Box sx={{ mt: 1 }}>
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="rectangular" height={80} sx={{ mt: 2 }} />
          </Box>
        )}

        {!explanationLoading && explanationError && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" color="error" gutterBottom>
              {explanationError}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please close and reopen the panel to try again.
            </Typography>
          </Box>
        )}

        {!explanationLoading && !explanationError && explanation && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 1
            }}
          >
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Summary
              </Typography>
              <Typography variant="body2">
                {explanation.summary}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Contributing signals
              </Typography>
              {explanation.contributingSignals.length === 0 ? (
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  No contributing signals were provided.
                </Typography>
              ) : (
                <Box
                  component="ul"
                  sx={{
                    pl: 3,
                    m: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5
                  }}
                >
                  {explanation.contributingSignals.map((signal, idx) => (
                    <Box
                      key={idx}
                      component="li"
                      sx={{ fontSize: 14, lineHeight: 1.4 }}
                    >
                      {signal}
                    </Box>
                  ))}
                </Box>
              )}
            </Box>

            {explanation.confidenceNotes && (
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Confidence notes
                </Typography>
                <Typography variant="body2">
                  {explanation.confidenceNotes}
                </Typography>
              </Box>
            )}

            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block" }}
              >
                These insights are advisory and are not a substitute for your
                own judgment.
              </Typography>
            </Box>
          </Box>
        )}
      </Drawer>
    </Box>
  );
};


