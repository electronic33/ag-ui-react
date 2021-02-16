import React from "react";
import classNames from "classnames";
import Label from "../Label/Label";
import { FormikProps, FieldInputProps } from "formik";

interface TextAreaProps {
  label?: string;
  secondaryLabel?: string;
  Icon?: React.ComponentType<{ className: string }>;
  required?: boolean;
  name?: string;
  value?: string;
  onChange?: () => void;
  onKeyDown?: () => void;
  error?: string;
  className?: string;
  inputClassName?: string;
  type?: string;
  max?: string | number;
  showMax?: boolean;
  placeholder?: string;
  field?: FieldInputProps<string>;
  form?: FormikProps<unknown>;
  onBlur?: () => void;
  errorInLabel?: boolean;
  disabled?: boolean;
}

const TextArea = ({
  label = "",
  secondaryLabel = "",
  Icon,
  required = false,
  name = "",
  value = "",
  onChange = undefined,
  onKeyDown = undefined,
  error = "",
  className,
  inputClassName,
  max = undefined,
  showMax = false,
  placeholder,
  field,
  form,
  onBlur = undefined,
  errorInLabel = false,
  disabled = false,
}: TextAreaProps): React.ReactElement => {
  return (
    <div className={classNames("flex flex-col relative", className)}>
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
      <textarea
        placeholder={placeholder}
        className={classNames(
          {
            "border-red-700":
              Boolean(
                form?.errors?.[field?.name] && form?.touched?.[field?.name],
              ) || Boolean(error),
            "bg-gray-200": disabled,
          },
          "text-area",
          inputClassName,
        )}
        value={field?.value || value}
        onChange={field?.onChange || onChange}
        onKeyDown={onKeyDown}
        name={field?.name || name}
        id={field?.name || name ? field?.name || name : undefined}
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
};

export default TextArea;
