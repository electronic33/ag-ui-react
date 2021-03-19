import React, { ReactElement, useMemo } from "react";
import { Listbox, Transition } from "@headlessui/react";
import classNames from "classnames";
import ButtonSpinner from "../ButtonSpinner/ButtonSpinner";
import Button from "../Button/Button";

export interface SelectTypes {
  /**
   Array of option objects, each has a label and a value, and optionally an Icon.
  */
  options: {
    label: string;
    value: number | string;
    Icon?: ReactElement<{ className?: string }>;
  }[];
  /**
   The selected value.
  */
  selected: number | string;
  onChange?: (item?) => void;
  containerClassName: string;
  cursorPointer?: boolean;
  label: string;
  isLoading?: boolean;
  spinnerClassName?: string;
  error?: string;
  retryFn?: () => void;
  loadingText?: string;
}

const Select = ({
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
  const selectedOption = useMemo(
    () =>
      !isLoading
        ? options?.find((option) => option.value === selected)
        : { label: "No selected option" },
    [selected, isLoading],
  );

  return (
    <Listbox
      as="div"
      className={containerClassName}
      value={selected}
      onChange={onChange}
    >
      {({ open }) => (
        <>
          {label && (
            <Listbox.Label className="block text-sm leading-5 font-medium text-gray-700 mb-2">
              <p className={classNames("", { "text-red-600": error })}>
                {label}
              </p>
            </Listbox.Label>
          )}
          <div className="relative">
            <span className="inline-flex w-full rounded-md shadow-sm">
              <Listbox.Button
                className={`flex items-center ${
                  cursorPointer ? "cursor-pointer" : "cursor-default"
                } ${isLoading ? "justify-between" : "justify-start"} ${
                  error
                    ? "border border-red-600 justify-between pr-2"
                    : "border border-gray-300 focus:border-blue-300 pr-8"
                } relative w-full rounded-md border border-gray-300 bg-white pl-2 py-2 text-left focus:outline-none focus:shadow-outline-blue  transition ease-in-out duration-150 sm:text-sm sm:leading-5`}
              >
                {isLoading ? (
                  <ButtonSpinner
                    className={classNames("flex-shrink-0", spinnerClassName)}
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
                        </span>{" "}
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
              </Listbox.Button>
            </span>
            <Transition
              show={open}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10"
            >
              {!error && !isLoading ? (
                <Listbox.Options
                  static
                  className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                >
                  {!isLoading &&
                    options.map((option) => (
                      <Listbox.Option key={option.value} value={option.value}>
                        {({ selected: isSelected, active }) => (
                          <div
                            className={`${
                              active
                                ? "text-white bg-blue-600"
                                : "text-gray-900"
                            } ${
                              cursorPointer
                                ? "cursor-pointer"
                                : "cursor-default"
                            } select-none relative py-2 px-2 flex items-center`}
                          >
                            {option.Icon && (
                              <span
                                className={`${
                                  active ? "text-white" : "text-blue-600"
                                } flex items-center mr-1.5`}
                              >
                                {option.Icon}
                              </span>
                            )}
                            <span
                              className={`${
                                isSelected ? "font-semibold" : "font-normal"
                              } block truncate`}
                            >
                              {option.label}
                            </span>
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                </Listbox.Options>
              ) : null}
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default Select;
