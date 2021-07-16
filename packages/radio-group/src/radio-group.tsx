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
  unCheckedBgClassName = 'radio-group-unchecked-bg-default',
  checkedBgClassName = 'radio-group-checked-bg-default',
  tickCheckedClassName = 'radio-group-tick-checked-default',
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
    <label htmlFor={radioId} className={classNames(defaultContainerClassName, containerClassName)}>
      <Label
        as="span"
        className={classNames(
          {
            'radio-group-label-sm': size === 'sm',
            'radio-group-label-xl': size === 'xl',
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
          'checkbox radio-group-button',
          {
            [`${unCheckedBgClassName} radio-group-button-unchecked`]: !isChecked,
            [`${checkedBgClassName} radio-group-button-checked`]: isChecked,
            [tickCheckedClassName]: isChecked,
            'radio-group-focus': isFocused,
            'radio-group-button-sm': size === 'sm',
            'radio-group-button-md': size === 'md',
            'radio-group-button-lg': size === 'lg',
            'radio-group-button-xl': size === 'xl',
          },
          checkboxClassNames,
        )}
      >
        {isChecked && (
          <div
            className={classNames('radio-group-button-is-checked', {
              'radio-group-button-checked-sm': size === 'sm',
              'radio-group-button-checked-md': size === 'md',
              'radio-group-button-checked-lg': size === 'lg',
              'radio-group-button-checked-xl': size === 'xl',
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
