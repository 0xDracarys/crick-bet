import { useState, useEffect } from "react";
import { TRACKS } from "./ThemeMusicPlayer";

const LS_ENABLED = "fb-music-enabled";
const LS_VOLUME  = "fb-music-volume";
const LS_TRACK   = "fb-music-track";

export default function ProfileMusicCard() {
  const [enabled,     setEnabled]     = useState(localStorage.getItem(LS_ENABLED) !== "false");
  const [volume,      setVolume]      = useState(() => { const v = parseFloat(localStorage.getItem(LS_VOLUME)); return isNaN(v) ? 0.7 : v; });
  const [activeTrack, setActiveTrack] = useState(() => TRACKS.find(t => t.id === (localStorage.getItem(LS_TRACK) || "track1")) || TRACKS[0]);

  const toggleEnabled = () => {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem(LS_ENABLED, next ? "true" : "false");
  };

  const handleVolume = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    localStorage.setItem(LS_VOLUME, v);
  };

  const handleTrack = (track) => {
    setActiveTrack(track);
    localStorage.setItem(LS_TRACK, track.id);
  };

  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 16,
      padding: "18px 20px",
      marginBottom: 20,
    }}>
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 20 }}>🎵</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#e6edf3" }}>Background music</div>
            <div style={{ fontSize: 12, color: "#7d8590", marginTop: 2 }}>
              {enabled ? `Playing: ${activeTrack.name}` : "Music is off"}
            </div>
          </div>
        </div>

        {/* Toggle */}
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", userSelect: "none" }}>
          <span style={{ fontSize: 12, color: enabled ? "#22c55e" : "#7d8590", fontWeight: 600 }}>
            {enabled ? "ON" : "OFF"}
          </span>
          <div
            onClick={toggleEnabled}
            style={{
              width: 44, height: 24, borderRadius: 99, position: "relative", cursor: "pointer",
              background: enabled ? "#16a34a" : "rgba(255,255,255,0.1)",
              border: `1px solid ${enabled ? "#22c55e55" : "rgba(255,255,255,0.15)"}`,
              transition: "background 0.2s, border-color 0.2s",
            }}
          >
            <div style={{
              position: "absolute", top: 3, left: enabled ? 23 : 3,
              width: 16, height: 16, borderRadius: "50%",
              background: "#fff",
              transition: "left 0.2s",
              boxShadow: "0 1px 4px rgba(0,0,0,0.4)",
            }} />
          </div>
        </label>
      </div>

      {enabled && (
        <>
          {/* Volume row */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 14, minWidth: 20 }}>
              {volume === 0 ? "🔇" : volume < 0.4 ? "🔉" : "🔊"}
            </span>
            <span style={{ fontSize: 12, color: "#7d8590", minWidth: 52 }}>Volume</span>
            <input
              type="range" min={0} max={1} step={0.01}
              value={volume}
              onChange={handleVolume}
              style={{ flex: 1, accentColor: activeTrack.accentColor, cursor: "pointer" }}
            />
            <span style={{ fontSize: 12, color: "#7d8590", minWidth: 34, textAlign: "right" }}>
              {Math.round(volume * 100)}%
            </span>
          </div>

          {/* Divider */}
          <div style={{ height: "0.5px", background: "rgba(255,255,255,0.07)", marginBottom: 14 }} />

          {/* Track picker */}
          <div style={{ fontSize: 11, color: "#7d8590", textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 600, marginBottom: 10 }}>
            Choose track
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 8 }}>
            {TRACKS.map(track => {
              const active = track.id === activeTrack.id;
              return (
                <button
                  key={track.id}
                  onClick={() => handleTrack(track)}
                  style={{
                    background: active ? `${track.accentColor}20` : "rgba(255,255,255,0.03)",
                    border: active ? `1px solid ${track.accentColor}66` : "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 12, padding: "10px 14px",
                    cursor: "pointer", textAlign: "left",
                    display: "flex", flexDirection: "column", gap: 4,
                    transition: "all 0.15s",
                  }}
                >
                  <span style={{ fontSize: 20 }}>{track.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: active ? track.accentColor : "#e6edf3" }}>
                    {track.name}
                  </span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{track.vibe}</span>
                  {active && (
                    <span style={{
                      fontSize: 10, fontWeight: 700, color: track.accentColor,
                      background: `${track.accentColor}18`,
                      padding: "2px 8px", borderRadius: 99,
                      alignSelf: "flex-start", marginTop: 2,
                    }}>
                      ♪ Playing
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}

      {!enabled && (
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "12px 14px", borderRadius: 10,
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}>
          <span style={{ fontSize: 28 }}>🔇</span>
          <div>
            <div style={{ fontSize: 13, color: "#7d8590" }}>Music is turned off</div>
            <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>Toggle the switch above to bring the vibe back</div>
          </div>
        </div>
      )}
    </div>
  );
}