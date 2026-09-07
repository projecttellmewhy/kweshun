import Hoverable from "./Hoverable";

export default function Sidebar({ vm }) {
  return (
    <aside
      style={{
        flex: "0 0 auto", background: "var(--rail)", borderRight: "1px solid var(--bd)",
        display: "flex", flexDirection: "column", padding: "20px 16px", gap: 22,
        position: "sticky", top: 0, height: "100vh", boxSizing: "border-box", width: vm.railWidth,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        {vm.expanded && (
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--acc)" }}>dripit</div>
        )}
        <Hoverable
          onClick={vm.toggleRail}
          title="Collapse sidebar"
          style={{ width: 26, height: 26, borderRadius: "50%", background: "var(--card2)", border: "1px solid var(--bd2)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--mut)", cursor: "pointer", flex: "0 0 26px" }}
          hoverStyle={{ borderColor: "var(--acc)", color: "var(--acc)" }}
        >
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${vm.railChevron}deg)` }}>
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </Hoverable>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {vm.nav.map((item) => (
          <Hoverable
            key={item.label}
            onClick={item.go}
            title={item.label}
            style={{ display: "flex", alignItems: "center", justifyContent: vm.railAlign, gap: 12, padding: "11px 14px", borderRadius: 10, fontSize: 13.5, fontWeight: 500, cursor: "pointer", color: item.color, background: item.bg }}
            hoverStyle={{ background: "var(--hov)", color: "var(--tx)" }}
          >
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 17px" }}>
              <path d={item.icon} />
            </svg>
            {vm.expanded && <span style={{ flex: 1 }}>{item.label}</span>}
            {item.showBadge && (
              <span style={{ fontSize: 10.5, fontWeight: 800, background: "var(--red)", color: "#fff", borderRadius: 999, padding: "2px 7px" }}>{item.badge}</span>
            )}
          </Hoverable>
        ))}
      </nav>

      <Hoverable
        onClick={vm.goCompose}
        title="Write a question"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "var(--accBtn)", color: "var(--accInk)", borderRadius: 11, padding: 11, fontSize: 13, fontWeight: 700, cursor: "pointer" }}
        hoverStyle={{ background: "var(--accBtnH)" }}
      >
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
        {vm.expanded && <span>Write</span>}
      </Hoverable>

      <div style={{ marginTop: "auto", paddingTop: 18, borderTop: "1px solid var(--bd)", display: "flex", background: "var(--inset)", borderRadius: 12, padding: 5, gap: 4 }}>
        <div onClick={vm.pickLight} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: 9, borderRadius: 9, fontSize: 12.5, cursor: "pointer", fontWeight: vm.lightWeight, color: vm.lightColor, background: vm.lightBg }}>
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><path d="M12 4.5v-2M12 21.5v-2M4.5 12h-2M21.5 12h-2M6.7 6.7L5.3 5.3M18.7 18.7l-1.4-1.4M6.7 17.3l-1.4 1.4M18.7 5.3l-1.4 1.4M12 8a4 4 0 100 8 4 4 0 000-8" /></svg>
          {vm.expanded && <span>Light</span>}
        </div>
        <div onClick={vm.pickDark} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: 9, borderRadius: 9, fontSize: 12.5, cursor: "pointer", fontWeight: vm.darkWeight, color: vm.darkColor, background: vm.darkBg }}>
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.5A8.5 8.5 0 019.5 4a8.5 8.5 0 1010.5 10.5z" /></svg>
          {vm.expanded && <span>Dark</span>}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 6px 2px", justifyContent: vm.railAlign }}>
        <div onClick={vm.openAccount} title={vm.myName} style={{ position: "relative", width: 38, height: 38, borderRadius: 11, background: vm.myTint, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, cursor: "pointer", flex: "0 0 38px" }}>
          {vm.myAvatar}
          <span style={{ position: "absolute", top: -3, right: -3, width: 11, height: 11, borderRadius: "50%", background: "var(--vio)", border: "2px solid var(--rail)" }} />
        </div>
        {vm.expanded && (
          <div style={{ flex: 1, minWidth: 0 }}>
            <Hoverable as="div" onClick={vm.openAccount} style={{ fontSize: 13.5, fontWeight: 700, cursor: "pointer" }} hoverStyle={{ color: "var(--acc)" }}>{vm.myName}</Hoverable>
            <Hoverable
              as="div" onClick={vm.signOut}
              style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--mut)", marginTop: 2, cursor: "pointer" }}
              hoverStyle={{ color: "var(--red)" }}
            >
              Sign out
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4.5H5.5v15H14M14.5 12h6M17.5 8.8l3.2 3.2-3.2 3.2" /></svg>
            </Hoverable>
          </div>
        )}
      </div>
    </aside>
  );
}
