import { isFocusable } from "./isFocusable";

const focusableElList = [
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "embed",
  "iframe",
  "object",
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "[tabindex]",
  "audio[controls]",
  "video[controls]",
  "*[tabindex]:not([aria-disabled])",
  "*[contenteditable]",
];

const focusableElSelector = focusableElList.join();

export function getAllFocusable<T extends HTMLElement>(container: T) {
  const focusableEls = Array.from(
    container.querySelectorAll<T>(focusableElSelector),
  );
  focusableEls.unshift(container);
  return focusableEls
    .filter(isFocusable)
    .filter((el) => window.getComputedStyle(el).display !== "none");
}
