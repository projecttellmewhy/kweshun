import { GREEK } from "./data";

function grabArg(src, i) {
  if (src[i] === "{") {
    let d = 0;
    for (let j = i; j < src.length; j++) {
      if (src[j] === "{") d++;
      else if (src[j] === "}") {
        d--;
        if (!d) return [src.slice(i + 1, j), j + 1];
      }
    }
    return [src.slice(i + 1), src.length];
  }
  return [src[i] || "", i + 1];
}

// Renders a small LaTeX-ish subset (\frac, \sqrt, ^, _, greek letters) to React nodes.
export function mathNodes(src, kb) {
  const out = [];
  let i = 0, k = 0, buf = "";
  const flush = () => { if (buf) { out.push(buf); buf = ""; } };

  while (i < src.length) {
    const c = src[i];
    if (c === "\\") {
      const m = /^\\([A-Za-z]+)/.exec(src.slice(i));
      if (!m) { i++; continue; }
      const name = m[1];
      if (name === "frac") {
        i += m[0].length;
        const [num, ni] = grabArg(src, i);
        const [den, di] = grabArg(src, ni);
        i = di; flush();
        out.push(
          <span key={kb + (k++)} style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", verticalAlign: "middle", margin: "0 4px", lineHeight: 1.18, fontSize: ".88em" }}>
            <span style={{ padding: "0 4px" }}>{mathNodes(num, kb + "n" + k)}</span>
            <span style={{ borderTop: "1.4px solid currentColor", padding: "0 4px" }}>{mathNodes(den, kb + "d" + k)}</span>
          </span>
        );
        continue;
      }
      if (name === "sqrt") {
        i += m[0].length;
        const [inner, ni] = grabArg(src, i);
        i = ni; flush();
        out.push(
          <span key={kb + (k++)}>
            {"√"}
            <span style={{ borderTop: "1.4px solid currentColor", padding: "0 3px" }}>{mathNodes(inner, kb + "s" + k)}</span>
          </span>
        );
        continue;
      }
      if (GREEK[name]) { buf += GREEK[name]; i += m[0].length; continue; }
      buf += name; i += m[0].length; continue;
    }
    if (c === "^" || c === "_") {
      const [inner, ni] = grabArg(src, i + 1);
      i = ni; flush();
      const Tag = c === "^" ? "sup" : "sub";
      out.push(<Tag key={kb + (k++)} style={{ fontSize: ".62em" }}>{mathNodes(inner, kb + "x" + k)}</Tag>);
      continue;
    }
    buf += c; i++;
  }
  flush();
  return out;
}
