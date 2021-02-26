import Menu from "./Menu";
import React, { useMemo, useRef, useState } from "react";
import { VscTriangleRight } from "react-icons/vsc";

const MenuItem = ({ label, Icon, children }) => {
  const [active, setActive] = useState(false);

  // const containerRef = useRef<HTMLDivElement>();

  return (
    <div>
      {/* {children?.length && (
        <Menu active={active} setActive={setActive} menuData={children}>
          <div
            onMouseEnter={() => setActive(true)}
            // onMouseLeave={() => setActive(false)}
            className="flex justify-between p-1 rounded  hover:bg-red-500"
          >
            <div className="flex items-center ">
              <Icon className="mr-2" />
              <p> {label} </p>
            </div>
          </div>
        </Menu>
      )} */}
      <div className="flex justify-between p-1 rounded hover:bg-gray-100">
        <div className="flex items-center ">
          <Icon className="mr-2" />
          <p> {label} </p>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
