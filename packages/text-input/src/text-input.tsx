import React, { forwardRef, useState } from 'react';
import classNames from 'classnames';
import { Label } from '@app-garage/label';
import { Button } from '@app-garage/button';

type FieldInputProps = {
  value: string;
  name: string;
  multiple?: boolean;
  checked?: boolean;
  onChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T,
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };

  onBlur: {
    (e: React.FocusEvent<any>): void;
    <T = string | any>(fieldOrEvent: T): T extends string
      ? (e: any) => void
      : void;
  };
};

type FormikProps = {
  touched?: Record<string, string>;
  errors?: Record<string, string>;
};

type TextInputProps = {
  id?: string;
  label?: string;
  secondaryLabel?: string;
  Icon?: React.ComponentType<{ className: string }>;
  required?: boolean;
  name?: string;
  value?: string | number;
  onChange?: (event) => void | (() => void);
  onClick?: (event) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onEnterPress?: (value: string | number) => void;
  onButtonClick?: () => void;
  error?: string;
  containerClassName?: string;
  inputClassName?: string;
  type?: string;
  max?: string | number;
  showMax?: boolean;
  placeholder?: string;
  field?: FieldInputProps;
  form?: FormikProps;
  onBlur?: () => void;
  onFocus?: () => void;
  errorInLabel?: boolean;
  disabled?: boolean;
  withButton?: boolean;
  buttonText?: string;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      id,
      label = '',
      secondaryLabel = '',
      Icon,
      required = false,
      name = '',
      value = '',
      onChange = undefined,
      onClick = undefined,
      onKeyDown = undefined,
      onEnterPress = undefined,
      onButtonClick = undefined,
      error = '',
      containerClassName,
      inputClassName,
      type = 'text',
      max = undefined,
      showMax = false,
      placeholder,
      field,
      form,
      onBlur = undefined,
      onFocus = undefined,
      errorInLabel = false,
      disabled = false,
      withButton = false,
      buttonText = 'Text',
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    let formikCompatibleValue: string | number | undefined = '';

    if (value) {
      formikCompatibleValue = value;
    } else if (field) {
      formikCompatibleValue = field.value;
    }

    let formikCompatibleError: string | undefined = '';

    if (error) {
      formikCompatibleError = error;
    } else if (form && field) {
      formikCompatibleError =
        form.errors?.[field.name] && form.touched?.[field.name]
          ? (form.errors?.[field?.name] as string | undefined)
          : '';
    }

    let formikCompatibleName: string | undefined = '';

    if (name) {
      formikCompatibleName = name;
    } else if (field) {
      formikCompatibleName = field.name;
    }

    let formikCompatibleOnChange;

    if (onChange) {
      formikCompatibleOnChange = onChange;
    } else if (field) {
      formikCompatibleOnChange = field.onChange as () => any;
    }

    let formikCompatibleOnBlur;

    if (onBlur) {
      formikCompatibleOnBlur = onBlur;
    } else if (field) {
      formikCompatibleOnBlur = field.onBlur as () => any;
    }

    return (
      <div className={classNames('flex flex-col relative', containerClassName)}>
        {label && (
          <Label
            secondaryText={secondaryLabel}
            required={required}
            errorText={errorInLabel ? formikCompatibleError : undefined}
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
            onFocus={() => {
              setIsFocused(true);
              onFocus();
            }}
            onBlur={() => {
              setIsFocused(false);
              formikCompatibleOnBlur();
            }}
            ref={ref}
            placeholder={placeholder}
            type={type}
            className={classNames(
              'w-full outline-none ml-2',
              {
                'border-red-700': Boolean(formikCompatibleError),
                'bg-gray-200 cursor-not-allowed': disabled,
              },
              inputClassName,
            )}
            value={formikCompatibleValue}
            onChange={formikCompatibleOnChange}
            onClick={onClick}
            onKeyDown={(event) => {
              if (event.code === 'Enter') {
                onEnterPress(formikCompatibleValue);
              }
              if (onKeyDown) {
                onKeyDown(event);
              }
            }}
            name={formikCompatibleName}
            id={id || formikCompatibleName}
            max={max}
            disabled={disabled}
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
        {showMax && (
          <p className="flex absolute right-0 bottom-0 text-gray-400 -mb-4 text-xs">
            {`${String(formikCompatibleValue).length}/${max}`}
          </p>
        )}
        {!errorInLabel && formikCompatibleError && (
          <p className="flex absolute inset-x-0 bottom-0 text-red-700 -mb-4 text-xs">
            {formikCompatibleError}
          </p>
        )}
      </div>
    );
  },
);
