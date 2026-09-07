import { useState } from "react";

// Mirrors the prototype's `style-hover` attribute: merges an extra style
// object in only while the pointer is over the element.
export default function Hoverable({ as: Tag = "div", style, hoverStyle, children, ...rest }) {
  const [hover, setHover] = useState(false);
  const merged = hover && hoverStyle ? { ...style, ...hoverStyle } : style;
  return (
    <Tag
      style={merged}
      onMouseEnter={(e) => { setHover(true); rest.onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setHover(false); rest.onMouseLeave?.(e); }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
