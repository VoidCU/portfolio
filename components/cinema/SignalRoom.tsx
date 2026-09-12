"use client";
import { useEffect, useRef, useState } from "react";
import { links, flipGrid, startingGrid, routeCost } from "./signalLogic";

const KEY = "voidcu-transmission-v2";
const places = [
  "the opening coordinate",
  "the origin portrait",
  "the selected work",
  "the signal desk",
  "the final transmission",
];
const initialBoard = startingGrid;

export default function SignalRoom({
  station,
  onClose,
}: {
  station: number;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [progress, setProgress] = useState(0),
    [ready, setReady] = useState(false),
    [frequency, setFrequency] = useState(40),
    [board, setBoard] = useState(initialBoard),
    [route, setRoute] = useState<string[]>(["A"]),
    [rings, setRings] = useState([8, 5, 5]),
    [word, setWord] = useState(""),
    [message, setMessage] = useState("");
  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem(KEY));
      if (Number.isInteger(saved) && saved >= 0 && saved <= 5)
        setProgress(saved);
    } catch {}
    setReady(true);
    const previous = document.activeElement as HTMLElement | null;
    dialog.current?.showModal();
    window.dispatchEvent(new Event("voidcu:lenis-stop"));
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
      window.dispatchEvent(new Event("voidcu:lenis-start"));
      previous?.focus();
    };
  }, []);
  const locked = station > progress,
    solved = station < progress;
  function complete() {
    const next = Math.max(progress, station + 1);
    setProgress(next);
    try {
      localStorage.setItem(KEY, String(next));
    } catch {}
    setMessage(
      station === 4
        ? "Transmission complete. Someone was here, paying attention."
        : `Signal held. Look closer at ${places[station + 1]}.`,
    );
  }
  function toggleCell(index: number) {
    const copy = flipGrid(board, index);
    setBoard(copy);
    if (copy.every(Boolean)) complete();
  }
  function choose(node: string) {
    const next = [...route, node];
    setRoute(next);
    if (node === "F") {
      if (routeCost(next) <= 9) complete();
      else {
        setMessage(
          "The signal arrived, but exhausted its energy. Find a route costing no more than nine.",
        );
        setRoute(["A"]);
      }
    }
  }
  function rotate(index: number) {
    const next = rings.map(
      (r, i) => (r + (i === index ? 1 : i === (index + 1) % 3 ? 2 : 0)) % 12,
    );
    setRings(next);
    if (next.every((r) => r === 0)) complete();
  }
  return (
    <dialog
      ref={dialog}
      className="signal-room"
      aria-labelledby="signal-title"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="signal-shell">
        <div className="signal-room-top">
          <span>
            V / {String(station + 1).padStart(2, "0")} —{" "}
            {ready && solved ? "HELD" : "RECEIVING"}
          </span>
          <button
            autoFocus
            type="button"
            onClick={onClose}
            aria-label="Close transmission"
          >
            ×
          </button>
        </div>
        <h2 id="signal-title">
          {locked
            ? "An echo, out of order."
            : solved
              ? "The signal remembers."
              : [
                  "Find the frequency.",
                  "Bring the grid online.",
                  "Give the signal a route.",
                  "A moment of alignment.",
                  "Read what remains.",
                ][station]}
        </h2>
        {locked ? (
          <p>
            The previous signal waits at {places[progress]}. Nothing here is in
            a hurry.
          </p>
        ) : solved ? (
          <p>
            {station === 4
              ? "You found the quiet space between the work. Thanks for looking a little closer. — Saroj"
              : `Look closer at ${places[station + 1]}.`}
          </p>
        ) : (
          <>
            {station === 0 && (
              <div className="frequency-puzzle">
                <p>
                  The latitude in the opening frame, rounded to the nearest
                  whole degree.
                </p>
                <div
                  className="signal-wave"
                  style={{ "--frequency": frequency } as React.CSSProperties}
                >
                  <svg viewBox="0 0 400 80" aria-hidden="true">
                    <path
                      d={`M0 40 ${Array.from({ length: 81 }, (_, i) => `L${i * 5} ${40 + Math.sin(i * (frequency / 100 + 0.2)) * 24}`).join(" ")}`}
                      fill="none"
                      stroke="currentColor"
                    />
                  </svg>
                </div>
                <label>
                  Frequency <output>{frequency}</output>
                  <input
                    type="range"
                    min="1"
                    max="90"
                    value={frequency}
                    onChange={(e) => setFrequency(Number(e.target.value))}
                  />
                </label>
                <button
                  className="signal-action"
                  onClick={() =>
                    frequency === 28
                      ? complete()
                      : setMessage("Still noise. The coordinate points north.")
                  }
                >
                  Hold frequency
                </button>
              </div>
            )}
            {station === 1 && (
              <>
                <p>
                  Every switch changes itself and its immediate neighbours.
                  Leave all twenty-five cells filled. Edges do not wrap.
                </p>
                <div className="signal-grid complex-grid">
                  {board.map((on, i) => (
                    <button
                      key={i}
                      aria-label={`Cell ${i + 1}`}
                      aria-pressed={on}
                      onClick={() => toggleCell(i)}
                    >
                      <span>{on ? "●" : "○"}</span>
                    </button>
                  ))}
                </div>
                <button
                  className="signal-reset"
                  onClick={() => {
                    setBoard(initialBoard);
                    setMessage("");
                  }}
                >
                  Reset grid
                </button>
              </>
            )}
            {station === 2 && (
              <>
                <p>
                  Carry the packet from A to F. Each connection has an energy
                  cost. You have nine units. Connections run only in the
                  direction shown.
                </p>
                <div className="relay-grid">
                  {Object.keys(links).map((name) => (
                    <button
                      key={name}
                      aria-label={`Relay ${name}`}
                      disabled={
                        route.includes(name) ||
                        !(name in links[route[route.length - 1]])
                      }
                      onClick={() => choose(name)}
                    >
                      <small>
                        {route.includes(name) ? route.indexOf(name) + 1 : "·"}
                      </small>
                      {name}
                      <span className="relay-costs">
                        {Object.entries(links[name])
                          .map(([n, c]) => `${n}: ${c}`)
                          .join(" / ") || "DESTINATION"}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="route-status">
                  {route.join(" → ")} / {routeCost(route)} of 9 units
                </p>
                <button
                  className="signal-reset"
                  onClick={() => setRoute(["A"])}
                >
                  Clear route
                </button>
              </>
            )}
            {station === 3 && (
              <>
                <p>
                  Three coupled dials. Bring every pointer to north. A turn
                  advances its own dial by one hour and the next dial by two.
                  The last feeds the first.
                </p>
                <div className="alignment-map" aria-hidden="true">
                  {rings.map((r, i) => (
                    <div
                      key={i}
                      style={{
                        inset: `${i * 23}px`,
                        transform: `rotate(${r * 30}deg)`,
                      }}
                    >
                      <i />
                    </div>
                  ))}
                  <b>N</b>
                </div>
                <div className="orbit-controls">
                  {rings.map((r, i) => (
                    <button
                      key={i}
                      onClick={() => rotate(i)}
                      aria-label={`Advance dial ${i + 1}, position ${r === 0 ? 12 : r} o'clock`}
                    >
                      0{i + 1} · {r === 0 ? 12 : r}:00
                    </button>
                  ))}
                </div>
                <button
                  className="signal-reset"
                  onClick={() => setRings([8, 5, 5])}
                >
                  Reset dials
                </button>
              </>
            )}
            {station === 4 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (word.trim().toUpperCase() === "RETURN") {
                    complete();
                  } else {
                    setMessage(
                      "Subtract the sender's six-letter alias from the encrypted letters. A = 0. Wrap below A back to Z.",
                    );
                  }
                }}
              >
                <p>
                  The sender left an instruction, encrypted with the alias on
                  the signal desk. Subtract the key letter by letter, using A =
                  0 through Z = 25.
                </p>
                <div className="cipher-strip">MSBXTH</div>
                <label>
                  Decoded instruction
                  <input
                    autoComplete="off"
                    spellCheck={false}
                    maxLength={20}
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                  />
                </label>
                <button className="signal-action" type="submit">
                  Return the signal
                </button>
              </form>
            )}
          </>
        )}
        <p className="signal-message" role="status">
          {message}
        </p>
        <div
          className="signal-progress"
          aria-label={`${progress} of 5 signals held`}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <i key={i} className={progress > i ? "held" : ""} />
          ))}
        </div>
      </div>
    </dialog>
  );
}
