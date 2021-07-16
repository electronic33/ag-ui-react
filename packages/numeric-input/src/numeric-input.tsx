import React, { forwardRef, useState } from 'react';
import classNames from 'classnames';
import { Label } from '@app-garage/label';
import { Button } from '@app-garage/button';
import { useNumberInputValues, FieldNumberInputProps, FormikNumberProps } from './input-hooks';

type NumericInputProps = {
  id?: string;
  label?: string;
  secondaryLabel?: string;
  Icon?: React.ComponentType<{ className: string }>;
  withRequiredIndicator?: boolean;
  name?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onEnterPress?: (value: string | number) => void;
  onButtonClick?: () => void;
  error?: string;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  type?: 'text' | 'password';
  max?: string | number;
  withMax?: boolean;
  withDecimals?: boolean;
  placeholder?: string;
  field?: FieldNumberInputProps<HTMLInputElement>;
  form?: FormikNumberProps;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  withErrorInLabel?: boolean;
  isDisabled?: boolean;
  withButton?: boolean;
  buttonText?: string;
};

export const NumericInput = forwardRef<HTMLInputElement, NumericInputProps>(
  (
    {
      id,
      label,
      secondaryLabel,
      Icon,
      withRequiredIndicator,
      name,
      value,
      onChange,
      onClick,
      onKeyDown,
      onEnterPress,
      onButtonClick,
      error,
      containerClassName,
      labelClassName,
      inputClassName,
      withDecimals = true,
      max,
      withMax,
      placeholder,
      field,
      form,
      onBlur,
      onFocus,
      withErrorInLabel,
      isDisabled,
      withButton,
      buttonText,
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isAltPressed, setIsAltPressed] = useState(false);

    const {
      formikCompatibleValue,
      formikCompatibleError,
      formikCompatibleOnBlur,
      formikCompatibleOnChange,
      formikCompatibleName,
    } = useNumberInputValues<HTMLInputElement>({
      field,
      form,
      value,
      error,
      name,
      onChange,
      onBlur,
    });

    return (
      <div className={classNames('numeric-input-container', containerClassName)}>
        {label && (
          <Label
            className={labelClassName}
            secondaryText={secondaryLabel}
            withRequiredIndicator={withRequiredIndicator}
            errorText={withErrorInLabel ? formikCompatibleError : undefined}
            htmlFor={formikCompatibleName}
          >
            {Icon ? <Icon className="numeric-input-label" /> : null}
            {label}
          </Label>
        )}
        <div
          className={classNames('numeric-input-main-div', {
            'numeric-input-main-div': isFocused,
          })}
        >
          <input
            onFocus={(event) => {
              setIsFocused(true);
              if (onFocus) {
                onFocus(event);
              }
            }}
            onBlur={(event) => {
              setIsFocused(false);
              formikCompatibleOnBlur(event);
            }}
            ref={ref}
            placeholder={placeholder}
            type="number"
            className={classNames(
              'no-arrows-numeric-input numeric-input-input',
              {
                'numeric-input-input-formik-error': Boolean(formikCompatibleError),
                'numeric-input-input-disabled': isDisabled,
              },
              inputClassName,
            )}
            value={formikCompatibleValue}
            onChange={(event) => formikCompatibleOnChange(event)}
            onClick={onClick}
            onKeyUp={(event) => {
              if (event.key === 'Alt') {
                setIsAltPressed(false);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === 'Alt') {
                setIsAltPressed(true);
                event.preventDefault();
              }
              if (event.key === 'ArrowUp' && withDecimals && isAltPressed) {
                event.preventDefault();

                formikCompatibleOnChange(
                  // TODO: think of a solution
                  {
                    // @ts-ignore
                    target: { value: Math.round((Number(formikCompatibleValue) + 0.1) * 10) / 10 },
                  },
                );
              } else if (event.key === 'ArrowUp' && withDecimals) {
                event.preventDefault();
                formikCompatibleOnChange({
                  // @ts-ignore
                  target: { value: Math.round((Number(formikCompatibleValue) + 1) * 10) / 10 },
                });
              }
              if (event.key === 'ArrowDown' && withDecimals && isAltPressed) {
                event.preventDefault();
                formikCompatibleOnChange({
                  // @ts-ignore
                  target: { value: Math.round((Number(formikCompatibleValue) - 0.1) * 10) / 10 },
                });
              } else if (event.key === 'ArrowDown' && withDecimals) {
                event.preventDefault();
                formikCompatibleOnChange({
                  // @ts-ignore
                  target: { value: Math.round((Number(formikCompatibleValue) - 1) * 10) / 10 },
                });
              }

              if (!withDecimals && (event.key === ',' || event.key === '.')) {
                event.preventDefault();
              }
              if (event.code === 'Enter' && onEnterPress) {
                onEnterPress(formikCompatibleValue);
              }
              if (onKeyDown) {
                onKeyDown(event);
              }
            }}
            name={formikCompatibleName}
            id={id || formikCompatibleName}
            max={max}
            disabled={isDisabled}
          />
          <div className="numeric-input-div">
            <button
              tabIndex={-1}
              type="button"
              className="numeric-input-div-button"
              onClick={() =>
                formikCompatibleOnChange({
                  // @ts-ignore
                  target: { value: Number(formikCompatibleValue) + 1 },
                })
              }
            >
              <svg
                className="numeric-input-div-button-svg"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" />
              </svg>
            </button>
            <button
              tabIndex={-1}
              type="button"
              className="numeric-input-div-button-2"
              onClick={() =>
                formikCompatibleOnChange({
                  // @ts-ignore
                  target: { value: Number(formikCompatibleValue) - 1 },
                })
              }
            >
              <svg
                className="numeric-input-div-button-svg"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" />
              </svg>
            </button>
          </div>
          {withButton && (
            <Button
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className=" numeric-input-with-button"
              onClick={onButtonClick}
            >
              {buttonText}
            </Button>
          )}
        </div>
        {withMax && (
          <p className="numeric-input-with-max">
            {`${String(formikCompatibleValue).length}/${max}`}
          </p>
        )}
        {!withErrorInLabel && formikCompatibleError && (
          <p className="numeric-input-with-error-in-label">{formikCompatibleError}</p>
        )}
      </div>
    );
  },
);
