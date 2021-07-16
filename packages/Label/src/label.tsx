import React from 'react';
import classNames from 'classnames';

type LabelProps = {
  secondaryText?: string;
  className?: string;
  withRequiredIndicator?: boolean;
  errorText?: string;
  htmlFor?: string;
  children?: React.ReactNode;
  as?: 'label' | 'span';
};

export const Label = ({
  secondaryText,
  className,
  withRequiredIndicator,
  children,
  errorText,
  htmlFor,
  as = 'label',
}: LabelProps): React.ReactElement => {
  const content = (
    <>
      {children}
      {withRequiredIndicator && <span className="label-with-required-indicator">*</span>}
      {secondaryText && (
        <span
          className={classNames('label-secondary-text', {
            'label-with-indicator-margin': withRequiredIndicator,
            'label-without-indicator-margin': !withRequiredIndicator,
          })}
        >
          {secondaryText}
        </span>
      )}
      {errorText && <span className="label-error-text">- {errorText}</span>}
    </>
  );

  const wrapperProps = {
    className: classNames('label', className),
  };

  if (as === 'span') {
    return <span {...wrapperProps}>{content}</span>;
  }

  return (
    <label htmlFor={htmlFor} {...wrapperProps}>
      {children}
      {withRequiredIndicator && <span className="label-with-required-indicator">*</span>}
      {secondaryText && (
        <span
          className={classNames('label-secondary-text', {
            'label-with-indicator-margin': withRequiredIndicator,
            'label-without-indicator-margin': !withRequiredIndicator,
          })}
        >
          {secondaryText}
        </span>
      )}
      {errorText && <span className="label-error-text">- {errorText}</span>}
    </label>
  );
};
