import React from "react";
import classNames from "classnames";

const MenuItem = ({ children, Icon }) => {
  return (
    <button className=" flex items-center outline-none hover:bg-gray-100 py-1 w-full">
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
