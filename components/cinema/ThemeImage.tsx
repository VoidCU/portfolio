"use client";
import Image, { type ImageProps } from "next/image";
import { useSyncExternalStore } from "react";

function subscribe(notify: () => void) {
  const observer = new MutationObserver(notify);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}
export function useDaylight() {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.theme === "light",
    () => false,
  );
}
const paired = new Set([
  "saroj-opening",
  "saroj-editorial",
  "story-origin",
  "story-workshop",
  "story-horizon",
  "orbital-himalaya",
  "journal-context",
  "journal-machine",
  "journal-time",
  "contact-invitation",
  "audio-material",
  "cover-origin",
  "cover-projects",
  "cover-opensource",
  "cover-systems",
  "cover-journey",
  "cover-collaboration",
  "cover-notes",
  "cover-now",
  "cover-contact",
]);
export default function ThemeImage({ src, alt, ...props }: ImageProps) {
  const daylight = useDaylight();
  const name =
    typeof src === "string"
      ? src.match(/^\/assets\/art\/(.+)\.webp$/)?.[1]
      : undefined;
  const resolved =
    daylight && name && paired.has(name) ? `/assets/art/${name}-day.webp` : src;
  return <Image {...props} src={resolved} alt={alt} />;
}
