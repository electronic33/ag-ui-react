import React, { useEffect, useState } from "react";
import classNames from "classnames";
import Button from "../Button/Button";
import TextInput from "../TextInput/TextInput";
import Select from "../Select/Select";

const Pagination = ({
  maxCount,
  itemsPerPage,
  setItemsPerPage,
  currentPage = 1,
  setCurrentPage,
  firstAndLastSectionsNumber = 3,
  initialGotoPageValue,
  selectOptions,
}) => {
  console.log("🚀 ~ file: Pagination.tsx ~ line 12 ~ currentPage", currentPage);
  const numberOfPages = Math.ceil(maxCount / itemsPerPage);

  const [firstSection, setFirstSection] = useState([]);
  const [middleSection, setMiddleSection] = useState([]);
  const [lastSection, setLastSection] = useState([]);

  const [goToPageValue, setGoToPageValue] = useState(initialGotoPageValue);
  const [itemsNumber, setItemsNumber] = useState(itemsPerPage);

  useEffect(() => {
    let i;
    const arrayFirst = [];

    for (i = 0; i < firstAndLastSectionsNumber; i++) {
      if (i + 1 <= numberOfPages) {
        arrayFirst.push(i + 1);
      }
    }
    setFirstSection(arrayFirst);

    let j;
    const arrayLast = [];

    for (
      j = numberOfPages - firstAndLastSectionsNumber;
      j < numberOfPages;
      j++
    ) {
      arrayLast.push(j + 1);
    }
    setLastSection(arrayLast);

    let k;
    const arrayMiddle = [];

    for (
      k = currentPage - Math.floor(firstAndLastSectionsNumber / 2);
      k <= currentPage + Math.floor(firstAndLastSectionsNumber / 2);
      k++
    ) {
      arrayMiddle.push(k);
    }

    console.log(
      "🚀 ~ file: Pagination.tsx ~ line 79 ~ useEffect ~ lastSection",
      lastSection,
    );
    console.log(
      "🚀 ~ file: Pagination.tsx ~ line 79 ~ useEffect ~ firstSection",
      firstSection,
    );
    console.log(
      "🚀 ~ file: Pagination.tsx ~ line 79 ~ useEffect ~ arrayMiddle",
      arrayMiddle,
    );

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
      arrayLast.filter(
        (val) => !arrayFirst.includes(val) && val > 0,
        // !arrayLast.includes(val) &&
        //  &&
        // val < numberOfPages,
      ),
    );
  }, [currentPage, itemsPerPage]);

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
          setCurrentPage(parseInt(goToPageValue));
        }
      }}
    >
      <div className="flex">
        <p
          onClick={() => {
            if (currentPage !== 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
          className={classNames(
            "mr-2 px-2 py-1 shadow text-blue-400 font-medium cursor-pointer",
            {
              "cursor-default bg-gray-100": currentPage === 1,
            },
          )}
        >
          Previous Page
        </p>
        <div className="flex">
          <div className="flex">
            {firstSection.map((firstSectionItem, index) => (
              <div
                key={index}
                className={classNames(
                  "mr-2 px-2 py-1 shadow font-medium cursor-pointer",
                  {
                    "bg-blue-400 text-white": firstSectionItem === currentPage,
                  },
                  {
                    "text-blue-400": firstSectionItem !== currentPage,
                  },
                )}
                onClick={() => setCurrentPage(firstSectionItem)}
              >
                {firstSectionItem}
              </div>
            ))}
            <div className="flex">
              {middleSection.length &&
              middleSection[0] !== firstSection[firstSection.length - 1] + 1 ? (
                <p className="text-xl self-end mx-2">...</p>
              ) : (
                ""
              )}
              {middleSection.map((middleSectionItem, index) => (
                <div
                  key={index}
                  className={classNames(
                    "mr-2 px-2 py-1 shadow font-medium cursor-pointer",
                    {
                      "bg-blue-400 text-white":
                        middleSectionItem === currentPage,
                    },
                    {
                      "text-blue-400": middleSectionItem !== currentPage,
                    },
                  )}
                  onClick={() => setCurrentPage(middleSectionItem)}
                >
                  {middleSectionItem}
                </div>
              ))}
              {lastSection[0] !== firstSection[firstSection.length - 1] + 1 &&
              lastSection[0] &&
              lastSection[0] !== middleSection[middleSection.length - 1] + 1 ? (
                <p className="text-xl self-end mx-2">...</p>
              ) : (
                ""
              )}
            </div>
            {lastSection.map((lastSectionItem, index) => (
              <div
                key={index}
                className={classNames(
                  "mr-2 px-2 py-1 shadow font-medium cursor-pointer",
                  {
                    "bg-blue-400 text-white": lastSectionItem === currentPage,
                  },
                  {
                    "text-blue-400": lastSectionItem !== currentPage,
                  },
                )}
                onClick={() => setCurrentPage(lastSectionItem)}
              >
                {lastSectionItem}
              </div>
            ))}
          </div>
        </div>
        <p
          onClick={() => {
            if (currentPage !== numberOfPages) {
              setCurrentPage(currentPage + 1);
            }
          }}
          className={classNames(
            "mr-2 px-2 py-1 shadow text-blue-400 font-medium cursor-pointer",
            {
              "cursor-default bg-gray-100": currentPage === numberOfPages,
            },
          )}
        >
          Next Page
        </p>
      </div>
      {initialGotoPageValue && (
        <div className="flex items-baseline">
          <label className="mr-2" htmlFor="goToPageValue">
            Go To Page Number:
          </label>
          <TextInput
            onChange={(event) => {
              setGoToPageValue(event.target.value);
            }}
            value={goToPageValue}
            className="bg-gray-100 shadow rounded px-2 py-1"
            type="number"
          />
        </div>
      )}

      {selectOptions && (
        <Select
          label="Items per page:"
          className="max-w-16 w-64 mb-5 my-4 mr-2"
          onChange={(selectedItemsNumber) =>
            setItemsNumber(selectedItemsNumber)
          }
          selected={itemsNumber}
          options={selectOptions}
        />
      )}
      {(initialGotoPageValue || selectOptions) && (
        <Button
          className={classNames("font-medium cursor-pointer bg-gray-500", {
            "cursor-default bg-opacity-70 hover:bg-opacity-75":
              goToPageValue <= 0 || goToPageValue > numberOfPages,
          })}
          text="Button"
        />
      )}
    </form>
  );
};

export default Pagination;
