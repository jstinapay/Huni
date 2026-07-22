import { useEffect, useState } from "react";

function getModifier(): string {
  if (typeof navigator === "undefined") return "⌘";
  return /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "⌘" : "Ctrl";
}

export function useModifier() {
  const [mod, setMod] = useState<string>("⌘");
  useEffect(() => {
    setMod(getModifier());
  }, []);
  return mod;
}
