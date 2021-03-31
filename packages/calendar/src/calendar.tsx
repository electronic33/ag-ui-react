import React, { useCallback, useEffect, useState } from 'react';
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
  subMonths,
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

export interface CalendarTypes {
  calendarClassName?: string;
  headerContainerClassName?: string;
  monthClassName?: string;
  monthTitle?: (currentMonth: Date) => string;
  weekDaysClassName?: string;
  weekDays?: string[];
  LeftArrowIcon?: React.ComponentType;
  RightArrowIcon?: React.ComponentType;
  allTilesClassName?: string;
  disabledTilesClassName?: string | ((day: Date) => string);
  activeTilesClassName?: string | ((day: Date) => string);
  selectedTileClassName?: string | ((day: Date) => string);
  selectedDate: Date | Date[];
  selectHandler?: React.Dispatch<React.SetStateAction<Date[] | Date>>;
  rangeSelect?: boolean;
  CellComponent?: React.ComponentType<{ day: Date }>;
}

export const Calendar = ({
  calendarClassName = '',
  headerContainerClassName,
  monthClassName,
  monthTitle,
  weekDaysClassName,
  weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  LeftArrowIcon,
  RightArrowIcon,
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
    (rangeSelect ? selectedDate[0] : selectedDate) || new Date(),
  );
  const [rangeStart, setRangeStart] = useState<Date>();
  const [hoveredDay, setHoveredDay] = useState<Date>();
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const monthStart = startOfMonth(currentMonth);

  const rangeSelectHandler = useCallback(
    (day) => {
      if ((selectedDate as Date[]).length >= 1) {
        selectHandler([]);
      } else if (!rangeStart) {
        setRangeStart(day);
      } else {
        const datesAfter = isAfter(rangeStart, day);
        if (!datesAfter) {
          selectHandler(
            eachDayOfInterval({
              start: rangeStart,
              end: day,
            }),
          );
          setRangeStart(null);
        } else {
          setRangeStart(day);
          selectHandler(
            eachDayOfInterval({
              start: rangeStart,
              end: day,
            }),
          );
        }
      }
    },
    [rangeStart, selectHandler, selectedDate],
  );

  useEffect(() => {
    const added7Days = addDays(hoveredDay, 7);
    const removed7Days = addDays(hoveredDay, -7);
    const added1Day = addDays(hoveredDay, 1);
    const nextMonthHover = addMonths(hoveredDay, 1);
    const removed1Day = addDays(hoveredDay, -1);
    const prevMonthHover = addMonths(hoveredDay, -1);
    const handleKeydown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'Escape':
          if (rangeSelect) {
            setRangeStart(null);
            selectHandler([]);
          } else {
            selectHandler(new Date());
          }
          break;
        case 'ArrowDown':
          if (isSameMonth(added7Days, monthStart)) {
            setHoveredDay(added7Days);
          } else {
            setHoveredDay(added7Days);
            setCurrentMonth(nextMonthHover);
          }
          setHoveredDay(added7Days);
          break;
        case 'ArrowUp':
          if (isSameMonth(removed7Days, monthStart)) {
            setHoveredDay(removed7Days);
          } else {
            setHoveredDay(removed7Days);
            setCurrentMonth(prevMonthHover);
          }
          setHoveredDay(removed7Days);
          break;
        case 'ArrowRight':
          if (isSameMonth(added1Day, monthStart)) {
            setHoveredDay(added1Day);
          } else {
            setHoveredDay(added1Day);
            setCurrentMonth(nextMonthHover);
          }
          break;
        case 'ArrowLeft':
          if (isSameMonth(removed1Day, monthStart)) {
            setHoveredDay(removed1Day);
          } else {
            setCurrentMonth(prevMonthHover);
            setHoveredDay(removed1Day);
          }
          break;
        case 'Enter':
        case 'Space':
          if (rangeSelect) {
            rangeSelectHandler(hoveredDay);
          } else {
            selectHandler(hoveredDay);
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
  }, [
    currentMonth,
    hoveredDay,
    monthStart,
    rangeSelect,
    rangeSelectHandler,
    selectHandler,
  ]);

  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy';

    return (
      <div className={classNames('header  ', headerContainerClassName)}>
        <div className="left-arrow-container  ">
          <button type="button" className="arrow-div  " onClick={prevMonth}>
            {LeftArrowIcon ? <LeftArrowIcon /> : '<'}
          </button>
        </div>
        <div className="month-container ">
          <span className={classNames('month-class ', monthClassName)}>
            {monthTitle
              ? monthTitle(currentMonth)
              : format(currentMonth, dateFormat)}
          </span>
        </div>
        <div className="right-arrow-container ">
          <button type="button" className="arrow-div " onClick={nextMonth}>
            {RightArrowIcon ? <RightArrowIcon /> : '>'}
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => (
    <div className={classNames('days-container ', weekDaysClassName)}>
      {weekDays.map((day) => (
        <div className="days-class " key={day}>
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
          // isSelected = selectedDate?.some((currentSelectedDate) =>
          //   isSameDay(day, currentSelectedDate),
          // );
          // console.log(
          //   '🚀 ~ file: calendar.tsx ~ line 280 ~ renderCells ~ isSelected',
          //   isSelected,
          // );
          for (let current = 0; current < selectedDate.length; current += 1) {
            if (isSameDay(day, selectedDate[current])) {
              isSelected = true;
            }
          }
        } else {
          isSelected = isSameDay(day, selectedDate);
        }

        // selectedDate
        //               ?.slice(1, -1)
        //               .some((date) => isSameDay(day, date)),

        let spliceSelected = false;

        if (Array.isArray(selectedDate)) {
          for (
            let current = 0;
            current < selectedDate.slice(1, -1).length;
            current += 1
          ) {
            if (isSameDay(day, selectedDate[current])) {
              spliceSelected = true;
            }
          }
        }

        days.push(
          <button
            type="button"
            role="option"
            aria-selected={isSelected}
            onMouseEnter={() => setHoveredDay(cloneDay)}
            // onMouseLeave={() => setHoveredDay(undefined)}
            className={classNames(
              'tile-class  0  ',
              {
                'bg-gray-100  ': isSameDay(day, hoveredDay),
                'bg-gray-100':
                  rangeStart && day >= rangeStart && day <= hoveredDay,

                'rounded-l-full':
                  rangeSelect === true && isSameDay(day, selectedDate[0]),

                'rounded-r-full':
                  rangeSelect === true &&
                  isSameDay(
                    day,
                    selectedDate[(selectedDate as Date[])?.length - 1],
                  ),

                'rounded-none ':
                  rangeSelect === true && spliceSelected === true,
                // &&
                // selectedDate
                //   ?.slice(1, -1)
                //   .some((date) => isSameDay(day, date)),

                [typeof disabledTilesClassName === 'string'
                  ? `${disabledTilesClassName} text-gray-300 pointer-events-none`
                  : `${disabledTilesClassName(
                      day,
                    )} text-gray-300 pointer-events-none`]: !isSameMonth(
                  day,
                  monthStart,
                ),

                [typeof activeTilesClassName === 'string'
                  ? `${activeTilesClassName} cursor-pointer`
                  : `${activeTilesClassName(day)} cursor-pointer`]: isSameMonth(
                  day,
                  monthStart,
                ),
                [typeof selectedTileClassName === 'string'
                  ? `${selectedTileClassName} bg-blue-100  border-blue-400 shadow-inner`
                  : `${selectedTileClassName(
                      day,
                    )} bg-blue-100  border-blue-400 shadow-inner`]: isSelected,
                'bg-blue-500': isSelected && isSameDay(day, hoveredDay),
                ' border-2 shadow-inner': isSameDay(day, rangeStart),
              },
              allTilesClassName,
            )}
            style={{ paddingTop: '15%' }}
            key={day.valueOf()}
            onMouseDown={() =>
              rangeSelect
                ? rangeSelectHandler(cloneDay)
                : selectHandler(cloneDay)
            }
          >
            <span className="tile-characters-class  ">
              {CellComponent ? <CellComponent day={day} /> : formattedDate}
            </span>
          </button>,
        );

        day = addDays(day, 1);
      }
      rows.push(
        <div className="row-item " key={day.valueOf()}>
          {days}
        </div>,
      );
      days = [];
    }
    return <div className="rows">{rows}</div>;
  };

  return (
    <div className={classNames('calendar ', calendarClassName)}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};
