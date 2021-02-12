import React, { useCallback, useState } from "react";
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
} from "date-fns";
import startOfWeek from "date-fns/startOfWeek";
import classNames from "classnames";

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

interface CalendarTypes {
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
  selectedDate: Date[];
  selectHandler: React.Dispatch<React.SetStateAction<Date[] | Date>>;
  rangeSelect?: boolean;
  CellComponent?: React.ComponentType<{ day: Date }>;
}

const Calendar = ({
  calendarClassName = "",
  headerContainerClassName,
  monthClassName,
  monthTitle,
  weekDaysClassName,
  weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  LeftArrowIcon,
  RightArrowIcon,
  allTilesClassName = "",
  disabledTilesClassName = "",
  activeTilesClassName = "",
  selectedTileClassName = "",
  selectedDate,
  selectHandler,
  rangeSelect,
  CellComponent,
}: CalendarTypes): React.ReactElement => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [rangeStart, setRangeStart] = useState<Date>();
  const [hoveredDay, setHoveredDay] = useState<Date>();

  const rangeSelectHandler = (day) => {
    if (selectedDate.length >= 1) {
      selectHandler([]);
    } else {
      if (!rangeStart) {
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
    }
  };

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";

    return (
      <div className={classNames("header  ", headerContainerClassName)}>
        <div className="left-arrow-container ">
          <div className="arrow-div  " onClick={prevMonth}>
            {LeftArrowIcon ? <LeftArrowIcon /> : "<"}
          </div>
        </div>
        <div className="month-container ">
          <span className={classNames("month-class ", monthClassName)}>
            {monthTitle
              ? monthTitle(currentMonth)
              : format(currentMonth, dateFormat)}
          </span>
        </div>
        <div className="right-arrow-container " onClick={nextMonth}>
          <div className="arrow-div ">
            {RightArrowIcon ? <RightArrowIcon /> : ">"}
          </div>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    return (
      <div className={classNames("days-container ", weekDaysClassName)}>
        {weekDays.map((day, i) => (
          <div className="days-class " key={i}>
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);

    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);

    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;

        let isSelected = false;

        if (Array.isArray(selectedDate)) {
          isSelected = selectedDate.some((currentSelectedDate) =>
            isSameDay(day, currentSelectedDate),
          );
        } else {
          isSelected = isSameDay(day, selectedDate);
        }

        days.push(
          <div
            onMouseEnter={() => setHoveredDay(cloneDay)}
            onMouseLeave={() => setHoveredDay(undefined)}
            className={classNames(
              "tile-class  hover:bg-gray-100  ",
              {
                "bg-gray-100":
                  rangeStart && day >= rangeStart && day <= hoveredDay,

                "rounded-l-full":
                  rangeSelect === true && isSameDay(day, selectedDate[0]),

                "rounded-r-full":
                  rangeSelect === true &&
                  isSameDay(day, selectedDate[selectedDate.length - 1]),

                "rounded-none":
                  rangeSelect === true &&
                  selectedDate
                    .slice(1, -1)
                    .some((date) => isSameDay(day, date)),

                [typeof disabledTilesClassName === "string"
                  ? `${disabledTilesClassName} text-gray-300 pointer-events-none`
                  : `${disabledTilesClassName(
                      day,
                    )} text-gray-300 pointer-events-none`]: !isSameMonth(
                  day,
                  monthStart,
                ),

                [typeof activeTilesClassName === "string"
                  ? `${activeTilesClassName} cursor-pointer`
                  : `${activeTilesClassName(day)} cursor-pointer`]: isSameMonth(
                  day,
                  monthStart,
                ),
                [typeof selectedTileClassName === "string"
                  ? `${selectedTileClassName} bg-blue-100  border-blue-400 shadow-inner`
                  : `${selectedTileClassName(
                      day,
                    )} bg-blue-100  border-blue-400 shadow-inner`]: isSelected,
                " border-2 shadow-inner": isSameDay(day, rangeStart),
              },
              allTilesClassName,
            )}
            style={{ paddingTop: "15%" }}
            key={day.valueOf()}
            onClick={() =>
              rangeSelect
                ? rangeSelectHandler(cloneDay)
                : selectHandler(cloneDay)
            }
          >
            <span className="tile-characters-class  ">
              {CellComponent ? <CellComponent day={day} /> : formattedDate}
            </span>
          </div>,
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

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <div className={classNames("calendar ", calendarClassName)}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
