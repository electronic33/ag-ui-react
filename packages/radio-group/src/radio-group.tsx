import React, { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';
import { useId } from 'react-id-generator';
import { Label } from '@app-garage/label';

type RadioProps = {
  value: string | number;
  size?: string;
  checkboxClassNames?: string;
  tickCheckedClassName?: string;
  isChecked?: boolean;
  containerClassName?: string;
  label?: string;
  labelClassName?: string;
  labelPosition?: 'top' | 'right' | 'bottom' | 'left';
  onChange: (prevState: number | string) => void;
  unCheckedBgClassName?: string;
  checkedBgClassName?: string;
};

// TODO: come up with solution to import tw colors to js so we can use it here

const RadioButton = ({
  checkboxClassNames,
  unCheckedBgClassName = 'bg-gray-50',
  checkedBgClassName = 'bg-blue-400',
  tickCheckedClassName = 'text-gray-50',
  isChecked,
  label,
  value,
  size = 'md',
  labelPosition = 'right',
  labelClassName,
  containerClassName,
  onChange,
}: RadioProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [radioId] = useId(1, 'checkbox');

  const { defaultContainerClassName, defaultLabelClassName } = useMemo(() => {
    switch (labelPosition) {
      case 'top':
        return {
          defaultContainerClassName: 'label-top-container',
          defaultLabelClassName: 'label-top',
        };
      case 'right':
        return {
          defaultContainerClassName: 'label-right-container',
          defaultLabelClassName: 'label-right',
        };
      case 'bottom':
        return {
          defaultContainerClassName: 'label-bottom-container',
          defaultLabelClassName: 'label-bottom',
        };
      case 'left':
        return {
          defaultContainerClassName: 'label-left-container',
          defaultLabelClassName: 'label-left',
        };
      default:
        return {
          defaultContainerClassName: '',
          defaultLabelClassName: '',
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
      htmlFor={radioId}
      className={classNames(defaultContainerClassName, containerClassName)}
    >
      <Label
        as="span"
        className={classNames(
          {
            'text-sm': size === 'sm',
            'text-lg': size === 'xl',
          },
          defaultLabelClassName,
          labelClassName,
        )}
      >
        {label}
      </Label>
      <input
        tabIndex={-1}
        id={radioId}
        type="radio"
        checked={isChecked}
        value={value}
        className="hidden-input-checkbox"
        // onChange={(event) => onChange(event.target.checked)}
        style={{
          clip: 'rect(0 0 0 0)',
          clipPath: 'inset(50%)',
          height: '1px',
          width: '1px',
          margin: '-1px',
        }}
      />
      <button
        onFocus={setFocusTrue}
        onBlur={setFocusFalse}
        type="button"
        onClick={() => {
          onChange(value);
        }}
        className={classNames(
          'checkbox rounded-full transition-all duration-300',
          {
            [`${unCheckedBgClassName} border-gray-200`]: !isChecked,
            [`${checkedBgClassName} border-none`]: isChecked,
            [tickCheckedClassName]: isChecked,
            'ring-2 ring-blue-300': isFocused,
            'w-3 h-3': size === 'sm',
            'w-3.5 h-3.5': size === 'md',
            'w-4 h-4': size === 'lg',
            'w-5 h-5': size === 'xl',
          },
          checkboxClassNames,
        )}
      >
        {isChecked && (
          <div
            className={classNames('bg-white rounded-full', {
              'w-1 h-1': size === 'sm',
              'w-1.5 h-1.5': size === 'md',
              'w-1.5 h-1.5 ': size === 'lg',
              'w-2 h-2': size === 'xl',
            })}
          />
        )}
      </button>
    </label>
  );
};

type RadioGroupProps = {
  items: {
    value: string | number;
    label?: string;
    checkedBgClassName?: string;
    size?: string;
  }[];
  groupValue: string | number;
  containerClassName?: string;
  onChange: (prevState: number | string) => void;
};

export const RadioGroup = ({
  items,
  onChange,
  groupValue,
  containerClassName,
}: RadioGroupProps) => (
  <div className={classNames(containerClassName)}>
    {items.map(({ value, label, checkedBgClassName, size }) => (
      <RadioButton
        value={value}
        label={label}
        isChecked={value === groupValue}
        onChange={onChange}
        checkedBgClassName={checkedBgClassName}
        size={size}
      />
    ))}
  </div>
);

export default RadioGroup;
