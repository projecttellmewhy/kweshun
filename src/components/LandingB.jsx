import Hoverable from "./Hoverable";

export default function LandingB({ vm }) {
  return (
    <div data-theme="dark" style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--tx)", display: "flex", flexDirection: "column", fontFamily: "'Work Sans',Helvetica,sans-serif" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid var(--bd)", background: "rgba(13,20,32,.9)", backdropFilter: "blur(12px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", height: 66, display: "flex", alignItems: "center", justifyContent: "space-between", boxSizing: "border-box" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 34 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: "var(--acc)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg viewBox="0 0 48 48" width="19" height="19" fill="#07281d"><path d="M24 4C25.78 14.22 33.78 22.22 44 24C33.78 25.78 25.78 33.78 24 44C22.22 33.78 14.22 25.78 4 24C14.22 22.22 22.22 14.22 24 4Z" /></svg>
              </div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--txHi)" }}>Kweshun</div>
            </div>
            <div style={{ display: "flex", gap: 26 }}>
              <Hoverable onClick={vm.signUp} style={{ fontSize: 13.5, fontWeight: 500, color: "var(--tx2)", cursor: "pointer" }} hoverStyle={{ color: "var(--acc)" }}>Question Library</Hoverable>
              <Hoverable style={{ fontSize: 13.5, fontWeight: 500, color: "var(--tx2)", cursor: "pointer" }} hoverStyle={{ color: "var(--acc)" }}>How It Works</Hoverable>
              <Hoverable onClick={vm.previewLeaderboard} style={{ fontSize: 13.5, fontWeight: 500, color: "var(--tx2)", cursor: "pointer" }} hoverStyle={{ color: "var(--acc)" }}>Leaderboard</Hoverable>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <Hoverable onClick={vm.logIn} style={{ fontSize: 13, fontWeight: 600, color: "var(--tx2)", background: "var(--card)", border: "1px solid var(--bd2)", borderRadius: 9, padding: "10px 17px", cursor: "pointer" }} hoverStyle={{ borderColor: "var(--bd3)", color: "var(--txHi)" }}>Log in</Hoverable>
            <Hoverable onClick={vm.signUp} style={{ fontSize: 13, fontWeight: 700, color: "var(--accInk)", background: "var(--accBtn)", borderRadius: 9, padding: "11px 18px", cursor: "pointer" }} hoverStyle={{ background: "var(--accBtnH)" }}>Play Free</Hoverable>
          </div>
        </div>
      </header>

      <section style={{ position: "relative", overflow: "hidden", borderBottom: "1px solid var(--bd)" }}>
        <div style={{ position: "absolute", top: 40, left: "22%", width: 380, height: 380, background: "var(--accSoft)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 180, right: 40, width: 320, height: 320, background: "var(--violSoft)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "64px 32px 80px", boxSizing: "border-box", display: "grid", gridTemplateColumns: "1.15fr .85fr", gap: 48, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 22 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, background: "var(--card)", border: "1px solid var(--bd2)", borderRadius: 999, padding: "7px 14px" }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--acc)" }} />
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, fontWeight: 600, color: "var(--acc)", letterSpacing: ".01em" }}>312 questions published by students today</span>
            </div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 54, lineHeight: 1.07, fontWeight: 700, letterSpacing: "-0.03em", color: "var(--txHi)", textWrap: "pretty" }}>Turn your curiosity into questions that top the global leaderboard.</div>
            <div style={{ fontSize: 16.5, lineHeight: 1.62, color: "var(--tx2)", maxWidth: 560, textWrap: "pretty" }}>Ask what you wonder, publish your curiosity to the global commons, and challenge your peers to sharpen every idea. Open forever, verified by students and mentors.</div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", paddingTop: 4 }}>
              <Hoverable onClick={vm.signUp} style={{ display: "flex", alignItems: "center", gap: 9, fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, color: "var(--accInk)", background: "var(--accBtn)", borderRadius: 10, padding: "15px 24px", cursor: "pointer", boxShadow: "0 4px 24px rgba(52,229,168,.22)" }} hoverStyle={{ background: "var(--accBtnH)" }}>
                Publish your first question
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M12 5l7 7-7 7" /></svg>
              </Hoverable>
              <Hoverable onClick={vm.signUp} style={{ display: "flex", alignItems: "center", gap: 9, fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 600, color: "var(--txHi)", background: "var(--card)", border: "1px solid var(--bd2)", borderRadius: 10, padding: "15px 22px", cursor: "pointer" }} hoverStyle={{ borderColor: "var(--acc)" }}>
                Browse the library
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="var(--mut)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 5.5h6v14h-6zM13.5 5.5h6v14h-6z" /></svg>
              </Hoverable>
            </div>
          </div>

          <div style={{ background: "var(--card)", border: "1px solid var(--bd3)", borderRadius: 16, padding: 24, boxShadow: "0 30px 70px var(--shadow)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, paddingBottom: 15, borderBottom: "1px solid var(--bd2)" }}>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, color: "var(--txHi)" }}>Top question-writers this month</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--mut)", background: "var(--card2)", borderRadius: 5, padding: "5px 9px", whiteSpace: "nowrap" }}>Live Global</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11, paddingTop: 15 }}>
              {vm.heroBoard.map((p) => (
                <div key={p.rank} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "11px 13px", background: "var(--card2)", border: "1px solid var(--bd)", borderRadius: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, fontWeight: 700, color: "var(--mut)", width: 20, textAlign: "center" }}>#{p.rank}</span>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, background: p.tint, flex: "0 0 34px" }}>{p.avatar}</div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--txHi)" }}>{p.name}</div>
                      <div style={{ fontSize: 11.5, color: "var(--mut)", marginTop: 2 }}>{p.deck}</div>
                    </div>
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, fontWeight: 700, color: "var(--acc)", background: "var(--accSoft)", border: "1px solid var(--accBd)", borderRadius: 999, padding: "5px 10px", whiteSpace: "nowrap" }}>{p.score} pts</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 18, paddingTop: 15, borderTop: "1px solid var(--bd2)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, fontSize: 11.5, color: "var(--mut)" }}>
              <span>Updated 4 minutes ago</span>
              <div onClick={vm.previewLeaderboard} style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--acc)", fontWeight: 600, cursor: "pointer" }}>
                View full rankings
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M12 5l7 7-7 7" /></svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "76px 0", background: "var(--rail)", borderBottom: "1px solid var(--bd)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", boxSizing: "border-box" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", maxWidth: 680, margin: "0 auto 52px" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".16em", color: "var(--acc)", marginBottom: 12 }}>Core Engine</div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 36, fontWeight: 700, letterSpacing: "-0.025em", color: "var(--txHi)" }}>Ask · publish · battle</div>
            <div style={{ fontSize: 16, lineHeight: 1.62, color: "var(--tx2)", marginTop: 12, textWrap: "pretty" }}>Three steps that turn raw student curiosity into a shared library — and then into sharper thinking.</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }}>
            {vm.landingSteps.map((s) => (
              <Hoverable key={s.step} style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 14, padding: 30 }} hoverStyle={{ borderColor: "var(--accBd)" }}>
                <div style={{ width: 48, height: 48, borderRadius: 11, background: "var(--card2)", border: "1px solid var(--bd2)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--acc)", marginBottom: 22 }}>
                  <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon} /></svg>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, fontWeight: 600, color: "var(--acc)" }}>{s.step}</div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 700, color: "var(--txHi)", margin: "8px 0 12px" }}>{s.title}</div>
                <div style={{ fontSize: 14, lineHeight: 1.62, color: "var(--tx2)", textWrap: "pretty" }}>{s.body}</div>
              </Hoverable>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "76px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", boxSizing: "border-box" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 34 }}>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 30, fontWeight: 700, letterSpacing: "-0.025em", color: "var(--txHi)" }}>Sample Questions</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }}>
            {vm.landingCards.map((c) => (
              <Hoverable
                key={c.title} onClick={vm.signUp}
                style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 14, padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "pointer" }}
                hoverStyle={{ borderColor: "var(--accBd)" }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 16 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: "var(--acc)", background: "var(--accSoft)", border: "1px solid var(--accBd)", borderRadius: 5, padding: "4px 9px" }}>{c.subject}</span>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "var(--mut)" }}>{c.age}</span>
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 17, fontWeight: 600, lineHeight: 1.38, color: "var(--txHi)", marginBottom: 12, textWrap: "pretty" }}>{c.title}</div>
                  <div style={{ fontSize: 13.5, lineHeight: 1.55, color: "var(--tx2)", marginBottom: 22, textWrap: "pretty" }}>{c.blurb}</div>
                </div>
                <div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                    {c.tags.map((t) => (
                      <span key={t} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10.5, color: "var(--mut)", background: "var(--card2)", border: "1px solid var(--bd)", borderRadius: 5, padding: "3px 8px" }}>#{t}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, paddingTop: 15, borderTop: "1px solid var(--bd)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9, minWidth: 0 }}>
                      <div style={{ width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, background: c.tint, flex: "0 0 26px" }}>{c.avatar}</div>
                      <span style={{ fontSize: 11.5, color: "var(--tx2)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.author}</span>
                    </div>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, borderRadius: 999, padding: "4px 10px", whiteSpace: "nowrap", color: c.badgeTx, background: c.badgeBg, border: `1px solid ${c.badgeBd}` }}>{c.badge}</span>
                  </div>
                </div>
              </Hoverable>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "64px 0", background: "var(--rail)", borderTop: "1px solid var(--bd)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", boxSizing: "border-box" }}>
          <div style={{ position: "relative", overflow: "hidden", background: "var(--grad)", border: "1px solid var(--gradBd)", borderRadius: 18, padding: "44px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
            <div style={{ maxWidth: 640 }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11.5, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--acc)" }}>Open Educational Commons</div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 34, fontWeight: 700, letterSpacing: "-0.025em", color: "var(--txHi)", margin: "10px 0 12px", textWrap: "pretty" }}>Every question you publish stays in the library for the next student.</div>
              <div style={{ fontSize: 15, lineHeight: 1.62, color: "var(--gradTx)", textWrap: "pretty" }}>No paywalls, no deleted threads — just an open commons of student questions, with your name on everything you write.</div>
            </div>
            <Hoverable onClick={vm.signUp} style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, color: "var(--accInk)", background: "var(--accBtn)", borderRadius: 10, padding: "15px 26px", cursor: "pointer", whiteSpace: "nowrap" }} hoverStyle={{ background: "var(--accBtnH)" }}>Play Free Now</Hoverable>
          </div>
        </div>
      </section>

      <footer style={{ marginTop: "auto", borderTop: "1px solid var(--bd)", background: "var(--rail)", padding: "44px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", boxSizing: "border-box" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 22, flexWrap: "wrap", paddingBottom: 28, borderBottom: "1px solid var(--bd)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--acc)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg viewBox="0 0 48 48" width="16" height="16" fill="#07281d"><path d="M24 4C25.78 14.22 33.78 22.22 44 24C33.78 25.78 25.78 33.78 24 44C22.22 33.78 14.22 25.78 4 24C14.22 22.22 22.22 14.22 24 4Z" /></svg>
              </div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 17, fontWeight: 700, color: "var(--txHi)" }}>Kweshun</div>
              <div style={{ fontSize: 11.5, color: "var(--mut)", marginLeft: 6 }}>Open Curiosity Commons for Global Classrooms</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 24, fontSize: 13, color: "var(--mut)" }}>
              <Hoverable style={{ cursor: "pointer" }} hoverStyle={{ color: "var(--acc)" }}>Library</Hoverable>
              <Hoverable style={{ cursor: "pointer" }} hoverStyle={{ color: "var(--acc)" }}>How it works</Hoverable>
              <Hoverable style={{ cursor: "pointer" }} hoverStyle={{ color: "var(--acc)" }}>Leaderboard</Hoverable>
              <Hoverable style={{ cursor: "pointer" }} hoverStyle={{ color: "var(--acc)" }}>Teachers &amp; Schools</Hoverable>
              <Hoverable style={{ cursor: "pointer" }} hoverStyle={{ color: "var(--acc)" }}>Code of Conduct</Hoverable>
            </div>
          </div>
          <div style={{ paddingTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", fontSize: 11.5, color: "var(--faint)" }}>
            <div>© 2026 Kweshun Open Commons. Published questions are dedicated to student learning under CC BY 4.0.</div>
            <div style={{ display: "flex", gap: 18 }}>
              <Hoverable style={{ cursor: "pointer" }} hoverStyle={{ color: "var(--mut)" }}>Privacy Policy</Hoverable>
              <Hoverable style={{ cursor: "pointer" }} hoverStyle={{ color: "var(--mut)" }}>Terms of Service</Hoverable>
              <Hoverable style={{ cursor: "pointer" }} hoverStyle={{ color: "var(--mut)" }}>API Docs</Hoverable>
            </div>
          </div>
        </div>
      </footer>
      <div onClick={vm.toLandingA} style={{ position: "fixed", left: 20, bottom: 20, zIndex: 60, fontSize: 11, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", color: "var(--tx2)", background: "var(--card)", border: "1px solid var(--bd2)", borderRadius: 999, padding: "9px 15px", cursor: "pointer" }}>Landing B · switch to dripit</div>
    </div>
  );
}
