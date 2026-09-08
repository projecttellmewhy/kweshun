import { useAppState } from "./state/useAppState";
import Landing from "./components/Landing";
import Sidebar from "./components/Sidebar";
import Toast from "./components/Toast";
import AccountModal from "./components/AccountModal";
import SignOutModal from "./components/SignOutModal";
import AuthModal from "./components/AuthModal";
import { supabaseConfigured } from "./lib/supabaseClient";
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard";
import Arena from "./components/pages/Arena";
import QuestionScore from "./components/pages/QuestionScore";
import Podium from "./components/pages/Podium";
import Inbox from "./components/pages/Inbox";
import Compose from "./components/pages/Compose";
import MyQuestions from "./components/pages/MyQuestions";
import Battles from "./components/pages/Battles";
import Friends from "./components/pages/Friends";
import Leaderboard from "./components/pages/Leaderboard";
import Notifications from "./components/pages/Notifications";

export default function App() {
  const vm = useAppState();

  if (!supabaseConfigured) {
    return (
      <div data-theme="dark" style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--tx)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ maxWidth: 480, background: "var(--card)", border: "1px solid var(--bd2)", borderRadius: 14, padding: 24, fontSize: 13.5, lineHeight: 1.6 }}>
          <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 8 }}>Supabase isn't configured</div>
          <div style={{ color: "var(--mut)" }}>
            Missing <code>VITE_SUPABASE_URL</code> and/or <code>VITE_SUPABASE_ANON_KEY</code>. Set them in your <code>.env</code> file locally, or in your deployment platform's environment variables, then rebuild.
          </div>
        </div>
      </div>
    );
  }

  if (!vm.authReady) {
    return (
      <div data-theme="dark" style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--mut)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>
        Loading…
      </div>
    );
  }

  if (vm.loggedOut) return (<><Landing vm={vm} /><AuthModal vm={vm} /><Toast vm={vm} /></>);

  return (
    <div data-theme={vm.themeAttr} style={{ display: "flex", minHeight: "100vh", background: "var(--bg)", color: "var(--tx)" }}>
      <Sidebar vm={vm} />

      <main style={{ flex: 1, minWidth: 0, padding: "34px 44px 56px", display: "flex", flexDirection: "column", gap: 26 }}>
        {vm.isHome && <Home vm={vm} />}
        {vm.isDashboard && <Dashboard vm={vm} />}
        {vm.isArena && <Arena vm={vm} />}
        {vm.isQScore && <QuestionScore vm={vm} />}
        {vm.isPodium && <Podium vm={vm} />}
        {vm.isInbox && <Inbox vm={vm} />}
        {vm.isCompose && <Compose vm={vm} />}
        {vm.isQuestions && <MyQuestions vm={vm} />}
        {vm.isBattles && <Battles vm={vm} />}
        {vm.isFriends && <Friends vm={vm} />}
        {vm.isLeaderboard && <Leaderboard vm={vm} />}
        {vm.isNotifications && <Notifications vm={vm} />}
      </main>

      <AccountModal vm={vm} />
      <SignOutModal vm={vm} />
      <AuthModal vm={vm} />
      <Toast vm={vm} />
    </div>
  );
}
