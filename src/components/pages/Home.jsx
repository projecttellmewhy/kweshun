import Hoverable from "../Hoverable";

export default function Home({ vm }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em" }}>Welcome back, {vm.myFirstName}</div>
          <div style={{ fontSize: 14, color: "var(--mut)", marginTop: 6 }}>{vm.rankLine}</div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Hoverable onClick={vm.showStreak} style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--hov)", border: "1px solid var(--bd2)", borderRadius: 999, padding: "10px 16px", fontSize: 13, fontWeight: 600, color: "var(--amb)", cursor: "pointer" }} hoverStyle={{ borderColor: "var(--amb)" }}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3s5 4.5 5 9a5 5 0 01-10 0c0-2 1-3.5 1-3.5S9 11 10.5 11C12 11 12 8 12 3z" /></svg>
            {vm.streakLabel}
          </Hoverable>
          <Hoverable onClick={vm.startBattle} style={{ background: "var(--accBtn)", color: "var(--accInk)", borderRadius: 999, padding: "11px 20px", fontSize: 13.5, fontWeight: 700, cursor: "pointer" }} hoverStyle={{ background: "var(--accBtnH)" }}>Start a battle</Hoverable>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
        <Hoverable onClick={vm.goLeaderboard} style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 16, padding: 20, cursor: "pointer" }} hoverStyle={{ borderColor: "var(--bd3)" }}>
          <div style={{ fontSize: 12, color: "var(--mut)", fontWeight: 500 }}>Total score</div>
          <div style={{ fontSize: 28, fontWeight: 800, marginTop: 8 }}>{vm.myScore}</div>
          <div style={{ fontSize: 12, color: "var(--acc)", marginTop: 4, fontWeight: 600 }}>{vm.weekGain} this week</div>
        </Hoverable>
        <Hoverable onClick={vm.goBattles} style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 16, padding: 20, cursor: "pointer" }} hoverStyle={{ borderColor: "var(--bd3)" }}>
          <div style={{ fontSize: 12, color: "var(--mut)", fontWeight: 500 }}>Battles won</div>
          <div style={{ fontSize: 28, fontWeight: 800, marginTop: 8 }}>{vm.won}<span style={{ fontSize: 15, color: "var(--faint)", fontWeight: 600 }}> / {vm.played}</span></div>
          <div style={{ fontSize: 12, color: "var(--mut)", marginTop: 4, fontWeight: 500 }}>{vm.winRate} win rate</div>
        </Hoverable>
        <Hoverable onClick={vm.goQuestions} style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 16, padding: 20, cursor: "pointer" }} hoverStyle={{ borderColor: "var(--bd3)" }}>
          <div style={{ fontSize: 12, color: "var(--mut)", fontWeight: 500 }}>Questions authored</div>
          <div style={{ fontSize: 28, fontWeight: 800, marginTop: 8 }}>{vm.questionCount}</div>
          <div style={{ fontSize: 12, color: "var(--amb)", marginTop: 4, fontWeight: 600 }}>{vm.pendingCount} pending review</div>
        </Hoverable>
        <Hoverable onClick={vm.goLeaderboard} style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 16, padding: 20, cursor: "pointer" }} hoverStyle={{ borderColor: "var(--bd3)" }}>
          <div style={{ fontSize: 12, color: "var(--mut)", fontWeight: 500 }}>Monthly rank</div>
          <div style={{ fontSize: 28, fontWeight: 800, marginTop: 8 }}>#{vm.myRank}</div>
          <div style={{ fontSize: 12, color: "var(--mut)", marginTop: 4, fontWeight: 500 }}>of 1,204 writers</div>
        </Hoverable>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: 20, alignItems: "start" }}>
        <div style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 18, padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Open topics to write on</div>
            <Hoverable onClick={vm.goQuestions} style={{ fontSize: 12.5, color: "var(--mut)", fontWeight: 500, cursor: "pointer" }} hoverStyle={{ color: "var(--acc)" }}>View my questions</Hoverable>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
            {vm.openTopics.map((t) => (
              <Hoverable key={t.topic} onClick={t.write} style={{ background: "var(--card2)", border: "1px solid var(--bd)", borderRadius: 14, padding: 18, display: "flex", flexDirection: "column", gap: 12, cursor: "pointer" }} hoverStyle={{ borderColor: "var(--acc)" }}>
                <div style={{ width: 36, height: 36, borderRadius: 11, background: t.tint, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{t.icon}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{t.topic}</div>
                  <div style={{ fontSize: 11.5, color: "var(--mut)", marginTop: 3 }}>{t.level}</div>
                </div>
                <div style={{ fontSize: 11.5, color: "var(--acc)", fontWeight: 600 }}>{t.meta}</div>
              </Hoverable>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--grad)", border: "1px solid var(--gradBd)", borderRadius: 14, padding: "18px 20px", gap: 16 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Daily prompt · one original question</div>
              <div style={{ fontSize: 12, color: "var(--gradTx)", marginTop: 4 }}>Double points until midnight. Resets in 4h 12m.</div>
            </div>
            <Hoverable onClick={vm.playDaily} style={{ background: "var(--violBtn)", color: "#fff", borderRadius: 999, padding: "10px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }} hoverStyle={{ background: "var(--violBtnH)" }}>Write it</Hoverable>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 18, padding: 22, display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Writing now</div>
            {vm.live.map((row) => (
              <div key={row.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: row.tint, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>{row.avatar}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{row.name}</div>
                  <div style={{ fontSize: 11.5, color: "var(--mut)" }}>{row.meta}</div>
                </div>
                <Hoverable onClick={row.join} style={{ fontSize: 12, fontWeight: 700, color: "var(--acc)", border: "1px solid var(--accBd)", background: "var(--accSoft)", borderRadius: 999, padding: "6px 12px", cursor: "pointer" }} hoverStyle={{ borderColor: "var(--acc)" }}>Challenge</Hoverable>
              </div>
            ))}
          </div>
          <div style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 18, padding: 22, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Recent activity</div>
            {vm.activity.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", marginTop: 6, flex: "0 0 7px", background: a.dot }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, color: "var(--tx2)", lineHeight: 1.45 }}>{a.text}</div>
                  <div style={{ fontSize: 11, color: "var(--faint)", marginTop: 2, fontFamily: "'JetBrains Mono',monospace" }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
