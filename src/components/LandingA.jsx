import Hoverable from "./Hoverable";

export default function LandingA({ vm }) {
  return (
    <div data-theme="dark" style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--tx)", display: "flex", flexDirection: "column" }}>
      <header style={{ display: "flex", alignItems: "center", gap: 36, padding: "24px 56px", borderBottom: "1px solid var(--bd)" }}>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--acc)" }}>dripit</div>
        <div style={{ display: "flex", gap: 26, marginLeft: 12 }}>
          <Hoverable onClick={vm.signUp} style={{ fontSize: 13, color: "var(--mut)", cursor: "pointer", fontWeight: 500 }} hoverStyle={{ color: "var(--tx)" }}>Question library</Hoverable>
          <Hoverable style={{ fontSize: 13, color: "var(--mut)", cursor: "pointer", fontWeight: 500 }} hoverStyle={{ color: "var(--tx)" }}>How it works</Hoverable>
          <Hoverable onClick={vm.previewLeaderboard} style={{ fontSize: 13, color: "var(--mut)", cursor: "pointer", fontWeight: 500 }} hoverStyle={{ color: "var(--tx)" }}>Leaderboard</Hoverable>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
          <Hoverable onClick={vm.logIn} style={{ fontSize: 13, fontWeight: 600, color: "var(--tx2)", border: "1px solid var(--bd2)", borderRadius: 999, padding: "10px 20px", cursor: "pointer" }} hoverStyle={{ borderColor: "var(--acc)", color: "var(--acc)" }}>Log in</Hoverable>
          <Hoverable onClick={vm.signUp} style={{ fontSize: 13, fontWeight: 700, color: "var(--accInk)", background: "var(--accBtn)", borderRadius: 999, padding: "11px 22px", cursor: "pointer" }} hoverStyle={{ background: "var(--accBtnH)" }}>Play free</Hoverable>
        </div>
      </header>

      <section style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 56, alignItems: "center", padding: "76px 56px 68px", maxWidth: 1280, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--hov)", border: "1px solid var(--bd2)", borderRadius: 999, padding: "8px 15px", fontSize: 12, fontWeight: 600, color: "var(--acc)", width: "fit-content" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--acc)" }} />
            312 questions published by students today
          </div>
          <div style={{ fontSize: 58, lineHeight: 1.04, fontWeight: 800, letterSpacing: "-0.035em", textWrap: "pretty" }}>A public library of<br />everything students<br />are curious about.</div>
          <div style={{ fontSize: 16, lineHeight: 1.6, color: "var(--mut)", maxWidth: 470, textWrap: "pretty" }}>Write the questions you actually wonder about. Publish them for anyone to answer. Then battle the sharpest question-writers in the world and let the grader decide whose thinking was more original.</div>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <Hoverable onClick={vm.signUp} style={{ fontSize: 14, fontWeight: 700, color: "var(--accInk)", background: "var(--accBtn)", borderRadius: 999, padding: "14px 26px", cursor: "pointer" }} hoverStyle={{ background: "var(--accBtnH)" }}>Publish your first question</Hoverable>
            <Hoverable onClick={vm.signUp} style={{ fontSize: 14, fontWeight: 600, color: "var(--tx2)", border: "1px solid var(--bd2)", borderRadius: 999, padding: "14px 24px", cursor: "pointer" }} hoverStyle={{ borderColor: "var(--acc)", color: "var(--acc)" }}>Browse the library</Hoverable>
          </div>
        </div>

        <div style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 20, padding: 24, display: "flex", flexDirection: "column", gap: 14, boxShadow: "0 30px 70px var(--shadow)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontSize: 14.5, fontWeight: 700 }}>Top question-writers</div>
            <div style={{ fontSize: 11.5, color: "var(--mut)", fontFamily: "'JetBrains Mono',monospace" }}>this month</div>
          </div>
          {vm.heroBoard.map((p) => (
            <div key={p.rank} style={{ display: "flex", alignItems: "center", gap: 13, padding: "12px 15px", background: "var(--card2)", border: "1px solid var(--bd)", borderRadius: 12 }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--act)", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--tx2)", flex: "0 0 24px" }}>{p.rank}</div>
              <div style={{ width: 30, height: 30, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, background: p.tint }}>{p.avatar}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: "var(--mut)", marginTop: 1 }}>{p.deck}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: "var(--acc)", background: "var(--accSoft)", border: "1px solid var(--accBd)", borderRadius: 999, padding: "5px 11px" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--acc)" }} />{p.score}
              </div>
            </div>
          ))}
          <Hoverable onClick={vm.signUp} style={{ marginTop: 4, textAlign: "center", fontSize: 12.5, fontWeight: 700, color: "var(--accInk)", background: "var(--accBtn)", borderRadius: 11, padding: 12, cursor: "pointer" }} hoverStyle={{ background: "var(--accBtnH)" }}>Take a shot at #1</Hoverable>
        </div>
      </section>

      <section style={{ padding: "0 56px 72px", maxWidth: 1280, margin: "0 auto", width: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--mut)", letterSpacing: ".14em", textTransform: "uppercase" }}>Ask · publish · battle</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
          {vm.steps.map((s) => (
            <div key={s.title} style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 18, padding: 26, display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: s.tint, display: "flex", alignItems: "center", justifyContent: "center", color: "#e6ecf5" }}>
                <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg>
              </div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{s.title}</div>
              <div style={{ fontSize: 13, lineHeight: 1.6, color: "var(--mut)", textWrap: "pretty" }}>{s.body}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "0 56px 76px", maxWidth: 1280, margin: "0 auto", width: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>Published to the library today</div>
          <Hoverable onClick={vm.signUp} style={{ fontSize: 12.5, color: "var(--mut)", fontWeight: 600, cursor: "pointer" }} hoverStyle={{ color: "var(--acc)" }}>Browse all 48,120 questions</Hoverable>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
          {vm.publicQuestions.map((q) => (
            <Hoverable
              key={q.text} onClick={vm.signUp}
              style={{ background: "var(--card2)", border: "1px solid var(--bd)", borderRadius: 15, padding: 20, display: "flex", flexDirection: "column", gap: 14, cursor: "pointer" }}
              hoverStyle={{ borderColor: "var(--acc)" }}
            >
              <div style={{ fontSize: 14.5, fontWeight: 600, lineHeight: 1.45, textWrap: "pretty" }}>{q.text}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: "auto" }}>
                <div style={{ width: 28, height: 28, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, background: q.tint }}>{q.avatar}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{q.author}</div>
                  <div style={{ fontSize: 11, color: "var(--mut)", marginTop: 1 }}>{q.meta}</div>
                </div>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: "var(--vio)", background: "var(--violSoft)", border: "1px solid var(--violBd)", borderRadius: 999, padding: "5px 11px" }}>{q.topic}</div>
              </div>
            </Hoverable>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", paddingTop: 4 }}>
          {vm.publicDecks.map((d) => (
            <Hoverable
              key={d.name} onClick={vm.signUp}
              style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--inset)", border: "1px solid var(--bd)", borderRadius: 999, padding: "9px 16px", fontSize: 12.5, fontWeight: 600, color: "var(--tx2)", cursor: "pointer" }}
              hoverStyle={{ borderColor: "var(--acc)" }}
            >
              <span>{d.icon}</span>{d.name}
              <span style={{ color: "var(--faint)", fontWeight: 500 }}>{d.meta}</span>
            </Hoverable>
          ))}
        </div>
      </section>

      <section style={{ padding: "0 56px 80px", maxWidth: 1280, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
        <div style={{ background: "var(--grad)", border: "1px solid var(--gradBd)", borderRadius: 22, padding: "44px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 540 }}>
            <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.025em", textWrap: "pretty" }}>Every question you publish stays in the library for the next student.</div>
            <div style={{ fontSize: 14, color: "var(--gradTx)", marginTop: 10, lineHeight: 1.6 }}>Free for students and schools. Your name stays on everything you write.</div>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Hoverable onClick={vm.signUp} style={{ fontSize: 14, fontWeight: 700, color: "var(--accInk)", background: "var(--accBtn)", borderRadius: 999, padding: "14px 26px", cursor: "pointer" }} hoverStyle={{ background: "var(--accBtnH)" }}>Start writing</Hoverable>
            <Hoverable onClick={vm.logIn} style={{ fontSize: 14, fontWeight: 600, color: "var(--tx2)", border: "1px solid var(--bd3)", borderRadius: 999, padding: "14px 24px", cursor: "pointer" }} hoverStyle={{ borderColor: "var(--acc)", color: "var(--acc)" }}>I already write here</Hoverable>
          </div>
        </div>
      </section>

      <footer style={{ marginTop: "auto", borderTop: "1px solid var(--bd)", padding: "26px 56px", display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
        <div style={{ fontSize: 17, fontWeight: 800, color: "var(--acc)", letterSpacing: "-0.03em" }}>dripit</div>
        <div style={{ fontSize: 12, color: "var(--faint)" }}>© 2026 dripit</div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 20 }}>
          <Hoverable style={{ fontSize: 12, color: "var(--mut)", cursor: "pointer" }} hoverStyle={{ color: "var(--tx)" }}>Privacy</Hoverable>
          <Hoverable style={{ fontSize: 12, color: "var(--mut)", cursor: "pointer" }} hoverStyle={{ color: "var(--tx)" }}>Terms</Hoverable>
          <Hoverable style={{ fontSize: 12, color: "var(--mut)", cursor: "pointer" }} hoverStyle={{ color: "var(--tx)" }}>Contact</Hoverable>
        </div>
      </footer>
      <div onClick={vm.toLandingB} style={{ position: "fixed", left: 20, bottom: 20, zIndex: 60, fontSize: 11, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", color: "var(--tx2)", background: "var(--card)", border: "1px solid var(--bd2)", borderRadius: 999, padding: "9px 15px", cursor: "pointer" }}>Landing A · switch to Kweshun</div>
    </div>
  );
}
