import React, { forwardRef, useState } from 'react';
import classNames from 'classnames';
import { Label } from '@app-garage/label';
import { Button } from '@app-garage/button';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import {
  FieldInputProps,
  FormikProps,
  useFormikCompatibleValues,
} from './input-hooks';

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
  field?: FieldInputProps<HTMLInputElement>;
  form?: FormikProps;
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
    } = useFormikCompatibleValues<HTMLInputElement>({
      field,
      form,
      value,
      error,
      name,
      onChange,
      onBlur,
    });

    return (
      <div className={classNames('flex flex-col relative', containerClassName)}>
        {label && (
          <Label
            className={labelClassName}
            secondaryText={secondaryLabel}
            withRequiredIndicator={withRequiredIndicator}
            errorText={withErrorInLabel ? formikCompatibleError : undefined}
            htmlFor={formikCompatibleName}
          >
            {Icon ? <Icon className="w-5 mr-2" /> : null}
            {label}
          </Label>
        )}
        <div
          className={classNames(
            'flex justify-between h-10 rounded-md shadow transition-all hover:shadow-md ',
            {
              'shadow-md': isFocused,
            },
          )}
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
              'no-arrows-numeric-input w-full outline-none ml-2',
              {
                'border-red-700': Boolean(formikCompatibleError),
                'bg-gray-200 cursor-not-allowed': isDisabled,
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
                  // @ts-ignore
                  Math.round((Number(formikCompatibleValue) + 0.1) * 10) / 10,
                );
              } else if (event.key === 'ArrowUp' && withDecimals) {
                event.preventDefault();
                formikCompatibleOnChange(
                  // @ts-ignore
                  Math.round((Number(formikCompatibleValue) + 1) * 10) / 10,
                );
              }
              if (event.key === 'ArrowDown' && withDecimals && isAltPressed) {
                event.preventDefault();
                formikCompatibleOnChange(
                  // @ts-ignore
                  Math.round((Number(formikCompatibleValue) - 0.1) * 10) / 10,
                );
              } else if (event.key === 'ArrowDown' && withDecimals) {
                event.preventDefault();
                formikCompatibleOnChange(
                  // @ts-ignore
                  Math.round((Number(formikCompatibleValue) - 1) * 10) / 10,
                );
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
          <div className="flex flex-col items-center justify-center w-8 ">
            <button
              tabIndex={-1}
              type="button"
              className="h-full bg-gray-100 w-full border border-gray-300 rounded-tr-md active:bg-gray-300 transition-all duration-75 active:shadow-inner"
              onClick={() =>
                // @ts-ignore
                formikCompatibleOnChange(Number(formikCompatibleValue) + 1)
              }
            >
              <AiFillCaretUp className="flex-shrink-0 w-full" />
            </button>
            <button
              tabIndex={-1}
              type="button"
              className="h-full w-full bg-gray-100 border border-gray-300 rounded-br-md active:bg-gray-300 transition-all duration-75 active:shadow-inner"
              onClick={() =>
                // @ts-ignore
                formikCompatibleOnChange(Number(formikCompatibleValue) - 1)
              }
            >
              <AiFillCaretDown className="flex-shrink-0 w-full" />
            </button>
          </div>
          {withButton && (
            <Button
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="flex-shrink-0 hover:bg-blue-600 rounded-l-none active:shadow-inner outline-none"
              onClick={onButtonClick}
            >
              {buttonText}
            </Button>
          )}
        </div>
        {withMax && (
          <p className="flex absolute right-0 bottom-0 text-gray-400 -mb-4 text-xs">
            {`${String(formikCompatibleValue).length}/${max}`}
          </p>
        )}
        {!withErrorInLabel && formikCompatibleError && (
          <p className="flex absolute inset-x-0 bottom-0 text-red-700 -mb-4 text-xs">
            {formikCompatibleError}
          </p>
        )}
      </div>
    );
  },
);
