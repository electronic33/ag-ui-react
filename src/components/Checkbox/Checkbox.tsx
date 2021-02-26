import React, { Children } from "react";
import classNames from "classnames";

// const CheckboxContainer = styled.div`
//   display: inline-block;
//   vertical-align: middle;
// `;

// const Icon = styled.svg`
//   fill: none;
//   stroke: white;
//   stroke-width: 2px;
// `;
// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
// const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
//   border: 0;
//   clip: rect(0 0 0 0);
//   clippath: inset(50%);
//   height: 1px;
//   margin: -1px;
//   overflow: hidden;
//   padding: 0;
//   position: absolute;
//   white-space: nowrap;
//   width: 1px;
// `;

// const StyledCheckbox = styled.div`
//   display: inline-block;
//   width: 16px;
//   height: 16px;
//   background: ${(props) => (props.checked ? "salmon" : "papayawhip")}
//   border-radius: 3px;
//   transition: all 150ms;

//   ${HiddenCheckbox}:focus + & {
//     box-shadow: 0 0 0 3px pink;
//   }

//   ${Icon} {
//     visibility: ${(props) => (props.checked ? "visible" : "hidden")}
//   }
// `;

interface CheckBoxTypes {
  children: React.ReactNode;
  checkboxClassNames?: string;
  defaultSvgClassNames?: string;
  defaultSvgIfCheckedColor?: string;
  defaultSvgIfUnCheckedColor?: string;
  checked?: boolean;
  defaultSvgAppearIfUnchecked?: boolean;
  onChange?: (event: React.FormEvent) => void;
  unCheckedBoxColor?: string;
  checkedBoxColor?: string;
}

const Checkbox = ({
  children,
  checkboxClassNames,
  unCheckedBoxColor = "white",
  checkedBoxColor = "bg-blue-400",
  defaultSvgClassNames,
  defaultSvgIfCheckedColor = "white",
  defaultSvgIfUnCheckedColor = "blue",
  checked,
  defaultSvgAppearIfUnchecked = false,
  ...props
}: CheckBoxTypes): React.ReactElement => {
  return (
    <div className="container-div-checkbox">
      <input
        type="checkbox"
        checked={checked}
        {...props}
        className="hidden-input-checkbox"
        style={{
          clip: "rect(0 0 0 0)",
          clipPath: "inset(50%)",
          height: "1px",
          width: "1px",
          margin: "-1px",
        }}
      />
      <div
        className={classNames(
          "main-div-checkbox ",
          {
            [`${unCheckedBoxColor}`]: !checked,
            [`${checkedBoxColor}`]: checked,
          },
          checkboxClassNames,
        )}
      >
        {children ? (
          children
        ) : (
          <svg
            className={classNames(
              `stroke-2 ${
                !defaultSvgAppearIfUnchecked && !checked && "hidden"
              }`,
              defaultSvgClassNames,
            )}
            viewBox="0 0 24 24"
            style={{
              fill: "none",
              stroke: `${
                checked
                  ? `${defaultSvgIfCheckedColor}`
                  : `${defaultSvgIfUnCheckedColor}`
              }`,
            }}
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default Checkbox;
