import React, { useRef } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { ScrollTo, useScrollBelowElement } from '../src';

export default {
  title: 'OTHERS/ScrollTo',
  component: ScrollTo,
};

export const Default = () => {
  const ref = useRef(null);
  const showScroll = useScrollBelowElement(ref, false);

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
        scrollToRef={ref}
        Icon={<FaArrowUp />}
      />
    </div>
  );
};
