import React, { useRef } from "react";
import classNames from "classnames";

export const MenuItem = ({ children, Icon, onClick }) => {
  const ref = useRef<HTMLButtonElement>();

  const isFocused = ref?.current
    ? ref.current.attributes.getNamedItem("data-is-tabbed")?.value === "active"
    : false;

  return (
    <button
      type="button"
      role="menuitem"
      ref={ref}
      className={classNames("flex items-center  py-1 w-full", {
        "bg-red-500": isFocused,
      })}
      onClick={onClick}
    >
      <div className="flex items-center justify-center ml-2">{Icon}</div>
      <p
        className={classNames(" ml-2 text-lg text-left text-gray-600", {
          "": Icon,
        })}
      >
        {children}
      </p>
    </button>
  );
};
