import { Y, P, G, O, B, R } from "./data";

export const initialState = {
  page: "Home", qTab: "All", nTab: "All", lbTab: "Monthly",
  signedOut: true, collapsed: false, theme: "Dark", toast: null,
  qSearch: "", fSearch: "", qMenu: null,
  authChecked: false, authModalOpen: false, authMode: "login", authEmail: "", authPassword: "", authError: "", authLoading: false,
  resetModalOpen: false, newPassword: "", resetError: "", resetLoading: false,
  myScore: 540, streak: 7, weekGain: 38,
  acctId: null, acctName: "Kianna Torff", acctEmail: "kianna.t@kweshun.app", myAvatar: "👸", myTint: Y,
  addQuery: "", addResults: [],
  avatarPickerOpen: false, accountOpen: false, signOutOpen: false,
  prefsOn: { invites: true, reminders: true, sounds: false },
  // composer
  cmpMode: null, cmpText: "", cmpEq: "", eqOpen: false, sketchOpen: false,
  sketchUrl: null, imgUrl: null, imgName: "", cmpSubject: "Physics", cmpLevel: "HL",
  battle: null,
  questions: [],
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
  requests: [],
  friends: [],
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
