import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useId } from 'react-id-generator';

type TabsTypes = {
  tabs: {
    label: string;
    Icon?: React.ComponentType;
    content: React.ReactNode;
  }[];
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const Tabs = ({ tabs, activeIndex, setActiveIndex }: TabsTypes) => {
  const id = useId();
  useEffect(() => {
    function handleArrowPress(event: React.KeyboardEvent) {
      if (event.code === 'ArrowRight' && activeIndex < tabs.length - 1) {
        setActiveIndex((prev) => prev + 1);
      }

      if (event.code === 'ArrowLeft' && activeIndex > 0) {
        setActiveIndex((prev) => prev - 1);
      }
    }

    // @ts-ignore
    document.addEventListener('keydown', handleArrowPress);

    // @ts-ignore
    return () => document.removeEventListener('keydown', handleArrowPress);
  }, [activeIndex, setActiveIndex, tabs.length]);

  return (
    <div role="tablist" className="tabs">
      <div className="flex">
        {tabs.map((tab, index) => (
          <button
            type="button"
            role="tab"
            id={`tabs${id}-tab-${activeIndex}`}
            aria-controls={`tabs${id}-tabpanel-${activeIndex}`}
            arie-aria-selected={index === activeIndex}
            key={tab.label}
            className={classNames('py-5 cursor-pointer', {
              'bg-white': activeIndex === index,
            })}
            onClick={() => setActiveIndex(index)}
          >
            <p
              className={classNames(
                'text-lg px-7 border-r-2 border-gray-300 text-gray-400 hover:text-gray-800 font-medium',
                {
                  'border-none':
                    activeIndex === index || activeIndex === index + 1,
                },
              )}
            >
              {tab.label}
            </p>
          </button>
        ))}
      </div>
      {tabs.map(
        (tab, index) =>
          activeIndex === index && (
            <div
              role="tabpanel"
              id={`tabs-${id}-tabpanel-${activeIndex}`}
              aria-labelledby={`tabs-${id}-tab-${activeIndex}`}
              key={tab.label}
            >
              <div>{activeIndex === index && tab.content}</div>
            </div>
          ),
      )}
    </div>
  );
};
