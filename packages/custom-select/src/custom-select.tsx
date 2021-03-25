import React, { useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import { ButtonSpinner } from "@app-garage/button-spinner";
import { Button } from "@app-garage/button";
import { FocusLock } from "@app-garage/focus-trap";
import { useTransition, animated } from "react-spring";

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

const getNextItemFromSearch = <T,>(
  items: T[],
  searchString: string,
  itemToString: (item: T) => string,
  currentItem: T,
) => {
  if (searchString === null) {
    return currentItem;
  }

  // If current item doesn't exist, find the item that matches the search string
  if (!currentItem) {
    const foundItem = items.find((item) =>
      itemToString(item).toLowerCase().startsWith(searchString.toLowerCase()),
    );

    return foundItem;
  }

  // Filter items for ones that match the search string (case insensitive)
  const matchingItems = items.filter((item) =>
    itemToString(item).toLowerCase().startsWith(searchString.toLowerCase()),
  );

  // If there's a match, let's get the next item to select
  if (matchingItems.length > 0) {
    let nextIndex: number;

    // If the currentItem is in the available items, we move to the next available option
    if (matchingItems.includes(currentItem)) {
      const currentIndex = matchingItems.indexOf(currentItem);
      nextIndex = currentIndex + 1;

      if (nextIndex === matchingItems.length) {
        nextIndex = 0;
      }

      return matchingItems[nextIndex];
    }

    // Else, we pick the first item in the available items
    nextIndex = items.indexOf(matchingItems[0]);

    return items[nextIndex];
  }

  // a decent fallback to the currentItem
  return currentItem;
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
        : { label: "No selected option", Icon: undefined, value: "" },
    [selected, isLoading, options],
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isOpen &&
        selectOptionsRef.current &&
        !selectOptionsRef.current.contains(event.target) &&
        selectButtonRef.current &&
        !selectButtonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (isOpen && event.code === "Escape") {
        setIsOpen(false);
      }

      if (event.code === "ArrowDown") {
        if (!isOpen && document.activeElement === selectButtonRef.current) {
          setIsOpen(true);
          setActiveIndex(0);
        } else if (activeIndex === undefined) {
          setActiveIndex(0);
        }

        if (options.length > 0) {
          if (options.length - 1 === activeIndex) {
            setActiveIndex(0);
          } else {
            setActiveIndex((prev) => prev + 1);
          }
        }
      }

      if (event.code === "ArrowUp") {
        if (!isOpen && document.activeElement === selectButtonRef.current) {
          setIsOpen(true);
          setActiveIndex(options.length - 1);
        } else if (activeIndex === undefined) {
          setActiveIndex(options.length - 1);
        }

        if (options.length > 0) {
          if (activeIndex === 0) {
            setActiveIndex(options.length - 1);
          } else {
            setActiveIndex((prev) => prev - 1);
          }
        }
      }

      // const indexWithStartingLetter = options.findIndex(
      //   (element) => element.label.charAt(0).toLowerCase() === event.key,
      // );

      // if (indexWithStartingLetter !== -1) {
      //   setActiveIndex(indexWithStartingLetter);
      // }

      const nextItem = getNextItemFromSearch(
        options.map((element) => element.label),
        event.key,
        (thing) => thing,
        options[activeIndex].label,
      );

      if (nextItem) {
        const index = options.findIndex(
          (element) => element.label === nextItem,
        );

        setActiveIndex(index);
      }

      if ((event.code === "Space" || event.code === "Enter") && isOpen) {
        onChange(options[activeIndex].value);
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [activeIndex, isOpen, options, onChange]);

  const transitions = useTransition(isOpen, null, {
    from: { opacity: 0, transform: "translateY(0px)" },
    enter: { opacity: 1, transform: "translateY(10px)" },
    leave: { opacity: 0, transform: "translateY(0px)" },
  });

  return (
    <FocusLock restoreFocus isDisabled={!isOpen}>
      <div className={containerClassName}>
        <>
          {label && (
            <div className="block text-sm leading-5 font-medium text-gray-700 mb-2">
              <p className={classNames("", { "text-red-600": error })}>
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
              </div>
            </button>

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
                              ? "text-white bg-blue-600"
                              : "text-gray-900"
                          } ${
                            cursorPointer ? "cursor-pointer" : "cursor-default"
                          } select-none relative py-2 px-2 flex items-center`}
                        >
                          {option.Icon && (
                            <span
                              className={`${
                                activeIndex === index
                                  ? "text-white"
                                  : "text-blue-600"
                              } flex items-center mr-1.5`}
                            >
                              {option.Icon}
                            </span>
                          )}
                          <span
                            className={`${
                              option.value === selectedOption.value
                                ? "font-semibold"
                                : "font-normal"
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
