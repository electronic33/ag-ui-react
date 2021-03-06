import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Button } from '@app-garage/button';
import { TextInput } from '@app-garage/text-input';
import { Select } from '@app-garage/custom-select';

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
  initialGotoPageValue = 0,
  selectOptions,
}: PaginationTypes): React.ReactElement => {
  const numberOfPages = Math.ceil(maxCount / itemsPerPage);

  const [firstSection, setFirstSection] = useState<number[]>([]);
  const [middleSection, setMiddleSection] = useState<number[]>([]);
  const [lastSection, setLastSection] = useState<number[]>([]);

  const [goToPageValue, setGoToPageValue] = useState<number>(initialGotoPageValue);
  const [itemsNumber, setItemsNumber] = useState<number>(itemsPerPage);

  useEffect(() => {
    const arrayFirst: number[] = [];

    for (let i = 0; i < firstAndLastSectionsNumber; i += 1) {
      if (i + 1 <= numberOfPages) {
        arrayFirst.push(i + 1);
      }
    }
    setFirstSection(arrayFirst);

    const arrayLast: number[] = [];

    for (let j = numberOfPages - firstAndLastSectionsNumber; j < numberOfPages; j += 1) {
      arrayLast.push(j + 1);
    }
    setLastSection(arrayLast);

    const arrayMiddle: number[] = [];

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
          !arrayFirst.includes(val) && !arrayLast.includes(val) && val > 0 && val < numberOfPages,
      ),
    );
    setLastSection(arrayLast.filter((val) => !arrayFirst.includes(val) && val > 0));
  }, [currentPage, itemsPerPage, firstAndLastSectionsNumber, numberOfPages]);

  return (
    <form
      className="pagination-contaier"
      onSubmit={(event) => {
        event.preventDefault();
        setItemsPerPage(itemsNumber);
        setCurrentPage(1);

        if (goToPageValue && goToPageValue > 0 && goToPageValue <= numberOfPages) {
          setCurrentPage(goToPageValue);
        }
      }}
    >
      <div className="pagination-contaier-div">
        <button
          type="button"
          onClick={() => {
            if (currentPage !== 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
          className={classNames('pagination-buttons', {
            'pagination-contaier-prev-next-buttons-disabled': currentPage === 1,
          })}
        >
          Previous Page
        </button>
        <div className="pagination-contaier-div">
          <div className="pagination-contaier-div">
            {firstSection.map((firstSectionItem) => (
              <button
                type="button"
                key={firstSectionItem}
                className={classNames(
                  'pagination-buttons',
                  {
                    'pagination-active-button': firstSectionItem === currentPage,
                  },
                  {
                    'pagination-not-active-button': firstSectionItem !== currentPage,
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
                <p className="pagination-dots">...</p>
              ) : (
                ''
              )}
              {middleSection.map((middleSectionItem) => (
                <button
                  type="button"
                  key={middleSectionItem}
                  className={classNames(
                    'pagination-buttons',
                    {
                      'pagination-active-button': middleSectionItem === currentPage,
                    },
                    {
                      'pagination-not-active-button': middleSectionItem !== currentPage,
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
                <p className="pagination-dots">...</p>
              ) : (
                ''
              )}
            </div>
            {lastSection.map((lastSectionItem) => (
              <button
                type="button"
                key={lastSectionItem}
                className={classNames(
                  'pagination-buttons',
                  {
                    'pagination-active-button': lastSectionItem === currentPage,
                  },
                  {
                    'pagination-not-active-button': lastSectionItem !== currentPage,
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
          className={classNames('pagination-buttons', {
            'pagination-contaier-prev-next-buttons-disabled': currentPage === numberOfPages,
          })}
        >
          Next Page
        </button>
      </div>
      {initialGotoPageValue ? (
        <TextInput
          label="Go to page number:"
          id={geToPageId}
          onChange={(event) => {
            setGoToPageValue(Number(event.target.value));
          }}
          value={goToPageValue}
          containerClassName="pagination-initial-go-to-input"
        />
      ) : null}

      {selectOptions ? (
        <Select
          label="Items per page:"
          containerClassName="pagination-items-per-page-select"
          onChange={(selectedItemsNumber) => setItemsNumber(selectedItemsNumber)}
          value={itemsNumber}
          options={selectOptions}
        />
      ) : null}
      {initialGotoPageValue || selectOptions ? (
        <Button
          className={classNames('pagination-action-button', {
            'pagination-action-button-invalid-input bg-opacity-70 hover:bg-opacity-75':
              goToPageValue <= 0 || goToPageValue > numberOfPages,
          })}
        >
          Button
        </Button>
      ) : null}
    </form>
  );
};
