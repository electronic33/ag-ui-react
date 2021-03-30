/* eslint-disable no-nested-ternary */
import React, { useCallback, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { ButtonSpinner } from '@app-garage/button-spinner';
import { Button } from '@app-garage/button';
import { FocusLock } from '@app-garage/focus-trap';
import { useTransition, animated } from 'react-spring';
import { IoMdClose } from 'react-icons/io';
import { BiCheck } from 'react-icons/bi';

import { useSelect } from '@app-garage/custom-select';
import { TextInput } from '@app-garage/text-input';
import { useDebounce } from '@app-garage/utils';
import { Spinner } from '@app-garage/spinner';

type Option = {
  label: string;
  value: number | string;
  Icon?: React.ReactElement<{ className?: string }>;
};

type MultiSelectTypes = {
  /**
   Array of option objects, each has a label and a value, and optionally an Icon.
  */
  options: Option[];
  /**
   The selected value.
  */
  selected: number[] | string[];
  onChange?: (item?: number[] | string[]) => void;
  containerClassName: string;
  cursorPointer?: boolean;
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
};

export const MultiSelect = ({
  options,
  selected,
  onChange,
  containerClassName,
  label,
  cursorPointer = true,
  isLoading = false,
  spinnerClassName,
  error,
  retryFn,
  loadingText,
  isLoadingOptions,
  isErrorOptions,
  optionsError,
  withFilter = false,
}: MultiSelectTypes): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>();

  const selectOptionsRef = useRef<HTMLDivElement>();
  const selectButtonRef = useRef<HTMLButtonElement>();

  const [filterValue, setFilterValue] = useState('');

  const selectedOptions = useMemo(
    () => selected.map((val) => options?.find((o) => o?.value === val)),
    [options, selected],
  );

  const inputRef = useRef<HTMLInputElement>();

  const debouncedFilterValue = useDebounce(filterValue, 500);
  const handleChange = (event) => {
    setFilterValue(event.target.value);
  };

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

  const onSpaceOrEnterPress = useCallback(
    (event) => {
      // @ts-ignore
      if (isOpen && !selected.includes(updatedList[activeIndex].value)) {
        // @ts-ignore
        const newOptions = selected.concat(updatedList[activeIndex!].value);

        onChange(newOptions);
      }
      if (
        isOpen &&
        (selected as number[]).includes(
          updatedList[activeIndex].value as number,
        )
      ) {
        // @ts-ignore
        const index: number = selected.indexOf(updatedList[activeIndex].value);
        if (index > -1) {
          // @ts-ignore
          const newOptions = selected.splice(index, 1);
          // @ts-ignore
          onChange(selected.filter((e) => e !== newOptions));
        }
      }
      event.stopPropagation();
    },
    [selected, onChange, activeIndex, updatedList, isOpen],
  );

  const transitions = useTransition(isOpen, null, {
    from: { opacity: 0, transform: 'translateY(0px)' },
    enter: { opacity: 1, transform: 'translateY(10px)' },
    leave: { opacity: 0, transform: 'translateY(0px)' },
  });

  // const { onArrowDown } = useSelect({
  useSelect({
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
  });

  // console.log(
  //   'fsafff',
  //   isOpen && inputRef?.current && document.activeElement === inputRef.current,
  // );

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
                className={`flex items-center flex-wrap gap-2 ${
                  cursorPointer ? 'cursor-pointer' : 'cursor-default'
                } ${isLoading ? 'justify-between' : 'justify-start'} ${
                  error ? 'border border-red-600 justify-between pr-2' : ''
                } relative w-full  bg-white pl-2 py-2 text-left focus:outline-none focus:shadow-outline-blue  transition ease-in-out duration-150 sm:text-sm sm:leading-5`}
              >
                {isLoading ? (
                  <ButtonSpinner
                    className={classNames('flex-shrink-0', spinnerClassName)}
                  />
                ) : (
                  <>
                    {error ? (
                      <p className="text-red-600 ">{error}</p>
                    ) : !selectedOptions?.length ? (
                      <p className="text-gray-400">Pick your options</p>
                    ) : (
                      <>
                        {selectedOptions?.map((option) => (
                          <div className="flex " key={option?.value}>
                            <div
                              className={classNames(
                                'flex bg-blue-500 pl-2 pr-0.5 py-1 rounded-l-full shadow-inner',
                                {},
                              )}
                            >
                              {option?.Icon && (
                                <span className="flex items-center mr-1.5">
                                  {option?.Icon}
                                </span>
                              )}
                              <span className="block truncate text-white">
                                {option?.label}
                              </span>
                            </div>

                            <button
                              type="button"
                              className="flex items-center bg-blue-500 rounded-r-full px-1 transition-all hover:bg-blue-700 hover:text-white"
                              onClick={(e) => {
                                e.stopPropagation();
                                const indexToDelete = selected.indexOf(
                                  // @ts-ignore
                                  option?.value,
                                );

                                if (indexToDelete > -1) {
                                  const newOptions = selected.splice(
                                    indexToDelete,
                                    1,
                                  );
                                  onChange(
                                    // @ts-ignore
                                    selected.filter(
                                      (selectedElement) =>
                                        selectedElement !== newOptions,
                                    ),
                                  );
                                }
                              }}
                            >
                              <IoMdClose className="flex-shrink-0" />
                            </button>
                          </div>
                        ))}
                      </>
                    )}
                  </>
                )}

                {isLoading && loadingText && (
                  <p className=" text-gray-400 mr-5">{loadingText}</p>
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
              {!isLoading && !error && selectedOptions.length > 0 && (
                <button
                  type="button"
                  className=" p-1 self-center text-gray-600 hover:text-black mr-5"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange([]);
                  }}
                >
                  <IoMdClose />
                </button>
              )}
            </button>

            {transitions.map(({ item, key, props }) =>
              item && !error && !isLoading ? (
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
                      onChange={(event) => handleChange(event)}
                      onClick={(event) => event.stopPropagation()}
                      // onKeyDown={(event) => {
                      //   if (event.code === 'ArrowDown') {
                      //     event.preventDefault();
                      //     onArrowDown();
                      //   }
                      // }}
                    />
                  )}
                  {isLoadingOptions && <Spinner containerClassName="p-4" />}
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
                        // onMouseLeave={() => setActiveIndex(undefined)}
                        onMouseDown={() => {
                          // @ts-ignore
                          if (!selected.includes(option.value)) {
                            // @ts-ignore
                            const newOptions = selected.concat(option.value);
                            onChange(newOptions);
                          }
                          // @ts-ignore
                          if (selected.includes(option.value)) {
                            const sa = selected.indexOf(
                              // @ts-ignore
                              options[activeIndex].value,
                            );
                            if (sa > -1) {
                              // @ts-ignore
                              const newOptions = selected.splice(sa, 1);
                              onChange(
                                // @ts-ignore
                                selected.filter((e) => e !== newOptions),
                              );
                            }
                          }
                        }}
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
                          <div className="flex justify-between items-center w-full">
                            <div className="flex">
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
                                  // @ts-ignore
                                  selected.includes(option.value)
                                    ? 'font-semibold'
                                    : 'font-normal'
                                } block truncate`}
                              >
                                {option.label}
                              </span>
                            </div>
                            {/* @ts-ignore */}
                            {selected.includes(option.value) && (
                              <BiCheck className="flex-shrink-0 text-green-500 text-xl" />
                            )}
                          </div>
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
