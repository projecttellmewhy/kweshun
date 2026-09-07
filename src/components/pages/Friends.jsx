import Hoverable from "../Hoverable";

export default function Friends({ vm }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em" }}>Friends</div>
          <div style={{ fontSize: 14, color: "var(--mut)", marginTop: 6 }}>{vm.friendCount} friends · {vm.requestCount} requests pending</div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--inset)", border: "1px solid var(--bd)", borderRadius: 999, padding: "10px 16px", minWidth: 230 }}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--faint)" strokeWidth="1.9" strokeLinecap="round"><path d="M10.5 4.5a6 6 0 100 12 6 6 0 000-12M19 19l-4.2-4.2" /></svg>
            <input value={vm.fSearch} onChange={vm.onFSearch} placeholder="Find writers by name" style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--tx)", fontSize: 12.5 }} />
          </div>
          <Hoverable onClick={vm.copyInvite} style={{ background: "var(--accBtn)", color: "var(--accInk)", borderRadius: 999, padding: "11px 20px", fontSize: 13.5, fontWeight: 700, cursor: "pointer" }} hoverStyle={{ background: "var(--accBtnH)" }}>Invite by link</Hoverable>
        </div>
      </div>

      {vm.hasRequests && (
        <div style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 18, padding: 22, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Requests</div>
          {vm.requests.map((r) => (
            <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: "var(--card2)", border: "1px solid var(--bd)", borderRadius: 13 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, background: r.tint }}>{r.avatar}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700 }}>{r.name}</div>
                <div style={{ fontSize: 11.5, color: "var(--mut)", marginTop: 2 }}>{r.meta}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <Hoverable onClick={r.accept} style={{ fontSize: 12, fontWeight: 700, color: "var(--accInk)", background: "var(--accBtn)", borderRadius: 999, padding: "8px 16px", cursor: "pointer" }} hoverStyle={{ background: "var(--accBtnH)" }}>Accept</Hoverable>
                <Hoverable onClick={r.decline} style={{ fontSize: 12, fontWeight: 600, color: "var(--mut)", border: "1px solid var(--bd2)", borderRadius: 999, padding: "8px 16px", cursor: "pointer" }} hoverStyle={{ color: "var(--tx)", borderColor: "var(--bd3)" }}>Decline</Hoverable>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Your friends</div>
          <div style={{ fontSize: 12.5, color: "var(--mut)" }}>Sorted by score</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {vm.friends.map((f) => (
            <Hoverable key={f.id} style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 16, padding: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textAlign: "center" }} hoverStyle={{ borderColor: "var(--bd3)" }}>
              <div style={{ width: 52, height: 52, borderRadius: 15, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, background: f.tint }}>{f.avatar}</div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700 }}>{f.name}</div>
                <div style={{ fontSize: 11.5, color: "var(--mut)", marginTop: 3 }}>{f.meta}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 700, background: "var(--card2)", border: "1px solid var(--bd2)", borderRadius: 999, padding: "5px 12px" }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--acc)" }} />{f.score}
              </div>
              <Hoverable onClick={f.challenge} style={{ width: "100%", marginTop: 4, border: "1px solid var(--bd2)", color: "var(--tx2)", borderRadius: 10, padding: 9, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }} hoverStyle={{ background: "var(--card2)", borderColor: "var(--acc)" }}>Challenge</Hoverable>
            </Hoverable>
          ))}
        </div>
        {vm.noFriends && <div style={{ padding: 34, textAlign: "center", color: "var(--faint)", fontSize: 13 }}>No writers match that search.</div>}
      </div>
    </div>
  );
}
