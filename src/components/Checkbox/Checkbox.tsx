import React, { useCallback, useMemo, useState } from "react";
import classNames from "classnames";
import { useId } from "react-id-generator";
import Label from "../Label/Label";

type CheckBoxProps = {
  checkboxClassNames?: string;
  tickCheckedClassName?: string;
  isChecked?: boolean;
  containerClassName?: string;
  label?: string;
  labelClassName?: string;
  labelPosition?: "top" | "right" | "bottom" | "left";
  onChange?: (checked: boolean) => void;
  unCheckedBgClassName?: string;
  checkedBgClassName?: string;
};

// TODO: come up with solution to import tw colors to js so we can use it here

const Checkbox = ({
  checkboxClassNames,
  unCheckedBgClassName = "bg-gray-50",
  checkedBgClassName = "bg-blue-400",
  tickCheckedClassName = "text-gray-50",
  isChecked,
  label,
  labelPosition = "right",
  labelClassName,
  containerClassName,
  onChange,
}: CheckBoxProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [checkboxId] = useId(1, "checkbox");

  const { defaultContainerClassName, defaultLabelClassName } = useMemo(() => {
    switch (labelPosition) {
      case "top":
        return {
          defaultContainerClassName: "label-top-container",
          defaultLabelClassName: "label-top",
        };
      case "right":
        return {
          defaultContainerClassName: "label-right-container",
          defaultLabelClassName: "label-right",
        };
      case "bottom":
        return {
          defaultContainerClassName: "label-bottom-container",
          defaultLabelClassName: "label-bottom",
        };
      case "left":
        return {
          defaultContainerClassName: "label-left-container",
          defaultLabelClassName: "label-left",
        };
    }
  }, [labelPosition]);

  const setFocusTrue = useCallback(() => {
    setIsFocused(true);
  }, []);

  const setFocusFalse = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <label
      htmlFor={checkboxId}
      className={classNames(defaultContainerClassName, containerClassName)}
    >
      <Label
        as="span"
        className={classNames(defaultLabelClassName, labelClassName)}
      >
        {label}
      </Label>
      <input
        id={checkboxId}
        type="checkbox"
        checked={isChecked}
        onFocus={setFocusTrue}
        onBlur={setFocusFalse}
        className="hidden-input-checkbox"
        onChange={(event) => onChange(event.target.checked)}
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
          "checkbox",
          {
            [unCheckedBgClassName]: !isChecked,
            [checkedBgClassName]: isChecked,
            [tickCheckedClassName]: isChecked,
            "ring-2 ring-blue-500": isFocused,
          },
          checkboxClassNames,
        )}
      >
        <svg
          className="stroke-2"
          viewBox="0 0 24 24"
          style={{
            fill: "none",
            stroke: !isChecked ? "transparent" : "inherit",
          }}
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    </label>
  );
};

export default Checkbox;
