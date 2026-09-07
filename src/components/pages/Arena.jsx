import Hoverable from "../Hoverable";

export default function Arena({ vm }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--acc)" }}>The arena</span>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--acc)" }} />
          </div>
          <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>Battles</div>
          <div style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 14, color: "var(--mut)" }}>
            <span style={{ minWidth: 20, height: 20, padding: "0 6px", borderRadius: 999, background: "var(--violBtn)", color: "#fff", fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>4</span>
            battles waiting on your turn
          </div>
        </div>
        <Hoverable onClick={vm.startBattle} style={{ display: "flex", alignItems: "center", gap: 9, background: "var(--violBtn)", color: "#fff", borderRadius: 999, padding: "13px 22px", fontSize: 14, fontWeight: 700, cursor: "pointer" }} hoverStyle={{ background: "var(--violBtnH)" }}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l9 9M20 4l-9 9M14.5 15.5l2 2 2-2-2-2M9.5 15.5l-2 2-2-2 2-2" /></svg>
          Challenge a friend
        </Hoverable>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <span style={{ width: 9, height: 9, borderRadius: 3, background: "var(--acc)" }} />
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>Your turn</div>
            <span style={{ background: "var(--accSoft)", border: "1px solid var(--accBd)", color: "var(--acc)", borderRadius: 999, padding: "5px 11px", fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, fontWeight: 700 }}>ACTION REQUIRED</span>
          </div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--faint)", fontWeight: 600 }}>UNTIMED · FIVE DIMENSIONS</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(360px,1fr))", gap: 20 }}>
          {vm.arenaBattles.map((b) => (
            <Hoverable key={b.name} style={{ position: "relative", overflow: "hidden", background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 18, padding: 24, display: "flex", flexDirection: "column", gap: 20 }} hoverStyle={{ borderColor: "var(--bd3)" }}>
              <div style={{ position: "absolute", right: -50, top: -50, width: 150, height: 150, borderRadius: "50%", background: "var(--violSoft)", filter: "blur(45px)", pointerEvents: "none" }} />
              <div style={{ position: "relative", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
                  <div style={{ width: 54, height: 54, borderRadius: 15, background: b.tint, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 25, flex: "0 0 54px" }}>{b.avatar}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 16, fontWeight: 700 }}>{b.name}</span>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, fontWeight: 600, color: "var(--vio)", background: "var(--violSoft)", borderRadius: 5, padding: "3px 7px" }}>{b.lvl}</span>
                    </div>
                    <div style={{ fontSize: 13, color: "var(--mut)", marginTop: 4 }}>{b.topic}</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flex: "0 0 auto" }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, fontWeight: 600, whiteSpace: "nowrap", borderRadius: 999, padding: "5px 10px", color: b.clockTx, background: b.clockBg, border: `1px solid ${b.clockBd}` }}>{b.clock}</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, color: "var(--faint)", whiteSpace: "nowrap" }}>{b.round}</span>
                </div>
              </div>

              <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 9 }}>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, color: "var(--acc)" }}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>YOU</span>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, fontWeight: 700, background: "var(--accSoft)", borderRadius: 5, padding: "3px 7px" }}>{b.you}</span>
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, fontWeight: 700, letterSpacing: ".14em", color: "var(--faint)" }}>{b.state}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, color: "var(--vio)" }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, fontWeight: 700, background: "var(--violSoft)", borderRadius: 5, padding: "3px 7px" }}>{b.opp}</span>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>{b.short}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 4, height: 10, background: "var(--inset)", borderRadius: 999, padding: 2, boxSizing: "border-box" }}>
                  <div style={{ borderRadius: 999, background: "var(--acc)", width: b.youPct }} />
                  <div style={{ borderRadius: 999, background: "var(--vio)", width: b.oppPct }} />
                </div>
              </div>

              <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
                <div style={{ fontSize: 12.5, color: "var(--mut)" }}>{b.note}</div>
                <Hoverable onClick={vm.startBattle} style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--violBtn)", color: "#fff", borderRadius: 999, padding: "11px 19px", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }} hoverStyle={{ background: "var(--violBtnH)" }}>
                  {b.cta}
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M12 5l7 7-7 7" /></svg>
                </Hoverable>
              </div>
            </Hoverable>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 24, alignItems: "start" }}>
        <div style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 18, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div style={{ fontSize: 17, fontWeight: 700 }}>Incoming invites</div>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, fontWeight: 700, color: "var(--vio)", background: "var(--violSoft)", borderRadius: 999, padding: "5px 10px" }}>3 WAITING</span>
          </div>
          <div style={{ fontSize: 13, color: "var(--mut)", lineHeight: 1.5 }}>Writers waiting on you to accept the topic and start round one.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {vm.arenaInvites.map((i) => (
              <div key={i.name} style={{ background: "var(--card2)", border: "1px solid var(--bd)", borderRadius: 14, padding: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: i.tint, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flex: "0 0 44px" }}>{i.avatar}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 14, fontWeight: 700 }}>{i.name}</span>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, fontWeight: 700, color: "var(--amb)" }}>{i.tag}</span>
                    </div>
                    <div style={{ fontSize: 12.5, color: "var(--mut)", marginTop: 3 }}>{i.topic}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Hoverable onClick={vm.declineInvite} style={{ fontSize: 12.5, fontWeight: 600, color: "var(--tx2)", background: "var(--inset)", border: "1px solid var(--bd)", borderRadius: 999, padding: "8px 14px", cursor: "pointer" }} hoverStyle={{ borderColor: "var(--bd3)" }}>Skip</Hoverable>
                  <Hoverable onClick={vm.acceptInvite} style={{ fontSize: 12.5, fontWeight: 700, color: "var(--accInk)", background: "var(--accBtn)", borderRadius: 999, padding: "8px 16px", cursor: "pointer" }} hoverStyle={{ background: "var(--accBtnH)" }}>Accept</Hoverable>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 18, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <div style={{ fontSize: 17, fontWeight: 700 }}>Battle log</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--mut)" }}>WIN RATE <span style={{ color: "var(--acc)", fontWeight: 700 }}>68.4%</span></div>
          </div>
          <div style={{ fontSize: 13, color: "var(--mut)", lineHeight: 1.5 }}>Finished matches and the round scores behind them.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {vm.arenaLogs.map((l, i) => (
              <div key={i} style={{ background: "var(--card2)", border: "1px solid var(--bd)", borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 700, flex: "0 0 34px", color: l.resTx, background: l.resBg }}>{l.res}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 14, fontWeight: 700 }}>{l.name}</span>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, color: "var(--faint)" }}>{l.time}</span>
                    </div>
                    <div style={{ fontSize: 12.5, color: "var(--mut)", marginTop: 3 }}>{l.topic}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 18, flex: "0 0 auto" }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 700, color: l.scoreTx }}>{l.score}</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, color: "var(--faint)", marginTop: 2 }}>{l.delta}</div>
                  </div>
                  <Hoverable onClick={vm.rematch} style={{ width: 32, height: 32, borderRadius: 999, background: "var(--inset)", border: "1px solid var(--bd)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--mut)", cursor: "pointer", flex: "0 0 32px" }} hoverStyle={{ borderColor: "var(--acc)", color: "var(--acc)" }}>
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12a8 8 0 0113.7-5.7M20 12a8 8 0 01-13.7 5.7M18 4v4h-4M6 20v-4h4" /></svg>
                  </Hoverable>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
