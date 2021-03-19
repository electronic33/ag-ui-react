import React, { useEffect, useRef } from "react";
import classNames from "classnames";

const MenuItem = ({ children, Icon, onClick }) => {
  const ref = useRef();

  const isFocused = ref?.current
    ? ref.current.attributes.getNamedItem("data-is-tabbed")?.value === "active"
    : false;

  console.log("I RENDER MENU ITEM");

  return (
    <button
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

export default MenuItem;
