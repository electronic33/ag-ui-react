/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Spinner } from '@app-garage/spinner';

type SelectableListTypes = {
  onSelect: (value: string | number) => void;
  selectValue?: string | number;
  title?: string;
  items: {
    value: string | number;
    label: string;
    Icon?: React.ComponentType<{ className: string }>;
    Component?: React.ReactNode;
  }[];
  containerClassName?: string;
  itemClassName?: string;
  isLoading?: boolean;
  error?: string;
};

export const SelectableList = ({
  onSelect,
  selectValue,
  title,
  items,
  containerClassName,
  itemClassName,
  isLoading,
  error,
}: SelectableListTypes) => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>();
  const ref = useRef<HTMLDivElement>(null);

  const executeScroll = useCallback((index) => {
    if (ref.current && ref.current.children) {
      ref.current.children[index].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, []);

  useLayoutEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'Escape':
          break;
        case 'ArrowDown': {
          event.preventDefault();

          let newIndex: number;

          if (activeIndex === undefined) {
            newIndex = -1;
          } else if (items.length > 0) {
            if (items.length - 1 === activeIndex) {
              newIndex = 0;
            } else {
              newIndex = activeIndex + 1;
            }
          } else {
            newIndex = -1;
          }

          setActiveIndex(newIndex);
          executeScroll(newIndex);

          break;
        }
        case 'ArrowUp': {
          event.preventDefault();

          let newIndex: number;

          if (activeIndex === undefined) {
            newIndex = items.length;
          } else if (items.length > 0) {
            if (activeIndex === 0) {
              newIndex = items.length - 1;
            } else {
              newIndex = activeIndex - 1;
            }
          } else {
            newIndex = -1;
          }

          setActiveIndex(newIndex);
          executeScroll(newIndex);

          break;
        }
        case 'Enter':
        case 'Space':
          event.preventDefault();
          onSelect(items[activeIndex as number].value);

          break;
        default: {
          // const nextItem = getNextItemFromSearch(
          //   options.map((element) => element.label),
          //   event.key,
          //   (thing) => thing,
          //   options[activeIndex].label,
          // );

          // if (nextItem) {
          //   const index = options.findIndex(
          //     (element) => element.label === nextItem,
          //   );

          //   setActiveIndex(index);
          // }

          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [activeIndex, items, onSelect, selectValue, executeScroll]);

  if (isLoading) {
    return (
      <div
        className={classNames(
          'shadow-md rounded-md w-56 py-4 flex flex-col justify-center items-center h-60',
          containerClassName,
        )}
      >
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={classNames(
          'shadow-md rounded-md w-56 py-4 flex flex-col justify-center items-center h-60 text-red-500',
          containerClassName,
        )}
      >
        {error}
      </div>
    );
  }
  return (
    <div
      className={classNames(
        'shadow-md rounded-md py-4 flex flex-col items-center max-h-80',
        containerClassName,
      )}
    >
      {title && (
        <div className="flex justify-center w-full font-semibold border-b-2 border-gray-200 pb-2">
          <p>{title}</p>
        </div>
      )}
      <div ref={ref} className="flex flex-col overflow-y-auto w-full">
        {items.map(
          ({ value, label, Icon, Component }, i) =>
            Component || (
              <button
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(undefined)}
                type="button"
                className={classNames(
                  'flex justify-center items-center px-4 py-2  cursor-pointer active:bg-gray-200 active:shadow-inner w-full transition-all ',

                  {
                    'bg-gray-100': activeIndex === i,
                    'font-semibold': value === selectValue,
                  },
                  itemClassName,
                )}
                onClick={() => onSelect(value)}
              >
                {Icon && <Icon className="flex-shrink-0 mr-2" />}
                <p>{label}</p>
              </button>
            ),
        )}
      </div>
    </div>
  );
};
