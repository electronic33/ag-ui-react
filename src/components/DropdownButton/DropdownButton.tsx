import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { MdArrowDropDown } from "react-icons/md";
import classNames from "classnames";

const DropdownButton = ({
  menuItems,
  buttonClassNames,
  itemsContainerClassNames,
}: {
  buttonClassNames?: string;
  itemsContainerClassNames?: string;
  /**
   An array of objects, each object can have a text, somewhere to redirect to, and a disabled property.
  */
  menuItems: { text?: string; href?: string; disabled?: boolean }[];
}): React.ReactElement => {
  const activeItemClasses =
    "bg-gray-900 bg-opacity-60 text-white transition-all duration-200";
  const disabledItemClasses = "opacity-75 outline-none";
  return (
    <Menu>
      {({ open }) => (
        <>
          <Menu.Button
            // className="bg-blue-600 transition-all text-white py-2 px-4 shadow-md bg-opacity-25"
            className={classNames(
              "menu-button bg-opacity-25",
              buttonClassNames,
            )}
          >
            <p className="flex items-center text-lg">
              DropdownButton
              <MdArrowDropDown className="flex-shrink-0 text-4xl" />
            </p>
          </Menu.Button>
          <Transition
            show={open}
            enter="transition duration-200 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Menu.Items
              className={classNames(
                "menu-items-container",
                itemsContainerClassNames,
              )}
            >
              {menuItems.map(({ text, href, disabled }, index) => (
                <>
                  {disabled ? (
                    <Menu.Item disabled>
                      <span
                        className={classNames(
                          `border-b-2 pl-2 py-2 ${disabledItemClasses}`,

                          { "border-none": index === menuItems.length - 1 },
                        )}
                      >
                        {text}
                      </span>
                    </Menu.Item>
                  ) : (
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          className={classNames(
                            `border-b-2 pl-2 py-2 ${
                              active && activeItemClasses
                            }`,

                            { "border-none": index === menuItems.length - 1 },
                          )}
                          href={href}
                        >
                          {text}
                        </a>
                      )}
                    </Menu.Item>
                  )}
                </>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
export default DropdownButton;
