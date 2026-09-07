import Hoverable from "../Hoverable";

export default function Notifications({ vm }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em" }}>Notifications</div>
          <div style={{ fontSize: 14, color: "var(--mut)", marginTop: 6 }}>{vm.unreadLabel}</div>
        </div>
        <Hoverable onClick={vm.markAllRead} style={{ fontSize: 12.5, color: "var(--mut)", fontWeight: 600, border: "1px solid var(--bd2)", borderRadius: 999, padding: "10px 18px", cursor: "pointer" }} hoverStyle={{ borderColor: "var(--acc)", color: "var(--tx)" }}>Mark all as read</Hoverable>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {vm.nTabs.map((t) => (
          <div key={t.label} onClick={t.go} style={{ padding: "9px 18px", borderRadius: 999, fontSize: 12.5, fontWeight: 600, cursor: "pointer", color: t.color, background: t.bg, border: `1px solid ${t.border}` }}>{t.label}</div>
        ))}
      </div>

      <div style={{ background: "var(--card)", border: "1px solid var(--bd)", borderRadius: 18, padding: "10px 24px 22px" }}>
        {vm.notifs.map((n) => (
          <div key={n.id} onClick={n.open} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "18px 0", borderBottom: "1px solid var(--bd)", cursor: "pointer" }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flex: "0 0 38px", background: n.tint }}>{n.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, lineHeight: 1.5, color: "var(--tx2)", textWrap: "pretty" }}><strong style={{ fontWeight: 700, color: "var(--txHi)" }}>{n.who}</strong> {n.text}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
                <div style={{ fontSize: 11, color: "var(--faint)", fontFamily: "'JetBrains Mono',monospace" }}>{n.time}</div>
                <div style={{ fontSize: 11, color: "var(--vio)", fontWeight: 600 }}>{n.target}</div>
              </div>
              {n.hasAction && (
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <Hoverable
                    as="div"
                    onClick={(e) => { e.stopPropagation(); n.confirm(); }}
                    style={{ fontSize: 12, fontWeight: 700, color: "var(--accInk)", background: "var(--accBtn)", borderRadius: 999, padding: "7px 15px", cursor: "pointer" }}
                    hoverStyle={{ background: "var(--accBtnH)" }}
                  >
                    {n.action}
                  </Hoverable>
                  <Hoverable
                    as="div"
                    onClick={(e) => { e.stopPropagation(); n.dismiss(); }}
                    style={{ fontSize: 12, fontWeight: 600, color: "var(--mut)", border: "1px solid var(--bd2)", borderRadius: 999, padding: "7px 15px", cursor: "pointer" }}
                    hoverStyle={{ color: "var(--tx)", borderColor: "var(--bd3)" }}
                  >
                    Dismiss
                  </Hoverable>
                </div>
              )}
            </div>
            <div style={{ width: 8, height: 8, borderRadius: "50%", marginTop: 6, flex: "0 0 8px", background: n.dot }} />
          </div>
        ))}
        {vm.noNotifs && <div style={{ padding: 34, textAlign: "center", color: "var(--faint)", fontSize: 13 }}>Nothing here right now.</div>}
      </div>
    </div>
  );
}
