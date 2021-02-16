import React, { useMemo } from "react";
import { Listbox, Transition } from "@headlessui/react";

interface SelectTypes {
  options: {
    label: string;
    value: number | string;
    Icon?: React.ComponentType;
  }[];
  selected: number | string;
  onChange?: (item?) => void;
  className: string;
  label: string;
  cursorPointer?: string;
}

const Select = ({
  options,
  selected,
  onChange,
  className,
  label,
  cursorPointer,
}: SelectTypes): React.ReactElement => {
  const selectedOption = useMemo(
    () => options.find((option) => option.value === selected),
    [selected],
  );

  return (
    <Listbox
      as="div"
      className={className}
      value={selected}
      onChange={onChange}
    >
      {({ open }) => (
        <>
          {label && (
            <Listbox.Label className="block text-sm leading-5 font-medium text-gray-700 mb-2">
              {label}
            </Listbox.Label>
          )}
          <div className="relative">
            <span className="inline-flex w-full rounded-md shadow-sm">
              <Listbox.Button
                className={`flex items-center ${
                  cursorPointer ? "cursor-pointer" : "cursor-default"
                } relative w-full rounded-md border border-gray-300 bg-white pl-2 pr-8 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5`}
              >
                {selectedOption.Icon && (
                  <span className="flex items-center mr-1.5">
                    {selectedOption.Icon}
                  </span>
                )}
                <span className="block truncate">{selectedOption.label}</span>
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
              </Listbox.Button>
            </span>
            <Transition
              show={open}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10"
            >
              <Listbox.Options
                static
                className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
              >
                {options.map((option) => (
                  <Listbox.Option key={option.value} value={option.value}>
                    {({ selected: isSelected, active }) => (
                      <div
                        className={`${
                          active ? "text-white bg-blue-600" : "text-gray-900"
                        } ${
                          cursorPointer ? "cursor-pointer" : "cursor-default"
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
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default Select;
