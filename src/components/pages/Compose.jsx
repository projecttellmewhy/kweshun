import Hoverable from "../Hoverable";

export default function Compose({ vm }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em" }}>{vm.composeTitle}</div>
          <div style={{ fontSize: 14, color: "var(--mut)", marginTop: 6 }}>{vm.composeSub}</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Hoverable onClick={vm.cancelCompose} style={{ fontSize: 13, fontWeight: 600, color: "var(--mut)", border: "1px solid var(--bd2)", borderRadius: 999, padding: "11px 20px", cursor: "pointer" }} hoverStyle={{ color: "var(--tx)", borderColor: "var(--bd3)" }}>Cancel</Hoverable>
          <Hoverable onClick={vm.submitCompose} style={{ fontSize: 13, fontWeight: 700, color: "var(--accInk)", background: "var(--accBtn)", borderRadius: 999, padding: "11px 22px", cursor: "pointer" }} hoverStyle={{ background: "var(--accBtnH)" }}>{vm.submitLabel}</Hoverable>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr .95fr", gap: 20, alignItems: "start" }}>
        <div style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 18, padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
          {vm.isBattleCompose && (
            <div style={{ display: "flex", alignItems: "center", gap: 14, background: "var(--violSoft)", border: "1px solid var(--violBd)", borderRadius: 14, padding: "16px 18px" }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, background: "var(--violBtn)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 38px" }}>
                <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v16M4 8h16M6 12h12M8 16h8" /></svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--vio)" }}>Topic constraint</div>
                <div style={{ fontSize: 15, fontWeight: 700, marginTop: 3 }}>{vm.battleTopic} · {vm.battleLevel}</div>
              </div>
              <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono',monospace", color: "var(--mut)", whiteSpace: "nowrap" }}>no time limit</div>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
              <div style={{ fontSize: 12, color: "var(--mut)", fontWeight: 600 }}>Your question</div>
              <div style={{ fontSize: 11, color: "var(--faint)", fontFamily: "'JetBrains Mono',monospace" }}>{vm.wordCount} words</div>
            </div>
            <textarea
              value={vm.cmpText} onChange={vm.onCmpText} rows={4}
              placeholder="Ask something the library does not already answer. Push at a why, not a what."
              style={{ background: "var(--inset)", border: "1px solid var(--bd2)", borderRadius: 12, padding: "14px 16px", color: "var(--tx)", fontSize: 14, lineHeight: 1.55, outline: "none", resize: "vertical" }}
            />
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <div onClick={vm.toggleEq} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 15px", borderRadius: 10, fontSize: 12.5, fontWeight: 600, cursor: "pointer", color: vm.eqColor, background: vm.eqBg, border: `1px solid ${vm.eqBorder}` }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 600 }}>∑</span>Equation
            </div>
            <div onClick={vm.toggleSketch} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 15px", borderRadius: 10, fontSize: 12.5, fontWeight: 600, cursor: "pointer", color: vm.skColor, background: vm.skBg, border: `1px solid ${vm.skBorder}` }}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5l3.5-1 9.5-9.5-2.5-2.5L5 16l-1 3.5zM15.5 5l2.5 2.5" /></svg>
              Sketch a diagram
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 15px", borderRadius: 10, fontSize: 12.5, fontWeight: 600, cursor: "pointer", color: "var(--tx2)", background: "var(--inset)", border: "1px solid var(--bd2)" }}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5l4.5-5 3.5 3.5 3-3.5 4 5M4.5 4.5h15v15h-15z" /></svg>
              Upload an image
              <input type="file" accept="image/*" onChange={vm.onPickImage} style={{ display: "none" }} />
            </label>
          </div>

          {vm.eqOpen && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12, background: "var(--card2)", border: "1px solid var(--bd)", borderRadius: 14, padding: 16, animation: "dripRise .16s ease-out" }}>
              <div style={{ fontSize: 12, color: "var(--mut)", fontWeight: 600 }}>Equation · LaTeX-style</div>
              <input
                value={vm.cmpEq} onChange={vm.onCmpEq} placeholder="\Delta S = \frac{Q}{T} \geq 0"
                style={{ background: "var(--inset)", border: "1px solid var(--bd2)", borderRadius: 10, padding: "12px 14px", color: "var(--tx)", fontSize: 13, fontFamily: "'JetBrains Mono',monospace", outline: "none" }}
              />
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {vm.eqChips.map((c) => (
                  <Hoverable key={c.label} onClick={c.insert} style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: "var(--tx2)", background: "var(--inset)", border: "1px solid var(--bd2)", borderRadius: 8, padding: "6px 10px", cursor: "pointer" }} hoverStyle={{ borderColor: "var(--acc)", color: "var(--acc)" }}>{c.label}</Hoverable>
                ))}
              </div>
              <div style={{ background: "var(--inset)", border: "1px dashed var(--bd2)", borderRadius: 10, padding: 18, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 56, fontSize: 22, color: "var(--tx)", fontFamily: "'JetBrains Mono',monospace" }}>{vm.mathPreview}</div>
            </div>
          )}

          {vm.sketchOpen && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, background: "var(--card2)", border: "1px solid var(--bd)", borderRadius: 14, padding: 16, animation: "dripRise .16s ease-out" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontSize: 12, color: "var(--mut)", fontWeight: 600 }}>Sketch · drag to draw</div>
                <Hoverable as="div" onClick={vm.clearSketch} style={{ fontSize: 11.5, fontWeight: 600, color: "var(--mut)", cursor: "pointer" }} hoverStyle={{ color: "var(--red)" }}>Clear</Hoverable>
              </div>
              <canvas ref={vm.sketchRef} width={880} height={360} style={{ width: "100%", height: 220, background: "var(--sheet)", border: "1px solid var(--bd2)", borderRadius: 10, touchAction: "none", cursor: "crosshair" }} />
            </div>
          )}

          {vm.hasImage && (
            <div style={{ display: "flex", alignItems: "center", gap: 14, background: "var(--card2)", border: "1px solid var(--bd)", borderRadius: 14, padding: "14px 16px" }}>
              <div style={{ flex: "0 0 64px" }}>{vm.imgThumb}</div>
              <div style={{ flex: 1, minWidth: 0, fontSize: 12.5, color: "var(--tx2)" }}>{vm.imgName}</div>
              <Hoverable as="div" onClick={vm.clearImage} style={{ fontSize: 11.5, fontWeight: 600, color: "var(--mut)", cursor: "pointer" }} hoverStyle={{ color: "var(--red)" }}>Remove</Hoverable>
            </div>
          )}

          {vm.isLibraryCompose && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 2 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                <div style={{ fontSize: 12, color: "var(--mut)", fontWeight: 600 }}>Subject</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {vm.subjectChips.map((d) => (
                    <div key={d.label} onClick={d.pick} style={{ padding: "8px 15px", borderRadius: 999, fontSize: 12.5, fontWeight: 600, cursor: "pointer", color: d.color, background: d.bg, border: `1px solid ${d.border}` }}>{d.label}</div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                <div style={{ fontSize: 12, color: "var(--mut)", fontWeight: 600 }}>Level</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {vm.levelChips.map((d) => (
                    <div key={d.label} onClick={d.pick} style={{ padding: "8px 15px", borderRadius: 999, fontSize: 12.5, fontWeight: 600, cursor: "pointer", color: d.color, background: d.bg, border: `1px solid ${d.border}` }}>{d.label}</div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {vm.showPreview && (
            <div style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 18, padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ fontSize: 12, color: "var(--mut)", fontWeight: 600 }}>Live preview</div>
              <div style={{ background: "var(--card2)", border: "1px solid var(--bd)", borderRadius: 15, padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--vio)" }}>{vm.previewTag}</div>
                <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.45, textWrap: "pretty", color: vm.previewColor }}>{vm.previewText}</div>
                {vm.hasEq && (
                  <div style={{ background: "var(--inset)", border: "1px solid var(--bd)", borderRadius: 10, padding: 14, fontSize: 19, textAlign: "center", fontFamily: "'JetBrains Mono',monospace" }}>{vm.mathPreview}</div>
                )}
                {vm.hasSketch && <div>{vm.sketchNode}</div>}
                {vm.hasImage && <div>{vm.imgNode}</div>}
                <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 2 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, background: vm.myTint }}>{vm.myAvatar}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>{vm.myName}</div>
                    <div style={{ fontSize: 11, color: "var(--mut)", marginTop: 1 }}>just now · 0 answers</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {vm.showRubric && (
            <>
              <div style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 18, padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>What the grader looks for</div>
                {vm.rubric.map((r) => (
                  <div key={r.label} style={{ display: "flex", alignItems: "flex-start", gap: 11 }}>
                    <div style={{ width: 18, height: 18, borderRadius: 6, flex: "0 0 18px", display: "flex", alignItems: "center", justifyContent: "center", background: r.bg, color: r.color }}>
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7" /></svg>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 600, color: r.labelColor }}>{r.label}</div>
                      <div style={{ fontSize: 11.5, color: "var(--mut)", marginTop: 2, lineHeight: 1.45 }}>{r.hint}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 18, padding: 20, display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: vm.oppTint, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 21, flex: "0 0 42px", filter: "grayscale(.4)" }}>{vm.oppAvatar}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700 }}>{vm.oppName}</div>
                  <div style={{ fontSize: 11.5, color: "var(--mut)", marginTop: 2 }}>Question banked · score sealed</div>
                </div>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--faint)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 10.5V8a5.5 5.5 0 0111 0v2.5M5 10.5h14v9H5z" /></svg>
              </div>
            </>
          )}

          {vm.isGrading && (
            <div style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 18, padding: 24, display: "flex", flexDirection: "column", gap: 18, animation: "dripPop .2s ease-out" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--vio)" }} />
                <div style={{ fontSize: 14, fontWeight: 700 }}>{vm.gradeHeading}</div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
                <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1, color: "var(--acc)" }}>{vm.shownTotal}</div>
                <div style={{ fontSize: 13, color: "var(--faint)", fontWeight: 600, paddingBottom: 6 }}>/100 originality index</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {vm.myDims.map((d) => (
                  <div key={d.label} style={{ display: "flex", flexDirection: "column", gap: 7, opacity: d.opacity, transition: "opacity .3s ease" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 600 }}>{d.label}</div>
                      <div style={{ fontSize: 11.5, color: "var(--mut)", flex: 1 }}>{d.note}</div>
                      <div style={{ fontSize: 12.5, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: d.color }}>{d.shown}</div>
                    </div>
                    <div style={{ height: 7, borderRadius: 99, background: "var(--act)", overflow: "hidden" }}>
                      <div style={{ height: "100%", borderRadius: 99, background: d.color, width: d.width, transition: "width .55s cubic-bezier(.22,.9,.24,1)" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {vm.isResult && (
            <div style={{ background: vm.verdictBg, border: `1px solid ${vm.verdictBd}`, borderRadius: 18, padding: 22, display: "flex", flexDirection: "column", gap: 16, animation: "dripPop .22s ease-out" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ fontSize: 26 }}>{vm.verdictIcon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 17, fontWeight: 800, color: vm.verdictColor }}>{vm.verdictTitle}</div>
                  <div style={{ fontSize: 12.5, color: "var(--mut)", marginTop: 3 }}>{vm.verdictLine}</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, background: "var(--card2)", border: "1px solid var(--bd)", borderRadius: 13, padding: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 8, background: vm.oppTint, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>{vm.oppAvatar}</div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, flex: 1 }}>{vm.oppName}</div>
                  <div style={{ fontSize: 12.5, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace", color: "var(--vio)" }}>{vm.oppScore}</div>
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.5, color: "var(--tx2)", textWrap: "pretty" }}>{vm.oppQuestion}</div>
              </div>
              <div style={{ fontSize: 12.5, lineHeight: 1.55, color: "var(--mut)", textWrap: "pretty" }}><strong style={{ color: "var(--tx)", fontWeight: 700 }}>Grader note:</strong> {vm.graderNote}</div>
              <Hoverable onClick={vm.finishBattle} style={{ textAlign: "center", fontSize: 13, fontWeight: 700, color: "var(--accInk)", background: "var(--accBtn)", borderRadius: 11, padding: 12, cursor: "pointer" }} hoverStyle={{ background: "var(--accBtnH)" }}>{vm.finishLabel}</Hoverable>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
