import React from "react";
import classNames from "classnames";

interface TabsTypes {
  tabs: {
    title?: string;
    Icon?: React.ComponentType;
    content?: React.ComponentType;
  }[];
  currentTab: number;
  setCurrentTab: (index: number) => void;
}

const Tabs = ({
  tabs,
  currentTab,
  setCurrentTab,
}: TabsTypes): React.ReactElement => {
  return (
    <div className="tabs">
      <div className="flex">
        {tabs.map((tab, index) => (
          <div
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
          <div key={index}>
            <div>{currentTab === index && <tab.content />}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
