import React, { useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { ButtonSpinner } from '@app-garage/button-spinner';
import { Button } from '@app-garage/button';
import { FocusLock } from '@app-garage/focus-trap';
import { useTransition, animated } from 'react-spring';
import { useSelect } from './select-hooks';

type SelectTypes = {
  /**
   Array of option objects, each has a label and a value, and optionally an Icon.
  */
  options: {
    label: string;
    value: number | string;
    Icon?: React.ComponentType<{ className?: string }>;
  }[];
  /**
   The selected value.
  */
  selected: number | string;
  onChange?: (item?: number | string) => void;
  containerClassName: string;
  cursorPointer?: boolean;
  label: string;
  isLoading?: boolean;
  spinnerClassName?: string;
  error?: string;
  retryFn?: () => void;
  loadingText?: string;
};

export const Select = ({
  options,
  selected,
  onChange,
  containerClassName,
  label,
  cursorPointer,
  isLoading = false,
  spinnerClassName,
  error,
  retryFn,
  loadingText,
}: SelectTypes): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>();

  const selectOptionsRef = useRef<HTMLDivElement>();
  const selectButtonRef = useRef<HTMLButtonElement>();
  const selectedOption = useMemo(
    () =>
      !isLoading
        ? options?.find((option) => option.value === selected)
        : { label: 'No selected option', Icon: undefined, value: '' },
    [selected, isLoading, options],
  );

  const transitions = useTransition(isOpen, null, {
    // @ts-ignore
    from: { opacity: 0, transform: 'translateY(0px)' },
    enter: { opacity: 1, transform: 'translateY(10px)' },
    leave: { opacity: 0, transform: 'translateY(0px)' },
  });

  const onSpaceOrEnterPress = () => {
    if (isOpen) {
      onChange(options[activeIndex].value);
    }
  };

  useSelect({
    isOpen,
    setIsOpen,
    selectOptionsRef,
    selectButtonRef,
    activeIndex,
    setActiveIndex,
    options,
    onChange,
    onSpaceOrEnterPress,
  });

  return (
    <FocusLock restoreFocus isDisabled={!isOpen}>
      <div className={containerClassName}>
        <>
          {label && (
            <div className="block text-sm leading-5 font-medium text-gray-700 mb-2">
              <p className={classNames('', { 'text-red-600': error })}>
                {label}
              </p>
            </div>
          )}
          <div className="relative">
            <button
              type="button"
              ref={selectButtonRef}
              onClick={() => {
                setIsOpen((prev) => {
                  setActiveIndex(
                    options.findIndex(
                      (element) => element.value === selectedOption.value,
                    ),
                  );

                  return !prev;
                });
              }}
              className="inline-flex w-full rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            >
              <div
                className={`flex items-center ${
                  cursorPointer ? 'cursor-pointer' : 'cursor-default'
                } ${isLoading ? 'justify-between' : 'justify-start'} ${
                  error
                    ? 'border border-red-600 justify-between pr-2'
                    : 'border border-gray-300 focus:border-blue-300 pr-8'
                } relative w-full rounded-md border border-gray-300 bg-white pl-2 py-2 text-left focus:outline-none focus:shadow-outline-blue  transition ease-in-out duration-150 sm:text-sm sm:leading-5`}
              >
                {isLoading ? (
                  <ButtonSpinner
                    className={classNames('flex-shrink-0', spinnerClassName)}
                  />
                ) : (
                  <>
                    {error ? (
                      <p className="text-red-600 ">{error}</p>
                    ) : (
                      <>
                        {selectedOption?.Icon && (
                          <span className="flex items-center mr-1.5">
                            {selectedOption?.Icon}
                          </span>
                        )}
                        <span className="block truncate">
                          {selectedOption?.label}
                        </span>
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
                  </>
                )}
                {isLoading && loadingText && (
                  <p className=" text-gray-400">{loadingText}</p>
                )}
                {error && retryFn && (
                  <Button
                    className="text-white font-semibold bg-red-400 hover:bg-red-500 text-base focus:bg-red-500 px-2 py-1 rounded"
                    onClick={retryFn}
                  >
                    Try again
                  </Button>
                )}
              </div>
            </button>
            {/* @ts-ignore */}
            {transitions.map(({ item, key, props }) =>
              item && !error && !isLoading ? (
                <animated.div
                  key={key}
                  style={props}
                  ref={selectOptionsRef}
                  className="max-h-60 rounded-md py-1 text-base leading-6 shadow-lg overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                >
                  {!isLoading &&
                    options.map((option, index) => (
                      <div
                        role="button"
                        tabIndex={-1}
                        className="w-full"
                        onMouseEnter={() => setActiveIndex(index)}
                        onMouseLeave={() => setActiveIndex(undefined)}
                        onClick={() => {
                          onChange(option.value);
                          setIsOpen(false);
                        }}
                        onKeyDown={() => {
                          // TODO
                        }}
                        key={option.value}
                      >
                        {/* TODO refactor to use classnames */}
                        <div
                          className={`${
                            activeIndex === index
                              ? 'text-white bg-blue-600'
                              : 'text-gray-900'
                          } ${
                            cursorPointer ? 'cursor-pointer' : 'cursor-default'
                          } select-none relative py-2 px-2 flex items-center`}
                        >
                          {option.Icon && (
                            <span
                              className={`${
                                activeIndex === index
                                  ? 'text-white'
                                  : 'text-blue-600'
                              } flex items-center mr-1.5`}
                            >
                              {option.Icon}
                            </span>
                          )}
                          <span
                            className={`${
                              option.value === selectedOption.value
                                ? 'font-semibold'
                                : 'font-normal'
                            } block truncate`}
                          >
                            {option.label}
                          </span>
                        </div>
                      </div>
                    ))}
                </animated.div>
              ) : null,
            )}
          </div>
        </>
      </div>
    </FocusLock>
  );
};
