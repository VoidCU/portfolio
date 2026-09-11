"use client";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
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
export default function Atmosphere() {
  const returnFocus = useRef<HTMLElement | null>(null);
  const [off, setOff] = useState(false),
    [station, setStation] = useState<number | null>(null);
  const path = usePathname();
  useEffect(() => {
    try {
      const saved = localStorage.getItem("voidcu-lights") === "off";
      setOff(saved);
      document.documentElement.dataset.illumination = saved ? "off" : "on";
    } catch {}
    const signal = (e: Event) => {
      returnFocus.current = document.activeElement as HTMLElement;
      setStation((e as CustomEvent<number>).detail);
    };
    window.addEventListener("voidcu:signal", signal);
    return () => window.removeEventListener("voidcu:signal", signal);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) =>
          e.target.classList.toggle("is-illuminated", e.isIntersecting),
        ),
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(".cinema-section,.builder-statement,.inner-content")
      .forEach((el, i) => {
        el.classList.add("has-scene-light");
        (el as HTMLElement).style.setProperty(
          "--lamp-angle",
          `${i % 2 ? -28 : 28}deg`,
        );
        observer.observe(el);
      });
    return () => observer.disconnect();
  }, [path]);
  function toggle() {
    const value = !off;
    setOff(value);
    document.documentElement.dataset.illumination = value ? "off" : "on";
    try {
      localStorage.setItem("voidcu-lights", value ? "off" : "on");
    } catch {}
  }
  return (
    <>
      <button
        className="ambient-switch"
        type="button"
        onClick={toggle}
        aria-label={off ? "Turn ambient lights on" : "Turn ambient lights off"}
        aria-pressed={!off}
        title={off ? "Ambient lights off" : "Ambient lights on"}
      >
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          aria-hidden="true"
        >
          <path d="M8 15c0-2-3-3-3-7a7 7 0 0 1 14 0c0 4-3 5-3 7M8 16h8M9 19h6M10 22h4M12 4v6" />
        </svg>
        <span>{off ? "LIGHTS OFF" : "LIGHTS ON"}</span>
      </button>
      {station !== null && (
        <SignalRoom
          station={station}
          onClose={() => {
            setStation(null);
            requestAnimationFrame(() => returnFocus.current?.focus());
          }}
        />
      )}
    </>
  );
}
