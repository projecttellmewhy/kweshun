import Hoverable from "../Hoverable";

export default function Battles({ vm }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em" }}>Battles</div>
          <div style={{ fontSize: 14, color: "var(--mut)", marginTop: 6 }}>{vm.turnCount} battles waiting on your question</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Hoverable onClick={vm.randomOpponent} style={{ background: "var(--hov)", border: "1px solid var(--bd2)", color: "var(--tx2)", borderRadius: 999, padding: "11px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer" }} hoverStyle={{ borderColor: "var(--acc)" }}>Random opponent</Hoverable>
          <Hoverable onClick={vm.goFriends} style={{ background: "var(--accBtn)", color: "var(--accInk)", borderRadius: 999, padding: "11px 20px", fontSize: 13.5, fontWeight: 700, cursor: "pointer" }} hoverStyle={{ background: "var(--accBtnH)" }}>Challenge a friend</Hoverable>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ fontSize: 16, fontWeight: 700 }}>Your turn to compose</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
          {vm.turns.map((b) => (
            <div key={b.id} style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 18, padding: 22, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, background: b.tint }}>{b.avatar}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{b.name}</div>
                  <div style={{ fontSize: 12, color: "var(--mut)", marginTop: 2 }}>{b.subtitle}</div>
                </div>
                <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: "var(--amb)", background: "var(--ambSoft)", border: "1px solid var(--ambBd)", borderRadius: 999, padding: "5px 10px", whiteSpace: "nowrap" }}>{b.timer}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--violSoft)", border: "1px solid var(--violBd)", borderRadius: 11, padding: "12px 14px" }}>
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="var(--vio)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 15px" }}><path d="M12 4v16M4 8h16M6 12h12M8 16h8" /></svg>
                <div style={{ fontSize: 12.5, fontWeight: 600, flex: 1, minWidth: 0 }}>{b.topic}</div>
                <div style={{ fontSize: 11, color: "var(--mut)", fontFamily: "'JetBrains Mono',monospace" }}>{b.level}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 11.5, color: "var(--mut)" }}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 10.5V8a5.5 5.5 0 0111 0v2.5M5 10.5h14v9H5z" /></svg>
                Their question is banked — score revealed after you submit
              </div>
              <Hoverable onClick={b.play} style={{ background: "var(--violBtn)", color: "#fff", borderRadius: 11, padding: 12, textAlign: "center", fontSize: 13.5, fontWeight: 700, cursor: "pointer" }} hoverStyle={{ background: "var(--violBtnH)" }}>Compose your question</Hoverable>
            </div>
          ))}
        </div>
        {vm.noTurns && (
          <div style={{ background: "var(--card)", border: "1px dashed var(--bd2)", borderRadius: 16, padding: 34, textAlign: "center", color: "var(--faint)", fontSize: 13 }}>All caught up. Start a new battle to keep the streak alive.</div>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.35fr", gap: 20, alignItems: "start" }}>
        <div style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 18, padding: 22, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Invites</div>
          {vm.invites.map((i) => (
            <div key={i.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, background: i.tint }}>{i.avatar}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{i.name}</div>
                <div style={{ fontSize: 11.5, color: "var(--mut)" }}>{i.deck}</div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <Hoverable onClick={i.accept} style={{ fontSize: 11.5, fontWeight: 700, color: "var(--accInk)", background: "var(--accBtn)", borderRadius: 999, padding: "6px 12px", cursor: "pointer" }} hoverStyle={{ background: "var(--accBtnH)" }}>Accept</Hoverable>
                <Hoverable onClick={i.skip} style={{ fontSize: 11.5, fontWeight: 600, color: "var(--mut)", border: "1px solid var(--bd2)", borderRadius: 999, padding: "6px 12px", cursor: "pointer" }} hoverStyle={{ color: "var(--tx)", borderColor: "var(--bd3)" }}>Skip</Hoverable>
              </div>
            </div>
          ))}
          {vm.noInvites && <div style={{ fontSize: 12.5, color: "var(--faint)", padding: "8px 0" }}>No pending invites.</div>}
        </div>

        <div style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 18, padding: 22, display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontSize: 16, fontWeight: 700, paddingBottom: 10 }}>History</div>
          {vm.history.map((h) => (
            <div key={h.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 16px", background: "var(--card2)", border: "1px solid var(--bd)", borderRadius: 12, marginBottom: 8 }}>
              <div style={{ width: 26, height: 26, borderRadius: 8, fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", color: h.color, background: h.bg }}>{h.result}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{h.name}</div>
                <div style={{ fontSize: 11.5, color: "var(--mut)" }}>{h.deck}</div>
              </div>
              <div style={{ fontSize: 12.5, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", color: "var(--tx2)" }}>{h.score}</div>
              <div style={{ fontSize: 11, color: "var(--faint)", fontFamily: "'JetBrains Mono',monospace", width: 56, textAlign: "right" }}>{h.when}</div>
              <Hoverable onClick={h.rematch} style={{ fontSize: 11.5, fontWeight: 600, color: "var(--mut)", border: "1px solid var(--bd2)", borderRadius: 999, padding: "5px 12px", cursor: "pointer", whiteSpace: "nowrap" }} hoverStyle={{ color: "var(--acc)", borderColor: "var(--acc)" }}>Rematch</Hoverable>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
