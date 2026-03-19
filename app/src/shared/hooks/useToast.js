import { useState, useEffect, useCallback } from "react";

export default function useToast() {
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast || typeof window === "undefined") return undefined;
    const id = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(id);
  }, [toast]);

  const showToast = useCallback((message) => setToast(message), []);

  return { toast, showToast };
}
