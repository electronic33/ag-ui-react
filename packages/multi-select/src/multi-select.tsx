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

type Option<T> = {
  label: string;
  value: T;
  Icon?: React.ElementType<{ className?: string }>;
};

type MultiSelectTypes<T> = {
  options: Option<T>[];
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
            (item) => item.label.toLowerCase().search(debouncedFilterValue.toLowerCase()) !== -1,
          )
        : options,
    [filterValue, options, debouncedFilterValue],
  );

  const onSpaceOrEnterPress = useCallback(() => {
    // event.stopPropagation();

    if (isOpen && !value.includes(updatedList[activeIndex as number].value)) {
      const newOptions = value.concat(updatedList[activeIndex as number].value);

      onChange(newOptions);
    } else if (isOpen && value.includes(updatedList[activeIndex as number].value)) {
      const newOptions = value.filter(
        (selectedOption) => selectedOption !== updatedList[activeIndex as number].value,
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
      <div className={classNames(containerClassName, 'multi-select-container')}>
        <>
          {label && (
            <div className="multi-select-label">
              <p className={classNames({ 'multi-select-label-error': error })}>{label}</p>
            </div>
          )}
          <div className="multi-select-container">
            <button
              data-testid="select-button "
              type="button"
              ref={selectButtonRef}
              onClick={() => {
                if (transitions.length === 1 && !isOpen) {
                  setActiveIndex(
                    options.findIndex((element) => element?.value === options[0]?.value),
                  );
                }
                setIsOpen((prev) => !prev);
              }}
              className="multi-select-main-button"
            >
              <div
                className={classNames('multi-select-selected-options-status-div', {
                  'multi-select-status-loading': status === 'loading',
                  'multi-select-status-not-loading': status !== 'loading',
                  'multi-select-status-error': status === 'error',
                })}
              >
                {status === 'loading' && (
                  <>
                    <Spinner
                      className={classNames('multi-select-loading-spinner', spinnerClassName)}
                    />
                    {loadingText && <p className=" multi-select-loading-text">{loadingText}</p>}
                  </>
                )}
                {status === 'error' && (
                  <>
                    <p className="multi-select-error-text">{error}</p>
                    {retryFn && (
                      <Button className="multi-select-retry-button" onClick={retryFn}>
                        Try again
                      </Button>
                    )}
                  </>
                )}
                {status === 'ready' && !selectedOptions?.length && (
                  <p className="multi-select-ready-no-selected">{placeholder}</p>
                )}
                {status === 'ready' &&
                  !!selectedOptions?.length &&
                  selectedOptions?.map((option) => (
                    <>
                      <div className="multi-select-selected-options-container" key={option?.value}>
                        <div className="multi-select-selected-options-label-icon-container">
                          {option?.Icon && (
                            <span className="multi-select-selected-options-icon">
                              {option?.Icon}
                            </span>
                          )}
                          <span className="multi-select-selected-options-label">
                            {option?.label}
                          </span>
                        </div>

                        <button
                          type="button"
                          className="multi-select-remove-selected-option-button"
                          onClick={(e) => {
                            e.stopPropagation();

                            const newOptions = value.filter(
                              (selectedOption) => selectedOption !== option?.value,
                            );
                            onChange(newOptions);
                          }}
                        >
                          <svg
                            className="multi-select-remove-selected-option-button-svg"
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
                  className="multi-select-unselect-all-button"
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
                      className="multi-select-options-container"
                    >
                      {withFilter && (
                        <TextInput
                          ref={inputRef}
                          containerClassName="multi-select-options-filter"
                          inputClassName="multi-select-options-filter-input"
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
                      {isLoadingOptions && (
                        <Spinner className="multi-select-options-loading-spinner" />
                      )}
                      {isErrorOptions && (
                        <div className="multi-select-options-error">{optionsError}</div>
                      )}
                      {!isLoading &&
                        !isLoadingOptions &&
                        !isErrorOptions &&
                        updatedList?.map((option, index) => (
                          <div
                            data-testid={`${
                              activeIndex === index ? 'active-option' : 'not-active-option'
                            }`}
                            key={option.value}
                            tabIndex={-1}
                            role="button"
                            className="multi-select-options-list-container"
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
                                    selectedOption !== updatedList[activeIndex as number].value,
                                );

                                onChange(newOptions);
                              } else {
                                const newOptions = value.concat(option.value);
                                onChange(newOptions);
                              }
                            }}
                          >
                            <div
                              className={classNames('multi-select-options-list-div', {
                                'multi-select-options-list-div-active': activeIndex === index,
                                'multi-select-options-list-div-not-active': activeIndex !== index,
                              })}
                            >
                              <div className="multi-select-options-list-div-div">
                                <div className="multi-select-options-list-div-div-option">
                                  {option.Icon && (
                                    <span
                                      className={classNames(
                                        'multi-select-options-list-div-div-option-icon',
                                        {
                                          'multi-select-options-list-div-div-option-icon-active':
                                            activeIndex === index,
                                          'multi-select-options-list-div-div-option-icon-not-active':
                                            activeIndex !== index,
                                        },
                                      )}
                                    >
                                      {option.Icon}
                                    </span>
                                  )}
                                  <span
                                    className={classNames('block truncate', {
                                      'multi-select-options-list-div-div-option-label-active':
                                        value.includes(option.value),
                                      'multi-select-options-list-div-div-option-label-not-active':
                                        !value.includes(option.value),
                                    })}
                                  >
                                    {option.label}
                                  </span>
                                </div>
                                {value.includes(option.value) && (
                                  <svg
                                    className="multi-select-options-list-div-div-active-icon"
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
