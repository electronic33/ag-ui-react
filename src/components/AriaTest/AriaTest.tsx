import React from "react";
import { useButton } from "@react-aria/button";

function Button(props) {
  const ref = React.useRef();
  const { buttonProps } = useButton(props, ref);
  console.log(
    "🚀 ~ file: AriaTest.tsx ~ line 7 ~ Button ~ buttonProps",
    buttonProps,
  );

  return (
    <button {...buttonProps} ref={ref}>
      {props.children}
    </button>
  );
}

export default Button;
