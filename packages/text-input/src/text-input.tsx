import React from "react";
import classNames from "classnames";
import { Label } from "@app-garage/label";

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
  label?: string;
  secondaryLabel?: string;
  Icon?: React.ComponentType<{ className: string }>;
  required?: boolean;
  name?: string;
  value?: string | number;
  onChange?: (event) => void;
  onClick?: (event) => void;
  onKeyDown?: () => void;
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
};

export const TextInput = ({
  label = "",
  secondaryLabel = "",
  Icon,
  required = false,
  name = "",
  value = "",
  onChange = undefined,
  onClick = undefined,
  onKeyDown = undefined,
  error = "",
  containerClassName,
  inputClassName,
  type = "text",
  max = undefined,
  showMax = false,
  placeholder,
  field,
  form,
  onBlur = undefined,
  errorInLabel = false,
  disabled = false,
}: TextInputProps) => (
  <div className={classNames("flex flex-col relative", containerClassName)}>
    {label && (
      <Label
        secondaryText={secondaryLabel}
        required={required}
        errorText={
          errorInLabel
            ? (form?.touched?.[field?.name] && form?.errors?.[field?.name]) ||
              error ||
              ""
            : undefined
        }
        htmlFor={field?.name || name ? field?.name || name : undefined}
      >
        {Icon ? <Icon className="w-5 mr-2" /> : null}
        {label}
      </Label>
    )}
    <input
      placeholder={placeholder}
      type={type}
      className={classNames(
        {
          "border-red-700":
            Boolean(
              form?.errors?.[field?.name] && form?.touched?.[field?.name],
            ) || Boolean(error),
          "bg-gray-200 cursor-not-allowed": disabled,
        },
        "text-input",
        inputClassName,
      )}
      value={field?.value || value}
      onChange={field?.onChange || onChange}
      onClick={onClick}
      onKeyDown={onKeyDown}
      name={field?.name || name}
      id={field?.name || name ? field?.name || name : undefined}
      max={max}
      onBlur={field?.onBlur || onBlur}
      disabled={disabled}
    />

    {showMax ? (
      <p className="flex absolute right-0 bottom-0 text-gray-400 -mb-4 text-xs">
        {`${field?.value ? field?.value.length : value.length}/${max}`}
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
