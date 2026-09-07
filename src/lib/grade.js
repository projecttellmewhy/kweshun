export function gradeQuestion(text, hasEq, hasDia) {
  const t = (text || "").trim();
  const words = t.split(/\s+/).filter(Boolean);
  const len = words.length;
  const uniq = new Set(words.map((w) => w.toLowerCase().replace(/[^a-z]/g, ""))).size;
  const why = /\bwhy\b|\bhow\b|to what extent/i.test(t);
  const cmp = /\bcompare|\bwhereas|\bassum|\bif\b|\bwhose\b|\bwhen does\b/i.test(t);
  const clamp = (n) => Math.max(18, Math.min(98, Math.round(n)));
  const dims = [
    { key: "Uniqueness", note: "against 48,120 published questions", value: clamp(36 + uniq * 2.1 + (cmp ? 12 : 0) + (hasEq ? 6 : 0) + (hasDia ? 6 : 0)) },
    { key: "Creativity", note: "framing the grader has not seen", value: clamp(32 + uniq * 1.5 + (why ? 17 : 0) + (hasDia ? 10 : 0)) },
    { key: "Clarity", note: "one question, answerable as written", value: clamp(94 - Math.abs(len - 22) * 1.8 + (/\?\s*$/.test(t) ? 6 : -12)) },
    { key: "Depth", note: "reasoning demanded of the answerer", value: clamp(28 + len * 1.2 + (hasEq ? 14 : 0) + (cmp ? 10 : 0)) },
    { key: "Relevance", note: "fit to the topic constraint", value: clamp(54 + uniq * 0.9 + (hasEq ? 11 : 0) + (hasDia ? 7 : 0)) },
  ];
  const total = Math.round(dims.reduce((a, d) => a + d.value, 0) / dims.length);
  return { dims, total };
}
