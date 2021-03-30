import { useEffect } from 'react';

const getNextItemFromSearch = <T>(
  items: T[],
  searchString: string,
  itemToString: (item: T) => string,
  currentItem: T,
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

export const useSelect = ({
  isOpen,
  setIsOpen,
  selectOptionsRef,
  selectButtonRef,
  activeIndex,
  setActiveIndex,
  options,
  onSpaceOrEnterPress,
  inputRef,
  withFilter,
}) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isOpen &&
        selectOptionsRef.current &&
        !selectOptionsRef.current.contains(event.target) &&
        selectButtonRef.current &&
        !selectButtonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen, selectOptionsRef, selectButtonRef]);

  // const onArrowDown = () => {
  //   if (!isOpen && document.activeElement === selectButtonRef.current) {
  //     setIsOpen(true);
  //     setActiveIndex(-1);
  //   } else if (isOpen && activeIndex === undefined) {
  //     setActiveIndex(-1);
  //   }

  //   if (isOpen && options.length > 0) {
  //     if (options.length - 1 === activeIndex) {
  //       setActiveIndex(0);
  //     } else {
  //       setActiveIndex((prev) => prev + 1);
  //     }
  //   }
  // };

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'Escape':
          if (isOpen) {
            setIsOpen(false);
          }
          break;
        case 'ArrowDown':
          event.preventDefault();
          if (!isOpen && document.activeElement === selectButtonRef.current) {
            setIsOpen(true);
            setActiveIndex(-1);
          } else if (isOpen && activeIndex === undefined) {
            setActiveIndex(-1);
          }

          if (isOpen && options.length > 0) {
            if (options.length - 1 === activeIndex) {
              setActiveIndex(0);
            } else {
              setActiveIndex((prev) => prev + 1);
            }
          }

          break;
        case 'ArrowUp':
          if (!isOpen && document.activeElement === selectButtonRef.current) {
            setIsOpen(true);
            setActiveIndex(options.length);
          } else if (isOpen && activeIndex === undefined) {
            setActiveIndex(options.length);
          }

          if (isOpen && options.length > 0) {
            if (activeIndex === 0) {
              setActiveIndex(options.length - 1);
            } else {
              setActiveIndex((prev) => prev - 1);
            }
          }
          break;
        case 'Enter':
        case `${withFilter ? 'sda' : 'Space'}`:
          if (isOpen) {
            event.preventDefault();
            event.stopPropagation();
          }
          onSpaceOrEnterPress();
          break;

        default: {
          const nextItem = getNextItemFromSearch(
            options.map((element) => element.label),
            event.key,
            (thing) => thing,
            options[activeIndex].label,
          );

          if (nextItem) {
            const index = options.findIndex(
              (element) => element.label === nextItem,
            );

            setActiveIndex(index);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [
    activeIndex,
    isOpen,
    options,
    selectButtonRef,
    setActiveIndex,
    setIsOpen,
    onSpaceOrEnterPress,
    inputRef,
    withFilter,
  ]);

  return { isOpen, setIsOpen };
};
