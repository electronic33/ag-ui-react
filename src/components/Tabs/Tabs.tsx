import React from "react";
import classNames from "classnames";

const Tabs = ({ tabs, currentTab, setCurrentTab }) => {
  return (
    <div className="flex flex-col bg-gray-100">
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
