import React from "react";
import BottomNav from "./BottomNav";
import Link from "../Link/Link";

import "../../styles/index.css";
import { IoIosAdd, IoMdAlarm } from "react-icons/io";
import { MdChildFriendly } from "react-icons/md";
AnimationEffect;
export default {
  title: "BottomNav",
  component: BottomNav,
};

export const Default = (props): React.ReactNode => (
  <div
    className=" h-16 w-96 "
    containerClassName="bg-red-500"
    linkClassName="bg-red-500"
    activeClassName="text-red-500"
    activeIndex={0}
    {...props}
  >
    <BottomNav
      LinkComponent={Link}
      items={[
        { Icon: MdChildFriendly, label: "Child", to: "href" },
        { Icon: IoIosAdd, label: "Add", to: "href" },
        { Icon: IoMdAlarm, label: "Alarm", to: "href" },
      ]}
    />
  </div>
);
