import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isSameDay,
  isSameMonth,
  startOfMonth,
} from 'date-fns';
import startOfWeek from 'date-fns/startOfWeek';
import classNames from 'classnames';

export const useMultipleSelectCalendarState = (
  initialState: Date[],
): [Date[], (date: Date) => void] => {
  const [selectedDates, setState] = useState(initialState);

  const setSelectedDates = useCallback(
    (date: Date) => {
      const selectedDateIndex = selectedDates.findIndex((selectedDate) =>
        isSameDay(date, selectedDate),
      );

      if (selectedDateIndex === -1) {
        setState((prevState) => prevState.concat(date));
      } else {
        setState((prevState) => {
          const newState = [...prevState];

          newState.splice(selectedDateIndex, 1);

          return newState;
        });
      }
    },
    [selectedDates],
  );

  return [selectedDates, setSelectedDates];
};

type CalendarTypes = {
  calendarClassName?: string;
  headerContainerClassName?: string;
  monthClassName?: string;
  monthTitle?: (currentMonth: Date) => string;
  weekDaysClassName?: string;
  weekDays?: string[];
  LeftArrowIcon?: React.ElementType<{ className: string }>;
  RightArrowIcon?: React.ElementType<{ className: string }>;
  arrowsClassName?: string;
  hoveredTileClassName?: string;
  selectedAndHoveredTileClassName?: string;
  rangeHoverClassName?: string;
  firstDayInRangeClassName?: string;
  lastDayInRangeClassName?: string;
  firstDayOfRangeWhereIsNoEndDateClassName?: string;
  allTilesClassName?: string;
  disabledTilesClassName?: string | ((day: Date) => string);
  activeTilesClassName?: string | ((day: Date) => string);
  selectedTileClassName?: string | ((day: Date) => string);
  selectedDate: Date | Date[] | undefined;
  selectHandler?: React.Dispatch<
    React.SetStateAction<Date[] | Date | undefined>
  >;
  rangeSelect?: boolean;
  CellComponent?: React.ElementType<{ day: Date }>;
};

export const Calendar = ({
  calendarClassName = '',
  headerContainerClassName,
  monthClassName,
  monthTitle,
  weekDaysClassName,
  weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  LeftArrowIcon,
  RightArrowIcon,
  arrowsClassName,
  hoveredTileClassName,
  selectedAndHoveredTileClassName,
  rangeHoverClassName,
  firstDayInRangeClassName,
  lastDayInRangeClassName,
  firstDayOfRangeWhereIsNoEndDateClassName,
  allTilesClassName = '',
  disabledTilesClassName = '',
  activeTilesClassName = '',
  selectedTileClassName = '',
  selectedDate,
  selectHandler,
  rangeSelect,
  CellComponent,
}: CalendarTypes): React.ReactElement => {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    (rangeSelect
      ? (selectedDate as Date[])[0]
      : (selectedDate as Date | undefined)) || new Date(),
  );
  const [rangeStart, setRangeStart] = useState<Date>();
  const [hoveredDay, setHoveredDay] = useState<Date>();
  const [isFocusInHeader, setIsFocusInHeader] = useState<Boolean>();
  const goToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
    if (hoveredDay) {
      setHoveredDay(addMonths(hoveredDay, 1));
    }
  };

  useEffect(() => {
    if (!rangeSelect && selectedDate) {
      setCurrentMonth(selectedDate as Date);
    }
    if (rangeSelect && (selectedDate as Date[]).length > 0) {
      setCurrentMonth((selectedDate as Date[])[0]);
    }
  }, [rangeSelect, selectedDate]);

  const goToPrevMonth = () => {
    setCurrentMonth(addMonths(currentMonth, -1));
    if (hoveredDay) {
      setHoveredDay(addMonths(hoveredDay, -1));
    }
  };

  const monthStart = startOfMonth(currentMonth);

  const calendarRef = useRef<HTMLDivElement>(null);
  const daysContainerRef = useRef<HTMLDivElement>(null);
  const selectedDateButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: React.MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.currentTarget)
      ) {
        setHoveredDay(undefined);
      }
    }

    // @ts-ignore
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // @ts-ignore
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const rangeSelectHandler = useCallback(
    (day) => {
      if ((selectedDate as Date[]).length >= 1 && selectHandler) {
        selectHandler([]);
      } else if (!rangeStart) {
        setRangeStart(day);
      } else {
        const datesAfter = isAfter(rangeStart, day);
        if (!datesAfter && selectHandler) {
          selectHandler(
            eachDayOfInterval({
              start: rangeStart,
              end: day,
            }),
          );
          setRangeStart(undefined);
        } else {
          setRangeStart(day);
          if (selectHandler) {
            selectHandler(
              eachDayOfInterval({
                start: rangeStart,
                end: day,
              }),
            );
          }
        }
      }
    },
    [rangeStart, selectHandler, selectedDate],
  );

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (
      // calendarRef.current &&
      // calendarRef.current.contains(document.activeElement) &&
      // daysContainerRef.current &&
      // !daysContainerRef.current.contains(document.activeElement)
      isFocusInHeader
    ) {
      const handleKeydown = (event: KeyboardEvent) => {
        switch (event.code) {
          // case 'ArrowDown':
          //   setCurrentMonth(addMonths(currentMonth, -1));
          //   if (hoveredDay) {
          //     setHoveredDay(addMonths(hoveredDay, -1));
          //   }
          //   break;
          // case 'ArrowUp':
          //   setCurrentMonth(addMonths(currentMonth, -1));
          //   if (hoveredDay) {
          //     setHoveredDay(addMonths(hoveredDay, -1));
          //   }
          //   break;
          case 'ArrowRight':
            setCurrentMonth(addMonths(currentMonth, 1));
            if (hoveredDay) {
              setHoveredDay(addMonths(hoveredDay, 1));
            }
            break;
          case 'ArrowLeft':
            setCurrentMonth(addMonths(currentMonth, -1));
            if (hoveredDay) {
              setHoveredDay(addMonths(hoveredDay, -1));
            }
            break;
          default: {
            // no default
          }
        }
      };

      window.addEventListener('keydown', handleKeydown);

      return () => {
        window.removeEventListener('keydown', handleKeydown);
      };
    }
    if (
      daysContainerRef.current &&
      daysContainerRef.current.contains(document.activeElement)
    ) {
      const added7Days = addDays(hoveredDay as Date, 7);
      const removed7Days = addDays(hoveredDay as Date, -7);
      const added1Day = addDays(hoveredDay as Date, 1);
      const nextMonthHover = addMonths(hoveredDay as Date, 1);
      const removed1Day = addDays(hoveredDay as Date, -1);
      const prevMonthHover = addMonths(hoveredDay as Date, -1);
      const handleKeydown = (event: KeyboardEvent) => {
        switch (event.code) {
          case 'Escape':
            if (selectHandler) {
              if (rangeSelect) {
                setRangeStart(undefined);
                selectHandler([]);
              } else {
                selectHandler(undefined);
              }
            }
            break;
          case 'ArrowDown':
            if (!hoveredDay) {
              if (rangeSelect && (selectedDate as Date[])?.length > 0) {
                setHoveredDay((selectedDate as Date[])[0]);
              } else if (!rangeSelect && selectedDate) {
                setHoveredDay(selectedDate as Date);
              } else {
                setHoveredDay(startOfMonth(currentMonth));
              }
            } else {
              if (isSameMonth(added7Days, monthStart)) {
                setHoveredDay(added7Days);
              } else {
                daysContainerRef.current?.focus();
                setHoveredDay(added7Days);
                setCurrentMonth(nextMonthHover);
              }
              setHoveredDay(added7Days);
            }
            break;
          case 'ArrowUp':
            if (!hoveredDay) {
              if (rangeSelect && (selectedDate as Date[])?.length > 0) {
                setHoveredDay((selectedDate as Date[])[0]);
              } else if (!rangeSelect && selectedDate) {
                setHoveredDay(selectedDate as Date);
              } else {
                setHoveredDay(endOfMonth(currentMonth));
              }
            } else {
              if (isSameMonth(removed7Days, monthStart)) {
                setHoveredDay(removed7Days);
              } else {
                daysContainerRef.current?.focus();
                setHoveredDay(removed7Days);
                setCurrentMonth(prevMonthHover);
              }
              setHoveredDay(removed7Days);
            }
            break;
          case 'ArrowRight':
            if (!hoveredDay) {
              if (rangeSelect && (selectedDate as Date[])?.length > 0) {
                setHoveredDay((selectedDate as Date[])[0]);
              } else if (!rangeSelect && selectedDate) {
                setHoveredDay(selectedDate as Date);
              } else {
                setHoveredDay(startOfMonth(currentMonth));
              }
            } else if (isSameMonth(added1Day, monthStart)) {
              setHoveredDay(added1Day);
            } else {
              daysContainerRef.current?.focus();
              setHoveredDay(added1Day);
              setCurrentMonth(nextMonthHover);
            }
            break;
          case 'ArrowLeft':
            if (!hoveredDay) {
              if (rangeSelect && (selectedDate as Date[])?.length > 0) {
                setHoveredDay((selectedDate as Date[])[0]);
              } else if (!rangeSelect && selectedDate) {
                setHoveredDay(selectedDate as Date);
              } else {
                setHoveredDay(endOfMonth(currentMonth));
              }
            } else if (isSameMonth(removed1Day, monthStart)) {
              setHoveredDay(removed1Day);
            } else {
              daysContainerRef.current?.focus();
              setCurrentMonth(prevMonthHover);
              setHoveredDay(removed1Day);
            }
            break;
          case 'Enter':
          case 'Space':
            if (rangeSelect) {
              rangeSelectHandler(hoveredDay);
            } else if (selectHandler) {
              selectHandler(hoveredDay);
              daysContainerRef.current?.focus();
            }
            break;

          default: {
            // no default
          }
        }
      };

      window.addEventListener('keydown', handleKeydown);

      return () => {
        window.removeEventListener('keydown', handleKeydown);
      };
    }
  }, [
    currentMonth,
    hoveredDay,
    isFocusInHeader,
    monthStart,
    rangeSelect,
    rangeSelectHandler,
    selectHandler,
    selectedDate,
  ]);

  const renderHeader = () => {
    const dateFormat = 'yyyy MMMM';

    return (
      <div className={classNames('calendar-header', headerContainerClassName)}>
        <button
          onFocus={() => setIsFocusInHeader(true)}
          onBlur={() => setIsFocusInHeader(false)}
          type="button"
          className={classNames(
            'calendar-arrow-container focus:ring-2 ring-blue-400',
            arrowsClassName,
          )}
          onClick={goToPrevMonth}
        >
          {LeftArrowIcon ? <LeftArrowIcon className="flex-shrink-0" /> : '>'}
        </button>

        <span className={classNames('month-class', monthClassName)}>
          {monthTitle
            ? monthTitle(currentMonth)
            : format(currentMonth, dateFormat)}
        </span>

        <button
          onFocus={() => setIsFocusInHeader(true)}
          onBlur={() => setIsFocusInHeader(false)}
          type="button"
          className={classNames(
            'calendar-arrow-container focus:ring-2 ring-blue-400',
            arrowsClassName,
          )}
          onClick={goToNextMonth}
        >
          {RightArrowIcon ? <RightArrowIcon className="flex-shrink-0" /> : '>'}
        </button>
      </div>
    );
  };

  const renderDays = () => (
    <div className={classNames('days-container ', weekDaysClassName)}>
      {weekDays.map((day) => (
        <div className="days-class" key={day}>
          {day}
        </div>
      ))}
    </div>
  );

  const renderCells = () => {
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);

    const endDate = endOfWeek(monthEnd);

    const dateFormat = 'd';
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i += 1) {
        formattedDate = format(day, dateFormat);

        const cloneDay = day;

        let isSelected = false;

        if (Array.isArray(selectedDate)) {
          for (let current = 0; current < selectedDate.length; current += 1) {
            if (isSameDay(day, selectedDate[current])) {
              isSelected = true;
            }
          }
        } else if (selectedDate) {
          isSelected = isSameDay(day, selectedDate);
        }

        // let spliceSelected = false;

        // if (Array.isArray(selectedDate)) {
        //   for (
        //     let current = 0;
        //     current < selectedDate.slice(1, -1).length;
        //     current += 1
        //   ) {
        //     if (isSameDay(day, selectedDate[current])) {
        //       spliceSelected = true;
        //     }
        //   }
        // }

        days.push(
          <button
            type="button"
            role="option"
            aria-selected={isSelected}
            // tabIndex={isSelected ? 0 : -1}
            tabIndex={-1}
            ref={isSelected ? selectedDateButtonRef : undefined}
            onMouseEnter={() => setHoveredDay(cloneDay)}
            // onMouseLeave={() => setHoveredDay(undefined)}
            className={classNames(
              'tile-class focus:ring-4 ring-blue-400',
              {
                // [`${hoveredTileClassName} hovered-tile`]: isSameDay(
                //   day,
                //   hoveredDay as Date,
                // ),
                [`${rangeHoverClassName} hovered-tile-calendar`]:
                  rangeStart &&
                  day >= rangeStart &&
                  day <= (hoveredDay as Date),

                [`${firstDayInRangeClassName} rounded-full-left-side`]:
                  rangeSelect === true &&
                  isSameDay(day, (selectedDate as Date[])[0]),

                [`${lastDayInRangeClassName} rounded-full-right-side`]:
                  rangeSelect === true &&
                  isSameDay(
                    day,
                    (selectedDate as Date[])[
                      (selectedDate as Date[])?.length - 1
                    ],
                  ),
                [`${firstDayOfRangeWhereIsNoEndDateClassName} first-day-in-range-no-selected-end-date`]:
                  rangeStart && isSameDay(day, rangeStart),

                // 'rounded-none': rangeSelect === true && spliceSelected === true,

                [typeof disabledTilesClassName === 'string'
                  ? `${disabledTilesClassName} disabled-tiles`
                  : `${disabledTilesClassName(
                      day,
                    )} disabled-tiles`]: !isSameMonth(day, monthStart),

                [typeof activeTilesClassName === 'string'
                  ? `${activeTilesClassName} active-tiles`
                  : `${activeTilesClassName(day)} active-tiles`]: isSameMonth(
                  day,
                  monthStart,
                ),
                [typeof selectedTileClassName === 'string'
                  ? `${selectedTileClassName} selected-tiles`
                  : `${selectedTileClassName(day)} selected-tiles`]: isSelected,
                [`${selectedAndHoveredTileClassName} selected-and-hovered-tiles`]:
                  isSelected && isSameDay(day, hoveredDay as Date),
                [`${hoveredTileClassName} hovered-tile`]:
                  !isSelected && isSameDay(day, hoveredDay as Date),
              },
              allTilesClassName,
            )}
            style={{ paddingTop: '15%' }}
            key={day.valueOf()}
            onMouseDown={(e) => {
              e.preventDefault();
              if (rangeSelect) {
                rangeSelectHandler(cloneDay);
              } else if (selectHandler) {
                selectHandler(cloneDay);
              }
              daysContainerRef.current?.focus();
            }}
          >
            <span className={classNames('tile-characters-class')}>
              {CellComponent ? <CellComponent day={day} /> : formattedDate}
            </span>
          </button>,
        );

        day = addDays(day, 1);
      }
      rows.push(
        <div className="row-item" key={day.valueOf()}>
          {days}
        </div>,
      );
      days = [];
    }
    return (
      <div
        className="rows focus:ring-2 ring-blue-400 outline-none "
        onMouseLeave={() => setHoveredDay(undefined)}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        ref={daysContainerRef}
      >
        {rows}
      </div>
    );
  };

  return (
    <div
      className={classNames('calendar', calendarClassName)}
      ref={calendarRef}
    >
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};
