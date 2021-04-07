import React from 'react';

export const MenuGroup = ({ children, title }) => (
  <div className="w-full">
    <p className="ml-4 font-semibold text-sm my-2">{title}</p>
    {React.Children.map(children, (child) => React.cloneElement(child))}
  </div>
);
