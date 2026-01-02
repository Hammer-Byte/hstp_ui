"use client";

import { useEffect } from "react";

export default function useClickOutside(ref, onOutsideClick) {
  useEffect(() => {
    function handleMouseDown(event) {
      if (!ref.current) return;
      if (!ref.current.contains(event.target)) {
        onOutsideClick();
      }
    }

    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [ref, onOutsideClick]);
}
