import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Button } from '@app-garage/button';
import { TextInput } from '@app-garage/text-input';
import { Select } from '@app-garage/select';

type PaginationTypes = {
  /**
  Number of items.
  */
  maxCount: number;
  /**
  Items to display in a single page.
  */
  itemsPerPage: number;
  setItemsPerPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  /**
  A number that refers to how many page tabs will be displayed at the start, in the middle and at the end of the component.
  */
  firstAndLastSectionsNumber?: number;
  /**
  Starting page index.
  */
  initialGotoPageValue?: number;
  /**
  Array of option objects for selecting the items per page value, each object consists of a label name and a number value.
  */
  selectOptions?: { label: string; value: number }[];
};

const geToPageId = 'goToPage';

export const Pagination = ({
  maxCount,
  itemsPerPage,
  setItemsPerPage,
  currentPage = 1,
  setCurrentPage,
  firstAndLastSectionsNumber = 3,
  initialGotoPageValue,
  selectOptions,
}: PaginationTypes): React.ReactElement => {
  const numberOfPages = Math.ceil(maxCount / itemsPerPage);

  const [firstSection, setFirstSection] = useState<number[]>([]);
  const [middleSection, setMiddleSection] = useState<number[]>([]);
  const [lastSection, setLastSection] = useState<number[]>([]);

  const [goToPageValue, setGoToPageValue] = useState<number>(
    initialGotoPageValue,
  );
  const [itemsNumber, setItemsNumber] = useState<number>(itemsPerPage);

  useEffect(() => {
    const arrayFirst = [];

    for (let i = 0; i < firstAndLastSectionsNumber; i += 1) {
      if (i + 1 <= numberOfPages) {
        arrayFirst.push(i + 1);
      }
    }
    setFirstSection(arrayFirst);

    const arrayLast = [];

    for (
      let j = numberOfPages - firstAndLastSectionsNumber;
      j < numberOfPages;
      j += 1
    ) {
      arrayLast.push(j + 1);
    }
    setLastSection(arrayLast);

    const arrayMiddle = [];

    for (
      let k = currentPage - Math.floor(firstAndLastSectionsNumber / 2);
      k <= currentPage + Math.floor(firstAndLastSectionsNumber / 2);
      k += 1
    ) {
      arrayMiddle.push(k);
    }

    setMiddleSection(
      arrayMiddle.filter(
        (val) =>
          !arrayFirst.includes(val) &&
          !arrayLast.includes(val) &&
          val > 0 &&
          val < numberOfPages,
      ),
    );
    setLastSection(
      arrayLast.filter((val) => !arrayFirst.includes(val) && val > 0),
    );
  }, [currentPage, itemsPerPage, firstAndLastSectionsNumber, numberOfPages]);

  return (
    <form
      className="flex flex-col items-center justify-center space-y-10"
      onSubmit={(event) => {
        event.preventDefault();
        setItemsPerPage(itemsNumber);
        setCurrentPage(1);

        if (
          goToPageValue &&
          goToPageValue > 0 &&
          goToPageValue <= numberOfPages
        ) {
          setCurrentPage(goToPageValue);
        }
      }}
    >
      <div className="flex">
        <button
          type="button"
          onClick={() => {
            if (currentPage !== 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
          className={classNames('pagination', {
            'cursor-default bg-gray-100': currentPage === 1,
          })}
        >
          Previous Page
        </button>
        <div className="flex">
          <div className="flex">
            {firstSection.map((firstSectionItem) => (
              <button
                type="button"
                key={firstSectionItem}
                className={classNames(
                  'pagination',
                  {
                    'bg-blue-400 text-white': firstSectionItem === currentPage,
                  },
                  {
                    'text-blue-400': firstSectionItem !== currentPage,
                  },
                )}
                onClick={() => setCurrentPage(firstSectionItem)}
              >
                {firstSectionItem}
              </button>
            ))}
            <div className="flex">
              {middleSection.length &&
              middleSection[0] !== firstSection[firstSection.length - 1] + 1 ? (
                <p className="text-xl self-end mx-2">...</p>
              ) : (
                ''
              )}
              {middleSection.map((middleSectionItem) => (
                <button
                  type="button"
                  key={middleSectionItem}
                  className={classNames(
                    'pagination',
                    {
                      'bg-blue-400 text-white':
                        middleSectionItem === currentPage,
                    },
                    {
                      'text-blue-400': middleSectionItem !== currentPage,
                    },
                  )}
                  onClick={() => setCurrentPage(middleSectionItem)}
                >
                  {middleSectionItem}
                </button>
              ))}
              {lastSection[0] !== firstSection[firstSection.length - 1] + 1 &&
              lastSection[0] &&
              lastSection[0] !== middleSection[middleSection.length - 1] + 1 ? (
                <p className="text-xl self-end mx-2">...</p>
              ) : (
                ''
              )}
            </div>
            {lastSection.map((lastSectionItem) => (
              <button
                type="button"
                key={lastSectionItem}
                className={classNames(
                  'pagination',
                  {
                    'bg-blue-400 text-white': lastSectionItem === currentPage,
                  },
                  {
                    'text-blue-400': lastSectionItem !== currentPage,
                  },
                )}
                onClick={() => setCurrentPage(lastSectionItem)}
              >
                {lastSectionItem}
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            if (currentPage !== numberOfPages) {
              setCurrentPage(currentPage + 1);
            }
          }}
          className={classNames('pagination', {
            'cursor-default bg-gray-100': currentPage === numberOfPages,
          })}
        >
          Next Page
        </button>
      </div>
      {initialGotoPageValue && (
        <TextInput
          label="Go to page number:"
          id={geToPageId}
          onChange={(event) => {
            setGoToPageValue(Number(event.target.value));
          }}
          value={goToPageValue}
          containerClassName="bg-gray-100 shadow rounded px-2 py-1"
          type="number"
        />
      )}

      {selectOptions && (
        <Select
          label="Items per page:"
          containerClassName="max-w-16 w-64 mb-5 my-4 mr-2"
          onChange={(selectedItemsNumber) =>
            setItemsNumber(selectedItemsNumber)
          }
          selected={itemsNumber}
          options={selectOptions}
        />
      )}
      {(initialGotoPageValue || selectOptions) && (
        <Button
          className={classNames('font-medium cursor-pointer bg-gray-500', {
            'cursor-default bg-opacity-70 hover:bg-opacity-75':
              goToPageValue <= 0 || goToPageValue > numberOfPages,
          })}
        >
          Button
        </Button>
      )}
    </form>
  );
};
