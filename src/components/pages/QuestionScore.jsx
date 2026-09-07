import Hoverable from "../Hoverable";

export default function QuestionScore({ vm }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--acc)" }}>Your writing record</div>
          <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em" }}>Question score</div>
          <div style={{ fontSize: 14, color: "var(--mut)" }}>7 questions authored · answered 12,480 times across the library</div>
        </div>
        <Hoverable onClick={vm.goCompose} style={{ display: "flex", alignItems: "center", gap: 9, background: "var(--accBtn)", color: "var(--accInk)", borderRadius: 999, padding: "13px 22px", fontSize: 14, fontWeight: 700, cursor: "pointer" }} hoverStyle={{ background: "var(--accBtnH)" }}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
          Write a question
        </Hoverable>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 20, alignItems: "stretch" }}>
        <div style={{ position: "relative", overflow: "hidden", background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 18, padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ position: "absolute", right: -60, top: -60, width: 200, height: 200, borderRadius: "50%", background: "var(--accSoft)", filter: "blur(60px)", pointerEvents: "none" }} />
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700 }}>Composite quality score</div>
              <div style={{ fontSize: 12.5, color: "var(--mut)", marginTop: 4 }}>Averaged across every question of yours the graders have seen</div>
            </div>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, color: "var(--acc)", background: "var(--accSoft)", border: "1px solid var(--accBd)", borderRadius: 999, padding: "6px 12px" }}>TIER: ELITE WRITER</span>
          </div>
          <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 24, alignItems: "center" }}>
            <div style={{ background: "var(--card2)", border: "1px solid var(--bd)", borderRadius: 16, padding: 22, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
              <div style={{ position: "relative", width: 150, height: 150, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg viewBox="0 0 120 120" width="150" height="150" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="60" cy="60" r="50" fill="none" stroke="var(--inset)" strokeWidth="11" />
                  <circle cx="60" cy="60" r="50" fill="none" stroke="var(--acc)" strokeWidth="11" strokeLinecap="round" strokeDasharray="314.16" strokeDashoffset="44" />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>86</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, color: "var(--mut)", marginTop: 4 }}>/ 100</div>
                </div>
              </div>
              <div style={{ background: "var(--accBtn)", color: "var(--accInk)", borderRadius: 999, padding: "7px 15px", fontSize: 12.5, fontWeight: 700 }}>A− · high rigour</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {vm.qsDims.map((d) => (
                <div key={d.label} style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                    <span style={{ fontSize: 13.5, color: "var(--tx2)", fontWeight: 500 }}>{d.label}</span>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700, color: d.tone, whiteSpace: "nowrap" }}>{d.pct}</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 999, background: "var(--inset)", overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 999, background: d.tone, width: d.bar }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: "relative", background: "var(--card2)", border: "1px solid var(--bd)", borderRadius: 14, padding: 16, display: "flex", alignItems: "flex-start", gap: 12 }}>
            <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="var(--amb)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 19px", marginTop: 2 }}><path d="M9 18h6M10 21h4M12 3a6 6 0 013.5 10.9V16h-7v-2.1A6 6 0 0112 3z" /></svg>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Clarity is your one weak dimension</div>
              <div style={{ fontSize: 12.5, color: "var(--mut)", lineHeight: 1.55, marginTop: 4, textWrap: "pretty" }}>Three of your questions ask two things at once. Splitting the second clause off Q-9104 would lift your composite to about 91.</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 18, padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--mut)" }}>Kept rate</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--acc)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20a8 8 0 100-16 8 8 0 000 16zM12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" /></svg>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>61%</span>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, fontWeight: 600, color: "var(--acc)" }}>+4.2% vs average</span>
            </div>
            <div style={{ height: 7, borderRadius: 999, background: "var(--inset)", overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 999, background: "var(--acc)", width: "61%" }} />
            </div>
            <div style={{ fontSize: 12.5, color: "var(--mut)", lineHeight: 1.5 }}>Share of your published questions the library kept on review.</div>
          </div>
          <div style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 18, padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--mut)" }}>Points from authoring</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--vio)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4.5l7 3.5v7l-7 3.5-7-3.5v-7z" /></svg>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>128</span>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, fontWeight: 600, color: "var(--vio)" }}>points earned</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, fontWeight: 700, color: "var(--vio)", background: "var(--violSoft)", borderRadius: 999, padding: "5px 10px" }}>+18 this week</span>
              <span style={{ fontSize: 12, color: "var(--faint)" }}>· top 8% of writers</span>
            </div>
          </div>
          <div style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 18, padding: 20, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--mut)" }}>Most answered subject</div>
              <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", marginTop: 6 }}>Physics</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--mut)", marginTop: 4 }}>8,420 answers logged</div>
            </div>
            <div style={{ width: 54, height: 54, borderRadius: 15, background: "var(--inset)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 25, flex: "0 0 54px" }}>🧭</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap" }}>
          {vm.qsTabs.map((t) => (
            <Hoverable key={t.label} style={{ display: "flex", alignItems: "center", gap: 8, borderRadius: 999, padding: "9px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", background: "var(--card)", border: "1px solid var(--bd)", color: "var(--mut)" }} hoverStyle={{ borderColor: "var(--bd3)", color: "var(--tx)" }}>
              {t.label}
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, background: "var(--inset)", borderRadius: 999, padding: "2px 7px" }}>{t.count}</span>
            </Hoverable>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 999, padding: "10px 16px", minWidth: 260 }}>
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="var(--mut)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.5 17a6.5 6.5 0 100-13 6.5 6.5 0 000 13zM15.5 15.5L20 20" /></svg>
          <span style={{ fontSize: 13, color: "var(--faint)" }}>Filter questions or topics</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        {vm.qsGroups.map((g) => (
          <div key={g.subject} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "0 4px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <span style={{ width: 9, height: 9, borderRadius: 3, background: g.dot }} />
                <span style={{ fontSize: 16, fontWeight: 700 }}>{g.subject}</span>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--faint)" }}>{g.count}</span>
              </div>
              <span style={{ fontSize: 12.5, color: "var(--mut)" }}>{g.meta}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {g.rows.map((r) => (
                <Hoverable key={r.id} style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 15, padding: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }} hoverStyle={{ borderColor: "var(--bd3)" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14, minWidth: 0 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 11, background: r.tint, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, flex: "0 0 40px" }}>{r.icon}</div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
                        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, color: "var(--faint)" }}>{r.id}</span>
                        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, fontWeight: 700, borderRadius: 999, padding: "3px 9px", color: r.statusTx, background: r.statusBg, border: `1px solid ${r.statusBd}` }}>{r.status}</span>
                        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, color: "var(--tx2)", background: "var(--inset)", borderRadius: 999, padding: "3px 9px" }}>{r.score}</span>
                        <span style={{ fontSize: 11.5, color: "var(--faint)" }}>· {r.topic}</span>
                      </div>
                      <div style={{ fontSize: 14, lineHeight: 1.5, color: "var(--tx)", textWrap: "pretty" }}>{r.text}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 22, flex: "0 0 auto" }}>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 700 }}>{r.plays}</div>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--faint)", marginTop: 3 }}>Answers</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 14, fontWeight: 700, color: "var(--acc)" }}>{r.answered}</div>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--faint)", marginTop: 3 }}>Solved</div>
                    </div>
                  </div>
                </Hoverable>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
