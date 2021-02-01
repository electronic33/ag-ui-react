import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { MdArrowDropDown } from "react-icons/md";

const DropdownButton = ({ menuItems }) => {
  const activeItemClasses =
    "bg-gray-900 bg-opacity-60 text-white transition-all duration-200";
  const disabledItemClasses = "opacity-75 outline-none";
  return (
    <Menu>
      {({ open }) => (
        <>
          <Menu.Button className="bg-gray-900 bg-opacity-60 transition text-white py-2 px-4 shadow-md">
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
            <Menu.Items className="flex flex-col outline-none py-4 px-2 border-2 border-gray-400 shadow-md max-w-xs">
              {menuItems.map(({ text, href, disabled }) => (
                <>
                  {disabled ? (
                    <Menu.Item disabled>
                      <span
                        className={`${disabledItemClasses} border-b-2 pl-2 py-2`}
                      >
                        {text}
                      </span>
                    </Menu.Item>
                  ) : (
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          className={`border-b-2 pl-2 py-2 ${
                            active && activeItemClasses
                          }`}
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
