import React, { useState } from "react";

import { AiFillHome } from "react-icons/ai";
import { IoIosPaper, IoMdHelpCircle, IoMdPeople } from "react-icons/io";
import { FaCartPlus, FaEnvelopeOpenText } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Button from "../Button/Button";
import MenuItem from "./MenuItem";
import Menu from "./Menu";

export default {
  title: "OVERLAY/Menu",
  component: Menu,
};

export const Top = (): React.ReactNode => {
  const [active, setActive] = useState(true);

  return (
    <div className="h-full w-screen flex flex-col justify-center items-center">
      <div className="w-full h-screen bg-yellow-300" />
      <Menu
        active={active}
        setActive={setActive}
        menuData={
          <div className="bg-gray-50 shadow-xl  p-2 rounded relative z-auto">
            <MenuItem label="sa" Icon={MdClose}>
              <MenuItem label="sass" Icon={MdClose} />
              <MenuItem label="sass" Icon={MdClose} />
              <MenuItem label="sass" Icon={MdClose} />
              <MenuItem label="sa" Icon={MdClose}>
                <MenuItem label="sass" Icon={MdClose} />
                <MenuItem label="sass" Icon={MdClose} />
                <MenuItem label="sass" Icon={MdClose} />
              </MenuItem>
            </MenuItem>

            <MenuItem label="sa" Icon={MdClose} />
            <MenuItem label="sa" Icon={MdClose} />
            <MenuItem label="sa" Icon={MdClose} />
            <MenuItem label="sa" Icon={MdClose} />
          </div>
        }
      >
        <div>
          <Button text="Button with tooltip" />
        </div>
      </Menu>
      <div className="w-full h-screen bg-red-300" />
    </div>
  );
};
