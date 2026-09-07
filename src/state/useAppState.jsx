import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ICONS, PAGES, P, G, B, O, R, Y, SUBJECTS, SUBJECT_META, LEVELS, TOPICS, OPP_QUESTIONS, POOL, AVATARS,
} from "../lib/data";
import { gradeQuestion } from "../lib/grade";
import { mathNodes } from "../lib/math";
import { nid, pick } from "../lib/id";
import { initialState } from "../lib/initialState";
import { supabase } from "../lib/supabaseClient";

const GRADE_SPEED = 480;

export function useAppState() {
  const [state, setState] = useState(initialState);
  const stateRef = useRef(state);
  stateRef.current = state;

  const patch = useCallback((updater) => {
    setState((s) => ({ ...s, ...(typeof updater === "function" ? updater(s) : updater) }));
  }, []);

  const toastTimer = useRef(null);
  const gradeTimer = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const applySession = (session, isInitial) => {
      if (!mounted) return;
      const wasSignedOut = stateRef.current.signedOut;
      const next = { authChecked: true, signedOut: !session };
      if (session && (isInitial || wasSignedOut)) {
        next.acctEmail = session.user.email;
        next.acctName = session.user.email.split("@")[0];
        if (!isInitial) next.page = "Home";
      }
      if (!session && !isInitial) next.page = "Home";
      patch(next);
    };

    supabase.auth.getSession().then(({ data }) => applySession(data.session, true));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => applySession(session, false));

    return () => { mounted = false; sub.subscription.unsubscribe(); };
  }, [patch]);

  const say = useCallback((msg) => {
    clearTimeout(toastTimer.current);
    patch({ toast: msg });
    toastTimer.current = setTimeout(() => patch({ toast: null }), 2600);
  }, [patch]);

  const submitAuth = useCallback(async () => {
    const s = stateRef.current;
    const email = s.authEmail.trim();
    const password = s.authPassword;
    if (!email || !password) { patch({ authError: "Enter an email and password" }); return; }
    patch({ authLoading: true, authError: "" });

    if (s.authMode === "signup") {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) { patch({ authLoading: false, authError: error.message }); return; }
      if (!data.session) {
        patch({ authLoading: false, authModalOpen: false, authEmail: "", authPassword: "" });
        say("Check " + email + " for a confirmation link, then log in");
        return;
      }
      patch({ authLoading: false, authModalOpen: false, authEmail: "", authPassword: "" });
      say("Welcome to dripit — write your first question");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { patch({ authLoading: false, authError: error.message }); return; }
    patch({ authLoading: false, authModalOpen: false, authEmail: "", authPassword: "" });
  }, [patch, say]);

  const go = useCallback((page, msg) => {
    patch({ page, qMenu: null });
    if (msg) say(msg);
  }, [patch, say]);

  const resetComposer = useCallback((extra) => {
    patch({
      cmpText: "", cmpEq: "", eqOpen: false, sketchOpen: false,
      sketchUrl: null, imgUrl: null, imgName: "", qMenu: null,
      ...(extra || {}),
    });
  }, [patch]);

  const openLibraryCompose = useCallback((subject, level) => {
    resetComposer({
      page: "Compose", cmpMode: "library", battle: null,
      cmpSubject: subject || "Physics", cmpLevel: level || "HL",
    });
  }, [resetComposer]);

  const openBattleCompose = useCallback((b) => {
    resetComposer({
      page: "Compose", cmpMode: "battle",
      cmpSubject: b.subject || "Physics",
      battle: { ...b, phase: "compose", step: 0, dims: null, total: 0 },
    });
  }, [resetComposer]);

  const newBattle = useCallback((name, avatar, tint, topicSpec) => {
    const t = topicSpec || pick(TOPICS);
    const b = {
      id: nid(), name, avatar, tint,
      topic: t.topic, level: t.level, subject: t.subject || "Physics",
      theirScore: 55 + Math.floor(Math.random() * 33),
      theirQuestion: pick(OPP_QUESTIONS),
      timer: "24h left",
    };
    patch((s) => ({ turns: [b, ...s.turns] }));
    openBattleCompose(b);
    say("Battle opened with " + name + " — write your question");
  }, [patch, openBattleCompose, say]);

  const tick = useCallback((i) => {
    clearTimeout(gradeTimer.current);
    if (i >= 5) {
      gradeTimer.current = setTimeout(() => patch((st) => ({ battle: st.battle ? { ...st.battle, phase: "result" } : null })), 620);
      return;
    }
    gradeTimer.current = setTimeout(() => {
      patch((st) => (st.battle ? { battle: { ...st.battle, step: i + 1 } } : {}));
      tick(i + 1);
    }, GRADE_SPEED);
  }, [patch]);

  const submitCompose = useCallback(() => {
    const s = stateRef.current;
    if (!s.cmpText.trim()) { say("Write your question first"); return; }
    if (s.cmpMode === "library") {
      patch({
        questions: [{
          id: nid(), text: s.cmpText.trim(), deck: s.cmpSubject, plays: "0", acc: "—", status: "Pending",
          eq: s.cmpEq || null, img: s.imgUrl || s.sketchUrl || null,
        }, ...s.questions],
        page: "My Questions", qTab: "All", qSearch: "", cmpMode: null,
      });
      say("Published to the library — pending review");
      return;
    }
    const g = gradeQuestion(s.cmpText, !!s.cmpEq.trim(), !!(s.imgUrl || s.sketchUrl));
    patch({ battle: { ...s.battle, phase: "grading", step: 0, dims: g.dims, total: g.total } });
    tick(0);
  }, [patch, say, tick]);

  const finishBattle = useCallback(() => {
    const s = stateRef.current, b = s.battle;
    if (!b) return;
    const won = b.total >= b.theirScore;
    const pts = won ? 25 + Math.round((b.total - b.theirScore) / 4) : 8;
    patch({
      turns: s.turns.filter((t) => t.id !== b.id),
      history: [{
        id: nid(), result: won ? "W" : "L", name: b.name, deck: b.topic,
        score: b.total + "–" + b.theirScore, when: "now", avatar: b.avatar, tint: b.tint,
      }, ...s.history],
      questions: [{ id: nid(), text: s.cmpText.trim(), deck: b.subject, plays: "0", acc: "—", status: "Live" }, ...s.questions],
      myScore: s.myScore + pts,
      weekGain: s.weekGain + pts,
      battle: null, cmpMode: null, page: "Battles",
    });
    say((won ? "Battle won — +" : "Battle lost — +") + pts + " points, question added to the library");
  }, [patch, say]);

  const sketchRef = useCallback((el) => {
    if (!el || el.__wired) return;
    el.__wired = true;
    const ctx = el.getContext("2d");
    ctx.lineWidth = 3.2; ctx.lineCap = "round"; ctx.lineJoin = "round";
    let drawing = false;
    const at = (e) => {
      const r = el.getBoundingClientRect();
      return [(e.clientX - r.left) * el.width / r.width, (e.clientY - r.top) * el.height / r.height];
    };
    el.addEventListener("pointerdown", (e) => {
      drawing = true;
      try { el.setPointerCapture(e.pointerId); } catch { /* noop */ }
      ctx.strokeStyle = "#23201a";
      const [x, y] = at(e);
      ctx.beginPath(); ctx.moveTo(x, y);
    });
    el.addEventListener("pointermove", (e) => {
      if (!drawing) return;
      const [x, y] = at(e);
      ctx.lineTo(x, y); ctx.stroke();
    });
    const end = () => {
      if (!drawing) return;
      drawing = false;
      try { patch({ sketchUrl: el.toDataURL() }); } catch { /* noop */ }
    };
    el.addEventListener("pointerup", end);
    el.addEventListener("pointerleave", end);
    canvasRef.current = el;
  }, [patch]);

  const clearSketch = useCallback(() => {
    const el = canvasRef.current;
    if (el) el.getContext("2d").clearRect(0, 0, el.width, el.height);
    patch({ sketchUrl: null });
  }, [patch]);

  // ----- computed "view model", recomputed every render from state -----
  const vm = useMemo(() => {
    const s = state;
    const accent = "#34e5a8";
    const expanded = !s.collapsed;
    const hasEq = !!s.cmpEq.trim();
    const hasSketch = !!s.sketchUrl;
    const hasImage = !!s.imgUrl;
    const b = s.battle;

    const nav = PAGES.map((label) => ({
      label, icon: ICONS[label], go: () => go(label),
      bg: label === s.page ? "var(--act)" : "transparent",
      color: label === s.page ? "var(--txHi)" : "var(--mut)",
      showBadge: expanded && label === "Notifications" && s.notifs.some((n) => n.unread),
      badge: String(s.notifs.filter((n) => n.unread).length),
    }));

    const tabRow = (list, active, key) => list.map((label) => ({
      label, go: () => patch({ [key]: label }),
      bg: label === active ? "var(--act)" : "transparent",
      border: label === active ? "var(--bd3)" : "var(--bd)",
      color: label === active ? "var(--txHi)" : "var(--mut)",
    }));

    const chipRow = (list, active, key) => list.map((label) => ({
      label, pick: () => patch({ [key]: label }),
      bg: active === label ? "var(--violSoft)" : "var(--inset)",
      border: active === label ? "var(--vio)" : "var(--bd2)",
      color: active === label ? "var(--txHi)" : "var(--mut)",
    }));

    // ---- leaderboard (live, includes you) ----
    const rivalsMonthly = [
      { name: "Abram Mango", won: 73, played: 100, score: 615, avatar: "🧑‍🎤", tint: P },
      { name: "Alfonso Lubin", won: 53, played: 89, score: 490, avatar: "🧑‍🌾", tint: G },
      { name: "Maren Gouse", won: 59, played: 90, score: 385, avatar: "👩", tint: O },
      { name: "Desirae Herwitz", won: 53, played: 112, score: 360, avatar: "👩‍🦰", tint: R },
      { name: "Nolan Reyes", won: 24, played: 76, score: 324, avatar: "🧑‍🚀", tint: P },
      { name: "Max Cooper", won: 32, played: 97, score: 290, avatar: "🧑", tint: B },
      { name: "Ida Fritsch", won: 28, played: 84, score: 241, avatar: "👩‍🏫", tint: G },
    ];
    const won = s.history.filter((h) => h.result === "W").length + 55;
    const played = s.history.length + 83;
    const me = { name: s.acctName, won, played, score: s.myScore, avatar: s.myAvatar, tint: s.myTint, you: true };
    const monthly = [...rivalsMonthly, me].sort((a, x) => x.score - a.score);
    const allTime = [
      { name: "Abram Mango", won: 612, played: 840, score: 3120, avatar: "🧑‍🎤", tint: P },
      { name: "Desirae Herwitz", won: 534, played: 790, score: 2745, avatar: "👩‍🦰", tint: R },
      { name: "Alfonso Lubin", won: 498, played: 744, score: 2510, avatar: "🧑‍🌾", tint: G },
      { name: "Maren Gouse", won: 441, played: 702, score: 2288, avatar: "👩", tint: O },
      { name: "Max Cooper", won: 377, played: 688, score: 1960, avatar: "🧑", tint: B },
      { name: "Ida Fritsch", won: 302, played: 610, score: 1704, avatar: "👩‍🏫", tint: G },
      { name: s.acctName, won: won + 480, played: played + 640, score: 2860 + (s.myScore - 540), avatar: s.myAvatar, tint: s.myTint, you: true },
    ].sort((a, x) => x.score - a.score);
    const myRank = monthly.findIndex((p) => p.you) + 1;
    const above = monthly[myRank - 2];
    const below = monthly[myRank];
    const rankLine = above
      ? "You are " + (above.score - s.myScore + 1) + " points from overtaking " + above.name + "."
      : below ? "You lead " + below.name + " by " + (s.myScore - below.score) + " points. Hold it." : "You are top of the board.";

    const source = s.lbTab === "Monthly" ? monthly : allTime;
    const board = source.map((p, i) => {
      const tier = i < 3
        ? { color: "var(--acc)", bg: "var(--accSoft)", border: "var(--accBd)" }
        : i < 5
          ? { color: "var(--amb)", bg: "var(--ambSoft)", border: "var(--ambBd)" }
          : { color: "var(--red)", bg: "var(--redSoft)", border: "var(--redBd)" };
      return {
        ...p, rank: i + 1, score: p.score.toLocaleString(), ...tier,
        rowBd: p.you ? "var(--acc)" : "var(--bd)",
        challenge: () => (p.you ? patch({ accountOpen: true }) : newBattle(p.name, p.avatar, p.tint)),
      };
    });
    const podiumStyle = [
      { order: 2, size: "64px", emoji: "32px", nameSize: "14.5px", nameWeight: 800, barW: "112px", barH: "140px", barBg: "#8d9fdd", barRadius: "4px 4px 0 0", numSize: "40px", crown: true },
      { order: 1, size: "56px", emoji: "28px", nameSize: "13.5px", nameWeight: 700, barW: "104px", barH: "104px", barBg: "#6f83c4", barRadius: "4px 0 0 0", numSize: "34px", crown: false },
      { order: 3, size: "52px", emoji: "26px", nameSize: "13.5px", nameWeight: 700, barW: "100px", barH: "82px", barBg: "#5f74ba", barRadius: "0 4px 0 0", numSize: "32px", crown: false },
    ];
    const podium = source.slice(0, 3).map((p, i) => ({
      ...p, ...podiumStyle[i], rank: i + 1,
      score: p.score.toLocaleString(),
      nameColor: p.you ? "var(--acc)" : "var(--tx)",
    }));

    // ---- my questions ----
    const statusStyle = {
      Live: { statusColor: "var(--acc)", statusBg: "var(--accSoft)" },
      Pending: { statusColor: "var(--amb)", statusBg: "var(--ambSoft)" },
      Draft: { statusColor: "var(--mut)", statusBg: "var(--act)" },
    };
    const qFilter = { All: null, Live: "Live", Pending: "Pending", Drafts: "Draft" }[s.qTab];
    const questions = s.questions
      .filter((q) => !qFilter || q.status === qFilter)
      .filter((q) => q.text.toLowerCase().includes(s.qSearch.trim().toLowerCase()))
      .map((q) => {
        const g = gradeQuestion(q.text, !!q.eq, !!q.img);
        return {
          ...q, ...statusStyle[q.status],
          quality: g.total,
          qColor: g.total >= 78 ? "var(--acc)" : g.total >= 62 ? "var(--amb)" : "var(--red)",
          menuOpen: s.qMenu === q.id,
          toggleMenu: () => patch({ qMenu: s.qMenu === q.id ? null : q.id }),
          edit: () => resetComposer({
            page: "Compose", cmpMode: "library", battle: null, cmpText: q.text,
            cmpSubject: SUBJECTS.includes(q.deck) ? q.deck : "Physics", cmpEq: q.eq || "",
            eqOpen: !!q.eq, questions: s.questions.filter((x) => x.id !== q.id),
          }),
          duplicate: () => { patch({ qMenu: null, questions: [{ ...q, id: nid(), status: "Draft", plays: "0", acc: "—" }, ...s.questions] }); say("Duplicated as a draft"); },
          remove: () => { patch({ qMenu: null, questions: s.questions.filter((x) => x.id !== q.id) }); say("Question deleted"); },
        };
      });
    const overall = questions.length
      ? Math.round(questions.reduce((a, q) => a + q.quality, 0) / questions.length)
      : 0;
    const gradeOf = (n) => (n >= 85 ? "Exceptional" : n >= 75 ? "Strong" : n >= 62 ? "Developing" : "Needs work");
    const colorOf = (n) => (n >= 78 ? "var(--acc)" : n >= 62 ? "var(--amb)" : "var(--red)");
    const agg = ["Uniqueness", "Creativity", "Clarity", "Depth", "Relevance"].map((label, i) => {
      const vals = questions.map((q) => gradeQuestion(q.text, !!q.eq, !!q.img).dims[i].value);
      const v = vals.length ? Math.round(vals.reduce((a, x) => a + x, 0) / vals.length) : 0;
      const meta = ["how original against the library", "framing the grader has not seen", "one question, answerable as written", "reasoning demanded of the answerer", "fit to the IB syllabus"][i];
      return { label, meta, value: v, width: v + "%", color: colorOf(v) };
    });

    // ---- battles ----
    const turns = s.turns.map((t) => ({
      ...t,
      subtitle: "Composing battle · untimed",
      play: () => openBattleCompose(t),
    }));

    const fq = s.fSearch.trim().toLowerCase();
    const friends = s.friends
      .filter((f) => f.name.toLowerCase().includes(fq))
      .map((f) => ({ ...f, challenge: () => newBattle(f.name, f.avatar, f.tint) }));

    const notifs = s.notifs
      .filter((n) => s.nTab === "All" || n.kind === s.nTab)
      .map((n) => ({
        ...n,
        dot: n.unread ? "var(--acc)" : "var(--bd2)",
        hasAction: !!n.action,
        target: "Open " + n.page,
        open: () => {
          patch({ notifs: s.notifs.map((x) => (x.id === n.id ? { ...x, unread: false } : x)) });
          go(n.page);
        },
        confirm: () => {
          if (n.kind === "Friends") {
            patch({
              notifs: s.notifs.map((x) => (x.id === n.id ? { ...x, unread: false, action: null } : x)),
              friends: [...s.friends, { id: nid(), name: n.who, meta: "Just added", score: "385", avatar: "👩", tint: O }],
              requests: s.requests.filter((r) => r.name !== n.who),
            });
            say(n.who + " added to your friends");
          } else {
            patch({ notifs: s.notifs.map((x) => (x.id === n.id ? { ...x, unread: false, action: null } : x)) });
            newBattle(n.who, "🧑‍🎤", P, TOPICS[0]);
          }
        },
        dismiss: () => { patch({ notifs: s.notifs.filter((x) => x.id !== n.id) }); say("Notification dismissed"); },
      }));
    const unread = s.notifs.filter((n) => n.unread).length;

    // ---- composer derived ----
    const previewText = s.cmpText.trim() || "Your question appears here as you write it.";
    const shownDims = (b && b.dims ? b.dims : []).map((d, i) => {
      const on = b.step > i;
      return {
        label: d.key, note: d.note,
        shown: on ? d.value : "··",
        width: (on ? d.value : 0) + "%",
        opacity: on ? 1 : 0.42,
        color: d.value >= 78 ? "var(--acc)" : d.value >= 62 ? "var(--amb)" : "var(--red)",
      };
    });
    const revealedTotal = b && b.phase === "result" ? b.total : (b && b.dims ? Math.round(b.dims.slice(0, b.step).reduce((a, d) => a + d.value, 0) / Math.max(1, b.step)) : 0);
    const bWon = b ? b.total >= b.theirScore : false;

    const eqChips = ["\\frac{a}{b}", "^2", "_i", "\\sqrt{x}", "\\Delta", "\\pi", "\\int", "\\geq", "\\to"].map((label) => ({
      label,
      insert: () => patch({ cmpEq: s.cmpEq + (s.cmpEq && !/\s$/.test(s.cmpEq) ? " " : "") + label }),
    }));

    return {
      themeAttr: s.theme === "Light" ? "light" : "dark",

      // landing
      loggedOut: s.signedOut,
      loggedIn: !s.signedOut,
      landingA: s.signedOut && s.landing === "a",
      landingB: s.signedOut && s.landing !== "a",
      toLandingA: () => patch({ landing: "a" }),
      toLandingB: () => patch({ landing: "b" }),
      landingSteps: [
        { step: "STEP 01", title: "Ask what you wonder", icon: "M9 9a3 3 0 116 0c0 2-3 2.2-3 4.5M12 17.5h.01", body: "Write the question you got stuck on in class — with equations and diagrams if it needs them. It publishes under your name." },
        { step: "STEP 02", title: "The library keeps it", icon: "M4.5 5.5h6v14h-6zM13.5 5.5h6v14h-6z", body: "Every verified question is indexed in the open commons for any learner, classroom, or researcher to explore." },
        { step: "STEP 03", title: "Battle to sharpen it", icon: "M13 3L5 14h6l-1 7 8-11h-6z", body: "Same topic, two writers, one grader. Uniqueness, creativity, clarity, depth, relevance — the better question wins the round." },
      ],
      landingCards: [
        { subject: "Physics", age: "14m ago", tint: G, avatar: "🧑‍🔬", author: "Yuki R. · Grade 11", tags: ["ClassicalMechanics", "Kinematics"], badge: "Einstein", badgeTx: "#34e5a8", badgeBg: "rgba(52,229,168,.1)", badgeBd: "#2c4a41",
          title: "A frictionless block slides down a ramp of height h and launches off a horizontal ledge. Does doubling its mass change where it lands?",
          blurb: "Energy conservation, mass independence in ballistic trajectories, and horizontal projectile kinematics." },
        { subject: "Mathematics", age: "28m ago", tint: P, avatar: "👸", author: "Nadia Z. · Grade 12", tags: ["EuclideanGeometry", "Polygons"], badge: "Genius", badgeTx: "#7c5cff", badgeBg: "rgba(124,92,255,.12)", badgeBd: "#38306b",
          title: "One equilateral triangle is inscribed in a circle and another is circumscribed around the same circle. What is the exact ratio of their areas?",
          blurb: "Inradius and circumradius scaling, and area proportions of dual cyclic polygons." },
        { subject: "Physics", age: "52m ago", tint: B, avatar: "🧑‍🎤", author: "Marcus K. · Grade 12", tags: ["Electrostatics", "Conductors"], badge: "Excellent", badgeTx: "#f5c344", badgeBg: "rgba(245,195,68,.1)", badgeBd: "#4a3f22",
          title: "A positively charged sphere sits in electrostatic equilibrium. Place a neutral copper cube nearby — attraction, repulsion, or zero net force?",
          blurb: "Induced surface charge, field polarization, and net dipole attraction in conductors." },
        { subject: "Mathematics", age: "1h ago", tint: O, avatar: "👩", author: "Dr. Aris V. · Mentor", tags: ["Algebra", "Primes"], badge: "Einstein", badgeTx: "#34e5a8", badgeBg: "rgba(52,229,168,.1)", badgeBd: "#2c4a41",
          title: "For an integer n greater than 1, if n is composite, is 2ⁿ − 1 guaranteed to be composite too?",
          blurb: "Factorization of Mersenne numbers and divisibility when the exponent is composite." },
        { subject: "Physics", age: "2h ago", tint: Y, avatar: "🧑", author: "Chloe T. · Grade 11", tags: ["WaveOptics", "Refraction"], badge: "Good", badgeTx: "#cdd6e4", badgeBg: "#1b2536", badgeBd: "#2a3750",
          title: "Laser light crosses from vacuum into dense glass and slows down. Does its frequency drop, its wavelength drop, or both?",
          blurb: "Boundary conditions, photon energy conservation, and wavelength under refractive index." },
        { subject: "Mathematics", age: "3h ago", tint: R, avatar: "🧑‍🎓", author: "Sean D. · Grade 10", tags: ["GraphTheory", "DiscreteMath"], badge: "Genius", badgeTx: "#7c5cff", badgeBg: "rgba(124,92,255,.12)", badgeBd: "#38306b",
          title: "Remove the top-left and bottom-right squares of an 8×8 chessboard. Can the remaining 62 squares be tiled by exactly 31 dominoes?",
          blurb: "Parity invariants, bipartite colouring, and why the answer is forced before you try." },
      ],
      authReady: s.authChecked,
      logIn: () => patch({ authModalOpen: true, authMode: "login", authError: "" }),
      signUp: () => patch({ authModalOpen: true, authMode: "signup", authError: "" }),
      previewLeaderboard: () => patch({ signedOut: false, page: "Leaderboard" }),
      authModalOpen: s.authModalOpen,
      authMode: s.authMode,
      authTitle: s.authMode === "signup" ? "Create your account" : "Welcome back",
      authSubtitle: s.authMode === "signup" ? "Publish under your name and start battling" : "Log in to keep writing",
      authEmail: s.authEmail,
      onAuthEmail: (e) => patch({ authEmail: e.target.value, authError: "" }),
      authPassword: s.authPassword,
      onAuthPassword: (e) => patch({ authPassword: e.target.value, authError: "" }),
      authError: s.authError,
      authLoading: s.authLoading,
      authSubmitLabel: s.authLoading ? "Please wait…" : (s.authMode === "signup" ? "Create account" : "Log in"),
      submitAuth,
      closeAuthModal: () => patch({ authModalOpen: false, authError: "", authPassword: "" }),
      switchAuthMode: () => patch({ authMode: s.authMode === "signup" ? "login" : "signup", authError: "" }),
      switchAuthLabel: s.authMode === "signup" ? "Already have an account? Log in" : "New here? Create an account",
      heroBoard: [
        { rank: 1, name: "Abram Mango", deck: "76 questions · 91% kept", score: 615, avatar: "🧑‍🎤", tint: P },
        { rank: 2, name: "Kianna Torff", deck: "88 questions · 94% kept", score: 540, avatar: "👸", tint: Y },
        { rank: 3, name: "Alfonso Lubin", deck: "61 questions · 89% kept", score: 490, avatar: "🧑‍🌾", tint: G },
        { rank: 4, name: "Maren Gouse", deck: "58 questions · 87% kept", score: 385, avatar: "👩", tint: O },
      ],
      steps: [
        { title: "Ask what you wonder", body: "Write the question you got stuck on in class — with equations and diagrams if it needs them. It publishes under your name.", tint: P, icon: "M9 9a3 3 0 116 0c0 2-3 2.5-3 4.5M12 18.5v.01" },
        { title: "The library keeps it", body: "Every published question is open to any student anywhere — searchable, answerable, and improvable by peers.", tint: G, icon: "M4.5 5.5h6v14h-6zM13.5 5.5h6v14h-6zM7.5 9.5h0M16.5 9.5h0" },
        { title: "Battle on originality", body: "Same topic, two writers, one grader. Uniqueness, creativity, clarity, depth, relevance — the better question wins the round.", tint: B, icon: "M4 4l9 9M20 4l-9 9M13 13l2.5 2.5M13 13l-2.5 2.5M14.5 15.5l2 2 2-2-2-2M9.5 15.5l-2 2-2-2 2-2" },
      ],
      publicQuestions: [
        { text: "If entropy always increases, how does a cell build order without breaking the second law?", author: "Kianna Torff", meta: "Auckland · answered 1,204 times", topic: "Physics", avatar: "👸", tint: Y },
        { text: "Why did the Bretton Woods system need a single anchor currency at all?", author: "Abram Mango", meta: "Lagos · answered 986 times", topic: "Economics", avatar: "🧑‍🎤", tint: P },
        { text: "Can a proof be true but unprovable inside the system that states it?", author: "Alfonso Lubin", meta: "Lima · answered 744 times", topic: "Maths AA", avatar: "🧑‍🌾", tint: G },
        { text: "Who decides what counts as a primary source when the archive was written by the winners?", author: "Maren Gouse", meta: "Manchester · answered 612 times", topic: "History", avatar: "👩", tint: O },
      ],
      publicDecks: [
        { name: "Physics", meta: "9,412 questions", icon: "🧭" },
        { name: "History", meta: "7,308 questions", icon: "🏛️" },
        { name: "Maths AA", meta: "6,277 questions", icon: "📐" },
        { name: "Economics", meta: "4,190 questions", icon: "📊" },
        { name: "Biology", meta: "3,144 questions", icon: "🧬" },
      ],

      // sidebar
      nav, expanded,
      railWidth: s.collapsed ? "84px" : "232px",
      railAlign: s.collapsed ? "center" : "flex-start",
      railChevron: s.collapsed ? 180 : 0,
      toggleRail: () => patch({ collapsed: !s.collapsed }),
      goLeaderboard: () => go("Leaderboard"),
      goBattles: () => go("Battles"),
      goQuestions: () => go("My Questions"),
      goFriends: () => go("Friends"),
      goCompose: () => openLibraryCompose(s.cmpSubject, s.cmpLevel),
      pickLight: () => { patch({ theme: "Light" }); say("Warm paper theme on"); },
      pickDark: () => { patch({ theme: "Dark" }); say("Dark theme on"); },
      lightBg: s.theme === "Light" ? "var(--card)" : "transparent",
      lightColor: s.theme === "Light" ? "var(--txHi)" : "var(--mut)",
      lightWeight: s.theme === "Light" ? 700 : 400,
      darkBg: s.theme === "Dark" ? "var(--card)" : "transparent",
      darkColor: s.theme === "Dark" ? "var(--txHi)" : "var(--mut)",
      darkWeight: s.theme === "Dark" ? 700 : 400,
      myName: s.acctName,
      myFirstName: s.acctName.split(" ")[0],
      myAvatar: s.myAvatar,
      myTint: s.myTint,

      // pages
      isHome: s.page === "Home",
      isDashboard: s.page === "Dashboard",
      isArena: s.page === "Arena",
      isQScore: s.page === "Question Score",
      isPodium: s.page === "Podium",
      isInbox: s.page === "Inbox",
      acceptInvite: () => say("Invite accepted — the topic is yours to write on"),
      declineInvite: () => say("Invite skipped"),
      rematch: () => say("Rematch requested"),
      arenaBattles: [
        { name: "Aria Sterling", short: "ARIA", avatar: "👩‍🎨", tint: P, topic: "Entropy and the second law", lvl: "HL Physics", clock: "11h left", clockTx: "var(--amb)", clockBg: "var(--ambSoft)", clockBd: "var(--ambBd)", round: "Round 3 of 5", you: "2 pts", opp: "1 pt", youPct: "66%", oppPct: "34%", state: "TUG OF WAR", note: "Winner's question enters the library", cta: "Write round 3" },
        { name: "Marcus Vance", short: "MARCUS", avatar: "🧑‍💻", tint: B, topic: "Sequences and series", lvl: "SL Maths AA", clock: "38m left", clockTx: "var(--red)", clockBg: "var(--redSoft)", clockBd: "var(--redBd)", round: "Round 4 of 5", you: "1 pt", opp: "2 pts", youPct: "35%", oppPct: "65%", state: "MATCH POINT RISK", note: "Lose this round and the match is his", cta: "Write round 4" },
        { name: "Helena Rossi", short: "HELENA", avatar: "👩‍🏫", tint: G, topic: "Market failure and externalities", lvl: "HL Economics", clock: "18h left", clockTx: "var(--mut)", clockBg: "var(--inset)", clockBd: "var(--bd)", round: "Round 1 of 5", you: "0 pts", opp: "0 pts", youPct: "50%", oppPct: "50%", state: "OPENING ROUND", note: "Constraint topic just drawn", cta: "Write round 1" },
        { name: "Soren Kierk", short: "SOREN", avatar: "🧑‍🚀", tint: O, topic: "Cold War alliance systems", lvl: "HL History", clock: "21h left", clockTx: "var(--mut)", clockBg: "var(--inset)", clockBd: "var(--bd)", round: "Round 5 of 5", you: "2 pts", opp: "2 pts", youPct: "50%", oppPct: "50%", state: "DECIDING ROUND", note: "Tie-breaker — graded on all five dimensions", cta: "Write the final round" },
      ],
      arenaInvites: [
        { name: "Maren Gouse", avatar: "👩", tint: O, topic: "Cellular respiration pathways", tag: "" },
        { name: "Kianna Torff", avatar: "👸", tint: Y, topic: "Cold War alliance systems", tag: "" },
        { name: "Open contender", avatar: "🎲", tint: R, topic: "Bonding and structure", tag: "AUTO" },
      ],
      arenaLogs: [
        { res: "W", resTx: "var(--acc)", resBg: "var(--accSoft)", name: "Lucas Meyer", time: "2h ago", topic: "Sequences and series", score: "4 – 1", delta: "+120 pts", scoreTx: "var(--acc)" },
        { res: "W", resTx: "var(--acc)", resBg: "var(--accSoft)", name: "Darius Kim", time: "6h ago", topic: "Bonding and structure", score: "3 – 2", delta: "+85 pts", scoreTx: "var(--acc)" },
        { res: "L", resTx: "var(--red)", resBg: "var(--redSoft)", name: "Sarah Vance", time: "1d ago", topic: "Cold War alliance systems", score: "2 – 4", delta: "−40 pts", scoreTx: "var(--red)" },
        { res: "W", resTx: "var(--acc)", resBg: "var(--accSoft)", name: "Nadia Petrov", time: "2d ago", topic: "Entropy and the second law", score: "5 – 0", delta: "+210 pts", scoreTx: "var(--acc)" },
      ],
      qsDims: [
        { label: "Uniqueness", pct: "92%", bar: "92%", tone: "var(--acc)" },
        { label: "Creativity", pct: "88%", bar: "88%", tone: "var(--acc)" },
        { label: "Clarity", pct: "79%", bar: "79%", tone: "var(--amb)" },
        { label: "Depth", pct: "85%", bar: "85%", tone: "var(--acc)" },
        { label: "Relevance", pct: "84%", bar: "84%", tone: "var(--acc)" },
      ],
      qsTabs: [
        { label: "All", count: "7", on: true },
        { label: "In the library", count: "4", on: false },
        { label: "Pending review", count: "2", on: false },
        { label: "Drafts", count: "1", on: false },
      ],
      qsGroups: [
        { subject: "Physics", dot: "var(--acc)", count: "3 questions", meta: "Avg score 89", rows: [
          { id: "Q-8902", status: "In library", statusTx: "var(--acc)", statusBg: "var(--accSoft)", statusBd: "var(--accBd)", score: "Score 94", topic: "Entropy and the second law", text: "If entropy is a count of microstates, why does a shuffled deck feel disordered to us but not to the deck?", plays: "6,120", answered: "54%", icon: "🧭", tint: G },
          { id: "Q-8903", status: "In library", statusTx: "var(--acc)", statusBg: "var(--accSoft)", statusBd: "var(--accBd)", score: "Score 88", topic: "Bonding and structure", text: "Why does a bond length tell you more about a molecule's history than its formula does?", plays: "2,300", answered: "42%", icon: "⚗️", tint: Y },
          { id: "Q-9104", status: "Pending", statusTx: "var(--amb)", statusBg: "var(--ambSoft)", statusBd: "var(--ambBd)", score: "Score 76", topic: "Cellular respiration", text: "At what point does a cell's local accounting of order start owing something to the universe?", plays: "—", answered: "—", icon: "🧬", tint: G },
        ] },
        { subject: "History & Economics", dot: "var(--vio)", count: "2 questions", meta: "Avg score 86", rows: [
          { id: "Q-7221", status: "In library", statusTx: "var(--acc)", statusBg: "var(--accSoft)", statusBd: "var(--accBd)", score: "Score 91", topic: "Cold War alliances", text: "Whose security was the alliance actually purchasing, if both blocs called the same treaty defensive?", plays: "3,450", answered: "68%", icon: "🏛️", tint: O },
          { id: "Q-9402", status: "Draft", statusTx: "var(--mut)", statusBg: "var(--inset)", statusBd: "var(--bd)", score: "Unranked", topic: "Market failure", text: "If an externality is a missing price, who is the buyer that never showed up?", plays: "—", answered: "—", icon: "📊", tint: R },
        ] },
      ],
      podiumCards: [
        { place: "2", label: "#2 Contender", name: "Abram Mango", avatar: "🧑‍🎤", tint: P, meta: "48 / 62 rounds won", pts: "915", tone: "var(--vio)", h: "128px", lift: "0px", size: "88px", face: "40px" },
        { place: "1", label: "Champion", name: "Priya Raman", avatar: "🧑‍🔬", tint: B, meta: "71 / 96 rounds won", pts: "980", tone: "var(--amb)", h: "176px", lift: "-28px", size: "112px", face: "52px" },
        { place: "3", label: "#3 Contender", name: "Alfonso Lubin", avatar: "🧑‍🌾", tint: G, meta: "42 / 60 rounds won", pts: "870", tone: "var(--acc)", h: "104px", lift: "0px", size: "88px", face: "40px" },
      ],
      podiumRows: [
        { rank: "1", name: "Priya Raman", tier: "Master writer · Tier I", avatar: "🧑‍🔬", tint: B, won: "71 / 96", bar: "74%", barTone: "var(--acc)", pts: "980" },
        { rank: "2", name: "Abram Mango", tier: "Grandmaster", avatar: "🧑‍🎤", tint: P, won: "48 / 62", bar: "77%", barTone: "var(--vio)", pts: "915" },
        { rank: "3", name: "Alfonso Lubin", tier: "Senior tactician", avatar: "🧑‍🌾", tint: G, won: "42 / 60", bar: "70%", barTone: "var(--acc)", pts: "870" },
        { rank: "4", name: "Miracle Dokidis", tier: "Polymath", avatar: "🧑‍🚀", tint: B, won: "44 / 70", bar: "63%", barTone: "var(--vio)", pts: "845" },
        { rank: "5", name: "Talan Workman", tier: "Logic vanguard", avatar: "🧑‍💻", tint: B, won: "38 / 64", bar: "59%", barTone: "var(--vio)", pts: "790" },
        { rank: "6", name: "Emerson Saris", tier: "Aesthetic strategist", avatar: "👩‍🎨", tint: R, won: "35 / 61", bar: "57%", barTone: "var(--vio)", pts: "720" },
        { rank: "7", name: "Corey Geidt", tier: "Lore warden", avatar: "🧙", tint: O, won: "31 / 58", bar: "53%", barTone: "var(--vio)", pts: "655" },
      ],
      inboxMetrics: [
        { label: "NEEDS A REPLY", value: "3 responses", tone: "var(--acc)", bg: "var(--accSoft)", icon: "M12 7.5v6M12 16.8h.01M12 3.5l8.5 15h-17z" },
        { label: "OPEN CHALLENGES", value: "1 active", tone: "var(--vio)", bg: "var(--violSoft)", icon: "M4 4l9 9M20 4l-9 9M14.5 15.5l2 2 2-2-2-2M9.5 15.5l-2 2-2-2 2-2" },
        { label: "REVIEW VERDICT", value: "+40 pts awarded", tone: "var(--acc)", bg: "var(--accSoft)", icon: "M4.5 12.5l5 5 10-11" },
        { label: "STREAK", value: "7 days active", tone: "var(--amb)", bg: "var(--ambSoft)", icon: "M12 3s5 4.5 5 9a5 5 0 01-10 0c0-2 1-3.5 1-3.5S9 11 10.5 11C12 11 12 8 12 3z" },
      ],
      inboxTabs: [
        { label: "All", count: "7", on: true },
        { label: "Battles", count: "3", on: false },
        { label: "Questions", count: "2", on: false },
        { label: "Friends", count: "1", on: false },
        { label: "System", count: "1", on: false },
      ],
      inboxToday: [
        { title: "Abram Mango", tag: "Grandmaster", time: "18m ago", tone: "var(--vio)", bg: "var(--violSoft)", bd: "var(--violBd)", priority: "HIGH PRIORITY", icon: "M4 4l9 9M20 4l-9 9M14.5 15.5l2 2 2-2-2-2M9.5 15.5l-2 2-2-2 2-2",
          body: "Challenged you on Cellular respiration pathways — best of five rounds, untimed, graded on all five dimensions.",
          note: "Expires in 42h · 120-point pot", primary: "Accept challenge", secondary: "Decline" },
        { title: "Question kept by the library", tag: "Score 94", time: "54m ago", tone: "var(--acc)", bg: "var(--accSoft)", bd: "var(--accBd)", priority: "AUTHORED", icon: "M12 3.5l2.6 1.6 3-.3 1 2.9 2.4 1.8-1.2 2.8.4 3-2.9.9-1.8 2.4-2.9-.9-2.8 1.2-1.8-2.4-2.9-.9.4-3L2.3 9.5l2.4-1.8 1-2.9 3 .3zM9.2 12l1.9 1.9 3.7-4",
          body: "“If entropy is a count of microstates, why does a shuffled deck feel disordered to us but not to the deck?” passed review and is now answerable by anyone.",
          note: "+40 points · filed under HL Physics", primary: "View the score breakdown", secondary: "Open in library" },
        { title: "Maren Gouse", tag: "Writer", time: "2h ago", tone: "var(--mut)", bg: "var(--inset)", bd: "var(--bd)", priority: "FRIENDS", icon: "M9.5 11.5a3.4 3.4 0 100-6.8 3.4 3.4 0 000 6.8zM3 19.5c0-3.2 2.9-5 6.5-5s6.5 1.8 6.5 5M18 8v6M15 11h6",
          body: "Asked to connect. You share three open topics and two past opponents.",
          note: "385 points this season · 72% kept rate", primary: "Accept", secondary: "Ignore" },
      ],
      inboxEarlier: [
        { title: "Leaderboard shift", time: "1d ago", tone: "var(--amb)", bg: "var(--ambSoft)", icon: "M8 4.5h8v4a4 4 0 01-8 0zM12 12.5V16M9 19h6M8 5.5H5.5v2a3 3 0 003 3M16 5.5h2.5v2a3 3 0 01-3 3", body: "Priya Raman took #1 on the monthly board by 65 points. Six days remain in the window.", meta: "65 points to reclaim #1" },
        { title: "Clarity feedback", time: "1d ago", tone: "var(--amb)", bg: "var(--ambSoft)", icon: "M4 19.5h6M4 14.5h9M14.5 4.5l4 4-8 8-4 1 1-4z", body: "Your draft on market failure scored 6.4 on clarity — two reviewers flagged the second clause as doing two jobs.", meta: "+15 points on resubmission" },
        { title: "7-day streak", time: "2d ago", tone: "var(--acc)", bg: "var(--accSoft)", icon: "M12 3s5 4.5 5 9a5 5 0 01-10 0c0-2 1-3.5 1-3.5S9 11 10.5 11C12 11 12 8 12 3z", body: "You published at least one question every day for seven days. +20 bonus points banked.", meta: "Claimed" },
        { title: "Battle concluded — won 4–1", time: "3d ago", tone: "var(--acc)", bg: "var(--accSoft)", icon: "M4 4l9 9M20 4l-9 9M14.5 15.5l2 2 2-2-2-2M9.5 15.5l-2 2-2-2 2-2", body: "Lucas Meyer finished round five on sequences and series. Your round-three question swept every dimension.", meta: "+120 points" },
      ],
      tierLabel: "TIER: GRANDMASTER CADET",
      dashDecks: [
        { name: "HL Physics · Mechanics", sub: "Kinematics, energy & Newton's laws", pct: "62%", bar: "62%", tint: P, icon: "🧭" },
        { name: "SL Maths AA · Calculus", sub: "Limits, derivatives & integrals", pct: "84%", bar: "84%", tint: G, icon: "📐" },
        { name: "HL Chemistry · Reactions", sub: "Equilibrium & stoichiometry", pct: "41%", bar: "41%", tint: R, icon: "⚗️" },
      ],
      dashActivity: [
        { title: "Won round vs James C.", body: "+28 points on entropy and the second law", time: "12m ago", dot: "var(--acc)" },
        { title: "Topic milestone reached", body: "Crossed 80% of the SL Maths AA topic list", time: "2h ago", dot: "var(--vio)" },
        { title: "Question kept by the library", body: "“Why does a bond length carry a molecule's history?”", time: "5h ago", dot: "var(--amb)" },
        { title: "Lost round vs Elena V.", body: "−10 points on market failure — clarity ran 2 points behind", time: "1d ago", dot: "var(--red)" },
      ],
      goDashboard: () => patch({ page: "Dashboard" }),
      isCompose: s.page === "Compose",
      isQuestions: s.page === "My Questions",
      isBattles: s.page === "Battles",
      isFriends: s.page === "Friends",
      isLeaderboard: s.page === "Leaderboard",
      isNotifications: s.page === "Notifications",

      // home
      startBattle: () => go("Battles", "Pick an opponent and a topic"),
      playDaily: () => openLibraryCompose("Physics", "HL"),
      showStreak: () => say(s.streak + " days in a row — 20 bonus points per day"),
      questionCount: s.questions.length,
      pendingCount: s.questions.filter((q) => q.status === "Pending").length,
      myScore: s.myScore,
      weekGain: "+" + s.weekGain,
      myRank,
      rankLine,
      streak: s.streak,
      streakLabel: s.streak + "-day streak",
      won, played,
      winRate: Math.round((100 * won) / played) + "%",
      openTopics: TOPICS.slice(0, 3).map((t) => ({
        ...t, ...SUBJECT_META[t.subject],
        meta: 120 + t.topic.length * 3 + " questions so far",
        write: () => openLibraryCompose(t.subject, t.level.startsWith("HL") ? "HL" : "SL"),
      })),
      live: [
        { name: "Abram Mango", meta: "Entropy · composing now", avatar: "🧑‍🎤", tint: P, join: () => newBattle("Abram Mango", "🧑‍🎤", P, TOPICS[0]) },
        { name: "Alfonso Lubin", meta: "Cold War · looking for a rival", avatar: "🧑‍🌾", tint: G, join: () => newBattle("Alfonso Lubin", "🧑‍🌾", G, TOPICS[3]) },
        { name: "Maren Gouse", meta: "Bonding · composing now", avatar: "👩", tint: O, join: () => newBattle("Maren Gouse", "👩", O, TOPICS[5]) },
      ],
      activity: [
        { text: "You won a battle against Max Cooper, 84–61.", time: "22 min ago", dot: "var(--acc)" },
        { text: "Your question on entropy passed 1,000 answers.", time: "3 hours ago", dot: "var(--vio)" },
        { text: "Desirae Herwitz out-scored you on originality in Economics.", time: "Yesterday", dot: "var(--amb)" },
        { text: "You climbed from #3 to #" + myRank + " on the monthly board.", time: "2 days ago", dot: "var(--acc)" },
      ],

      // composer
      cmpText: s.cmpText,
      onCmpText: (e) => patch({ cmpText: e.target.value }),
      cmpEq: s.cmpEq,
      onCmpEq: (e) => patch({ cmpEq: e.target.value }),
      wordCount: s.cmpText.trim() ? s.cmpText.trim().split(/\s+/).length : 0,
      composeTitle: s.cmpMode === "battle" ? "Composing battle" : "Write a question",
      composeSub: s.cmpMode === "battle"
        ? "Against " + (b ? b.name : "") + " · the grader scores originality, not answers"
        : "Publishes to the open library under your name",
      submitLabel: s.cmpMode === "battle" ? "Submit for grading" : "Publish to library",
      submitCompose,
      cancelCompose: () => { clearTimeout(gradeTimer.current); patch({ page: s.cmpMode === "battle" ? "Battles" : "My Questions", cmpMode: null, battle: null }); },
      isBattleCompose: s.cmpMode === "battle",
      isLibraryCompose: s.cmpMode !== "battle",
      battleTopic: b ? b.topic : "",
      battleLevel: b ? b.level : "",
      eqOpen: s.eqOpen,
      toggleEq: () => patch({ eqOpen: !s.eqOpen }),
      eqBg: s.eqOpen ? "var(--accSoft)" : "var(--inset)",
      eqBorder: s.eqOpen ? "var(--acc)" : "var(--bd2)",
      eqColor: s.eqOpen ? "var(--acc)" : "var(--tx2)",
      eqChips,
      mathPreview: mathNodes(s.cmpEq || "\\Delta S \\geq 0", "m"),
      sketchOpen: s.sketchOpen,
      toggleSketch: () => patch({ sketchOpen: !s.sketchOpen }),
      skBg: s.sketchOpen ? "var(--accSoft)" : "var(--inset)",
      skBorder: s.sketchOpen ? "var(--acc)" : "var(--bd2)",
      skColor: s.sketchOpen ? "var(--acc)" : "var(--tx2)",
      sketchRef,
      clearSketch,
      hasSketch, hasEq, hasImage,
      sketchNode: s.sketchUrl ? <img src={s.sketchUrl} alt="sketch" style={{ width: "100%", borderRadius: 10, border: "1px solid var(--bd)", background: "var(--sheet)", display: "block" }} /> : null,
      imgNode: s.imgUrl ? <img src={s.imgUrl} alt="diagram" style={{ width: "100%", borderRadius: 10, border: "1px solid var(--bd)", display: "block" }} /> : null,
      imgThumb: s.imgUrl ? <img src={s.imgUrl} alt="uploaded diagram" style={{ width: 64, height: 48, objectFit: "cover", borderRadius: 8, border: "1px solid var(--bd2)", display: "block" }} /> : null,
      imgName: s.imgName,
      onPickImage: (e) => {
        const f = e.target.files && e.target.files[0];
        if (!f) return;
        const r = new FileReader();
        r.onload = () => patch({ imgUrl: r.result, imgName: f.name });
        r.readAsDataURL(f);
      },
      clearImage: () => patch({ imgUrl: null, imgName: "" }),
      subjectChips: chipRow(SUBJECTS, s.cmpSubject, "cmpSubject"),
      levelChips: chipRow(LEVELS, s.cmpLevel, "cmpLevel"),
      previewText,
      previewColor: s.cmpText.trim() ? "var(--tx)" : "var(--faint)",
      previewTag: s.cmpMode === "battle" && b ? b.topic + " · " + b.level : s.cmpSubject + " · " + s.cmpLevel,
      showPreview: !(b && b.phase !== "compose"),
      showRubric: s.cmpMode === "battle" && (!b || b.phase === "compose"),
      rubric: [
        { label: "Uniqueness", hint: "not a framing already in the library" },
        { label: "Creativity", hint: "an angle the grader has not seen" },
        { label: "Clarity", hint: "one question, answerable as written" },
        { label: "Depth", hint: "makes the answerer reason, not recall" },
        { label: "Relevance", hint: "sits inside the topic constraint" },
      ].map((r) => ({ ...r, bg: "var(--accSoft)", color: "var(--acc)", labelColor: "var(--tx)" })),
      oppName: b ? b.name : "",
      oppAvatar: b ? b.avatar : "",
      oppTint: b ? b.tint : P,
      oppScore: b ? b.theirScore : 0,
      oppQuestion: b ? b.theirQuestion : "",
      isGrading: !!(b && b.phase !== "compose"),
      isResult: !!(b && b.phase === "result"),
      gradeHeading: b && b.phase === "result" ? "Graded" : "Grading your question…",
      shownTotal: b && b.step === 0 ? "··" : revealedTotal,
      myDims: shownDims,
      verdictTitle: bWon ? "You won the round" : "They took the round",
      verdictIcon: bWon ? "🏆" : "🥈",
      verdictColor: bWon ? "var(--acc)" : "var(--amb)",
      verdictBg: bWon ? "var(--accSoft)" : "var(--ambSoft)",
      verdictBd: bWon ? "var(--accBd)" : "var(--ambBd)",
      verdictLine: b ? b.total + " vs " + b.theirScore + " on the originality index" : "",
      graderNote: b ? (bWon
        ? "Your framing asked why rather than what, and the grader found no near-duplicate in the library."
        : "Their question demanded more reasoning of the answerer. Try narrowing yours to a single mechanism.") : "",
      finishBattle,
      finishLabel: bWon ? "Bank the win" : "Back to battles",

      // questions page
      qTabs: tabRow(["All", "Live", "Pending", "Drafts"], s.qTab, "qTab"),
      questionGroups: SUBJECTS.filter((d) => questions.some((q) => q.deck === d))
        .concat([...new Set(questions.map((q) => q.deck))].filter((d) => !SUBJECTS.includes(d)))
        .map((subject) => {
          const meta = SUBJECT_META[subject] || { icon: "❓", tint: P };
          const items = questions.filter((q) => q.deck === subject);
          return { subject, ...meta, count: items.length + (items.length === 1 ? " question" : " questions"), items };
        }),
      noQuestions: questions.length === 0,
      qSearch: s.qSearch,
      onQSearch: (e) => patch({ qSearch: e.target.value }),
      qualityScore: overall,
      qualityGrade: gradeOf(overall),
      qualityColor: colorOf(overall),
      qualityBg: overall >= 78 ? "var(--accSoft)" : overall >= 62 ? "var(--ambSoft)" : "var(--redSoft)",
      qualityCriteria: agg,

      // battles page
      turns,
      turnCount: s.turns.length,
      noTurns: s.turns.length === 0,
      randomOpponent: () => { const p = pick(POOL); newBattle(p.name, p.avatar, p.tint); },
      invites: s.invites.map((i) => ({
        ...i,
        accept: () => {
          patch({ invites: s.invites.filter((x) => x.id !== i.id) });
          newBattle(i.name, i.avatar, i.tint, i.topic === "Open topic" ? null : { topic: i.topic, level: i.level, subject: i.level.split(" ")[1] || "Physics" });
        },
        skip: () => { patch({ invites: s.invites.filter((x) => x.id !== i.id) }); say("Invite skipped"); },
      })),
      noInvites: s.invites.length === 0,
      history: s.history.map((h) => ({
        ...h,
        color: h.result === "W" ? "var(--acc)" : "var(--red)",
        bg: h.result === "W" ? "var(--accSoft)" : "var(--redSoft)",
        rematch: () => newBattle(h.name, h.avatar, h.tint, TOPICS.find((t) => t.topic === h.deck) || null),
      })),

      // friends
      friends,
      noFriends: friends.length === 0,
      friendCount: s.friends.length,
      requestCount: s.requests.length,
      hasRequests: s.requests.length > 0,
      fSearch: s.fSearch,
      onFSearch: (e) => patch({ fSearch: e.target.value }),
      copyInvite: () => say("Invite link copied to clipboard"),
      requests: s.requests.map((r) => ({
        ...r,
        accept: () => {
          patch({
            requests: s.requests.filter((x) => x.id !== r.id),
            friends: [...s.friends, { id: nid(), name: r.name, meta: "Just added", score: r.score, avatar: r.avatar, tint: r.tint }],
          });
          say(r.name + " added to your friends");
        },
        decline: () => { patch({ requests: s.requests.filter((x) => x.id !== r.id) }); say("Request declined"); },
      })),

      // leaderboard
      lbTitle: s.lbTab === "Monthly" ? "Monthly Leaderboard" : "All Time Leaderboard",
      lbTabs: tabRow(["Monthly", "All Time"], s.lbTab, "lbTab"),
      board, podium,

      // notifications
      nTabs: tabRow(["All", "Battles", "Friends", "System"], s.nTab, "nTab"),
      notifs,
      noNotifs: notifs.length === 0,
      unreadLabel: unread === 0 ? "All caught up" : unread + " unread",
      markAllRead: () => { patch({ notifs: s.notifs.map((n) => ({ ...n, unread: false })) }); say("All notifications marked read"); },

      // account
      accountOpen: s.accountOpen,
      signOutOpen: s.signOutOpen,
      openAccount: () => patch({ accountOpen: true }),
      closeAccount: () => patch({ accountOpen: false, avatarPickerOpen: false }),
      acctName: s.acctName,
      acctEmail: s.acctEmail,
      onAcctName: (e) => patch({ acctName: e.target.value }),
      onAcctEmail: (e) => patch({ acctEmail: e.target.value }),
      avatarPickerOpen: s.avatarPickerOpen,
      avatarBtn: s.avatarPickerOpen ? "Done" : "Change avatar",
      toggleAvatarPicker: () => patch({ avatarPickerOpen: !s.avatarPickerOpen }),
      avatarOptions: AVATARS.map((a) => ({
        ...a,
        ring: a.emoji === s.myAvatar ? "var(--acc)" : "transparent",
        pick: () => { patch({ myAvatar: a.emoji, myTint: a.tint }); say("Avatar updated"); },
      })),
      profileStats: [
        { label: "Current streak", value: s.streak + " days", color: "var(--amb)" },
        { label: "Battles won", value: won + " / " + played, color: "var(--acc)" },
        { label: "Questions live", value: String(s.questions.filter((q) => q.status === "Live").length), color: "var(--vio)" },
      ],
      prefs: [
        { key: "invites", label: "Battle invites", meta: "Push me when a writer challenges me" },
        { key: "reminders", label: "Daily prompt reminder", meta: "One nudge at 7pm if I have not written" },
        { key: "sounds", label: "Grading sound", meta: "Play a chime when a verdict lands" },
      ].map((p) => ({
        ...p,
        track: s.prefsOn[p.key] ? "var(--accBtn)" : "var(--bd2)",
        knob: s.prefsOn[p.key] ? "flex-end" : "flex-start",
        toggle: () => patch({ prefsOn: { ...s.prefsOn, [p.key]: !s.prefsOn[p.key] } }),
      })),
      signOut: () => patch({ accountOpen: false, signOutOpen: true }),
      signOutLine: "Your " + s.turns.length + " open battles stay unjudged for 24 hours.",
      cancelSignOut: () => patch({ signOutOpen: false }),
      confirmSignOut: () => { patch({ signOutOpen: false }); supabase.auth.signOut(); },

      hasToast: !!s.toast,
      toast: s.toast,
      accent,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, patch, go, say, resetComposer, openLibraryCompose, openBattleCompose, newBattle, submitCompose, finishBattle, sketchRef, clearSketch, submitAuth]);

  return vm;
}
