import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ROUTE_SCORING = { 1: 1, 2: 2, 3: 4, 4: 7, 5: 10, 6: 15 };

const EDITIONS = {
  "USA (Classic)": {
    longestBonus: 10,
    color: "#C0392B",
    accent: "#E74C3C",
  },
  Europe: {
    longestBonus: 10,
    color: "#1A5276",
    accent: "#2E86C1",
  },
};

const PLAYER_COLORS = [
  { name: "Red", bg: "#C0392B", text: "#fff", light: "#FADBD8" },
  { name: "Blue", bg: "#1A5276", text: "#fff", light: "#D6EAF8" },
  { name: "Green", bg: "#1E8449", text: "#fff", light: "#D5F5E3" },
  { name: "Yellow", bg: "#B7950B", text: "#fff", light: "#FCF3CF" },
  { name: "Black", bg: "#212121", text: "#fff", light: "#E0E0E0" },
];

const TRAIN_LENGTHS = [1, 2, 3, 4, 5, 6];

const initialPlayer = (index) => ({
  name: `Player ${index + 1}`,
  color: PLAYER_COLORS[index],
  routes: [],
  tickets: [],
  longestRoute: false,
});

function RouteEntry({ onAdd, totalTrains, playerColor }) {
  const [flash, setFlash] = useState(null);

  const handleClick = (l) => {
    onAdd(l);
    setFlash(l);
    setTimeout(() => setFlash(null), 350);
  };

  return (
    <div style={{ marginTop: 8 }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 8,
      }}>
        {TRAIN_LENGTHS.map((l) => {
          const isFlashing = flash === l;
          return (
            <button
              key={l}
              onPointerDown={() => handleClick(l)}
              style={{
                padding: "14px 8px",
                borderRadius: 12,
                border: `3px solid ${isFlashing ? playerColor : "#333"}`,
                background: isFlashing ? playerColor : "#fff",
                color: isFlashing ? "#fff" : "#333",
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: 20,
                cursor: "pointer",
                transition: "background 0.15s, color 0.15s, border-color 0.15s, transform 0.1s",
                boxShadow: isFlashing ? `0 0 0 3px ${playerColor}44, 3px 3px 0 #333` : "3px 3px 0 #333",
                transform: isFlashing ? "scale(0.95)" : "scale(1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                userSelect: "none",
                WebkitUserSelect: "none",
              }}
            >
              <span>{l} 🚂</span>
              <span style={{ fontSize: 13, fontWeight: 700, opacity: isFlashing ? 1 : 0.6 }}>+{ROUTE_SCORING[l]} pts</span>
            </button>
          );
        })}
      </div>
      {/* Train counter */}
      <div style={{
        marginTop: 10,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 14px",
        borderRadius: 10,
        background: totalTrains > 45 ? "#FADBD8" : "#F4F4F4",
        border: `2px solid ${totalTrains > 45 ? "#C0392B" : "#ccc"}`,
      }}>
        <span style={{ fontSize: 18 }}>🚂</span>
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: 15,
          color: totalTrains > 45 ? "#C0392B" : "#333",
        }}>
          Trains used: <strong>{totalTrains}</strong>
          <span style={{ fontWeight: 400, fontSize: 13, opacity: 0.6, marginLeft: 6 }}>/ 45 max</span>
        </span>
        {totalTrains > 45 && <span style={{ marginLeft: "auto", fontSize: 13, color: "#C0392B", fontWeight: 700 }}>⚠️ Over limit!</span>}
      </div>
    </div>
  );
}

function TicketEntry({ onAdd }) {
  const [val, setVal] = useState("");
  const [completed, setCompleted] = useState(true);

  const submit = () => {
    const pts = parseInt(val);
    if (!isNaN(pts) && pts > 0) {
      onAdd({ pts, completed });
      setVal("");
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
      <input
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        min="1"
        placeholder="Ticket pts"
        value={val}
        onChange={e => setVal(e.target.value)}
        onKeyDown={e => e.key === "Enter" && submit()}
        style={{
          width: 100,
          padding: "6px 10px",
          borderRadius: 8,
          border: "2px solid #333",
          fontFamily: "'Playfair Display', serif",
          fontSize: 15,
          boxShadow: "2px 2px 0 #333",
          outline: "none",
        }}
      />
      <button
        onClick={() => setCompleted(c => !c)}
        style={{
          padding: "6px 14px",
          borderRadius: 8,
          border: `2px solid ${completed ? "#1E8449" : "#C0392B"}`,
          background: completed ? "#1E8449" : "#C0392B",
          color: "#fff",
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: 14,
          cursor: "pointer",
          boxShadow: `2px 2px 0 ${completed ? "#145a32" : "#922b21"}`,
          transition: "all 0.2s",
          minWidth: 90,
        }}
      >{completed ? "✓ Done" : "✗ Failed"}</button>
      <button
        onClick={submit}
        style={{
          padding: "6px 16px",
          borderRadius: 8,
          border: "2px solid #333",
          background: "#333",
          color: "#fff",
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: 14,
          cursor: "pointer",
          boxShadow: "2px 2px 0 #555",
        }}
      >
        Add
      </button>
    </div>
  );
}

function calcScore(player) {
  const routeScore = player.routes.reduce((s, r) => s + ROUTE_SCORING[r], 0);
  const ticketScore = player.tickets.reduce((s, t) => s + (t.completed ? t.pts : -t.pts), 0);
  const longestBonus = player.longestRoute ? 10 : 0;
  return { routeScore, ticketScore, longestBonus, total: routeScore + ticketScore + longestBonus };
}

export default function TicketToRide() {
  const navigate = useNavigate();
  const [edition, setEdition] = useState("USA (Classic)");
  const [numPlayers, setNumPlayers] = useState(3);
  const [players, setPlayers] = useState(() => Array.from({ length: 3 }, (_, i) => initialPlayer(i)));
  const [phase, setPhase] = useState("setup"); // setup | scoring | results
  const [activePlayer, setActivePlayer] = useState(0);
  const [showPlayerSettings, setShowPlayerSettings] = useState(false);
  const [editingNameIdx, setEditingNameIdx] = useState(null);

  const editionConfig = EDITIONS[edition];

  const updatePlayers = (count) => {
    setNumPlayers(count);
    setPlayers(Array.from({ length: count }, (_, i) => players[i] || initialPlayer(i)));
  };

  const updatePlayerName = (i, name) => {
    const p = [...players];
    p[i] = { ...p[i], name };
    setPlayers(p);
  };

  const addRoute = (playerIdx, len) => {
    const p = [...players];
    p[playerIdx] = { ...p[playerIdx], routes: [...p[playerIdx].routes, len] };
    setPlayers(p);
  };

  const addTicket = (playerIdx, ticket) => {
    const p = [...players];
    p[playerIdx] = { ...p[playerIdx], tickets: [...p[playerIdx].tickets, ticket] };
    setPlayers(p);
  };

  const removeRoute = (playerIdx, routeIdx) => {
    const p = [...players];
    const routes = [...p[playerIdx].routes];
    routes.splice(routeIdx, 1);
    p[playerIdx] = { ...p[playerIdx], routes };
    setPlayers(p);
  };

  const removeTicket = (playerIdx, ticketIdx) => {
    const p = [...players];
    const tickets = [...p[playerIdx].tickets];
    tickets.splice(ticketIdx, 1);
    p[playerIdx] = { ...p[playerIdx], tickets };
    setPlayers(p);
  };

  const toggleLongest = (playerIdx) => {
    const p = players.map((pl, i) => ({ ...pl, longestRoute: i === playerIdx ? !pl.longestRoute : false }));
    setPlayers(p);
  };

  const scores = players.map(calcScore);
  const maxScore = Math.max(...scores.map(s => s.total));
  const winners = players.filter((_, i) => scores[i].total === maxScore);

  const cardStyle = (color) => ({
    background: "#fff",
    border: `3px solid ${color.bg}`,
    borderRadius: 16,
    padding: "20px 22px",
    boxShadow: `4px 4px 0 ${color.bg}`,
    marginBottom: 18,
    transition: "all 0.2s",
  });

  const sectionTitle = {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 900,
    fontSize: 13,
    letterSpacing: 2,
    textTransform: "uppercase",
    opacity: 0.55,
    marginBottom: 4,
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F5EFE6",
      backgroundImage: "radial-gradient(circle at 20% 10%, #e8d5b7 0%, transparent 50%), radial-gradient(circle at 80% 90%, #dbb887 0%, transparent 40%)",
      fontFamily: "'Georgia', serif",
      padding: "0 0 60px 0",
    }}>
      {/* Header */}
      <div style={{
        background: editionConfig.color,
        color: "#fff",
        padding: "28px 24px 20px",
        textAlign: "center",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.08,
          backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }} />
        <button
          onClick={() => navigate('/')}
          style={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(255,255,255,0.2)",
            border: "2px solid rgba(255,255,255,0.4)",
            color: "#fff",
            fontSize: 20,
            width: 44,
            height: 44,
            borderRadius: 10,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(255,255,255,0.3)"
            e.target.style.borderColor = "#fff"
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(255,255,255,0.2)"
            e.target.style.borderColor = "rgba(255,255,255,0.4)"
          }}
          title="Back to home"
        >
          ←
        </button>
        <div style={{ fontSize: 13, letterSpacing: 4, opacity: 0.8, textTransform: "uppercase", marginBottom: 6 }}>
          🎟️ Ticket to Ride
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 30,
          fontWeight: 900,
          margin: 0,
          letterSpacing: -0.5,
          textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
        }}>
          Score Tracker
        </h1>
        <div style={{ marginTop: 8, display: "flex", justifyContent: "center", gap: 8 }}>
          {Object.keys(EDITIONS).map(ed => (
            <button key={ed} onClick={() => setEdition(ed)} style={{
              padding: "4px 14px",
              borderRadius: 20,
              border: "2px solid rgba(255,255,255,0.6)",
              background: edition === ed ? "#fff" : "transparent",
              color: edition === ed ? editionConfig.color : "#fff",
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              transition: "all 0.2s",
            }}>{ed}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 16px" }}>

        {/* Setup / Scoring Tabs */}
        {phase === "setup" && (
          <div style={{ paddingTop: 28 }}>
            <div style={sectionTitle}>Number of Players</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              {[2, 3, 4, 5].map(n => (
                <button key={n} onClick={() => updatePlayers(n)} style={{
                  width: 48, height: 48,
                  borderRadius: 12,
                  border: `2px solid ${numPlayers === n ? "#333" : "#ccc"}`,
                  background: numPlayers === n ? "#333" : "#fff",
                  color: numPlayers === n ? "#fff" : "#333",
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 900, fontSize: 20,
                  cursor: "pointer",
                  boxShadow: numPlayers === n ? "3px 3px 0 #555" : "none",
                  transition: "all 0.15s",
                }}>
                  {n}
                </button>
              ))}
            </div>

            <div style={sectionTitle}>Player Names</div>
            {players.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 50,
                  background: p.color.bg, border: "2px solid #333",
                  flexShrink: 0,
                }} />
                <input
                  value={p.name}
                  onChange={e => updatePlayerName(i, e.target.value)}
                  style={{
                    flex: 1,
                    padding: "8px 14px",
                    borderRadius: 10,
                    border: `2px solid ${p.color.bg}`,
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 16,
                    fontWeight: 700,
                    background: "#fff",
                    boxShadow: `3px 3px 0 ${p.color.bg}`,
                    outline: "none",
                  }}
                />
              </div>
            ))}

            <button onClick={() => { setPhase("scoring"); setActivePlayer(0); }} style={{
              marginTop: 20,
              width: "100%",
              padding: "14px",
              borderRadius: 14,
              border: "3px solid #333",
              background: editionConfig.color,
              color: "#fff",
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: 18,
              cursor: "pointer",
              boxShadow: "4px 4px 0 #333",
              letterSpacing: 1,
            }}>
              Start Scoring →
            </button>
          </div>
        )}

        {phase === "scoring" && (
          <div style={{ paddingTop: 24 }}>
            {/* Player selector grid + settings */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 16 }}>
              {/* 3+2 grid of player buttons */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, flex: 1 }}>
                {players.map((p, i) => {
                  const isActive = activePlayer === i;
                  return (
                    <button
                      key={i}
                      onClick={() => { setActivePlayer(i); setShowPlayerSettings(false); }}
                      style={{
                        padding: "9px 6px",
                        borderRadius: 10,
                        border: `2px solid ${p.color.bg}`,
                        background: isActive ? p.color.bg : "#fff",
                        color: isActive ? p.color.text : p.color.bg,
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: "pointer",
                        transition: "all 0.15s",
                        boxShadow: isActive ? `3px 3px 0 ${p.color.bg}88` : "none",
                        textAlign: "center",
                        lineHeight: 1.3,
                      }}
                    >
                      <div>{p.name}</div>
                      <div style={{ fontSize: 11, opacity: 0.75, marginTop: 2 }}>{scores[i].total}pts</div>
                    </button>
                  );
                })}
              </div>
              {/* Settings gear fixed to the right */}
              <button
                onClick={() => setShowPlayerSettings(s => !s)}
                style={{
                  flexShrink: 0,
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  border: `2px solid ${showPlayerSettings ? "#333" : "#ccc"}`,
                  background: showPlayerSettings ? "#333" : "#fff",
                  color: showPlayerSettings ? "#fff" : "#666",
                  fontSize: 16,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  boxShadow: showPlayerSettings ? "2px 2px 0 #555" : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                title="Number of players"
              >⚙️</button>
            </div>

            {/* Inline player count settings */}
            {showPlayerSettings && (
              <div style={{
                background: "#fff",
                border: "3px solid #333",
                borderRadius: 14,
                padding: "14px 16px",
                boxShadow: "4px 4px 0 #333",
                marginBottom: 16,
              }}>
                <div style={{ ...sectionTitle, marginBottom: 10 }}>Number of Players</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {[2, 3, 4, 5].map(n => (
                    <button key={n} onClick={() => { updatePlayers(n); setShowPlayerSettings(false); }} style={{
                      width: 44, height: 44,
                      borderRadius: 10,
                      border: `2px solid ${numPlayers === n ? "#333" : "#ccc"}`,
                      background: numPlayers === n ? "#333" : "#fff",
                      color: numPlayers === n ? "#fff" : "#333",
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 900, fontSize: 18,
                      cursor: "pointer",
                      boxShadow: numPlayers === n ? "3px 3px 0 #555" : "none",
                      transition: "all 0.15s",
                    }}>{n}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Active player panel */}
            {(() => {
              const p = players[activePlayer];
              const score = scores[activePlayer];
              return (
                <div style={cardStyle(p.color)}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: p.color.bg, border: "3px solid #333", flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {editingNameIdx === activePlayer ? (
                        <input
                          autoFocus
                          value={p.name}
                          onChange={e => updatePlayerName(activePlayer, e.target.value)}
                          onBlur={() => setEditingNameIdx(null)}
                          onKeyDown={e => e.key === "Enter" && setEditingNameIdx(null)}
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            fontWeight: 900,
                            fontSize: 20,
                            border: `2px solid ${p.color.bg}`,
                            borderRadius: 8,
                            padding: "2px 8px",
                            outline: "none",
                            width: "100%",
                          }}
                        />
                      ) : (
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 22 }}>{p.name}</div>
                          <button
                            onClick={() => setEditingNameIdx(activePlayer)}
                            style={{
                              background: "none", border: "none", cursor: "pointer",
                              fontSize: 14, opacity: 0.45, padding: "2px 4px",
                              lineHeight: 1, flexShrink: 0,
                            }}
                            title="Edit name"
                          >✏️</button>
                        </div>
                      )}
                      <div style={{ fontSize: 13, opacity: 0.6 }}>Total: <strong>{score.total}</strong> pts</div>
                    </div>
                    <div style={{ display: "flex", gap: 12, fontSize: 13, fontFamily: "'Playfair Display', serif", flexShrink: 0 }}>
                      <span>🛤️ {score.routeScore}</span>
                      <span>🎟️ {score.ticketScore > 0 ? "+" : ""}{score.ticketScore}</span>
                      {p.longestRoute && <span>🏆 +10</span>}
                    </div>
                  </div>

                  {/* Routes */}
                  <div style={sectionTitle}>Route Segments</div>
                  <RouteEntry
                    onAdd={(len) => addRoute(activePlayer, len)}
                    totalTrains={p.routes.reduce((s, r) => s + r, 0)}
                    playerColor={p.color.bg}
                  />
                  {p.routes.length > 0 && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginTop: 10 }}>
                      {p.routes.map((r, ri) => (
                        <span key={ri} onClick={() => removeRoute(activePlayer, ri)} style={{
                          padding: "6px 4px",
                          borderRadius: 10,
                          background: p.color.light,
                          border: `1.5px solid ${p.color.bg}`,
                          fontSize: 13,
                          fontWeight: 700,
                          fontFamily: "'Playfair Display', serif",
                          cursor: "pointer",
                          textAlign: "center",
                          display: "block",
                        }} title="Click to remove">
                          {r}🚂 +{ROUTE_SCORING[r]} ✕
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Tickets */}
                  <div style={{ ...sectionTitle, marginTop: 18 }}>Destination Tickets</div>
                  <TicketEntry onAdd={(t) => addTicket(activePlayer, t)} />
                  {p.tickets.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                      {p.tickets.map((t, ti) => (
                        <span key={ti} onClick={() => removeTicket(activePlayer, ti)} style={{
                          padding: "4px 10px",
                          borderRadius: 20,
                          background: t.completed ? "#D5F5E3" : "#FADBD8",
                          border: `1.5px solid ${t.completed ? "#1E8449" : "#C0392B"}`,
                          fontSize: 13,
                          fontWeight: 700,
                          fontFamily: "'Playfair Display', serif",
                          cursor: "pointer",
                          color: t.completed ? "#1E8449" : "#C0392B",
                        }} title="Click to remove">
                          {t.completed ? "✓" : "✗"} {t.pts}pts ✕
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Longest Route */}
                  <div style={{ ...sectionTitle, marginTop: 18 }}>Longest Route Bonus</div>
                  <button onClick={() => toggleLongest(activePlayer)} style={{
                    marginTop: 8,
                    padding: "8px 18px",
                    borderRadius: 10,
                    border: `2px solid ${p.longestRoute ? "#B7950B" : "#ccc"}`,
                    background: p.longestRoute ? "#FCF3CF" : "#fff",
                    color: p.longestRoute ? "#7D6608" : "#888",
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    boxShadow: p.longestRoute ? "2px 2px 0 #B7950B" : "none",
                  }}>
                    🏆 {p.longestRoute ? "Has Longest Route (+10)" : "Claim Longest Route"}
                  </button>
                </div>
              );
            })()}

            {/* Scoreboard summary */}
            <div style={{ marginTop: 10, background: "#fff", border: "3px solid #333", borderRadius: 16, padding: "18px 20px", boxShadow: "4px 4px 0 #333" }}>
              <div style={{ ...sectionTitle, marginBottom: 12 }}>Live Scoreboard</div>
              {[...players.map((p, i) => ({ p, i, score: scores[i] }))].sort((a, b) => b.score.total - a.score.total).map(({ p, i, score }) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: p.color.bg, border: "2px solid #333", flexShrink: 0 }} />
                  <div style={{ flex: 1, fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: "#666", display: "flex", gap: 8 }}>
                    <span>🛤️{score.routeScore}</span>
                    <span>🎟️{score.ticketScore > 0 ? "+" : ""}{score.ticketScore}</span>
                    {p.longestRoute && <span>🏆+10</span>}
                  </div>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 900,
                    fontSize: 20,
                    color: score.total === maxScore ? "#B7950B" : "#333",
                    minWidth: 50,
                    textAlign: "right",
                  }}>
                    {score.total}
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => setPhase("results")} style={{
              marginTop: 18,
              width: "100%",
              padding: "14px",
              borderRadius: 14,
              border: "3px solid #333",
              background: "#B7950B",
              color: "#fff",
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: 18,
              cursor: "pointer",
              boxShadow: "4px 4px 0 #333",
            }}>
              🏆 See Final Results
            </button>
          </div>
        )}

        {phase === "results" && (
          <div style={{ paddingTop: 28 }}>
            <div style={{
              background: "#fff",
              border: "4px solid #B7950B",
              borderRadius: 20,
              padding: "28px 24px",
              textAlign: "center",
              boxShadow: "6px 6px 0 #B7950B",
              marginBottom: 24,
            }}>
              <div style={{ fontSize: 48, marginBottom: 8 }}>🏆</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 26, color: "#7D6608" }}>
                {winners.map(w => w.name).join(" & ")}
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: "#888", marginTop: 4 }}>
                {maxScore} points — Winner{winners.length > 1 ? "s" : ""}!
              </div>
            </div>

            {/* Full breakdown */}
            {[...players.map((p, i) => ({ p, i, score: scores[i] }))].sort((a, b) => b.score.total - a.score.total).map(({ p, i, score }, rank) => (
              <div key={i} style={{ ...cardStyle(p.color), position: "relative" }}>
                <div style={{
                  position: "absolute", top: -14, left: 16,
                  background: rank === 0 ? "#B7950B" : p.color.bg,
                  color: "#fff",
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 900,
                  fontSize: 13,
                  padding: "2px 12px",
                  borderRadius: 20,
                  border: "2px solid #333",
                }}>
                  #{rank + 1}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: p.color.bg, border: "2px solid #333" }} />
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 20 }}>{p.name}</div>
                  <div style={{ marginLeft: "auto", fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 28, color: rank === 0 ? "#B7950B" : "#333" }}>
                    {score.total}
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                  {[
                    { label: "Routes", val: score.routeScore, icon: "🛤️" },
                    { label: "Tickets", val: score.ticketScore, icon: "🎟️" },
                    { label: "Longest", val: score.longestBonus, icon: "🏆" },
                  ].map(({ label, val, icon }) => (
                    <div key={label} style={{
                      background: p.color.light,
                      borderRadius: 10,
                      padding: "10px",
                      textAlign: "center",
                      border: `1.5px solid ${p.color.bg}`,
                    }}>
                      <div style={{ fontSize: 20 }}>{icon}</div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 18, color: val < 0 ? "#C0392B" : "#333" }}>
                        {val > 0 ? "+" : ""}{val}
                      </div>
                      <div style={{ fontSize: 11, opacity: 0.6, fontFamily: "'Playfair Display', serif" }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button onClick={() => { setPhase("setup"); setPlayers(Array.from({ length: numPlayers }, (_, i) => initialPlayer(i))); }} style={{
              marginTop: 12,
              width: "100%",
              padding: "14px",
              borderRadius: 14,
              border: "3px solid #333",
              background: editionConfig.color,
              color: "#fff",
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: 18,
              cursor: "pointer",
              boxShadow: "4px 4px 0 #333",
            }}>
              ↩ New Game
            </button>
            <button onClick={() => setPhase("scoring")} style={{
              marginTop: 10,
              width: "100%",
              padding: "12px",
              borderRadius: 14,
              border: "3px solid #ccc",
              background: "#fff",
              color: "#333",
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: 16,
              cursor: "pointer",
            }}>
              ← Back to Scoring
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
