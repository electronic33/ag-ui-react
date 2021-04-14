import React, { useCallback, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { Spinner } from '@app-garage/spinner';
import { Button } from '@app-garage/button';
import { FocusLock } from '@app-garage/focus-trap';
import { animated } from 'react-spring';
import { Label } from '@app-garage/label';
import { useSelect } from './select-hooks';

type OptionValue = number | string;

type SelectProps<T extends OptionValue> = {
  options: {
    label: string;
    value: T;
    Icon?: React.ComponentType<{ className?: string }>;
  }[];
  value?: T;
  onChange?: (value: T) => void;
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

  const selectedOption = useMemo(
    () =>
      !isLoading
        ? options.find((option) => option.value === value)
        : { label: placeholder, Icon: undefined, value: undefined },
    [value, isLoading, options, placeholder],
  );

  const onSpaceOrEnterPress = useCallback(() => {
    if (isOpen && onChange) {
      onChange(options[activeIndex].value);
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
      <div className={containerClassName}>
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
                options.findIndex(
                  (element) => element.value === selectedOption?.value,
                ),
              );

              return !prev;
            });
          }}
          // TODO: extract classes
          className={classNames(
            'inline-flex w-full rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 relative',
            selectClassName,
          )}
        >
          <div
            // TODO: extract classes
            className={classNames(
              'flex items-center relative w-full rounded-md border border-gray-300 bg-white pl-2 py-2 text-left focus:outline-none focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5',
              {
                'justify-between': status === 'loading',
                'justify-start': status !== 'loading',
                'border-red-600 justify-between pr-2': status === 'error',
                'border-gray-300 focus:border-blue-300 pr-8':
                  status !== 'error',
              },
            )}
          >
            {status === 'loading' && (
              <>
                <Spinner
                  className={classNames(
                    'flex-shrink-0 w-5 h-5',
                    spinnerClassName,
                  )}
                />
                {loadingText && <p className="text-gray-400">{loadingText}</p>}
              </>
            )}
            {status === 'error' && (
              <>
                <p className="text-red-600">{error}</p>
                {retryFn && (
                  <Button
                    className="text-white font-semibold bg-red-400 hover:bg-red-500 text-base focus:bg-red-500 px-2 py-1 rounded"
                    onClick={retryFn}
                  >
                    Try again
                  </Button>
                )}
              </>
            )}
            {status === 'ready' && (
              <>
                {selectedOption?.Icon && (
                  <span className="flex items-center mr-1.5">
                    {selectedOption.Icon}
                  </span>
                )}
                <span className="block truncate">{selectedOption?.label}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
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
                // TODO: extract in classes
                className={classNames(
                  'max-h-60 rounded-md py-1 text-base leading-6 shadow-lg overflow-auto focus:outline-none sm:text-sm sm:leading-5',
                  optionsContainerClassName,
                )}
              >
                {!isLoading &&
                  options.map((option, index) => (
                    <div
                      role="button"
                      tabIndex={-1}
                      // TODO: extract in classes
                      className={classNames(
                        'w-full select-none relative py-2 px-2 flex items-center',
                        {
                          'text-white bg-blue-600': activeIndex === index,
                          'text-gray-900': activeIndex !== index,
                        },
                        optionClassName ? optionClassName(option.value) : '',
                      )}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(-1)}
                      onClick={() => {
                        if (onChange) {
                          onChange(option.value);
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
                          className={classNames('flex items-center mr-1.5', {
                            'text-white': activeIndex === index,
                            'text-blue-600': activeIndex !== index,
                          })}
                        >
                          {option.Icon}
                        </span>
                      )}
                      <span
                        className={classNames('block truncate', {
                          'font-semibold':
                            option.value === selectedOption?.value,
                          'font-normal': option.value !== selectedOption?.value,
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
