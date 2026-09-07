import Hoverable from "../Hoverable";

export default function Inbox({ vm }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em" }}>Inbox</div>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, fontWeight: 700, color: "var(--acc)", background: "var(--accSoft)", border: "1px solid var(--accBd)", borderRadius: 999, padding: "5px 11px" }}>3 UNREAD</span>
          </div>
          <div style={{ fontSize: 14, color: "var(--mut)", maxWidth: 620, textWrap: "pretty" }}>Challenges waiting on you, review verdicts on your questions, and everything the board did while you were away.</div>
        </div>
        <Hoverable onClick={vm.markAllRead} style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--card)", border: "1px solid var(--bd2)", color: "var(--tx2)", borderRadius: 999, padding: "11px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer" }} hoverStyle={{ borderColor: "var(--acc)", color: "var(--acc)" }}>
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 12.5l4.5 4.5 8-9M9.5 16.5l1.5 1.5 8-9" /></svg>
          Mark all read
        </Hoverable>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 14 }}>
        {vm.inboxMetrics.map((m) => (
          <div key={m.label} style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 15, padding: 16, display: "flex", alignItems: "center", gap: 13 }}>
            <div style={{ width: 40, height: 40, borderRadius: 11, background: m.bg, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 40px" }}>
              <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke={m.tone} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={m.icon} /></svg>
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, fontWeight: 600, letterSpacing: ".12em", color: "var(--mut)" }}>{m.label}</div>
              <div style={{ fontSize: 15, fontWeight: 700, marginTop: 4 }}>{m.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap" }}>
        {vm.inboxTabs.map((t) => (
          <Hoverable key={t.label} style={{ display: "flex", alignItems: "center", gap: 8, borderRadius: 999, padding: "9px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", background: "var(--card)", border: "1px solid var(--bd)", color: "var(--mut)" }} hoverStyle={{ borderColor: "var(--bd3)", color: "var(--tx)" }}>
            {t.label}
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, background: "var(--inset)", borderRadius: 999, padding: "2px 7px" }}>{t.count}</span>
          </Hoverable>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--acc)" }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase" }}>Today · needs a reply</span>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--faint)" }}>3 items pending</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {vm.inboxToday.map((n, i) => (
            <Hoverable key={i} style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 16, padding: 20, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 18 }} hoverStyle={{ borderColor: "var(--bd3)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16, minWidth: 0 }}>
                <div style={{ position: "relative", flex: "0 0 48px" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: n.bg, border: `1px solid ${n.bd}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke={n.tone} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={n.icon} /></svg>
                  </div>
                  <span style={{ position: "absolute", top: -3, right: -3, width: 11, height: 11, borderRadius: "50%", background: "var(--acc)", border: "2px solid var(--card)" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 16, fontWeight: 700 }}>{n.title}</span>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, fontWeight: 600, color: n.tone, background: n.bg, borderRadius: 999, padding: "3px 9px" }}>{n.tag}</span>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, color: "var(--faint)" }}>· {n.time}</span>
                  </div>
                  <div style={{ fontSize: 14, lineHeight: 1.6, color: "var(--tx2)", textWrap: "pretty" }}>{n.body}</div>
                  <div style={{ background: "var(--card2)", border: "1px solid var(--bd)", borderRadius: 11, padding: "10px 14px", fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--mut)", width: "fit-content" }}>{n.note}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", paddingTop: 2 }}>
                    <Hoverable onClick={vm.acceptInvite} style={{ background: "var(--accBtn)", color: "var(--accInk)", borderRadius: 999, padding: "10px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer" }} hoverStyle={{ background: "var(--accBtnH)" }}>{n.primary}</Hoverable>
                    <Hoverable onClick={vm.declineInvite} style={{ background: "var(--inset)", border: "1px solid var(--bd)", color: "var(--tx2)", borderRadius: 999, padding: "10px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }} hoverStyle={{ borderColor: "var(--bd3)" }}>{n.secondary}</Hoverable>
                  </div>
                </div>
              </div>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, fontWeight: 700, letterSpacing: ".1em", color: "var(--faint)", background: "var(--inset)", borderRadius: 999, padding: "5px 10px", whiteSpace: "nowrap", flex: "0 0 auto" }}>{n.priority}</span>
            </Hoverable>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--faint)" }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--mut)" }}>Yesterday and earlier</span>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--faint)" }}>All caught up</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {vm.inboxEarlier.map((e, i) => (
            <Hoverable key={i} style={{ background: "var(--card2)", border: "1px solid var(--bd)", borderRadius: 14, padding: 16, display: "flex", alignItems: "flex-start", gap: 14 }} hoverStyle={{ borderColor: "var(--bd3)" }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: e.bg, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 38px" }}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={e.tone} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={e.icon} /></svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 14.5, fontWeight: 700 }}>{e.title}</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, color: "var(--faint)" }}>{e.time}</span>
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.55, color: "var(--tx2)", marginTop: 5, textWrap: "pretty" }}>{e.body}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, color: e.tone, marginTop: 8, fontWeight: 600 }}>{e.meta}</div>
              </div>
            </Hoverable>
          ))}
        </div>
      </div>
    </div>
  );
}
