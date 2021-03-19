import React, { useRef } from "react";
import ScrollTo, { useScrollBelowElementHook } from "./ScrollTo";
import "../../styles/index.css";
import { FaArrowUp } from "react-icons/fa";

export default {
  title: "OTHERS/ScrollTo",
  component: ScrollTo,
};

export const Default = (props): React.ReactNode => {
  const ref = useRef();
  const showScroll = useScrollBelowElementHook(ref, false);
  return (
    <div>
      <div
        ref={ref}
        className="h-screen bg-blue-300 text-5xl flex justify-center items-centerf"
      >
        <p> Scroll down to see the Arrow! </p>
      </div>
      <ScrollTo
        showScroll={showScroll}
        offset={0}
        ref={ref}
        Icon={<FaArrowUp className="" />}
        {...props}
      />
    </div>
  );
};
