import React, { useMemo } from 'react';
import classNames from 'classnames';
// import { useId } from 'react-id-generator';
import { Button } from '@app-garage/button';

type ToggleButtonGroupProps = {
  items: { value: number | string; label: string }[];
  multiple?: boolean;
  onChange: (prevState?) => void;
  selected: number | string | (number | string)[];
  containerClassName?: string;
  selectedClassName?: string;
  buttonClassName?: string;
};

export const ToggleButtonGroup = ({
  items,
  multiple = false,
  onChange,
  selected,
  containerClassName,
  selectedClassName,
  buttonClassName,
}: ToggleButtonGroupProps) => {
  const selectedOption = useMemo(
    () =>
      !multiple
        ? items?.find((item) => item?.value === selected)
        : (selected as (number | string)[])?.map((val) =>
            items?.find((o) => o?.value === val),
          ),
    [multiple, items, selected],
  );

  return (
    <div className={classNames(containerClassName)}>
      {items.map(({ value, label }) => (
        <Button
          className={classNames(
            'text-base transition-all',
            {
              [`${selectedClassName} bg-blue-700`]: !multiple
                ? value ===
                  (selectedOption as {
                    value: number | string;
                    label: string;
                  })?.value
                : (selected as (number | string)[]).includes(value),
            },
            buttonClassName,
          )}
          onClick={() => {
            if (!multiple) {
              if (
                value ===
                (selectedOption as {
                  value: number | string;
                  label: string;
                })?.value
              ) {
                onChange(undefined);
              } else {
                onChange(value);
              }
            } else if ((selected as (number | string)[]).includes(value)) {
              const newOptions = (selected as (number | string)[]).filter(
                (selectedItem) => selectedItem !== value,
              );
              onChange(newOptions);
            } else {
              const newOptions = (selected as (number | string)[]).concat(
                value,
              );
              onChange(newOptions);
            }
          }}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export default ToggleButtonGroup;
