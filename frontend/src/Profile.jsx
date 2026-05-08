import ProfileMusicCard from "./components/ProfileMusicCard";
import ThemeSwitcher from "./ThemeSwitcher";
import React, { useState, useEffect } from "react";

const API = process.env.REACT_APP_API_URL;

const LEVEL_THRESHOLDS = [
  { level: 1, label: "Rookie",   min: 0,     max: 2000,     color: "#888780", icon: "🥚" },
  { level: 2, label: "Bettor",   min: 2000,  max: 5000,     color: "#3b82f6", icon: "🎯" },
  { level: 3, label: "Hustler",  min: 5000,  max: 10000,    color: "#8b5cf6", icon: "🔥" },
  { level: 4, label: "Sharpie",  min: 10000, max: 20000,    color: "#f97316", icon: "⚡" },
  { level: 5, label: "Legend",   min: 20000, max: 50000,    color: "#eab308", icon: "👑" },
  { level: 6, label: "Immortal", min: 50000, max: Infinity, color: "#e11d48", icon: "💀" },
];

function StatBox({ label, value, color = "#ffd166", sub }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 14,
      padding: "18px 14px",
      textAlign: "center",
      flex: 1,
      minWidth: 0,
    }}>
      <div style={{ fontSize: 22, fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 11, color: "#555", marginTop: 5, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
      {sub && <div style={{ fontSize: 10, color: "#3b82f6", marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

function MiniHistoryRow({ item }) {
  const statusColor = {
    won: "#1D9E75", lost: "#E24B4A", draw: "#888780",
    refund: "#185FA5", refunded: "#185FA5",
    active: "#7F77DD", cancelled: "#888780", settled: "#3C3489",
  }[item.status] || "#BA7517";

  const statusEmoji = {
    won: "🏆", lost: "😢", draw: "🤝",
    refund: "🔄", refunded: "🔄",
    active: "⚡", cancelled: "❌", settled: "✅",
  }[item.status] || "⏳";

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      background: "rgba(255,255,255,0.025)",
      border: "1px solid rgba(255,255,255,0.05)",
      borderLeft: `3px solid ${statusColor}`,
      borderRadius: 10,
      padding: "10px 14px",
      marginBottom: 8,
    }}>
      <span style={{ fontSize: 16 }}>{statusEmoji}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#ddd", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {item.matchLabel}
        </div>
        <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{item.typeEmoji} {item.typeLabel}</div>
      </div>
      <div style={{
        fontSize: 11, fontWeight: 700, color: statusColor,
        background: `${statusColor}18`, padding: "3px 10px",
        borderRadius: 99, flexShrink: 0, border: `1px solid ${statusColor}33`,
      }}>
        {item.status.toUpperCase()}
      </div>
    </div>
  );
}

export default function Profile({ username, points, lockedPoints, allHistory, onNavigate }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [activeTab, setActiveTab] = useState("stats");

  useEffect(() => {
    fetch(`${API}/leaderboard`)
      .then(r => r.json())
      .then(d => d.users && setLeaderboard(d.users))
      .catch(() => {});
  }, []);

  const tier = LEVEL_THRESHOLDS.find(t => points >= t.min && points < t.max) || LEVEL_THRESHOLDS[0];
  const nextTier = LEVEL_THRESHOLDS[tier.level] || null;
  const progressPct = nextTier
    ? Math.min(((points - tier.min) / (nextTier.min - tier.min)) * 100, 100)
    : 100;

  const wins      = allHistory.filter(h => h.status === "won").length;
  const losses    = allHistory.filter(h => h.status === "lost").length;
  const refunds   = allHistory.filter(h => h.status === "refund" || h.status === "refunded").length;
  const pending   = allHistory.filter(h => h.status === "pending" || h.status === "active").length;
  const bets      = allHistory.filter(h => h.type === "bet").length;
  const contests  = allHistory.filter(h => h.type === "contest").length;
  const challenges= allHistory.filter(h => h.type === "challenge").length;
  const f11       = allHistory.filter(h => h.type === "fantasy11").length;
  const winRate   = allHistory.filter(h => h.status !== "pending" && h.status !== "active" && h.status !== "refund" && h.status !== "refunded" && h.status !== "cancelled" && h.status !== "settled").length > 0
    ? Math.round((wins / allHistory.filter(h => ["won","lost","draw"].includes(h.status)).length) * 100)
    : 0;

  const rank = (() => {
    if (!leaderboard.length) return "—";
    const all = [...leaderboard, { name: username, points }]
      .sort((a, b) => b.points - a.points);
    const idx = all.findIndex(p => p.name === username);
    return idx >= 0 ? `#${idx + 1}` : "—";
  })();

  const totalProfit = allHistory.reduce((acc, item) => {
    if (item.status === "won") {
      if (item.type === "bet")       return acc + (Math.floor(item.amount * (item.odds || 2)) - item.amount);
      if (item.type === "contest")   return acc + (item.prize - item.amount);
      if (item.type === "challenge") return acc + item.amount;
    }
    if (item.status === "lost") return acc - item.amount;
    return acc;
  }, 0);

  const initials = username.slice(0, 2).toUpperCase();
  const avatarColor = tier.color;
const isBatman = document.documentElement.getAttribute("data-theme") === "batman";

  const tabs = ["stats", "history", "achievements"];

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 0 120px" }}>

      {/* ── HERO CARD ── */}
      <div style={{
        background: "linear-gradient(135deg, #0d1117 0%, #161b22 60%, #0d1117 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 20,
        padding: "28px 24px 24px",
        marginBottom: 20,
        position: "relative",
        overflow: "hidden",
      }}>
        {/* glow blob */}
        <div style={{
          position: "absolute", top: -60, right: -60, width: 200, height: 200,
          borderRadius: "50%", background: `${avatarColor}18`, pointerEvents: "none",
          filter: "blur(40px)",
        }} />

        {/* accent line at top */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, transparent, ${avatarColor}, transparent)`,
          borderRadius: "20px 20px 0 0",
        }} />

        <div style={{ display: "flex", alignItems: "center", gap: 18, position: "relative" }}>
          {/* Avatar */}
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: `linear-gradient(135deg, ${avatarColor}33, ${avatarColor}11)`,
            border: `2px solid ${avatarColor}66`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 26, fontWeight: 800, color: avatarColor,
            flexShrink: 0, boxShadow: `0 0 24px ${avatarColor}33`,
          }}>
         {isBatman ? "🦇" : initials}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: 4 }}>
              {username}
            </div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: `${avatarColor}22`, border: `1px solid ${avatarColor}44`,
              borderRadius: 99, padding: "3px 12px",
            }}>
              <span style={{ fontSize: 14 }}>{tier.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: avatarColor }}>
                Lvl {tier.level} · {tier.label}
              </span>
            </div>
          </div>

          {/* Rank badge */}
          <div style={{
            textAlign: "center", background: "rgba(255,215,0,0.08)",
            border: "1px solid rgba(255,215,0,0.2)", borderRadius: 12,
            padding: "8px 14px", flexShrink: 0,
          }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#ffd166" }}>{rank}</div>
            <div style={{ fontSize: 9, color: "#666", textTransform: "uppercase", letterSpacing: "0.07em" }}>Rank</div>
          </div>
        </div>

        {/* Balance */}
        <div style={{
          marginTop: 20, padding: "14px 16px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 12,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 3 }}>Balance</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#ffd166", lineHeight: 1 }}>
              {points.toLocaleString()} <span style={{ fontSize: 14, color: "#888", fontWeight: 500 }}>pts</span>
            </div>
          </div>
          {lockedPoints > 0 && (
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, color: "#BA7517", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 3 }}>Locked</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#BA7517" }}>
                🔒 {lockedPoints.toLocaleString()}
              </div>
            </div>
          )}
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 10, color: totalProfit >= 0 ? "#1D9E75" : "#E24B4A", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 3 }}>
              Net P&L
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: totalProfit >= 0 ? "#1D9E75" : "#E24B4A" }}>
              {totalProfit >= 0 ? "+" : ""}{totalProfit.toLocaleString()} pts
            </div>
          </div>
        </div>

        {/* XP Progress */}
        {nextTier && (
          <div style={{ marginTop: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: "#555" }}>{tier.label}</span>
              <span style={{ fontSize: 11, color: avatarColor }}>
                {(nextTier.min - points).toLocaleString()} pts → {nextTier.label} {nextTier.icon}
              </span>
            </div>
            <div style={{ height: 6, background: "rgba(255,255,255,0.07)", borderRadius: 99, overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${progressPct}%`,
                background: `linear-gradient(90deg, ${avatarColor}88, ${avatarColor})`,
                borderRadius: 99, transition: "width 1s ease",
              }} />
            </div>
            <div style={{ fontSize: 10, color: "#444", marginTop: 4, textAlign: "right" }}>
              {Math.round(progressPct)}% to next level
            </div>
          </div>
        )}
      </div>
     <ProfileMusicCard />

{/* ── THEME SWITCHER (mobile-friendly) ── */}
<div style={{
  display: "flex", alignItems: "center", justifyContent: "space-between",
  background: "rgba(255,255,255,0.025)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 14,
  padding: "14px 18px",
  marginBottom: 18,
}}>
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <div style={{
      width: 38, height: 38, borderRadius: "50%",
      background: "rgba(255,255,255,0.06)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 18,
    }}>🎨</div>
    <div>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#e6edf3" }}>Theme</div>
      <div style={{ fontSize: 11, color: "#555", marginTop: 1 }}>Switch app appearance</div>
    </div>
  </div>
  <ThemeSwitcher />
</div>

      {/* ── STATS TAB ── */}
      {activeTab === "stats" && (
        <>
          <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
            <StatBox label="Total" value={allHistory.length} color="#7F77DD" />
            <StatBox label="Wins" value={wins} color="#1D9E75" />
            <StatBox label="Losses" value={losses} color="#E24B4A" />
            <StatBox label="Win Rate" value={`${isNaN(winRate) ? 0 : winRate}%`} color="#ffd166" />
          </div>
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            <StatBox label="Pending" value={pending} color="#BA7517" />
            <StatBox label="Refunds" value={refunds} color="#185FA5" />
          </div>

          {/* Activity Breakdown */}
          <div style={{
            background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 14, padding: "18px 20px", marginBottom: 16,
          }}>
            <div style={{ fontSize: 12, color: "#555", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14 }}>
              Activity Breakdown
            </div>
            {[
              { label: "Solo Bets",   emoji: "🎯", count: bets,       color: "#BA7517" },
              { label: "Contests",    emoji: "🏆", count: contests,   color: "#1D9E75" },
              { label: "Challenges",  emoji: "⚔️", count: challenges, color: "#E24B4A" },
              { label: "Fantasy 11",  emoji: "🏏", count: f11,        color: "#ffd166" },
            ].map(row => (
              <div key={row.label} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}>
                <span style={{ fontSize: 16, width: 24, textAlign: "center" }}>{row.emoji}</span>
                <span style={{ flex: 1, fontSize: 13, color: "#ccc" }}>{row.label}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    height: 4, width: 80, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%",
                      width: allHistory.length ? `${(row.count / allHistory.length) * 100}%` : "0%",
                      background: row.color, borderRadius: 99,
                    }} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: row.color, minWidth: 20, textAlign: "right" }}>
                    {row.count}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => onNavigate("matches")} style={{
              flex: 1, padding: "12px 0", borderRadius: 12, border: "none",
              background: "linear-gradient(135deg,#16a34a,#22c55e)",
              color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer",
            }}>🏏 Bet Now</button>
            <button onClick={() => onNavigate("leaderboard")} style={{
              flex: 1, padding: "12px 0", borderRadius: 12,
              border: "1px solid rgba(255,215,0,0.3)", background: "rgba(255,215,0,0.06)",
              color: "#ffd166", fontWeight: 700, fontSize: 13, cursor: "pointer",
            }}>🏆 Leaderboard</button>
          </div>
        </>
      )}

      {/* ── HISTORY TAB ── */}
      {activeTab === "history" && (
        <div>
          {allHistory.length === 0 ? (
            <div style={{ textAlign: "center", padding: 40, color: "#555" }}>
              No activity yet. Place a bet to get started!
            </div>
          ) : (
            allHistory.slice(0, 20).map(item => (
              <MiniHistoryRow key={`${item.type}-${item._id}`} item={item} />
            ))
          )}
          {allHistory.length > 20 && (
            <div style={{ textAlign: "center", marginTop: 12 }}>
              <button onClick={() => onNavigate("history")} style={{
                padding: "10px 28px", borderRadius: 99, border: "1px solid rgba(255,255,255,0.15)",
                background: "transparent", color: "#888", fontSize: 13, cursor: "pointer",
              }}>
                View all {allHistory.length} entries →
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── ACHIEVEMENTS TAB ── */}
      {activeTab === "achievements" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { icon: "🎯", label: "First Bet",        desc: "Place your first bet",             unlocked: allHistory.some(h => h.type === "bet") },
            { icon: "🏆", label: "First Win",         desc: "Win your first bet",               unlocked: wins >= 1 },
            { icon: "🔥", label: "Hot Streak",        desc: "Win 3 or more bets",               unlocked: wins >= 3 },
            { icon: "👑", label: "Win 10",            desc: "Win 10 bets total",                unlocked: wins >= 10 },
            { icon: "⚔️", label: "Challenger",        desc: "Play a multiplayer challenge",      unlocked: challenges >= 1 },
            { icon: "🏏", label: "Fantasy Fan",       desc: "Submit a Fantasy 11 team",          unlocked: f11 >= 1 },
            { icon: "💰", label: "High Roller",       desc: "Reach 5000 points",                unlocked: points >= 5000 },
            { icon: "💎", label: "Diamond Hands",     desc: "Reach 10,000 points",              unlocked: points >= 10000 },
            { icon: "🏅", label: "Contest King",      desc: "Join 5 contests",                  unlocked: contests >= 5 },
            { icon: "📊", label: "50% Win Rate",      desc: "Maintain ≥50% win rate (5+ bets)", unlocked: allHistory.filter(h=>["won","lost"].includes(h.status)).length >= 5 && winRate >= 50 },
          ].map(badge => (
            <div key={badge.label} style={{
              display: "flex", alignItems: "center", gap: 14,
              background: badge.unlocked ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.015)",
              border: `1px solid ${badge.unlocked ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)"}`,
              borderRadius: 12, padding: "12px 16px",
              opacity: badge.unlocked ? 1 : 0.45,
              transition: "opacity 0.2s",
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: badge.unlocked ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, flexShrink: 0,
                filter: badge.unlocked ? "none" : "grayscale(1)",
              }}>
                {badge.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: badge.unlocked ? "#ddd" : "#444" }}>
                  {badge.label}
                </div>
                <div style={{ fontSize: 12, color: "#555", marginTop: 2 }}>{badge.desc}</div>
              </div>
              {badge.unlocked && (
                <div style={{
                  fontSize: 10, fontWeight: 700, color: "#1D9E75",
                  background: "#1D9E7522", border: "1px solid #1D9E7544",
                  padding: "3px 10px", borderRadius: 99,
                }}>
                  UNLOCKED
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}