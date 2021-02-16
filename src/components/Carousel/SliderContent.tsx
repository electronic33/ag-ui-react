import React from "react";
import Slide from "./Slide";

// const SlidersContent = styled.div`
//   transform: translateX(-${(props) => props.translate}px);
//   transition: transform ease-out ${(props) => props.transition}s;
//   height: 100%;
//   width: ${(props) => props.width}px;
//   display: flex;
// `;

const SliderContent = ({ translate, transition, width, slides, children }) => {
  return (
    <div
      className="flex h-full"
      style={{
        // translateX: `-${translate}px`,
        transform: `translate(-${translate}px, ${0}px)`,
        transition: `transform ease-out ${transition}s`,
        width: `${width}px`,
      }}
    >
      {children}
    </div>
  );
};
export default SliderContent;
