import React from 'react';
import classNames from 'classnames';
import { Label } from '@app-garage/label';
import {
  useTextInputValues,
  TextFieldInputProps,
  TextFormikProps,
} from '@app-garage/text-input';

type TextAreaProps = {
  label?: string;
  secondaryLabel?: string;
  Icon?: React.ComponentType<{ className: string }>;
  withRequiredIndicator?: boolean;
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: () => void;
  error?: string;
  className?: string;
  inputClassName?: string;
  max?: string | number;
  withMax?: boolean;
  placeholder?: string;
  field?: TextFieldInputProps<HTMLTextAreaElement>;
  form?: TextFormikProps;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  withErrorInLabel?: boolean;
  isDisabled?: boolean;
};

export const TextArea = ({
  label,
  secondaryLabel,
  Icon,
  withRequiredIndicator,
  name,
  value,
  onChange,
  onKeyDown,
  error,
  className,
  inputClassName,
  max,
  withMax,
  placeholder,
  field,
  form,
  onBlur,
  onFocus,
  withErrorInLabel,
  isDisabled,
}: TextAreaProps) => {
  const {
    formikCompatibleError,
    formikCompatibleName,
    formikCompatibleOnBlur,
    formikCompatibleOnChange,
    formikCompatibleValue,
  } = useTextInputValues<HTMLTextAreaElement>({
    field,
    form,
    value,
    error,
    onChange,
    onBlur,
  });

  return (
    <div className={classNames('flex flex-col relative', className)}>
      {label && (
        <Label
          secondaryText={secondaryLabel}
          withRequiredIndicator={withRequiredIndicator}
          errorText={withErrorInLabel ? formikCompatibleError : undefined}
          htmlFor={formikCompatibleName}
        >
          {Icon ? <Icon className="w-5 mr-2" /> : null}
          {label}
        </Label>
      )}
      <textarea
        placeholder={placeholder}
        className={classNames(
          {
            'border-red-700': !!formikCompatibleError,
            'bg-gray-200': isDisabled,
          },
          'text-area',
          inputClassName,
        )}
        value={field?.value || value}
        onChange={formikCompatibleOnChange}
        onKeyDown={onKeyDown}
        name={field?.name || name}
        id={field?.name || name ? field?.name || name : undefined}
        onBlur={formikCompatibleOnBlur}
        onFocus={(event) => {
          if (onFocus) {
            onFocus(event);
          }
        }}
        disabled={isDisabled}
      />
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
};
