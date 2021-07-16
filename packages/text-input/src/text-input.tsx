import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { Label } from '@app-garage/label';
import { Button } from '@app-garage/button';
import { useTextInputValues, TextFieldInputProps, TextFormikProps } from './input-hooks';

type TextInputProps = {
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
  placeholder?: string;
  field?: TextFieldInputProps<HTMLInputElement>;
  form?: TextFormikProps;
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
    // const [isFocused, setIsFocused] = useState(false);

    const {
      formikCompatibleValue,
      formikCompatibleError,
      formikCompatibleOnBlur,
      formikCompatibleOnChange,
      formikCompatibleName,
    } = useTextInputValues<HTMLInputElement>({
      field,
      form,
      value,
      error,
      name,
      onChange,
      onBlur,
    });

    return (
      <div className={classNames('text-input-container', containerClassName)}>
        {label && (
          <Label
            className={labelClassName}
            secondaryText={secondaryLabel}
            withRequiredIndicator={withRequiredIndicator}
            errorText={withErrorInLabel ? formikCompatibleError : undefined}
            htmlFor={formikCompatibleName}
          >
            {Icon ? <Icon className="text-input-label-icon" /> : null}
            {label}
          </Label>
        )}
        <div
          className={classNames('text-input-input-wrapper', {
            // 'text-input-input-wrapper-focus': isFocused,
          })}
        >
          <input
            onFocus={(event) => {
              // setIsFocused(true);
              if (onFocus) {
                onFocus(event);
              }
            }}
            onBlur={(event) => {
              // setIsFocused(false);
              formikCompatibleOnBlur(event);
            }}
            ref={ref}
            placeholder={placeholder}
            type={type}
            className={classNames(
              'text-input-input',
              {
                'text-input-input-error': Boolean(formikCompatibleError),
                'text-input-input-disabled': isDisabled,
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
              // onFocus={() => setIsFocused(true)}
              // onBlur={() => setIsFocused(false)}
              className="text-input-input-button"
              onClick={onButtonClick}
            >
              {buttonText}
            </Button>
          )}
        </div>
        {withMax && (
          <p className="text-input-with-max">{`${String(formikCompatibleValue).length}/${max}`}</p>
        )}
        {!withErrorInLabel && formikCompatibleError && (
          <p className="text-input-with-error">{formikCompatibleError}</p>
        )}
      </div>
    );
  },
);
