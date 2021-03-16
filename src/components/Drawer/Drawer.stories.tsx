import React, { useEffect, useRef, useState } from "react";
import Drawer from "./Drawer";
import "../../styles/index.css";
import { AiFillHome } from "react-icons/ai";
import { IoIosPaper, IoMdHelpCircle, IoMdPeople } from "react-icons/io";
import { FaCartPlus, FaEnvelopeOpenText } from "react-icons/fa";
import Button from "../Button/Button";

export default {
  title: "Drawer",
  component: Drawer,
};

export const Default = (props): React.ReactNode => {
  const [isOpen, setIsOpen] = useState(false);
  // const buttonRef = useRef();
  // useEffect(() => {
  //   if (buttonRef) {
  //     console.log("dfdsf", buttonRef.current);
  //     buttonRef.current.focus();
  //   }
  // }, [isOpen]);

  return (
    <div>
      <div className="bg-gray-700 h-20 flex justify-center items-center ">
        <button
          // ref={buttonRef}
          className="ml-8 text-3xl bg-blue-500 text-white px-4 py-2 rounded"
          tabIndex={0}
          onClick={() => setIsOpen((prevState) => !prevState)}
        >
          OPEN ME!
        </button>
      </div>
      <Drawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        SidebarComponent={<Button text="asds" />}
        sidebarData={[
          {
            title: "Home",
            to: "/",
            Icon: AiFillHome,
          },
          {
            title: "Reports",
            to: "/reports",
            Icon: IoIosPaper,
            Component: <Button text="asd" />,
          },
          {
            title: "Products",
            to: "/products",
            Icon: FaCartPlus,
          },
          {
            title: "Team",
            to: "/team",
            Icon: IoMdPeople,
          },
          {
            title: "Messages",
            to: "/messages",
            Icon: FaEnvelopeOpenText,
          },
          {
            title: "Support",
            to: "/support",
            Icon: IoMdHelpCircle,
          },
        ]}
        {...props}
      />
    </div>
  );
};
