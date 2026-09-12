"use client";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
const SignalRoom = dynamic(() => import("./SignalRoom"), { ssr: false });
export function SignalMark({
  station,
  children,
  className = "",
}: {
  station: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`signal-mark ${className}`}
      aria-label={`Inspect marker ${String(station + 1).padStart(2, "0")}`}
      onClick={() =>
        window.dispatchEvent(
          new CustomEvent("voidcu:signal", { detail: station }),
        )
      }
    >
      {children}
    </button>
  );
}
export default function SignalPortal() {
  const [station, setStation] = useState<number | null>(null),
    returnFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const signal = (e: Event) => {
      returnFocus.current = document.activeElement as HTMLElement;
      setStation((e as CustomEvent<number>).detail);
    };
    window.addEventListener("voidcu:signal", signal);
    return () => window.removeEventListener("voidcu:signal", signal);
  }, []);
  return station === null ? null : (
    <SignalRoom
      key={station}
      station={station}
      onClose={() => {
        setStation(null);
        requestAnimationFrame(() => returnFocus.current?.focus());
      }}
    />
  );
}
