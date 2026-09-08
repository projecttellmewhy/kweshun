import Hoverable from "./Hoverable";

export default function ResetPasswordModal({ vm }) {
  if (!vm.resetModalOpen) return null;

  const onKeyDown = (e) => {
    if (e.key === "Enter") vm.submitNewPassword();
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(6,10,17,.78)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 60, padding: 24 }}>
      <div style={{ width: 400, maxWidth: "100%", background: "var(--card)", border: "1px solid var(--bd2)", borderRadius: 18, padding: 26, display: "flex", flexDirection: "column", gap: 18, boxShadow: "0 30px 80px var(--shadow)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800 }}>Set a new password</div>
            <div style={{ fontSize: 12.5, color: "var(--mut)", marginTop: 4 }}>You're verified — choose a new password to finish</div>
          </div>
          <Hoverable as="div" onClick={vm.closeResetModal} style={{ color: "var(--mut)", cursor: "pointer", display: "flex" }} hoverStyle={{ color: "var(--tx)" }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </Hoverable>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 12, color: "var(--mut)", fontWeight: 600 }}>New password</div>
          <input
            type="password" autoFocus value={vm.newPassword} onChange={vm.onNewPassword} onKeyDown={onKeyDown}
            style={{ background: "var(--inset)", border: "1px solid var(--bd2)", borderRadius: 11, padding: "12px 14px", color: "var(--tx)", fontSize: 13, outline: "none" }}
          />
        </div>

        {vm.resetError && (
          <div style={{ fontSize: 12.5, color: "var(--red)", background: "var(--redSoft)", border: "1px solid var(--redBd)", borderRadius: 10, padding: "10px 13px" }}>{vm.resetError}</div>
        )}

        <Hoverable
          as="div" onClick={vm.resetLoading ? undefined : vm.submitNewPassword}
          style={{ textAlign: "center", fontSize: 13, fontWeight: 700, color: "var(--accInk)", background: "var(--accBtn)", borderRadius: 999, padding: 13, cursor: vm.resetLoading ? "default" : "pointer", opacity: vm.resetLoading ? 0.7 : 1 }}
          hoverStyle={vm.resetLoading ? {} : { background: "var(--accBtnH)" }}
        >
          {vm.resetSubmitLabel}
        </Hoverable>
      </div>
    </div>
  );
}
