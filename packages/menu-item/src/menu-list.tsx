import React, { useEffect, useRef, useState } from "react";
import { FocusTrap } from "@app-garage/focus-trap";
import { useForceRenderHook } from "@app-garage/utils";

const arr = [];

const fillArrWithMenuItems = (root) => {
  if (root.attributes.getNamedItem("role")?.value === "menuitem") {
    arr.push(root);
    return;
  }

  if (root.children.length === 0) {
    return;
  }

  for (let i = 0; i < root.children.length; i += 1) {
    fillArrWithMenuItems(root.children[i]);
  }
};

export const MenuList = ({ children }) => {
  const ref = useRef();
  const [activeIndex, setActiveIndex] = useState(0);

  const forceRender = useForceRenderHook();

  useEffect(() => {
    fillArrWithMenuItems(ref.current.children[2]);
  }, []);

  console.log(
    "🚀 ~ file: MenuList.tsx ~ line 34 ~ fillArrWithMenuItems ~ arr",
    arr,
  );
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.code === "ArrowDown") {
        if (arr.length > 0) {
          if (arr.length - 1 === activeIndex) {
            // arr[0].focus();
            arr[activeIndex].setAttribute("data-is-tabbed", "inactive");
            arr[0].setAttribute("data-is-tabbed", "active");
            setActiveIndex(0);
          } else {
            arr[activeIndex].setAttribute("data-is-tabbed", "inactive");
            arr[activeIndex + 1].setAttribute("data-is-tabbed", "active");
            setActiveIndex((prevState) => prevState + 1);
          }
        }

        forceRender();
      }

      if (e.code === "ArrowUp") {
        if (arr.length > 0) {
          if (activeIndex === 0) {
            // arr[arr.length - 1].focus();
            arr[activeIndex].setAttribute("data-is-tabbed", "inactive");
            arr[arr.length - 1].setAttribute("data-is-tabbed", "active");
            setActiveIndex(arr.length - 1);
          } else {
            arr[activeIndex].setAttribute("data-is-tabbed", "inactive");
            arr[activeIndex - 1].setAttribute("data-is-tabbed", "active");
            setActiveIndex((prevState) => prevState - 1);
          }
        }

        forceRender();
      }

      const alreadyActiveIndex = arr.findIndex(
        (element) =>
          element.attributes.getNamedItem("data-is-tabbed")?.value === "active",
      );

      if (alreadyActiveIndex !== -1) {
        setActiveIndex(alreadyActiveIndex);
        forceRender();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [activeIndex]);

  console.log(" I RENDER");

  return (
    <div ref={ref} className="bg-white flex w-60 flex-col py-2">
      <FocusTrap>
        {React.Children.map(children, (child) => {
          console.log(child);
          return React.cloneElement(child, null);
        })}
      </FocusTrap>
    </div>
  );
};

