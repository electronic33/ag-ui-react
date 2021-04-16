import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { TextInput } from '@app-garage/text-input';
import { useDebounce } from '@app-garage/utils';
import classNames from 'classnames';
import { useTransition, animated } from 'react-spring';

const getNextItemFromSearch = (
  items: any[],
  searchString: string,
  itemToString: (item: any) => string,
  currentItem: any,
) => {
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
};

type SuggestionInputTypes = {
  containerClassName?: string;
  value: string;
  onChange: (arg: string) => void;
  suggestions?: { label: string; metadata: any }[];
  label?: string;
  onSelect?: (suggestion: { label: string; metadata: any }) => void;
};

export const SuggestionTextInput = ({
  containerClassName,
  value,
  onChange,
  suggestions,
  label,
  onSelect,
}: SuggestionInputTypes) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectOptionsRef = useRef<HTMLDivElement>(null);

  const debouncedFilterValue: string = useDebounce(value, 500);

  const updatedList = useMemo(
    () =>
      value && suggestions
        ? suggestions.filter(
            (item) =>
              item.label
                .toLowerCase()
                .search(debouncedFilterValue.toLowerCase()) !== -1,
          )
        : suggestions,
    [debouncedFilterValue, suggestions, value],
  );

  const executeScroll = useCallback(
    (index) => {
      if (selectOptionsRef.current && selectOptionsRef.current.children) {
        selectOptionsRef.current.children[index].scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    },
    [selectOptionsRef],
  );

  // Listen for outside click
  useEffect(() => {
    // @ts-ignore
    const handleClickOutside = (event) => {
      if (inputRef.current && selectOptionsRef.current) {
        if (
          isOpen &&
          !selectOptionsRef.current.contains(event.target) &&
          !inputRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen, selectOptionsRef, inputRef]);

  // Listen for keydown
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'Escape':
          if (isOpen) {
            setIsOpen(false);
          }

          break;
        case 'ArrowDown': {
          event.preventDefault();
          let newIndex: number;

          if (!isOpen && document.activeElement === inputRef.current) {
            setIsOpen(true);
            newIndex = -1;
          } else if (isOpen && activeIndex === undefined) {
            newIndex = -1;
          }

          if (isOpen && updatedList && updatedList.length > 0) {
            if (updatedList.length - 1 === activeIndex) {
              newIndex = 0;
            } else {
              newIndex = activeIndex + 1;
            }
          }

          // @ts-ignore
          setActiveIndex(newIndex);
          // @ts-ignore
          executeScroll(newIndex);

          break;
        }
        case 'ArrowUp': {
          event.preventDefault();
          let newIndex: number;

          if (
            !isOpen &&
            document.activeElement === inputRef.current &&
            updatedList
          ) {
            setIsOpen(true);
            newIndex = updatedList.length;
          } else if (isOpen && activeIndex === undefined && updatedList) {
            newIndex = updatedList.length;
          }

          if (isOpen && updatedList && updatedList.length > 0) {
            if (activeIndex === 0) {
              newIndex = updatedList.length - 1;
            } else {
              newIndex = activeIndex - 1;
            }
          }
          // @ts-ignore
          setActiveIndex(newIndex);
          // @ts-ignore
          executeScroll(newIndex);

          break;
        }
        case 'Enter':
          if (updatedList) {
            onChange(updatedList[activeIndex].label);
            setIsOpen(false);
            if (onSelect) {
              onSelect(updatedList[activeIndex]);
            }
          }

          break;
        default: {
          const nextItem = getNextItemFromSearch(
            updatedList!.map((element) => element.label),
            event.key,
            (thing) => thing,
            updatedList![activeIndex].label,
          );

          if (nextItem && updatedList) {
            const index = updatedList.findIndex(
              (element) => element.label === nextItem,
            );

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
  }, [activeIndex, executeScroll, isOpen, onChange, onSelect, updatedList]);

  const transitions = useTransition(isOpen && value.length > 0, null, {
    from: { opacity: 0, transform: 'translateY(0px)' },
    enter: { opacity: 1, transform: 'translateY(10px)' },
    leave: { opacity: 0, transform: 'translateY(0px)' },
  });

  const handleFilterInputChange = useCallback(
    (event) => {
      setIsOpen(true);

      onChange(event.target.value);
    },
    [onChange],
  );

  // useEffect(() => {
  //   if (filterValue.length > 0) {
  //     const handler = setTimeout(() => {
  //       setIsOpen(true);
  //     }, 500);

  //     return () => {
  //       clearTimeout(handler);
  //     };
  //   }
  //   if (
  //     filterValue.length < 1 ||
  //     (filterValue.length < 1 && prevFilterValue.length > 0)
  //   ) {
  //     setIsOpen(false);
  //   }
  // }, [filterValue, prevFilterValue]);

  return (
    <div className={containerClassName}>
      <TextInput
        ref={inputRef}
        label={label}
        placeholder="This is a textinput"
        buttonText="Search"
        value={value}
        onChange={(event) => handleFilterInputChange(event)}
      />

      {/* debouncedFilterValue.length > 0 &&
        value &&
        value.length > 0 && */}
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={props}
              className="flex flex-col shadow-md my-4"
              ref={selectOptionsRef}
            >
              {updatedList?.map((sugg, index) => (
                <button
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(-1)}
                  type="button"
                  className={classNames(
                    'px-4 py-2 text-left hover:bg-gray-200 cursor-pointer',
                    { 'bg-gray-200': index === activeIndex },
                  )}
                  onClick={() => {
                    onChange(sugg.label);
                    setIsOpen(false);
                    if (onSelect) {
                      onSelect(sugg);
                    }
                  }}
                >
                  {sugg.label}
                </button>
              ))}
            </animated.div>
          ),
      )}
    </div>
  );
};
