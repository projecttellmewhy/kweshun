let uid = 100;
export const nid = () => ++uid;
export const pick = (a) => a[Math.floor(Math.random() * a.length)];
