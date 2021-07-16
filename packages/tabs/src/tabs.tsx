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
      <div className="tabs-wrapper">
        {tabs.map((tab, index) => (
          <button
            type="button"
            role="tab"
            id={`tabs${id}-tab-${activeIndex}`}
            aria-controls={`tabs${id}-tabpanel-${activeIndex}`}
            arie-aria-selected={index === activeIndex}
            key={tab.label}
            className={classNames('tabs-tab', {
              'tabs-tab-active': activeIndex === index,
            })}
            onClick={() => setActiveIndex(index)}
          >
            <p
              className={classNames('tabs-tab-label', {
                'tabs-tab--active': activeIndex === index || activeIndex === index + 1,
              })}
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
