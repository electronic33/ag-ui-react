import React from "react";
import classNames from "classnames";

type SwitchTypes = {
  active: boolean;
  setActive: (prevState) => void;
  className?: string;
  disabled?: boolean;
  notActiveBackGroundColorClass?: string;
  activeBackGroundColorClass?: string;
  activeDotBackgroundColorClass?: string;
  notActiveDotBackgroundColorClass?: string;
};

export const Switch = ({
  active,
  setActive,
  className,
  disabled,
  notActiveBackGroundColorClass = "bg-gray-400",
  activeBackGroundColorClass = "bg-gray-200",
  activeDotBackgroundColorClass = "bg-gray-100",
  notActiveDotBackgroundColorClass = "bg-gray-100",
}: SwitchTypes): React.ReactElement => {
  const handleClick = () => {
    if (setActive) {
      setActive((prevState: boolean) => !prevState);
    }
  };

  return (
    <label
      className={classNames(
        " flex items-center relative align-middle cursor-pointer select-none w-8 h-3",
        {
          "opacity-70 cursor-not-allowed ": disabled,
        },
        className,
      )}
      onClick={disabled ? null : handleClick}
    >
      {/* <input type="hidden" name={name} active={active} /> */}
      <span
        className={classNames(
          `absolute inset-0 rounded-xl`,
          {
            [`${notActiveBackGroundColorClass} transition-colors`]: !active,
          },
          {
            [`${activeBackGroundColorClass} transition-colors`]: active,
          },
        )}
      />

      <span
        className={classNames(
          "absolute rounded-full w-5 h-5 transition-all duration-100 ease-linear",
          {
            [`left-4 -top-1 -bottom-1 right-4 transition-all ${activeDotBackgroundColorClass}`]: active,
          },
          {
            [`left-0 -top-1 -bottom-1 right-0 transition-all  ${notActiveDotBackgroundColorClass}`]: !active,
          },
        )}
      />
    </label>
  );
};
