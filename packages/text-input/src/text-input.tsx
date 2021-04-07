import React, { forwardRef, useState } from 'react';
import classNames from 'classnames';
import { Label } from '@app-garage/label';
import { Button } from '@app-garage/button';
import {
  FieldInputProps,
  FormikProps,
  useFormikCompatibleValues,
} from './input-hooks';

type TextInputProps = {
  id?: string;
  label?: string;
  secondaryLabel?: string;
  Icon?: React.ComponentType<{ className: string }>;
  withRequiredIndicator?: boolean;
  name?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
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

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
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
      type = 'text',
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
            type={type}
            className={classNames(
              'w-full outline-none ml-2',
              {
                'border-red-700': Boolean(formikCompatibleError),
                'bg-gray-200 cursor-not-allowed': isDisabled,
              },
              inputClassName,
            )}
            value={formikCompatibleValue}
            onChange={formikCompatibleOnChange}
            onClick={onClick}
            onKeyDown={(event) => {
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
