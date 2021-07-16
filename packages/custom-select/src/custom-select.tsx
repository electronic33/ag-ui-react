import React, { useCallback, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { Spinner } from '@app-garage/spinner';
import { Button } from '@app-garage/button';
import { FocusLock } from '@app-garage/focus-trap';
import { animated } from 'react-spring';
import { Label } from '@app-garage/label';
import { useSelect } from './select-hooks';

type OptionValue = number | string;

type Option<T> = {
  label: string;
  value: T;
  Icon?: React.ComponentType<{ className?: string }>;
};

type SelectProps<T extends OptionValue> = {
  options: Option<T>[];
  value?: T;
  onChange?: (value: T, option: Option<T>) => void;
  containerClassName?: string;
  labelClassName?: string;
  selectClassName?: string;
  optionClassName?: (value?: T) => string;
  optionsContainerClassName?: string;
  label?: string;
  secondaryLabel?: string;
  withRequiredIndicator?: boolean;
  placeholder?: string;
  isLoading?: boolean;
  error?: string;
  spinnerClassName?: string;
  retryFn?: () => void;
  loadingText?: string;
};

export function Select<T extends OptionValue>({
  options,
  value,
  onChange,
  containerClassName,
  labelClassName,
  selectClassName,
  optionClassName,
  optionsContainerClassName,
  label,
  secondaryLabel,
  withRequiredIndicator,
  placeholder = 'Select...',
  isLoading,
  spinnerClassName,
  error,
  retryFn,
  loadingText,
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const selectOptionsRef = useRef<HTMLDivElement>(null);
  const selectButtonRef = useRef<HTMLButtonElement>(null);

  const selectedOption = useMemo(() => {
    const selectedO = options.find((option) => option.value === value);

    return !isLoading && selectedO
      ? selectedO
      : { label: placeholder, Icon: undefined, value: undefined };
  }, [value, isLoading, options, placeholder]);

  const onSpaceOrEnterPress = useCallback(() => {
    if (isOpen && onChange) {
      onChange(options[activeIndex].value, options[activeIndex]);
    }
  }, [isOpen, options, onChange, activeIndex]);

  const { transitions, status } = useSelect({
    isOpen,
    setIsOpen,
    selectOptionsRef,
    selectButtonRef,
    activeIndex,
    setActiveIndex,
    options,
    onSpaceOrEnterPress,
    isLoading,
    error,
  });

  return (
    <FocusLock restoreFocus isDisabled={!isOpen}>
      <div className={classNames(containerClassName, 'custom-select-container')}>
        {label && (
          <Label
            className={labelClassName}
            secondaryText={secondaryLabel}
            withRequiredIndicator={withRequiredIndicator}
          >
            {label}
          </Label>
        )}
        <button
          type="button"
          ref={selectButtonRef}
          onClick={() => {
            setIsOpen((prev) => {
              setActiveIndex(
                options.findIndex((element) => element.value === selectedOption?.value),
              );

              return !prev;
            });
          }}
          className={classNames('custom-select-classes', selectClassName)}
        >
          <div
            className={classNames('custom-select-status-div sm:text-sm sm:leading-5', {
              'custom-select-status-loading': status === 'loading',
              'custom-select-status-not-loading': status !== 'loading',
              'custom-select-status-error': status === 'error',
              'custom-select-status-no-error': status !== 'error',
            })}
          >
            {status === 'loading' && (
              <>
                <Spinner
                  className={classNames('custom-select-loading-spinner', spinnerClassName)}
                />
                {loadingText && <p className="custom-select-loading-text">{loadingText}</p>}
              </>
            )}
            {status === 'error' && (
              <>
                <p className="custom-select-error-text">{error}</p>
                {retryFn && (
                  <Button className="custom-select-retry-button" onClick={retryFn}>
                    Try again
                  </Button>
                )}
              </>
            )}
            {status === 'ready' && (
              <>
                {selectedOption?.Icon && (
                  <span className="custom-select-ready-icon">{selectedOption.Icon}</span>
                )}
                <span className="custom-select-ready-label">{selectedOption?.label}</span>
                <span className="custom-select-ready-svg-container">
                  <svg
                    className="custom-select-ready-svg"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </>
            )}
          </div>
        </button>
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div
                key={key}
                style={props}
                ref={selectOptionsRef}
                className={classNames(
                  'custom-select-options-container sm:text-sm sm:leading-5',
                  optionsContainerClassName,
                )}
              >
                {!isLoading &&
                  options.map((option, index) => (
                    <div
                      role="button"
                      tabIndex={-1}
                      className={classNames(
                        'custom-select-option',
                        {
                          'custom-select-active-option': activeIndex === index,
                          'custom-select-not-active-option': activeIndex !== index,
                        },
                        optionClassName ? optionClassName(option.value) : '',
                      )}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(-1)}
                      onClick={() => {
                        if (onChange) {
                          onChange(option.value, option);
                        }
                        setIsOpen(false);
                      }}
                      onKeyDown={() => {
                        // TODO
                      }}
                      key={option.value}
                    >
                      {option.Icon && (
                        <span
                          className={classNames('custom-select-option-icon', {
                            'custom-select-option-icon-active': activeIndex === index,
                            'custom-select-option-icon-not-active': activeIndex !== index,
                          })}
                        >
                          {option.Icon}
                        </span>
                      )}
                      <span
                        className={classNames('custom-select-option-label', {
                          'custom-select-option-label-selected':
                            option.value === selectedOption?.value,
                          'custom-select-option-label-not-selected':
                            option.value !== selectedOption?.value,
                        })}
                      >
                        {option.label}
                      </span>
                    </div>
                  ))}
              </animated.div>
            ),
        )}
      </div>
    </FocusLock>
  );
}
