// ☰ মেনু খোলা/বন্ধ — হেডারের বাটন, মেনু আর Android-এর back বাটন এই একই জায়গা থেকে চলে।
let open = false;
const listeners = new Set();

export function getMenuOpen() {
  return open;
}

export function setMenuOpen(value) {
  if (open === value) return;
  open = value;
  listeners.forEach((fn) => fn());
}

export function subscribeMenu(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
