import { Button, ButtonProps } from "@mui/material";
import { useNavigate } from "react-router-dom";

type PrimaryButtonProps = ButtonProps & {
  to?: string;
};

export const PrimaryButton = ({ to, onClick, children, ...props }: PrimaryButtonProps) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (to) {
      navigate(to);
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Button
      variant="contained"
      onClick={handleClick}
      sx={{
        py: 1.75,
        px: 4,
        borderRadius: 999,
        fontSize: "1rem",
        fontWeight: 600,
        letterSpacing: "0.03em",
        background: "linear-gradient(135deg, #22C55E 0%, #4ADE80 50%, #06B6D4 100%)",
        color: "#020617",
        boxShadow: "0 0 0 1px rgba(74, 222, 128, 0.5), 0 8px 24px rgba(34, 197, 94, 0.35), 0 0 40px rgba(74, 222, 128, 0.15)",
        transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, transparent 50%, transparent 100%)",
          opacity: 0,
          transition: "opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          transform: "translateX(-100%)"
        },
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 0 0 1px rgba(74, 222, 128, 0.65), 0 12px 36px rgba(34, 197, 94, 0.45), 0 0 60px rgba(74, 222, 128, 0.25)",
          "&::before": {
            opacity: 1,
            transform: "translateX(100%)"
          }
        },
        "&:active": {
          transform: "translateY(0px) scale(0.98)",
          transition: "transform 0.12s cubic-bezier(0.22, 1, 0.36, 1)"
        }
      }}
      {...props}
    >
      {children}
    </Button>
  );
};



