import Hoverable from "../Hoverable";

export default function MyQuestions({ vm }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em" }}>My Questions</div>
          <div style={{ fontSize: 14, color: "var(--mut)", marginTop: 6 }}>{vm.questionCount} questions authored · answered 12,480 times</div>
        </div>
        <Hoverable onClick={vm.goCompose} style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--accBtn)", color: "var(--accInk)", borderRadius: 999, padding: "11px 20px", fontSize: 13.5, fontWeight: 700, cursor: "pointer" }} hoverStyle={{ background: "var(--accBtnH)" }}>
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
          Write a question
        </Hoverable>
      </div>

      <div style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 18, padding: 24, display: "grid", gridTemplateColumns: "210px 1fr", gap: 28, alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, borderRight: "1px solid var(--bd)", paddingRight: 24 }}>
          <div style={{ fontSize: 12, color: "var(--mut)", fontWeight: 600 }}>Question quality</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
            <div style={{ fontSize: 46, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1, color: vm.qualityColor }}>{vm.qualityScore}</div>
            <div style={{ fontSize: 14, color: "var(--faint)", fontWeight: 600, paddingBottom: 6 }}>/100</div>
          </div>
          <div style={{ fontSize: 11.5, fontWeight: 700, borderRadius: 999, padding: "5px 13px", color: vm.qualityColor, background: vm.qualityBg }}>{vm.qualityGrade}</div>
          <div style={{ fontSize: 11.5, color: "var(--faint)", textAlign: "center", lineHeight: 1.5 }}>Graded across your {vm.questionCount} published questions</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {vm.qualityCriteria.map((c) => (
            <div key={c.label} style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{c.label}</div>
                <div style={{ fontSize: 11.5, color: "var(--mut)", flex: 1 }}>{c.meta}</div>
                <div style={{ fontSize: 12.5, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: c.color }}>{c.value}</div>
              </div>
              <div style={{ height: 6, borderRadius: 99, background: "var(--act)", overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 99, background: c.color, width: c.width }} />
              </div>
            </div>
          ))}
          <div style={{ fontSize: 12, color: "var(--mut)", lineHeight: 1.55, background: "var(--card2)", border: "1px solid var(--bd)", borderRadius: 11, padding: "13px 15px", textWrap: "pretty" }}>
            <strong style={{ color: "var(--tx)", fontWeight: 700 }}>To raise your grade:</strong> two of your questions repeat framings already in the library. Rewrite them to ask why rather than what, and cite the source that made you curious.
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
        <div style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 12, color: "var(--mut)" }}>Avg. answer accuracy</div>
          <div style={{ fontSize: 26, fontWeight: 800, marginTop: 6 }}>61%</div>
        </div>
        <div style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 12, color: "var(--mut)" }}>Points earned from authoring</div>
          <div style={{ fontSize: 26, fontWeight: 800, marginTop: 6 }}>128</div>
        </div>
        <div style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 12, color: "var(--mut)" }}>Strongest subject</div>
          <div style={{ fontSize: 26, fontWeight: 800, marginTop: 6 }}>Physics</div>
        </div>
      </div>

      <div style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 18, padding: "22px 24px", display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", paddingBottom: 14 }}>
          <div style={{ display: "flex", background: "var(--inset)", border: "1px solid var(--bd)", borderRadius: 11, padding: 4, gap: 2 }}>
            {vm.qTabs.map((t) => (
              <div key={t.label} onClick={t.go} style={{ padding: "8px 16px", borderRadius: 8, fontSize: 12.5, fontWeight: 600, cursor: "pointer", color: t.color, background: t.bg }}>{t.label}</div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--inset)", border: "1px solid var(--bd)", borderRadius: 10, padding: "9px 14px", minWidth: 250 }}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--faint)" strokeWidth="1.9" strokeLinecap="round"><path d="M10.5 4.5a6 6 0 100 12 6 6 0 000-12M19 19l-4.2-4.2" /></svg>
            <input value={vm.qSearch} onChange={vm.onQSearch} placeholder="Search your questions" style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--tx)", fontSize: 12.5 }} />
          </div>
        </div>

        {vm.questionGroups.map((g) => (
          <div key={g.subject}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 2px 10px" }}>
              <div style={{ width: 26, height: 26, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, background: g.tint }}>{g.icon}</div>
              <div style={{ fontSize: 13.5, fontWeight: 700 }}>{g.subject}</div>
              <div style={{ fontSize: 11.5, fontWeight: 600, color: "var(--mut)", background: "var(--act)", borderRadius: 999, padding: "3px 9px" }}>{g.count}</div>
              <div style={{ flex: 1, height: 1, background: "var(--bd)" }} />
            </div>
            {g.items.map((q) => (
              <Hoverable key={q.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 18px", background: "var(--card2)", border: "1px solid var(--bd)", borderRadius: 13, marginBottom: 10, position: "relative" }} hoverStyle={{ borderColor: "var(--bd3)" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.4, textWrap: "pretty" }}>{q.text}</div>
                  <div style={{ display: "flex", gap: 14, marginTop: 7, fontSize: 11.5, color: "var(--mut)", flexWrap: "wrap" }}>
                    <span style={{ color: "var(--vio)", fontWeight: 600 }}>{q.deck}</span>
                    <span>{q.plays} answers</span>
                    <span>{q.acc} correct</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: 600, color: q.qColor }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: q.qColor }} />Quality {q.quality}</span>
                  </div>
                </div>
                <div style={{ fontSize: 11.5, fontWeight: 700, borderRadius: 999, padding: "6px 13px", whiteSpace: "nowrap", color: q.statusColor, background: q.statusBg }}>{q.status}</div>
                <Hoverable as="div" onClick={q.toggleMenu} style={{ color: "var(--faint)", cursor: "pointer", padding: 4, display: "flex" }} hoverStyle={{ color: "var(--tx)" }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><circle cx="5" cy="12" r="1.7" /><circle cx="12" cy="12" r="1.7" /><circle cx="19" cy="12" r="1.7" /></svg>
                </Hoverable>
                {q.menuOpen && (
                  <div style={{ position: "absolute", right: 12, top: 52, zIndex: 5, background: "var(--inset)", border: "1px solid var(--bd2)", borderRadius: 11, padding: 6, minWidth: 150, boxShadow: "0 18px 40px var(--shadow)", display: "flex", flexDirection: "column", gap: 2 }}>
                    <Hoverable as="div" onClick={q.edit} style={{ padding: "9px 12px", borderRadius: 8, fontSize: 12.5, color: "var(--tx2)", cursor: "pointer" }} hoverStyle={{ background: "var(--card2)" }}>Edit question</Hoverable>
                    <Hoverable as="div" onClick={q.duplicate} style={{ padding: "9px 12px", borderRadius: 8, fontSize: 12.5, color: "var(--tx2)", cursor: "pointer" }} hoverStyle={{ background: "var(--card2)" }}>Duplicate</Hoverable>
                    <Hoverable as="div" onClick={q.remove} style={{ padding: "9px 12px", borderRadius: 8, fontSize: 12.5, color: "var(--red)", cursor: "pointer" }} hoverStyle={{ background: "var(--redSoft)" }}>Delete</Hoverable>
                  </div>
                )}
              </Hoverable>
            ))}
          </div>
        ))}
        {vm.noQuestions && (
          <div style={{ padding: 34, textAlign: "center", color: "var(--faint)", fontSize: 13 }}>No questions match this filter.</div>
        )}
      </div>
    </div>
  );
}
