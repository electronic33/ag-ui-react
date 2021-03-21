import React, { useEffect } from "react";
import classNames from "classnames";
import { useId } from "react-id-generator";

export interface TabsTypes {
  /**
   Array of tab objects, each taking in a title, a content component, and optionally an Icon.
  */
  tabs: {
    title?: string;
    Icon?: React.ComponentType;
    content?: React.ComponentType;
  }[];
  /**
   The index of the active tab.
  */
  currentTab: number;
  setCurrentTab: (index: number) => any;
}

const Tabs = ({
  tabs,
  currentTab,
  setCurrentTab,
}: TabsTypes): React.ReactElement => {
  const id = useId();
  useEffect(() => {
    function handleArrowPress(e) {
      if (e.code === "ArrowRight" && currentTab < tabs.length - 1) {
        setCurrentTab((prev) => prev + 1);
      }
      if (e.code === "ArrowLeft" && currentTab > 0) {
        setCurrentTab((prev) => prev - 1);
      }
    }

    document.addEventListener("keydown", handleArrowPress);
    return () => document.removeEventListener("keydown", handleArrowPress);
  }, [currentTab]);

  return (
    <div role="tablist" className="tabs">
      <div className="flex">
        {tabs.map((tab, index) => (
          <div
            role="tab"
            id={`tabs${id}-tab-${currentTab}`}
            aria-controls={`tabs${id}-tabpanel-${currentTab}`}
            arie-aria-selected={index === currentTab}
            key={index}
            className={classNames("py-5 cursor-pointer", {
              "bg-white": currentTab === index,
            })}
            onClick={() => setCurrentTab(index)}
          >
            <p
              className={classNames(
                "text-lg px-7 border-r-2 border-gray-300 text-gray-400 hover:text-gray-800 font-medium",
                {
                  "border-none":
                    currentTab === index || currentTab === index + 1,
                },
              )}
            >
              {tab.title}
            </p>
          </div>
        ))}
      </div>
      <div>
        {tabs.map((tab, index) => (
          <div
            role="tabpanel"
            id={`tabs${id}-tabpanel-${currentTab}`}
            aria-labelledby={`tabs${id}-tab-${currentTab}`}
            key={index}
          >
            <div>{currentTab === index && <tab.content />}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
