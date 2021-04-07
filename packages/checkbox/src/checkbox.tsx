import React, { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';
import { useId } from 'react-id-generator';
import { Label } from '@app-garage/label';
import {
  useFormikCompatibleValues,
  FieldInputProps,
  FormikProps,
} from '@app-garage/switch';

type CheckBoxProps = {
  checkboxClassNames?: string;
  tickCheckedClassName?: string;
  value?: boolean;
  containerClassName?: string;
  label?: string;
  labelClassName?: string;
  labelPosition?: 'top' | 'right' | 'bottom' | 'left';
  onChange?: (value: boolean) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  unCheckedBgClassName?: string;
  checkedBgClassName?: string;
  name?: string;
  field?: FieldInputProps<HTMLInputElement>;
  form?: FormikProps;
  error?: string;
};

// TODO: come up with solution to import tw colors to js so we can use it here

export const Checkbox = ({
  checkboxClassNames,
  unCheckedBgClassName = 'bg-gray-50',
  checkedBgClassName = 'bg-blue-400',
  tickCheckedClassName = 'text-gray-50',
  value,
  label,
  labelPosition = 'right',
  labelClassName,
  containerClassName,
  name,
  onChange,
  onBlur,
  field,
  error,
  form,
}: CheckBoxProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [checkboxId] = useId(1, 'checkbox');

  const {
    formikCompatibleOnBlur,
    formikCompatibleError,
    formikCompatibleName,
    formikCompatibleOnChange,
    formikCompatibleValue,
  } = useFormikCompatibleValues({
    value,
    onChange,
    onBlur,
    error,
    field,
    form,
    name,
  });

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
          defaultContainerClassName: 'label-top-container',
          defaultLabelClassName: 'label-top',
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
      htmlFor={`${checkboxId}${formikCompatibleName || ''}`}
      className={classNames(defaultContainerClassName, containerClassName)}
    >
      <Label
        as="span"
        className={classNames(defaultLabelClassName, labelClassName)}
      >
        {label}
      </Label>
      <input
        name={formikCompatibleName}
        id={`${checkboxId}${formikCompatibleName || ''}`}
        type="checkbox"
        checked={formikCompatibleValue}
        onFocus={setFocusTrue}
        onBlur={(event) => {
          formikCompatibleOnBlur(event);
          setFocusFalse();
        }}
        className="hidden-input-checkbox"
        onChange={(event) => {
          formikCompatibleOnChange(event.target.checked);
        }}
        style={{
          clip: 'rect(0 0 0 0)',
          clipPath: 'inset(50%)',
          height: '1px',
          width: '1px',
          margin: '-1px',
        }}
      />
      <div
        className={classNames(
          'checkbox',
          {
            [unCheckedBgClassName]: !value,
            [checkedBgClassName]: value,
            [tickCheckedClassName]: value,
            'ring-2 ring-blue-500': isFocused,
          },
          checkboxClassNames,
        )}
      >
        <svg
          className="stroke-2"
          viewBox="0 0 24 24"
          style={{
            fill: 'none',
            stroke: !value ? 'transparent' : 'inherit',
          }}
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      {formikCompatibleError && (
        <span className="text-red-600 mt-2">{formikCompatibleError}</span>
      )}
    </label>
  );
};
