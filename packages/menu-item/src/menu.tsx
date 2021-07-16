/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Popover } from '@app-garage/popover';
import classNames from 'classnames';

function getNextItemFromSearch<T>(
  items: T[],
  searchString: string,
  itemToString: (item: T) => string,
  currentItem: T,
) {
  if (searchString === null) {
    return currentItem;
  }

  // If current item doesn't exist, find the item that matches the search string
  if (!currentItem) {
    const foundItem = items.find((item) =>
      itemToString(item).toLowerCase().startsWith(searchString.toLowerCase()),
    );

    return foundItem;
  }

  // Filter items for ones that match the search string (case insensitive)
  const matchingItems = items.filter((item) =>
    itemToString(item).toLowerCase().startsWith(searchString.toLowerCase()),
  );

  // If there's a match, let's get the next item to select
  if (matchingItems.length > 0) {
    let nextIndex: number;

    // If the currentItem is in the available items, we move to the next available option
    if (matchingItems.includes(currentItem)) {
      const currentIndex = matchingItems.indexOf(currentItem);
      nextIndex = currentIndex + 1;

      if (nextIndex === matchingItems.length) {
        nextIndex = 0;
      }

      return matchingItems[nextIndex];
    }

    // Else, we pick the first item in the available items
    nextIndex = items.indexOf(matchingItems[0]);

    return items[nextIndex];
  }

  // a decent fallback to the currentItem
  return currentItem;
}

type MenuProps = {
  children: React.ReactNode;
  content: {
    type: 'item' | 'group' | 'divider';
    label?: string;
    items?: {
      label: string;
      onClick?: () => void;
      Icon?: React.ComponentType<{ className: string }>;
    }[];
    onClick?: () => void;
    Icon?: React.ComponentType<{ className: string }>;
  }[];
  active: boolean;
  setActive: (prev?: boolean | ((arg: boolean) => boolean) | undefined) => void;
  direction?:
    | 'top-start'
    | 'top'
    | 'top-end'
    | 'right-start'
    | 'right'
    | 'right-end'
    | 'bottom-end'
    | 'bottom'
    | 'bottom-start'
    | 'left-end'
    | 'left'
    | 'left-start';
  headerText?: string;
  trigger?: string;
  contentClassNames?: string;
  containterFocus?: boolean;
};

export const Menu = ({
  children,
  content,
  active,
  setActive,
  direction = 'bottom-start',
  headerText,
  trigger = 'click',
  contentClassNames,
  containterFocus = false,
}: MenuProps) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const childrenRef = useRef<HTMLElement>(null);

  const arr: {
    label: string;
    group?: string;
    items?: { label: string }[];
    onClick?: () => void;
  }[] = useMemo(() => [], []);

  content.forEach((item) => {
    if (item.type === 'item') {
      arr.push({ label: item.label!, onClick: item.onClick });
    }
    if (item.type === 'group' && item.items) {
      item.items.forEach((groupItem) => {
        arr.push({
          label: groupItem.label,
          group: item.label,
          onClick: groupItem.onClick,
        });
      });
    }
  });

  const child = React.Children.only(children) as React.ReactElement & {
    ref?: React.Ref<any>;
  };

  const childrenWithProps = React.cloneElement(child, {
    ref: childrenRef,
  });

  const findIndexByLabel = (label: string, groupLabel: string) =>
    arr.findIndex((arrItem) =>
      groupLabel
        ? arrItem.label === label && arrItem.group === groupLabel
        : arrItem.label === label,
    );

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'Escape':
          if (active) {
            setActive(false);
            setActiveIndex(-1);
          }

          break;
        case 'ArrowDown':
          event.preventDefault();

          if (!active && document.activeElement === childrenRef.current) {
            setActive(true);
            setActiveIndex(-1);
          } else if (active && activeIndex === -1) {
            setActiveIndex(-1);
          }

          if (active && arr.length > 0) {
            if (arr.length - 1 === activeIndex) {
              setActiveIndex(0);
            } else {
              setActiveIndex((prev) => prev + 1);
            }
          }

          break;
        case 'ArrowUp':
          event.preventDefault();

          if (!active && document.activeElement === childrenRef.current) {
            setActive(true);
            setActiveIndex(arr.length);
          } else if (active && activeIndex === -1) {
            setActiveIndex(arr.length);
          }

          if (active && arr.length > 0) {
            if (activeIndex === 0) {
              setActiveIndex(arr.length - 1);
            } else {
              setActiveIndex((prev) => prev - 1);
            }
          }

          break;
        case 'Enter':
        case 'Space':
          if (active) {
            event.preventDefault();
            event.stopPropagation();
            const itemOnClick = arr[activeIndex].onClick;
            if (itemOnClick) {
              itemOnClick();
            }
          }

          break;
        default: {
          if (activeIndex === -1) {
            const firstItemThatStartsWithLetter = arr.findIndex(
              (element) => element.label.charAt(0).toLowerCase() === event.key,
            );
            setActiveIndex(firstItemThatStartsWithLetter);
          }
          const nextItem = getNextItemFromSearch(
            arr.map((element) => element.label),
            event.key,
            (thing) => thing,
            arr[activeIndex].label,
          );
          if (nextItem) {
            const index = arr.findIndex((element) => element.label === nextItem);
            setActiveIndex(index);
          }
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [active, activeIndex, arr, arr.length, setActive]);

  return (
    <Popover
      active={active}
      setActive={setActive}
      direction={direction}
      contentClassNames={contentClassNames}
      containterFocus={containterFocus}
      headerText={headerText}
      trigger={trigger}
      content={
        <div className="menu-container">
          {content.map((item) => (
            <>
              {item.type === 'item' && (
                <p
                  onClick={item.onClick}
                  onMouseEnter={() => setActiveIndex(findIndexByLabel(item.label!, ''))}
                  onMouseLeave={() => setActiveIndex(-1)}
                  className={classNames('menu-type-item', {
                    'menu-active': activeIndex === findIndexByLabel(item.label!, ''),
                  })}
                >
                  {item.Icon && <item.Icon className="menu-type-item-icon" />}
                  {item.label}
                </p>
              )}
              {item.type === 'group' && (
                <div>
                  <p className={classNames('menu-type-group-label', {})}>{item.label}</p>

                  {item.items!.map((groupItem) => (
                    <p
                      onClick={groupItem.onClick}
                      onMouseEnter={() =>
                        setActiveIndex(findIndexByLabel(groupItem.label, item.label!))
                      }
                      onMouseLeave={() => setActiveIndex(-1)}
                      className={classNames('menu-type-group', {
                        'menu-active':
                          activeIndex === findIndexByLabel(groupItem.label, item.label!),
                      })}
                    >
                      {groupItem.Icon && <groupItem.Icon className="menu-type-item-icon" />}
                      {groupItem.label}
                    </p>
                  ))}
                </div>
              )}
              {item.type === 'divider' && <div className="menu-type-divider" />}
            </>
          ))}
        </div>
      }
    >
      {childrenWithProps}
    </Popover>
  );
};
