import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { Label } from '@app-garage/label';
import {
  useBooleanInputValues,
  BooleanFieldInputProps,
  BooleanFormikProps,
} from './boolean-input-hooks';

type SwitchProps = {
  value?: boolean;
  label?: string;
  onChange?: (value: boolean) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  containerClassName?: string;
  isDisabled?: boolean;
  notActiveBackGroundColorClass?: string;
  activeBackGroundColorClass?: string;
  activeDotBackgroundColorClass?: string;
  notActiveDotBackgroundColorClass?: string;
  name?: string;
  field?: BooleanFieldInputProps<HTMLButtonElement>;
  form?: BooleanFormikProps;
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      value,
      label,
      onChange,
      onBlur,
      containerClassName,
      isDisabled,
      notActiveBackGroundColorClass = 'bg-gray-400',
      activeBackGroundColorClass = 'bg-gray-200',
      activeDotBackgroundColorClass = 'bg-gray-100',
      notActiveDotBackgroundColorClass = 'bg-gray-100',
      name,
      field,
      form,
    },
    ref,
  ) => {
    const {
      formikCompatibleOnChange,
      formikCompatibleError,
      formikCompatibleName,
      formikCompatibleOnBlur,
      formikCompatibleValue,
    } = useBooleanInputValues({
      value,
      field,
      form,
      name,
      onBlur,
      onChange,
    });

    return (
      <div className="flex flex-col">
        {label && <Label>{label}</Label>}
        <button
          type="button"
          className={classNames(
            ' flex items-center relative align-middle cursor-pointer select-none w-8 h-3',
            {
              'opacity-70 cursor-not-allowed ': isDisabled,
            },
            containerClassName,
          )}
          disabled={isDisabled}
          onClick={() => {
            if (
              formikCompatibleValue !== undefined &&
              formikCompatibleOnChange
            ) {
              formikCompatibleOnChange(!formikCompatibleValue);
            }
          }}
          onBlur={formikCompatibleOnBlur}
        >
          <input
            ref={ref}
            type="checkbox"
            // TODO: implement this class
            className="ag-visually-hidden"
            id={formikCompatibleName}
            name={formikCompatibleName}
            checked={formikCompatibleValue}
          />
          <span
            className={classNames(
              'absolute inset-0 rounded-xl',
              {
                [`${notActiveBackGroundColorClass} transition-colors`]: !formikCompatibleValue,
              },
              {
                [`${activeBackGroundColorClass} transition-colors`]: formikCompatibleValue,
              },
            )}
          />

          <span
            className={classNames(
              'absolute rounded-full w-5 h-5 transition-all duration-100 ease-linear',
              {
                [`left-4 -top-1 -bottom-1 right-4 transition-all ${activeDotBackgroundColorClass}`]: formikCompatibleValue,
              },
              {
                [`left-0 -top-1 -bottom-1 right-0 transition-all  ${notActiveDotBackgroundColorClass}`]: !formikCompatibleValue,
              },
            )}
          />
        </button>
        {formikCompatibleError && (
          <span className="text-red-600 mt-2">{formikCompatibleError}</span>
        )}
      </div>
    );
  },
);
