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
      notActiveBackGroundColorClass = 'switch-not-active-bg-default',
      activeBackGroundColorClass = 'switch-active-bg-default',
      activeDotBackgroundColorClass = 'switch-dot-bg-default',
      notActiveDotBackgroundColorClass = 'switch-dot-bg-default',
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
      <div className="switch-container">
        {label && <Label>{label}</Label>}
        <button
          type="button"
          className={classNames(
            ' switch-button',
            {
              'switch-button-disabled ': isDisabled,
            },
            containerClassName,
          )}
          disabled={isDisabled}
          onClick={() => {
            if (formikCompatibleValue !== undefined && formikCompatibleOnChange) {
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
              'switch-box',
              {
                [`${notActiveBackGroundColorClass} switch-color-transition`]:
                  !formikCompatibleValue,
              },
              {
                [`${activeBackGroundColorClass} switch-color-transition`]: formikCompatibleValue,
              },
            )}
          />

          <span
            className={classNames(
              'switch-dot',
              {
                [`switch-active-dot ${activeDotBackgroundColorClass}`]: formikCompatibleValue,
              },
              {
                [`switch-not-active-dot  ${notActiveDotBackgroundColorClass}`]:
                  !formikCompatibleValue,
              },
            )}
          />
        </button>
        {formikCompatibleError && <span className="switch-error">{formikCompatibleError}</span>}
      </div>
    );
  },
);
