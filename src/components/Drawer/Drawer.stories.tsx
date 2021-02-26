import React, { useState } from "react";
import Drawer from "./Drawer";
import "../../styles/index.css";
import { AiFillHome } from "react-icons/ai";
import { IoIosPaper, IoMdHelpCircle, IoMdPeople } from "react-icons/io";
import { FaCartPlus, FaEnvelopeOpenText } from "react-icons/fa";
import Button from "../Button/Button";

export default {
  title: "Drawer",
};

export const Default = (): React.ReactNode => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="bg-gray-700 h-20 flex justify-center items-center ">
        <div
          className="ml-8 text-3xl"
          onClick={() => setIsOpen((prevState) => !prevState)}
        >
          <Button text="OPEN ME!" />
        </div>
      </div>
      <Drawer
        direction="left"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        SidebarComponent={<Button text="asd" />}
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
      />
      <div className="w-full h-screen bg-gray-50"></div>
      <div className="w-full h-screen bg-red-300"></div>
      <div className="w-full h-screen bg-yellow-300"></div>
    </div>
  );
};
