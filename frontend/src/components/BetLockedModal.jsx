    import React, { useEffect, useRef } from "react";
    
    // At the top of Bet.jsx

    // ─── Theme Definitions ───────────────────────────────────────────────────────
    export const THEMES = {
    darkgold: {
        id: "darkgold",
        label: "Dark Gold",
        icon: "🔒",
        font: "'Bangers', cursive",
        titleColor: "#f5c842",
        outerBg: "#0d0d0d",
        modalBg: "linear-gradient(145deg,#1a1200,#0d0d0d)",
        border: "2px solid #f5c842",
        glow: "rgba(245,200,66,0.4)",
        prizeColor: "rgba(245,200,66,0.15)",
        prizeText: "#f5c842",
        confettiColors: ["#f5c842", "#fff", "#bfa200", "#ffe066"],
    },
    midnight: {
        id: "midnight",
        label: "Midnight Blue",
        icon: "🌙",
        font: "'Bangers', cursive",
        titleColor: "#60b4ff",
        outerBg: "#020814",
        modalBg: "linear-gradient(145deg,#051530,#020814)",
        border: "2px solid #1e5fa8",
        glow: "rgba(50,120,255,0.4)",
        prizeColor: "rgba(30,95,168,0.3)",
        prizeText: "#60b4ff",
        confettiColors: ["#60b4ff", "#fff", "#1e5fa8", "#a0d4ff"],
    },
    crimson: {
        id: "crimson",
        label: "Crimson Red",
        icon: "🔥",
        font: "'Bangers', cursive",
        titleColor: "#ff3d3d",
        outerBg: "#0d0000",
        modalBg: "linear-gradient(145deg,#200000,#0d0000)",
        border: "2px solid #cc0000",
        glow: "rgba(255,0,0,0.4)",
        prizeColor: "rgba(200,0,0,0.2)",
        prizeText: "#ff6060",
        confettiColors: ["#ff3d3d", "#fff", "#cc0000", "#ff9090"],
    },
    comicbook: {
        id: "comicbook",
        label: "Comic Book",
        icon: "💥",
        font: "'Bangers', cursive",
        titleColor: "#111",
        outerBg: "#fffbe6",
        modalBg: "#fff9d6",
        border: "3px solid #111",
        glow: "rgba(255,220,0,0.5)",
        prizeColor: "rgba(255,220,0,0.35)",
        prizeText: "#111",
        confettiColors: ["#ffdd00", "#ff3d3d", "#00aaff", "#ff80c0"],
        betInfoColor: "#333",
        outerText: "#111",
    },
    batman: {
        id: "batman",
        label: "Batman",
        icon: "🦇",
        font: "'Bangers', cursive",
        titleColor: "#f5c842",
        outerBg: "#050505",
        modalBg: "linear-gradient(145deg,#111,#050505)",
        border: "2px solid #f5c842",
        glow: "rgba(245,200,66,0.35)",
        prizeColor: "rgba(245,200,66,0.1)",
        prizeText: "#f5c842",
        confettiColors: ["#f5c842", "#888", "#fff"],
    },
    spiderverse: {
        id: "spiderverse",
        label: "Spider-Verse",
        icon: "🕷️",
        font: "'Bangers', cursive",
        titleColor: "#e63946",
        outerBg: "#05050f",
        modalBg: "linear-gradient(145deg,#1a0a2e,#05050f)",
        border: "2px solid #e63946",
        glow: "rgba(230,57,70,0.5)",
        prizeColor: "rgba(230,57,70,0.15)",
        prizeText: "#e63946",
        confettiColors: ["#e63946", "#fff", "#a2d2ff", "#ff006e"],
        showWeb: true,
    },
    naruto: {
        id: "naruto",
        label: "Naruto",
        icon: "🍥",
        font: "'Bangers', cursive",
        titleColor: "#ff8c00",
        outerBg: "#060300",
        modalBg: "linear-gradient(145deg,#1a0d00,#060300)",
        border: "2px solid #ff8c00",
        glow: "rgba(255,140,0,0.5)",
        prizeColor: "rgba(255,140,0,0.15)",
        prizeText: "#ff8c00",
        confettiColors: ["#ff8c00", "#fff", "#ffd700", "#ff4500"],
    },
    dragonball: {
        id: "dragonball",
        label: "Dragon Ball",
        icon: "⭐",
        font: "'Bangers', cursive",
        titleColor: "#ffd700",
        outerBg: "#040200",
        modalBg: "linear-gradient(145deg,#1a0e00,#040200)",
        border: "2px solid #ffd700",
        glow: "rgba(255,215,0,0.5)",
        prizeColor: "rgba(255,215,0,0.15)",
        prizeText: "#ffd700",
        confettiColors: ["#ffd700", "#ff8c00", "#fff", "#ff4500"],
    },
    ghost: {
        id: "ghost",
        label: "Ghost",
        icon: "👻",
        font: "'Creepster', cursive",
        titleColor: "#b0e0ff",
        outerBg: "#040610",
        modalBg: "linear-gradient(145deg,#0a1020,#040610)",
        border: "2px solid #4080cc",
        glow: "rgba(100,160,255,0.4)",
        prizeColor: "rgba(100,160,255,0.1)",
        prizeText: "#b0e0ff",
        confettiColors: ["#b0e0ff", "#ffffff", "#8080ff", "#e0e0ff"],
    },
    pirates: {
        id: "pirates",
        label: "Pirates",
        icon: "☠️",
        font: "'Pirata One', cursive",
        titleColor: "#f5d060",
        outerBg: "#080400",
        modalBg: "linear-gradient(145deg,#1a1000,#080400)",
        border: "2px solid #8B4513",
        glow: "rgba(139,69,19,0.6)",
        prizeColor: "rgba(139,69,19,0.25)",
        prizeText: "#f5d060",
        confettiColors: ["#f5d060", "#8B4513", "#fff", "#cd853f"],
        showSkull: true,
    },

   friends: {
    id: "friends",
    label: "Friends",
    icon: "☕",
    font: "'Playfair Display', cursive",
    titleColor: "#f5c842",
    outerBg: "#1a0e05",
    modalBg: "linear-gradient(160deg,#2a1506,#1a0e05)",
    border: "2px solid #c8860a",
    glow: "rgba(200,134,10,0.4)",
    prizeColor: "rgba(200,134,10,0.15)",
    prizeText: "#f5c842",
    confettiColors: ["#e63946","#f5c842","#3b82f6","#22c55e","#f97316","#a855f7"],
    tagline: `"How you doin'?" — Joey`,
    showFriendsDots: true,
  },   // ← comma here
};     // ← this closes THEMES

// ─── Confetti Component ───────────────────────────────────────────────────────
function Confetti({ colors }) {
  const dots = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    color: colors[Math.floor(Math.random() * colors.length)],
    duration: `${1.5 + Math.random() * 2.5}s`,
    delay: `${Math.random() * 3}s`,
    size: `${5 + Math.random() * 7}px`,
    isCircle: Math.random() > 0.5,
  }));

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      <style>{`
        @keyframes betFall {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(340px) rotate(360deg); opacity: 0; }
        }
      `}</style>
      {dots.map((d) => (
        <div
          key={d.id}
          style={{
            position: "absolute",
            top: "-10px",
            left: d.left,
            width: d.size,
            height: d.size,
            background: d.color,
            borderRadius: d.isCircle ? "50%" : "2px",
            animation: `betFall ${d.duration} ${d.delay} linear infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Web SVG Overlay (Spider-Verse) ──────────────────────────────────────────
function WebOverlay() {
  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      viewBox="0 0 400 340"
    >
      <g stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" fill="none">
        {/* Top-left web */}
        <line x1="0" y1="0" x2="80" y2="80" />
        <line x1="0" y1="0" x2="0" y2="100" />
        <line x1="0" y1="0" x2="100" y2="0" />
        <path d="M20,0 Q10,10 0,20" />
        <path d="M40,0 Q20,20 0,40" />
        <path d="M65,0 Q35,30 0,65" />
        <path d="M90,0 Q50,40 0,90" />
        {/* Top-right web */}
        <line x1="400" y1="0" x2="320" y2="80" />
        <line x1="400" y1="0" x2="400" y2="100" />
        <line x1="400" y1="0" x2="300" y2="0" />
        <path d="M380,0 Q390,10 400,20" />
        <path d="M360,0 Q380,20 400,40" />
        <path d="M335,0 Q365,30 400,65" />
      </g>
    </svg>
  );
}

// ─── Main BetLockedModal Component ───────────────────────────────────────────
/**
 * BetLockedModal
 *
 * Props:
 *  - isOpen       {boolean}  — controls visibility
 *  - onClose      {function} — called when user dismisses
 *  - themeId      {string}   — key from THEMES object (default: "spiderverse")
 *  - betAmount    {number}   — pts wagered
 *  - teamName     {string}   — team bet on (e.g. "LSG")
 *  - matchLabel   {string}   — match description (e.g. "LSG vs CSK")
 *  - potentialWin {number}   — potential winnings in pts
 *  - odds         {string}   — odds string (e.g. "2.19x")
 */
export default function BetLockedModal({
  isOpen,
  onClose,
  themeId = "spiderverse",
  betAmount = 250,
  teamName = "LSG",
  matchLabel = "LSG vs CSK",
  potentialWin = 547,
  odds = "2.19x",
}) {
  const theme = THEMES[themeId] || THEMES.spiderverse;
  const overlayRef = useRef(null);

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === overlayRef.current) onClose?.();
  };

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === "Escape") onClose?.(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Google Fonts for themed typography */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Pirata+One&family=Creepster&display=swap');

        @keyframes iconBounce {
          from { transform: translateY(0) scale(1); }
          to   { transform: translateY(-10px) scale(1.08); }
        }

        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.85) translateY(24px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      {/* Backdrop */}
      <div
        ref={overlayRef}
        onClick={handleBackdropClick}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.75)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          padding: "16px",
        }}
      >
        {/* Modal Card */}
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            borderRadius: "22px",
            padding: "36px 28px 32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
            background: theme.modalBg,
            border: theme.border,
            boxShadow: `0 0 50px ${theme.glow}, inset 0 0 40px ${theme.glow.replace(/[\d.]+\)$/, "0.04)")}`,
            animation: "modalIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
          }}
        >
          {/* Confetti */}
          <Confetti colors={theme.confettiColors} />

          {/* Spider-Verse web overlay */}
          {theme.showWeb && <WebOverlay />}

          {/* Pirates skull background */}
          {theme.showSkull && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <span style={{ fontSize: "180px", opacity: 0.05, lineHeight: 1 }}>☠️</span>
            </div>
          )}

          {/* Icon */}
          <div
            style={{
              fontSize: "72px",
              marginBottom: "16px",
              lineHeight: 1,
              position: "relative",
              zIndex: 2,
              animation: "iconBounce 1s ease infinite alternate",
              filter: `drop-shadow(0 4px 16px ${theme.glow})`,
            }}
          >
            {theme.icon}
          </div>

          {/* Title */}
          <div
            style={{
              fontFamily: theme.font,
              fontSize: "42px",
              letterSpacing: "3px",
              color: theme.titleColor,
              textShadow: `2px 2px 0 #000, 0 0 20px ${theme.glow}`,
              marginBottom: "8px",
              textAlign: "center",
              position: "relative",
              zIndex: 2,
            }}
          >
            BET LOCKED!
          </div>

          {/* Bet info */}
          <div
            style={{
              fontSize: "14px",
              color: theme.betInfoColor || "rgba(255,255,255,0.65)",
              marginBottom: "16px",
              textAlign: "center",
              position: "relative",
              zIndex: 2,
            }}
          >
            {betAmount} pts on {teamName} · {matchLabel}
          </div>

          {/* Prize row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "17px",
              fontWeight: 700,
              padding: "10px 22px",
              borderRadius: "12px",
              background: theme.prizeColor,
              color: theme.prizeText,
              border: `1px solid ${theme.titleColor}44`,
              position: "relative",
              zIndex: 2,
            }}
          >
            🏆 Potential win: {potentialWin} pts ({odds} odds)
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              marginTop: "20px",
              padding: "8px 28px",
              borderRadius: "999px",
              border: `1.5px solid ${theme.titleColor}66`,
              background: "transparent",
              color: theme.titleColor,
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              position: "relative",
              zIndex: 2,
              letterSpacing: "0.5px",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.background = `${theme.titleColor}22`)}
            onMouseLeave={(e) => (e.target.style.background = "transparent")}
          >
            CLOSE
          </button>
        </div>
      </div>
    </>
  );
}