import React from "react";
import classNames from "classnames";

interface SwitchTypes {
  value: string;
  setValue: (prevState) => void;
  name: string;
  disabled: string;
  notActiveBackGroundColorClass: string;
  activeBackGroundColorClass: string;
  activeDotBackgroundColorClass: string;
  notActiveDotBackgroundColorClass: string;
}

const Switch = ({
  value,
  setValue,
  name,
  disabled,
  notActiveBackGroundColorClass = "bg-gray-400",
  activeBackGroundColorClass = "bg-gray-200",
  activeDotBackgroundColorClass = "bg-gray-100",
  notActiveDotBackgroundColorClass = "bg-gray-100",
}: SwitchTypes): React.ReactElement => {
  const handleClick = () => {
    if (setValue) {
      setValue((prevState: boolean) => !prevState);
    }
  };

  return (
    <label
      className={classNames(
        " flex items-center relative align-middle cursor-pointer select-none w-8 h-3",
        {
          "opacity-70 cursor-not-allowed ": disabled,
        },
      )}
      onClick={disabled ? null : handleClick}
    >
      {/* <input type="hidden" name={name} value={value} /> */}
      <span
        className={classNames(
          `absolute inset-0 rounded-xl`,
          {
            [`${notActiveBackGroundColorClass} transition-colors`]: !value,
          },
          {
            [`${activeBackGroundColorClass} transition-colors`]: value,
          },
        )}
      />

      <span
        className={classNames(
          "absolute rounded-full w-5 h-5 transition-all duration-100 ease-linear",
          {
            [`left-4 -top-1 -bottom-1 right-4 transition-all ${activeDotBackgroundColorClass}`]: value,
          },
          {
            [`left-0 -top-1 -bottom-1 right-0 transition-all  ${notActiveDotBackgroundColorClass}`]: !value,
          },
        )}
      />
    </label>
  );
};

export default Switch;
