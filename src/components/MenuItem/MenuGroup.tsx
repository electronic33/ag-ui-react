import React from "react";

const MenuGroup = ({ children, title }) => {
  return (
    <div className="w-full">
      <p className="ml-4 font-semibold text-sm my-2">{title}</p>
      {children}
    </div>
  );
};

export default MenuGroup;
