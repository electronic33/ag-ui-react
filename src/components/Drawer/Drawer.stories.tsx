import React, { useState } from "react";
import Drawer from "./Drawer";
import "../../styles/index.css";
import { AiFillHome } from "react-icons/ai";
import { IoIosPaper, IoMdHelpCircle, IoMdPeople } from "react-icons/io";
import { FaCartPlus, FaEnvelopeOpenText } from "react-icons/fa";
import Button from "../Button/Button";

export default {
  title: "OVERLAY/Drawer",
  component: Drawer,
};

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="bg-gray-700 h-20 flex justify-center items-center ">
        <button
          className="ml-8 text-3xl bg-blue-500 text-white px-4 py-2 rounded"
          tabIndex={0}
          onClick={() => setIsOpen((prevState) => !prevState)}
        >
          OPEN ME!
        </button>
      </div>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        direction="bottom"
        SidebarComponent={<Button>asd</Button>}
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
            Component: <Button>asd</Button>,
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
      />
    </div>
  );
};
