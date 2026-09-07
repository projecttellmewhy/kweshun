import { Y, P, G, O, B, R } from "./data";

export const initialState = {
  page: "Home", qTab: "All", nTab: "All", lbTab: "Monthly",
  signedOut: true, landing: "b", collapsed: false, theme: "Dark", toast: null,
  qSearch: "", fSearch: "", qMenu: null,
  authChecked: false, authModalOpen: false, authMode: "login", authEmail: "", authPassword: "", authError: "", authLoading: false,
  myScore: 540, streak: 7, weekGain: 38,
  acctName: "Kianna Torff", acctEmail: "kianna.t@dripit.app", myAvatar: "👸", myTint: Y,
  avatarPickerOpen: false, accountOpen: false, signOutOpen: false,
  prefsOn: { invites: true, reminders: true, sounds: false },
  // composer
  cmpMode: null, cmpText: "", cmpEq: "", eqOpen: false, sketchOpen: false,
  sketchUrl: null, imgUrl: null, imgName: "", cmpSubject: "Physics", cmpLevel: "HL",
  battle: null,
  questions: [
    { id: 1, text: "If entropy always increases, how does a cell build order without breaking the second law?", deck: "Physics", plays: "1,204", acc: "58%", status: "Live" },
    { id: 2, text: "Whose security was the Warsaw Pact actually buying, if both blocs called it defensive?", deck: "History", plays: "986", acc: "74%", status: "Live" },
    { id: 3, text: "Can a market price be efficient and unjust at the same time, or is that a category error?", deck: "Economics", plays: "412", acc: "31%", status: "Pending" },
    { id: 4, text: "Why does a mitochondrion keep its own genome when the nucleus could hold it more cheaply?", deck: "Biology", plays: "2,077", acc: "81%", status: "Live" },
    { id: 5, text: "When does a divergent series still tell you something true about the function behind it?", deck: "Maths AA", plays: "0", acc: "—", status: "Draft" },
    { id: 6, text: "What is the smallest change to a bond angle that would make water a poor solvent?", deck: "Chemistry", plays: "633", acc: "44%", status: "Pending" },
    { id: 7, text: "How would you measure the temperature of a system with only three particles in it?", deck: "Physics", plays: "1,510", acc: "88%", status: "Live" },
  ],
  turns: [
    { id: 11, name: "Abram Mango", topic: "Entropy and the second law", level: "HL Physics", subject: "Physics", theirScore: 81, theirQuestion: "If entropy is a count of microstates, why does a shuffled deck feel disordered to us but not to the deck?", timer: "11h left", avatar: "🧑‍🎤", tint: P },
    { id: 12, name: "Alfonso Lubin", topic: "Cold War alliance systems", level: "HL History", subject: "History", theirScore: 68, theirQuestion: "Whose security was the alliance actually purchasing, if both blocs described the same treaty as defensive?", timer: "4h left", avatar: "🧑‍🌾", tint: G },
    { id: 13, name: "Desirae Herwitz", topic: "Market failure and externalities", level: "SL Economics", subject: "Economics", theirScore: 74, theirQuestion: "If an externality is a missing price, who is the buyer that never showed up?", timer: "38m left", avatar: "👩‍🦰", tint: O },
    { id: 14, name: "Max Cooper", topic: "Sequences and series", level: "SL Maths AA", subject: "Maths AA", theirScore: 59, theirQuestion: "Can a sequence converge for a reason that has nothing to do with how fast its terms shrink?", timer: "23h left", avatar: "🧑", tint: B },
  ],
  invites: [
    { id: 21, name: "Maren Gouse", deck: "Bonding and structure · HL Chemistry", topic: "Bonding and structure", level: "HL Chemistry", avatar: "👩", tint: O },
    { id: 22, name: "Nolan Reyes", deck: "Cellular respiration pathways · HL Biology", topic: "Cellular respiration pathways", level: "HL Biology", avatar: "🧑‍🚀", tint: P },
    { id: 23, name: "Open call", deck: "Any topic · graded on originality", topic: "Open topic", level: "Any level", avatar: "🎲", tint: B },
  ],
  history: [
    { id: 31, result: "W", name: "Max Cooper", deck: "Sequences and series", score: "84–61", when: "22m", avatar: "🧑", tint: B },
    { id: 32, result: "W", name: "Desirae Herwitz", deck: "Entropy and the second law", score: "79–72", when: "1d", avatar: "👩‍🦰", tint: O },
    { id: 33, result: "L", name: "Abram Mango", deck: "Cold War alliance systems", score: "66–83", when: "2d", avatar: "🧑‍🎤", tint: P },
    { id: 34, result: "W", name: "Ida Fritsch", deck: "Market failure and externalities", score: "88–54", when: "3d", avatar: "👩‍🏫", tint: G },
    { id: 35, result: "L", name: "Alfonso Lubin", deck: "Bonding and structure", score: "61–77", when: "5d", avatar: "🧑‍🌾", tint: G },
  ],
  requests: [
    { id: 41, name: "Maren Gouse", meta: "3 mutual friends · 385 points", score: "385", avatar: "👩", tint: O },
    { id: 42, name: "Nolan Reyes", meta: "Battled you twice this month", score: "266", avatar: "🧑‍🚀", tint: P },
  ],
  friends: [
    { id: 52, name: "Abram Mango", meta: "Composing now", score: "415", avatar: "🧑‍🎤", tint: P },
    { id: 53, name: "Alfonso Lubin", meta: "Online now", score: "390", avatar: "🧑‍🌾", tint: G },
    { id: 54, name: "Desirae Herwitz", meta: "Online now", score: "360", avatar: "👩‍🦰", tint: R },
    { id: 55, name: "Max Cooper", meta: "Last seen 1d ago", score: "290", avatar: "🧑", tint: B },
    { id: 56, name: "Ida Fritsch", meta: "Last seen 4d ago", score: "241", avatar: "👩‍🏫", tint: G },
  ],
  notifs: [
    { id: 61, who: "Abram Mango", text: "took the #1 spot on the monthly leaderboard.", time: "12 min ago", icon: "👑", tint: Y, unread: true, kind: "Battles", page: "Leaderboard" },
    { id: 62, who: "Abram Mango", text: "challenged you on Entropy and the second law.", time: "38 min ago", icon: "⚔️", tint: P, unread: true, kind: "Battles", action: "Accept battle", page: "Battles" },
    { id: 63, who: "Maren Gouse", text: "sent you a friend request.", time: "2 hours ago", icon: "👥", tint: B, unread: true, kind: "Friends", action: "Accept", page: "Friends" },
    { id: 64, who: "Your question", text: "on bond angles was approved and is now live in the library.", time: "Yesterday", icon: "✅", tint: G, unread: true, kind: "System", page: "My Questions" },
    { id: 65, who: "Alfonso Lubin", text: "out-scored your question on originality by 12 points.", time: "Yesterday", icon: "📉", tint: R, unread: true, kind: "Battles", page: "Battles" },
    { id: 66, who: "Streak saved", text: "you wrote on day 7 — bonus of 20 points added.", time: "2 days ago", icon: "🔥", tint: O, unread: false, kind: "System", page: "Home" },
    { id: 67, who: "Desirae Herwitz", text: "accepted your friend request.", time: "3 days ago", icon: "👥", tint: B, unread: false, kind: "Friends", page: "Friends" },
  ],
};
