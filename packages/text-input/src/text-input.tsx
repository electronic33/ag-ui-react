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
      errorInLabel = false,
      disabled = false,
      withButton = false,
      buttonText = 'Text',
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className={classNames('flex flex-col relative', containerClassName)}>
        {label && (
          <Label
            secondaryText={secondaryLabel}
            required={required}
            errorText={
              errorInLabel
                ? (form?.touched?.[field?.name] &&
                    form?.errors?.[field?.name]) ||
                  error ||
                  ''
                : undefined
            }
            htmlFor={field?.name || name ? field?.name || name : undefined}
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
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              onBlur();
            }}
            ref={ref}
            placeholder={placeholder}
            type={type}
            className={classNames(
              'w-full outline-none ml-2',
              {
                'border-red-700 ':
                  Boolean(
                    form?.errors?.[field?.name] && form?.touched?.[field?.name],
                  ) || Boolean(error),
                'bg-gray-200 cursor-not-allowed': disabled,
              },
              // 'text-input',
              inputClassName,
            )}
            value={field?.value || value}
            onChange={field?.onChange || onChange}
            onClick={onClick}
            onKeyDown={(event) => {
              if (event.code === 'Enter') {
                onEnterPress(field?.value || value);
              }
              if (onKeyDown) {
                onKeyDown(event);
              }
            }}
            name={field?.name || name}
            id={id || field?.name || name ? field?.name || name : undefined}
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

        {showMax ? (
          <p className="flex absolute right-0 bottom-0 text-gray-400 -mb-4 text-xs">
            {`${
              field?.value ? field?.value.length : (value as string).length
            }/${max}`}
          </p>
        ) : null}
        {!errorInLabel ? (
          <>
            {form?.errors?.[field?.name] && form?.touched?.[field?.name] ? (
              <p className="flex absolute inset-x-0 bottom-0 text-red-700 -mb-4 text-xs">
                {form?.errors?.[field?.name]}
              </p>
            ) : null}
            {error ? (
              <p className="flex absolute inset-x-0 bottom-0 text-red-700 -mb-4 text-xs">
                {error}
              </p>
            ) : null}
          </>
        ) : null}
      </div>
    );
  },
);
