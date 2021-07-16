import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Button } from '@app-garage/button';

type Value = string | number | undefined;

type Item<T> = {
  label: string;
  value: T;
};

type ToggleButtonGroupCommonProps = {
  containerClassName?: string;
  selectedClassName?: string;
  buttonClassName?: string;
};

type ToggleButtonGroupConditionalProps<T extends Value> =
  | {
      isMultiple?: false | undefined;
      items: Item<T>[];
      onChange: (value: T | undefined) => void;
      value: T;
    }
  | {
      isMultiple: true;
      items: Item<T>[];
      onChange: (value: T[]) => void;
      value: T[];
    };

export function ToggleButtonGroup<T extends Value>({
  items,
  isMultiple = false,
  onChange,
  value: selectedValue,
  containerClassName,
  selectedClassName,
  buttonClassName,
}: ToggleButtonGroupCommonProps & ToggleButtonGroupConditionalProps<T>) {
  const selectedOption = useMemo(
    () =>
      !isMultiple
        ? items.find((item) => item.value === selectedValue)
        : (selectedValue as T[]).map((val) => items.find((o) => o.value === val)),
    [isMultiple, items, selectedValue],
  );

  return (
    <div className={classNames(containerClassName)}>
      {items.map(({ value, label }) => (
        <Button
          className={classNames(
            'toggle-button-group-button',
            {
              [`${selectedClassName} toggle-button-group-button-not-multiple`]: !isMultiple
                ? value ===
                  (
                    selectedOption as {
                      value: T;
                      label: string;
                    }
                  )?.value
                : (selectedValue as T[]).includes(value),
            },
            buttonClassName,
          )}
          onClick={() => {
            if (!isMultiple) {
              let nextValue: T | undefined;

              if (
                value ===
                (
                  selectedOption as {
                    value: number | string;
                    label: string;
                  }
                )?.value
              ) {
                nextValue = undefined;
              } else {
                nextValue = value;
              }

              (onChange as (val: T | undefined) => void)(nextValue);
            } else if ((selectedValue as T[]).includes(value)) {
              const newOptions = (selectedValue as T[]).filter(
                (selectedItem) => selectedItem !== value,
              );

              (onChange as (val: T[]) => void)(newOptions);
            } else {
              const newOptions = (selectedValue as T[]).concat(value);

              (onChange as (val: T[]) => void)(newOptions);
            }
          }}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}

export default ToggleButtonGroup;
