import Hoverable from "../Hoverable";

export default function Podium({ vm }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 34, alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 12, maxWidth: 560 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 999, padding: "7px 14px" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--acc)" }} />
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--acc)" }}>Season 04 · open division</span>
        </div>
        <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>Podium</div>
        <div style={{ fontSize: 15, lineHeight: 1.6, color: "var(--mut)", textWrap: "pretty" }}>Ranked by rounds won and the grader's average across uniqueness, creativity, clarity, depth and relevance.</div>
      </div>

      <div style={{ width: "100%", maxWidth: 860, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, alignItems: "end" }}>
        {vm.podiumCards.map((p) => (
          <div key={p.place} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginTop: p.lift }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, fontWeight: 700, borderRadius: 999, padding: "5px 11px", background: "var(--inset)", border: "1px solid var(--bd)", color: p.tone }}>{p.label}</span>
            <div style={{ position: "relative" }}>
              <div style={{ width: p.size, height: p.size, borderRadius: 22, background: p.tint, display: "flex", alignItems: "center", justifyContent: "center", fontSize: p.face, boxShadow: "0 20px 40px var(--shadow)" }}>{p.avatar}</div>
              <span style={{ position: "absolute", right: -8, bottom: -8, width: 30, height: 30, borderRadius: "50%", background: p.tone, color: "var(--bg)", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{p.place}</span>
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, textAlign: "center" }}>{p.name}</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--mut)" }}>{p.meta}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, background: "var(--inset)", border: "1px solid var(--bd)", borderRadius: 999, padding: "6px 13px" }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 700, color: p.tone }}>{p.pts}</span>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--faint)" }}>pts</span>
            </div>
            <div style={{ width: "100%", height: p.h, marginTop: 10, borderRadius: "16px 16px 0 0", background: "var(--grad)", border: "1px solid var(--gradBd)", borderBottom: "none", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 12, boxSizing: "border-box" }}>
              <span style={{ fontSize: 40, fontWeight: 800, color: "var(--faint)", opacity: 0.35 }}>{p.place}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ width: "100%", maxWidth: 900, background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 20, padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>Monthly board</div>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, fontWeight: 700, color: "var(--acc)", background: "var(--accSoft)", border: "1px solid var(--accBd)", borderRadius: 999, padding: "4px 10px" }}>LIVE</span>
            </div>
            <div style={{ fontSize: 12.5, color: "var(--mut)", marginTop: 5 }}>Window closes in 6 days, 14 hours</div>
          </div>
          <div style={{ display: "flex", gap: 4, background: "var(--inset)", borderRadius: 12, padding: 4 }}>
            <div style={{ borderRadius: 9, padding: "8px 16px", fontSize: 13, fontWeight: 700, background: "var(--violBtn)", color: "#fff", cursor: "pointer" }}>Monthly</div>
            <Hoverable style={{ borderRadius: 9, padding: "8px 16px", fontSize: 13, fontWeight: 600, color: "var(--mut)", cursor: "pointer" }} hoverStyle={{ color: "var(--tx)" }}>All time</Hoverable>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "44px 1.5fr 1.4fr 100px 44px", gap: 14, padding: "0 16px", fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--faint)" }}>
          <div style={{ textAlign: "center" }}>#</div>
          <div>Writer</div>
          <div>Rounds won</div>
          <div style={{ textAlign: "right" }}>Points</div>
          <div />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {vm.podiumRows.map((r) => (
            <Hoverable key={r.rank} style={{ display: "grid", gridTemplateColumns: "44px 1.5fr 1.4fr 100px 44px", gap: 14, alignItems: "center", background: "var(--card2)", border: "1px solid var(--bd)", borderRadius: 14, padding: "12px 16px" }} hoverStyle={{ borderColor: "var(--bd3)" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: 30, height: 30, borderRadius: 9, background: "var(--inset)", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{r.rank}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                <div style={{ width: 38, height: 38, borderRadius: 11, background: r.tint, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flex: "0 0 38px" }}>{r.avatar}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{r.name}</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, color: "var(--mut)", marginTop: 2 }}>{r.tier}</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, fontSize: 12, color: "var(--mut)" }}>
                  <span>Rounds won</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: "var(--tx)" }}>{r.won}</span>
                </div>
                <div style={{ height: 7, borderRadius: 999, background: "var(--inset)", overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 999, background: r.barTone, width: r.bar }} />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700, color: "var(--acc)", background: "var(--accSoft)", border: "1px solid var(--accBd)", borderRadius: 999, padding: "5px 11px" }}>{r.pts}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Hoverable onClick={vm.startBattle} style={{ width: 32, height: 32, borderRadius: 999, background: "var(--inset)", border: "1px solid var(--bd)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--mut)", cursor: "pointer" }} hoverStyle={{ borderColor: "var(--vio)", color: "var(--vio)" }}>
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l9 9M20 4l-9 9M14.5 15.5l2 2 2-2-2-2M9.5 15.5l-2 2-2-2 2-2" /></svg>
                </Hoverable>
              </div>
            </Hoverable>
          ))}
        </div>

        <div style={{ background: "var(--act)", border: "1px solid var(--bd3)", borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
            <span style={{ width: 30, height: 30, borderRadius: 9, background: "var(--inset)", color: "var(--acc)", fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>14</span>
            <div style={{ width: 36, height: 36, borderRadius: 11, background: vm.myTint, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flex: "0 0 36px" }}>{vm.myAvatar}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{vm.myName} <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--acc)", fontWeight: 600 }}>(you)</span></div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, color: "var(--mut)", marginTop: 2 }}>{vm.won} / {vm.played} battles · {vm.winRate} win rate</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700, color: "var(--acc)", background: "var(--accSoft)", border: "1px solid var(--accBd)", borderRadius: 999, padding: "6px 12px" }}>{vm.myScore} pts</span>
            <Hoverable onClick={vm.startBattle} style={{ background: "var(--accBtn)", color: "var(--accInk)", borderRadius: 999, padding: "10px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }} hoverStyle={{ background: "var(--accBtnH)" }}>Queue a battle</Hoverable>
          </div>
        </div>
      </div>
    </div>
  );
}
