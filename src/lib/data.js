export const ICONS = {
  Home: "M3.5 10.5L12 3.5l8.5 7M6 9.5V20h12V9.5M10 20v-5h4v5",
  Dashboard: "M4 13h6v7H4zM4 4h6v6H4zM14 4h6v11h-6zM14 18h6v2h-6z",
  Arena: "M4 4l9 9M20 4l-9 9M14.5 15.5l2 2 2-2-2-2M9.5 15.5l-2 2-2-2 2-2",
  "Question Score": "M12 3.5a8.5 8.5 0 108.5 8.5M12 8v4l3 2",
  Podium: "M9 20V9h6v11M3 20v-6h6M15 14h6v6M11 3.5h2",
  Inbox: "M3.5 13.5h5l1.5 2.5h4l1.5-2.5h5M4.5 13.5l2-7.5h11l2 7.5v5.5H4.5z",
  "My Questions": "M4.5 4.5h5v5h-5zM14.5 4.5h5v5h-5zM4.5 14.5h5v5h-5zM14.5 14.5h5v5h-5z",
  Battles: "M4 4l9 9M20 4l-9 9M13 13l2.5 2.5M13 13l-2.5 2.5M14.5 15.5l2 2 2-2-2-2M9.5 15.5l-2 2-2-2 2-2",
  Friends: "M9 11a3.4 3.4 0 100-6.8A3.4 3.4 0 009 11zM2.8 19.8c0-3.4 2.8-5.2 6.2-5.2s6.2 1.8 6.2 5.2M16.2 4.6a3.4 3.4 0 010 6.6M17.6 14.9c2.4.5 3.6 2.2 3.6 4.9",
  Leaderboard: "M5 20v-7.5M12 20V4.5M19 20v-5",
  Notifications: "M6.2 9.2a5.8 5.8 0 1111.6 0c0 3.8 1.5 5.4 1.5 5.4H4.7s1.5-1.6 1.5-5.4zM9.9 18.4a2.2 2.2 0 004.2 0",
};

export const PAGES = ["Home", "Dashboard", "My Questions", "Question Score", "Battles", "Arena", "Friends", "Leaderboard", "Podium", "Notifications", "Inbox"];

export const P = "#3b2a6b", G = "#1e4a3c", B = "#1e3a5f", O = "#5a3a24", R = "#5a2436", Y = "#5a4a1e";

export const SUBJECTS = ["Physics", "Biology", "Maths AA", "History", "Economics", "Chemistry"];

export const SUBJECT_META = {
  Physics: { icon: "🧭", tint: P }, Biology: { icon: "🧬", tint: G }, "Maths AA": { icon: "📐", tint: B },
  History: { icon: "🏛️", tint: O }, Economics: { icon: "📊", tint: R }, Chemistry: { icon: "⚗️", tint: Y },
};

export const LEVELS = ["SL", "HL"];

export const TOPICS = [
  { topic: "Entropy and the second law", level: "HL Physics", subject: "Physics" },
  { topic: "Cellular respiration pathways", level: "HL Biology", subject: "Biology" },
  { topic: "Sequences and series", level: "SL Maths AA", subject: "Maths AA" },
  { topic: "Cold War alliance systems", level: "HL History", subject: "History" },
  { topic: "Market failure and externalities", level: "SL Economics", subject: "Economics" },
  { topic: "Bonding and structure", level: "HL Chemistry", subject: "Chemistry" },
];

export const OPP_QUESTIONS = [
  "If entropy is a count of microstates, why does a shuffled deck feel disordered to us but not to the deck?",
  "A cell spends ATP to build order — at what point does the accounting stop being local and start owing the universe?",
  "Can a sequence converge for a reason that has nothing to do with how fast its terms shrink?",
  "Whose security was the alliance actually purchasing, if both blocs described the same treaty as defensive?",
  "If an externality is a missing price, who is the buyer that never showed up?",
  "Why does a bond length tell you more about a molecule's history than its formula does?",
];

export const POOL = [
  { name: "Ida Fritsch", avatar: "👩‍🏫", tint: G },
  { name: "Theo Bloom", avatar: "🧑‍🍳", tint: O },
  { name: "Rae Ellis", avatar: "👩‍🎨", tint: R },
  { name: "Sam Okoro", avatar: "🧑‍💻", tint: B },
];

export const AVATARS = [
  { emoji: "👩", tint: O }, { emoji: "🧑", tint: B }, { emoji: "👸", tint: Y }, { emoji: "🧑‍🎤", tint: P },
  { emoji: "👩‍🎨", tint: R }, { emoji: "🧑‍💻", tint: B }, { emoji: "👩‍🏫", tint: G }, { emoji: "🧑‍🚀", tint: P },
  { emoji: "🦊", tint: O }, { emoji: "🐙", tint: R }, { emoji: "🌱", tint: G }, { emoji: "⚡", tint: Y },
];

export const GREEK = {
  alpha: "α", beta: "β", gamma: "γ", delta: "δ", Delta: "Δ", epsilon: "ε", theta: "θ", lambda: "λ",
  mu: "μ", nu: "ν", pi: "π", rho: "ρ", sigma: "σ", Sigma: "Σ", phi: "φ", omega: "ω", Omega: "Ω",
  partial: "∂", infty: "∞", times: "×", cdot: "·", approx: "≈", neq: "≠", leq: "≤", geq: "≥",
  pm: "±", to: "→", rightarrow: "→", int: "∫", sum: "∑", propto: "∝", in: "∈", cdots: "⋯", ln: "ln", log: "log",
};
