import Hoverable from "./Hoverable";

export default function AccountModal({ vm }) {
  if (!vm.accountOpen) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(6,10,17,.72)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 45, padding: 24, overflow: "auto" }}>
      <div style={{ width: 580, maxWidth: "100%", background: "var(--card)", border: "1px solid var(--bd2)", borderRadius: 18, padding: 26, display: "flex", flexDirection: "column", gap: 20, boxShadow: "0 30px 80px var(--shadow)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 17, fontWeight: 800 }}>Profile &amp; settings</div>
          <Hoverable as="div" onClick={vm.closeAccount} style={{ color: "var(--mut)", cursor: "pointer", display: "flex" }} hoverStyle={{ color: "var(--tx)" }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </Hoverable>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, background: "var(--card2)", border: "1px solid var(--bd)", borderRadius: 14, padding: "16px 18px" }}>
          <div style={{ width: 52, height: 52, borderRadius: 15, background: vm.myTint, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flex: "0 0 52px" }}>{vm.myAvatar}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14.5, fontWeight: 700 }}>{vm.acctName}</div>
            <div style={{ fontSize: 12, color: "var(--mut)", marginTop: 2 }}>{vm.myScore} points · Rank #{vm.myRank} this month</div>
          </div>
          <Hoverable
            as="div" onClick={vm.toggleAvatarPicker}
            style={{ fontSize: 12, fontWeight: 600, color: "var(--tx2)", border: "1px solid var(--bd2)", borderRadius: 999, padding: "8px 15px", cursor: "pointer", whiteSpace: "nowrap" }}
            hoverStyle={{ borderColor: "var(--acc)", color: "var(--acc)" }}
          >
            {vm.avatarBtn}
          </Hoverable>
        </div>

        {vm.avatarPickerOpen && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", background: "var(--inset)", border: "1px solid var(--bd)", borderRadius: 13, padding: 14, animation: "dripRise .16s ease-out" }}>
            {vm.avatarOptions.map((a, i) => (
              <div key={i} onClick={a.pick} style={{ width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, cursor: "pointer", background: a.tint, border: `2px solid ${a.ring}` }}>{a.emoji}</div>
            ))}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          {vm.profileStats.map((st) => (
            <div key={st.label} style={{ background: "var(--card2)", border: "1px solid var(--bd)", borderRadius: 12, padding: 14 }}>
              <div style={{ fontSize: 11.5, color: "var(--mut)" }}>{st.label}</div>
              <div style={{ fontSize: 19, fontWeight: 800, marginTop: 5, color: st.color }}>{st.value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 12, color: "var(--mut)", fontWeight: 600 }}>Display name</div>
            <input value={vm.acctName} onChange={vm.onAcctName} style={{ background: "var(--inset)", border: "1px solid var(--bd2)", borderRadius: 11, padding: "12px 14px", color: "var(--tx)", fontSize: 13, outline: "none" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 12, color: "var(--mut)", fontWeight: 600 }}>Email</div>
            <input value={vm.acctEmail} onChange={vm.onAcctEmail} style={{ background: "var(--inset)", border: "1px solid var(--bd2)", borderRadius: 11, padding: "12px 14px", color: "var(--tx)", fontSize: 13, outline: "none" }} />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ fontSize: 12, color: "var(--mut)", fontWeight: 600, paddingBottom: 6 }}>Preferences</div>
          {vm.prefs.map((p) => (
            <div key={p.key} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 16px", background: "var(--card2)", border: "1px solid var(--bd)", borderRadius: 12, marginBottom: 8 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{p.label}</div>
                <div style={{ fontSize: 11.5, color: "var(--mut)", marginTop: 2 }}>{p.meta}</div>
              </div>
              <div onClick={p.toggle} style={{ width: 42, height: 24, borderRadius: 999, padding: 3, cursor: "pointer", display: "flex", justifyContent: p.knob, background: p.track, boxSizing: "border-box" }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff" }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, paddingTop: 16, borderTop: "1px solid var(--bd)" }}>
          <Hoverable
            as="div" onClick={vm.signOut}
            style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, fontWeight: 600, color: "var(--red)", border: "1px solid var(--redBd)", borderRadius: 999, padding: "11px 18px", cursor: "pointer" }}
            hoverStyle={{ background: "var(--redSoft)" }}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4.5H5.5v15H14M14.5 12h6M17.5 8.8l3.2 3.2-3.2 3.2" /></svg>
            Sign out
          </Hoverable>
          <Hoverable as="div" onClick={vm.saveAccount ?? vm.closeAccount} style={{ fontSize: 13, fontWeight: 700, color: "var(--accInk)", background: "var(--accBtn)", borderRadius: 999, padding: "11px 22px", cursor: "pointer" }} hoverStyle={{ background: "var(--accBtnH)" }}>Save changes</Hoverable>
        </div>
      </div>
    </div>
  );
}
