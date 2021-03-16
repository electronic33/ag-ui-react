export function isDisabled(element: HTMLElement) {
  return (
    Boolean(element.getAttribute("disabled")) === true ||
    Boolean(element.getAttribute("aria-disabled")) === true
  );
}

export function isHTMLElement(element: any): element is HTMLElement {
  return element instanceof HTMLElement;
}

export function isHidden(element: HTMLElement) {
  if (element.parentElement && isHidden(element.parentElement)) return true;
  return element.hidden;
}

export function isFocusable(element: HTMLElement) {
  if (!isHTMLElement(element) || isHidden(element) || isDisabled(element)) {
    return false;
  }
}
