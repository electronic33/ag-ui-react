import React from 'react';
import classNames from 'classnames';
import { Label } from '@app-garage/label';
import { useTextInputValues, TextFieldInputProps, TextFormikProps } from '@app-garage/text-input';

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
    <div className={classNames('text-area-container', className)}>
      {label && (
        <Label
          secondaryText={secondaryLabel}
          withRequiredIndicator={withRequiredIndicator}
          errorText={withErrorInLabel ? formikCompatibleError : undefined}
          htmlFor={formikCompatibleName}
        >
          {Icon ? <Icon className="text-area-label" /> : null}
          {label}
        </Label>
      )}
      <textarea
        placeholder={placeholder}
        className={classNames(
          {
            'text-area-label-icon': !!formikCompatibleError,
            'text-area-error': isDisabled,
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
        <p className="text-area-with-max">{`${String(formikCompatibleValue).length}/${max}`}</p>
      )}
      {!withErrorInLabel && formikCompatibleError && (
        <p className="text-area-with-error-label">{formikCompatibleError}</p>
      )}
    </div>
  );
};
