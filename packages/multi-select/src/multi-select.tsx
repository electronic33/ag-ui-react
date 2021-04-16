import React, { useCallback, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { Spinner } from '@app-garage/spinner';
import { Button } from '@app-garage/button';
import { FocusLock } from '@app-garage/focus-trap';
import { useTransition, animated } from 'react-spring';
import { useSelect } from '@app-garage/custom-select';
import { TextInput } from '@app-garage/text-input';
import { useDebounce } from '@app-garage/utils';

type OptionValue = number | string;

type MultiSelectTypes<T> = {
  options: {
    label: string;
    value: T;
    Icon?: React.ReactElement<{ className?: string }>;
  }[];
  value: T[];
  onChange: (value: T[]) => void;
  containerClassName: string;
  label?: string;
  isLoading?: boolean;
  spinnerClassName?: string;
  error?: string;
  retryFn?: () => void;
  loadingText?: string;
  withFilter?: boolean;
  isLoadingOptions?: boolean;
  isErrorOptions?: boolean;
  optionsError?: string;
  placeholder?: string;
};

export function MultiSelect<T extends OptionValue>({
  options,
  value,
  onChange,
  containerClassName,
  label,
  isLoading,
  spinnerClassName,
  error,
  retryFn,
  loadingText,
  isLoadingOptions,
  isErrorOptions,
  optionsError,
  withFilter,
  placeholder,
}: MultiSelectTypes<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const selectOptionsRef = useRef<HTMLDivElement>(null);
  const selectButtonRef = useRef<HTMLButtonElement>(null);

  const [filterValue, setFilterValue] = useState('');

  const selectedOptions = useMemo(
    // @ts-ignore
    () => value.map((val) => options?.find((o) => o?.value === val)),
    [options, value],
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedFilterValue: string = useDebounce(filterValue, 500);

  const handleFilterInputChange = useCallback((event) => {
    setFilterValue(event.target.value);
  }, []);

  const updatedList = useMemo(
    () =>
      filterValue
        ? options.filter(
            (item) =>
              item.label
                .toLowerCase()
                .search(debouncedFilterValue.toLowerCase()) !== -1,
          )
        : options,
    [filterValue, options, debouncedFilterValue],
  );

  const onSpaceOrEnterPress = useCallback(() => {
    // event.stopPropagation();

    if (isOpen && !value.includes(updatedList[activeIndex as number].value)) {
      const newOptions = value.concat(updatedList[activeIndex as number].value);

      onChange(newOptions);
    } else if (
      isOpen &&
      value.includes(updatedList[activeIndex as number].value)
    ) {
      const newOptions = value.filter(
        (selectedOption) =>
          selectedOption !== updatedList[activeIndex as number].value,
      );

      onChange(newOptions);
    }
  }, [value, onChange, activeIndex, updatedList, isOpen]);

  const transitions = useTransition(isOpen, null, {
    from: { opacity: 0, transform: 'translateY(0px)' },
    enter: { opacity: 1, transform: 'translateY(10px)' },
    leave: { opacity: 0, transform: 'translateY(0px)' },
  });

  // const { onArrowDown } = useSelect({
  const { status } = useSelect({
    isOpen,
    setIsOpen,
    selectOptionsRef,
    selectButtonRef,
    activeIndex,
    setActiveIndex,
    options: updatedList,
    onSpaceOrEnterPress,
    inputRef,
    withFilter,
    isLoading,
    error,
  });

  return (
    <FocusLock restoreFocus isDisabled={!isOpen}>
      <div className={containerClassName}>
        <>
          {label && (
            <div className="block text-sm leading-5 font-medium text-gray-700 mb-2">
              <p className={classNames({ 'text-red-600': error })}>{label}</p>
            </div>
          )}
          <div className="relative">
            <button
              data-testid="select-button "
              type="button"
              ref={selectButtonRef}
              onClick={() => {
                if (transitions.length === 1 && !isOpen) {
                  setActiveIndex(
                    options.findIndex(
                      (element) => element?.value === options[0]?.value,
                    ),
                  );
                }
                setIsOpen((prev) => !prev);
              }}
              className="inline-flex w-full shadow-sm focus:ring-2 focus:ring-blue-500 rounded-md border border-gray-300"
            >
              <div
                className={classNames(
                  'flex items-center min-h-8 flex-wrap gap-2 relative w-full bg-white pl-2 py-2 text-left focus:outline-none focus:shadow-outline-blue  transition ease-in-out duration-150 sm:text-sm sm:leading-5',
                  {
                    'justify-between': status === 'loading',
                    'justify-start': status !== 'loading',
                    'border border-red-600 justify-between pr-2':
                      status === 'error',
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
                    {loadingText && (
                      <p className=" text-gray-400 mr-5">{loadingText}</p>
                    )}
                  </>
                )}
                {status === 'error' && (
                  <>
                    <p className="text-red-600 ">{error}</p>
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
                {status === 'ready' && !selectedOptions?.length && (
                  <p className="text-gray-400">{placeholder}</p>
                )}
                {status === 'ready' &&
                  !!selectedOptions?.length &&
                  selectedOptions?.map((option) => (
                    <>
                      <div className="flex" key={option?.value}>
                        <div className="flex items-center text-white bg-blue-500 pl-2 pr-1 py-1 rounded-l-full shadow-inner">
                          {option?.Icon && (
                            <span className="flex items-center mr-1.5">
                              {option?.Icon}
                            </span>
                          )}
                          <span className="pb-0.5">{option?.label}</span>
                        </div>

                        <button
                          type="button"
                          className="flex items-center bg-blue-500 rounded-r-full px-1 transition-all hover:bg-blue-700 text-white"
                          onClick={(e) => {
                            e.stopPropagation();

                            const newOptions = value.filter(
                              (selectedOption) =>
                                selectedOption !== option?.value,
                            );
                            onChange(newOptions);
                          }}
                        >
                          <svg
                            className="flex-shrink-0 mt-0.5"
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 512 512"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z" />
                          </svg>
                        </button>
                      </div>
                      {/* TODO: swap with icon only button */}
                    </>
                  ))}
              </div>
              {selectedOptions.length > 0 && (
                <button
                  type="button"
                  className=" p-1 self-center text-gray-600 hover:text-black mr-5"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange([]);
                  }}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z" />
                  </svg>
                </button>
              )}
            </button>

            {status === 'ready' &&
              transitions.map(
                ({ item, key, props }) =>
                  item && (
                    <animated.div
                      key={key}
                      style={props}
                      ref={selectOptionsRef}
                      className="max-h-60 rounded-md py-1 text-base leading-6 shadow-lg overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                    >
                      {withFilter && (
                        <TextInput
                          ref={inputRef}
                          containerClassName="w-full mb-2"
                          placeholder="Search here.."
                          value={filterValue}
                          onChange={(event) => handleFilterInputChange(event)}
                          onClick={(event) => event.stopPropagation()}
                          // onKeyDown={(event) => {
                          //   if (event.code === 'ArrowDown') {
                          //     event.preventDefault();
                          //     onArrowDown();
                          //   }
                          // }}
                        />
                      )}
                      {isLoadingOptions && <Spinner className="p-4" />}
                      {isErrorOptions && (
                        <div className="flex justify-center items-center text-red-600 my-5">
                          {optionsError}
                        </div>
                      )}
                      {!isLoading &&
                        !isLoadingOptions &&
                        !isErrorOptions &&
                        updatedList?.map((option, index) => (
                          <div
                            data-testid={`${
                              activeIndex === index
                                ? 'active-option'
                                : 'not-active-option'
                            }`}
                            key={option.value}
                            tabIndex={-1}
                            role="button"
                            className="w-full outline-none"
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(-1)}
                            onMouseDown={() => {
                              if (value.includes(option.value)) {
                                // {
                                //                                 const newOptions = value.filter(
                                //                                   (selectedOption) =>
                                //                                     options[activeIndex as number].value ===
                                //                                     selectedOption,
                                //                                 );
                                //                                 onChange(newOptions);
                                //                               }
                                const newOptions = value.filter(
                                  (selectedOption) =>
                                    selectedOption !==
                                    updatedList[activeIndex as number].value,
                                );

                                onChange(newOptions);
                              } else {
                                const newOptions = value.concat(option.value);
                                onChange(newOptions);
                              }
                            }}
                          >
                            <div
                              className={classNames(
                                'select-none relative py-2 px-2 flex items-center',
                                {
                                  'text-white bg-blue-600':
                                    activeIndex === index,
                                  'text-gray-900': activeIndex !== index,
                                },
                              )}
                            >
                              <div className="flex justify-between items-center w-full">
                                <div className="flex">
                                  {option.Icon && (
                                    <span
                                      className={classNames(
                                        'flex items-center mr-1.5',
                                        {
                                          'text-gray-50': activeIndex === index,
                                          'text-blue-600':
                                            activeIndex !== index,
                                        },
                                      )}
                                    >
                                      {option.Icon}
                                    </span>
                                  )}
                                  <span
                                    className={classNames('block truncate', {
                                      'font-semibold': value.includes(
                                        option.value,
                                      ),
                                      'font-normal': !value.includes(
                                        option.value,
                                      ),
                                    })}
                                  >
                                    {option.label}
                                  </span>
                                </div>
                                {value.includes(option.value) && (
                                  <svg
                                    className="flex-shrink-0 text-green-500 text-xl"
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 24 24"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M10 15.586L6.707 12.293 5.293 13.707 10 18.414 19.707 8.707 18.293 7.293z" />
                                  </svg>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </animated.div>
                  ),
              )}
          </div>
        </>
      </div>
    </FocusLock>
  );
}
