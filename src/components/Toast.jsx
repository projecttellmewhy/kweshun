export default function Toast({ vm }) {
  if (!vm.hasToast) return null;
  return (
    <div
      style={{
        position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)",
        background: "var(--card2)", border: "1px solid var(--acc)", color: "var(--tx)",
        fontSize: 13, fontWeight: 600, padding: "13px 20px", borderRadius: 999,
        boxShadow: "0 18px 40px var(--shadow)", zIndex: 60, animation: "dripToast .18s ease-out",
      }}
    >
      {vm.toast}
    </div>
  );
}
