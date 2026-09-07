export default function Leaderboard({ vm }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28, alignItems: "center" }}>
      <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em", textAlign: "center" }}>Leaderboard</div>

      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", paddingTop: 8 }}>
        {vm.podium.map((p) => (
          <div key={p.rank} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, order: p.order }}>
            {p.crown && <div style={{ fontSize: 16, marginBottom: -6 }}>👑</div>}
            <div style={{ width: p.size, height: p.size, borderRadius: 16, background: p.tint, display: "flex", alignItems: "center", justifyContent: "center", fontSize: p.emoji }}>{p.avatar}</div>
            <div style={{ fontSize: p.nameSize, fontWeight: p.nameWeight, color: p.nameColor }}>{p.name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 700, background: "var(--card2)", border: "1px solid var(--bd2)", borderRadius: 999, padding: "5px 12px" }}><span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--acc)" }} />{p.score}</div>
            <div style={{ width: p.barW, height: p.barH, background: p.barBg, borderRadius: p.barRadius, display: "flex", alignItems: "center", justifyContent: "center", fontSize: p.numSize, fontWeight: 800, color: "#fff", marginTop: 10 }}>{p.rank}</div>
          </div>
        ))}
      </div>

      <div style={{ width: "100%", maxWidth: 680, background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 18, padding: "22px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="var(--vio)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 6.5h15v13h-15zM4.5 10.5h15M9 4v4M15 4v4" /></svg>
            <span style={{ fontSize: 14.5, fontWeight: 700 }}>{vm.lbTitle}</span>
          </div>
          <div style={{ display: "flex", background: "var(--inset)", border: "1px solid var(--bd)", borderRadius: 10, padding: 4, gap: 2 }}>
            {vm.lbTabs.map((t) => (
              <div key={t.label} onClick={t.go} style={{ padding: "7px 16px", borderRadius: 8, fontSize: 12.5, fontWeight: 600, cursor: "pointer", color: t.color, background: t.bg }}>{t.label}</div>
            ))}
          </div>
        </div>
        {vm.board.map((p) => (
          <div key={p.name} onClick={p.challenge} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 16px", background: "var(--card2)", border: `1px solid ${p.rowBd}`, borderRadius: 13, marginBottom: 9, cursor: "pointer" }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: "var(--act)", fontSize: 11.5, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--tx2)", flex: "0 0 26px" }}>{p.rank}</div>
            <div style={{ width: 32, height: 32, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, background: p.tint }}>{p.avatar}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{p.name}</div>
              <div style={{ fontSize: 11.5, color: "var(--mut)", marginTop: 2 }}>Battles won: <span style={{ color: "var(--acc)", fontWeight: 600 }}>{p.won}</span> / {p.played}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", borderRadius: 999, padding: "6px 13px", color: p.color, background: p.bg, border: `1px solid ${p.border}` }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: p.color }} />{p.score}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
