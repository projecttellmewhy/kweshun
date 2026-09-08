import Hoverable from "./Hoverable";

export default function SignOutModal({ vm }) {
  if (!vm.signOutOpen) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(6,10,17,.78)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 55, padding: 24 }}>
      <div style={{ width: 380, maxWidth: "100%", background: "var(--card)", border: "1px solid var(--bd2)", borderRadius: 18, padding: 26, display: "flex", flexDirection: "column", gap: 10, textAlign: "center", alignItems: "center", boxShadow: "0 30px 80px var(--shadow)" }}>
        <div style={{ width: 44, height: 44, borderRadius: 13, background: "var(--redSoft)", border: "1px solid var(--redBd)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--red)" }}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4.5H5.5v15H14M14.5 12h6M17.5 8.8l3.2 3.2-3.2 3.2" /></svg>
        </div>
        <div style={{ fontSize: 16.5, fontWeight: 800, marginTop: 6 }}>Sign out of Kweshun?</div>
        <div style={{ fontSize: 12.5, color: "var(--mut)", lineHeight: 1.5 }}>{vm.signOutLine}</div>
        <div style={{ display: "flex", gap: 10, marginTop: 16, width: "100%" }}>
          <Hoverable as="div" onClick={vm.cancelSignOut} style={{ flex: 1, fontSize: 13, fontWeight: 600, color: "var(--tx2)", border: "1px solid var(--bd2)", borderRadius: 999, padding: 11, cursor: "pointer" }} hoverStyle={{ borderColor: "var(--bd3)" }}>Stay</Hoverable>
          <Hoverable as="div" onClick={vm.confirmSignOut} style={{ flex: 1, fontSize: 13, fontWeight: 700, color: "#fff", background: "var(--red)", borderRadius: 999, padding: 11, cursor: "pointer" }} hoverStyle={{ opacity: 0.85 }}>Sign out</Hoverable>
        </div>
      </div>
    </div>
  );
}
