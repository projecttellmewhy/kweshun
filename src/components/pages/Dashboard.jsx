import Hoverable from "../Hoverable";

export default function Dashboard({ vm }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
      <div style={{ position: "relative", overflow: "hidden", background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 18, padding: 26, boxShadow: "0 20px 50px var(--shadow)" }}>
        <div style={{ position: "absolute", right: -60, top: -60, width: 300, height: 300, borderRadius: "50%", background: "var(--accSoft)", filter: "blur(70px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 160, bottom: -80, width: 240, height: 240, borderRadius: "50%", background: "var(--violSoft)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 22, flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 620 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <div onClick={vm.showStreak} style={{ display: "flex", alignItems: "center", gap: 7, background: "var(--ambSoft)", border: "1px solid var(--ambBd)", color: "var(--amb)", borderRadius: 999, padding: "6px 13px", fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3s5 4.5 5 9a5 5 0 01-10 0c0-2 1-3.5 1-3.5S9 11 10.5 11C12 11 12 8 12 3z" /></svg>
                {vm.streakLabel}
              </div>
              <div style={{ background: "var(--inset)", border: "1px solid var(--bd)", color: "var(--mut)", borderRadius: 999, padding: "6px 13px", fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 600 }}>{vm.tierLabel}</div>
            </div>
            <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em" }}>Welcome back, {vm.myFirstName}</div>
            <div style={{ fontSize: 14, lineHeight: 1.55, color: "var(--mut)", textWrap: "pretty" }}>{vm.rankLine} The current leaderboard window closes in 6 hours.</div>
          </div>
          <Hoverable onClick={vm.startBattle} style={{ display: "flex", alignItems: "center", gap: 9, background: "var(--accBtn)", color: "var(--accInk)", borderRadius: 999, padding: "13px 22px", fontSize: 14, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }} hoverStyle={{ background: "var(--accBtnH)" }}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l9 9M20 4l-9 9M14.5 15.5l2 2 2-2-2-2M9.5 15.5l-2 2-2-2 2-2" /></svg>
            Start a battle
          </Hoverable>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
        <Hoverable onClick={vm.goLeaderboard} style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 16, padding: 20, display: "flex", flexDirection: "column", gap: 18, cursor: "pointer" }} hoverStyle={{ borderColor: "var(--bd3)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--mut)" }}>Total score</span>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: "var(--inset)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--acc)" }}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM12 4v1.5M12 18.5V20M4 12h1.5M18.5 12H20" /></svg>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>{vm.myScore}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--acc)", marginTop: 8, fontFamily: "'JetBrains Mono',monospace" }}>{vm.weekGain} this week</div>
          </div>
        </Hoverable>
        <Hoverable onClick={vm.goBattles} style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 16, padding: 20, display: "flex", flexDirection: "column", gap: 18, cursor: "pointer" }} hoverStyle={{ borderColor: "var(--bd3)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--mut)" }}>Battles won</span>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: "var(--inset)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--vio)" }}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 4h7v5a3.5 3.5 0 01-7 0zM12 12.5V17M9 20h6" /></svg>
            </div>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>{vm.won}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--faint)" }}>/ {vm.played}</span>
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--vio)", marginTop: 8, fontFamily: "'JetBrains Mono',monospace" }}>{vm.winRate} win rate</div>
          </div>
        </Hoverable>
        <Hoverable onClick={vm.goQuestions} style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 16, padding: 20, display: "flex", flexDirection: "column", gap: 18, cursor: "pointer" }} hoverStyle={{ borderColor: "var(--bd3)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--mut)" }}>Questions authored</span>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: "var(--inset)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--amb)" }}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5h6M4 14.5h9M14.5 4.5l4 4-8 8-4 1 1-4z" /></svg>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>{vm.questionCount}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--amb)", marginTop: 8, fontFamily: "'JetBrains Mono',monospace" }}>{vm.pendingCount} pending review</div>
          </div>
        </Hoverable>
        <Hoverable onClick={vm.goLeaderboard} style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 16, padding: 20, display: "flex", flexDirection: "column", gap: 18, cursor: "pointer" }} hoverStyle={{ borderColor: "var(--bd3)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--mut)" }}>Monthly rank</span>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: "var(--inset)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--acc)" }}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 20v-7.5M12 20V4.5M19 20v-5" /></svg>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>#{vm.myRank}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--mut)", marginTop: 8, fontFamily: "'JetBrains Mono',monospace" }}>of 1,204 writers</div>
          </div>
        </Hoverable>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.35fr 1fr", gap: 28, alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>Pick up where you left off</div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--mut)", fontWeight: 600 }}>3 TOPIC LISTS ACTIVE</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {vm.dashDecks.map((d) => (
              <Hoverable key={d.name} onClick={vm.goQuestions} style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 16, padding: 18, display: "flex", flexDirection: "column", gap: 14, cursor: "pointer" }} hoverStyle={{ borderColor: "var(--bd3)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 13, minWidth: 0 }}>
                    <div style={{ width: 46, height: 46, borderRadius: 13, background: d.tint, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 21, flex: "0 0 46px" }}>{d.icon}</div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 15, fontWeight: 700 }}>{d.name}</div>
                      <div style={{ fontSize: 12.5, color: "var(--mut)", marginTop: 3 }}>{d.sub}</div>
                    </div>
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 700, color: "var(--acc)" }}>{d.pct}</div>
                </div>
                <div style={{ height: 8, borderRadius: 999, background: "var(--inset)", overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 999, background: "var(--acc)", width: d.bar }} />
                </div>
              </Hoverable>
            ))}
          </div>
          <div style={{ position: "relative", overflow: "hidden", background: "var(--card2)", border: "1px solid var(--bd)", borderRadius: 16, padding: 24, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18, flexWrap: "wrap" }}>
            <div style={{ position: "absolute", right: -40, bottom: -40, width: 180, height: 180, borderRadius: "50%", background: "var(--violSoft)", filter: "blur(50px)", pointerEvents: "none" }} />
            <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 6, maxWidth: 520 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <span style={{ background: "var(--violBtn)", color: "#fff", borderRadius: 999, padding: "4px 10px", fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, fontWeight: 700, letterSpacing: ".06em" }}>EVENT</span>
                <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--vio)" }}>Double points until midnight</span>
              </div>
              <div style={{ fontSize: 17, fontWeight: 700, marginTop: 2 }}>Daily prompt · one original question</div>
              <div style={{ fontSize: 13.5, lineHeight: 1.55, color: "var(--mut)", textWrap: "pretty" }}>One constraint topic, no clock. Write the sharpest question you can and it goes straight into tonight's judging pool.</div>
            </div>
            <Hoverable onClick={vm.playDaily} style={{ position: "relative", display: "flex", alignItems: "center", gap: 8, background: "var(--violBtn)", color: "#fff", borderRadius: 999, padding: "12px 20px", fontSize: 13.5, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }} hoverStyle={{ background: "var(--violBtnH)" }}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M13 3L5 14h6l-1 7 8-11h-6z" /></svg>
              Write it
            </Hoverable>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--red)" }} />
                <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>Live now</div>
              </div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--mut)", fontWeight: 600 }}>WAITING TO BATTLE</div>
            </div>
            <div style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 16, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              {vm.live.map((row) => (
                <div key={row.name} style={{ background: "var(--card2)", border: "1px solid var(--bd)", borderRadius: 12, padding: 12, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 11, minWidth: 0 }}>
                    <div style={{ width: 38, height: 38, borderRadius: "50%", background: row.tint, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flex: "0 0 38px" }}>{row.avatar}</div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 700 }}>{row.name}</div>
                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--mut)", marginTop: 2 }}>{row.meta}</div>
                    </div>
                  </div>
                  <Hoverable onClick={row.join} style={{ fontSize: 12.5, fontWeight: 700, color: "var(--acc)", background: "var(--accSoft)", border: "1px solid var(--accBd)", borderRadius: 999, padding: "7px 15px", cursor: "pointer", whiteSpace: "nowrap" }} hoverStyle={{ background: "var(--accBtn)", color: "var(--accInk)" }}>Join</Hoverable>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>Recent activity</div>
            <div style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 16, padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
              {vm.dashActivity.map((a, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", marginTop: 5, flex: "0 0 10px", background: a.dot }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{a.title}</div>
                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--faint)", whiteSpace: "nowrap" }}>{a.time}</div>
                    </div>
                    <div style={{ fontSize: 12.5, lineHeight: 1.5, color: "var(--tx2)", marginTop: 3, textWrap: "pretty" }}>{a.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
