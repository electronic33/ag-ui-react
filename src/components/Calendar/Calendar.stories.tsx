import React, { useState } from "react";
import Calendar, { useMultipleSelectCalendarState } from "./Calendar";
import "../../styles/index.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { isSameDay } from "date-fns";

export default {
  title: "Calendar",
};

export const Default = (): React.ReactElement => {
  const [selectedDates, setSelectedDates] = useState([]);

  // const [selectedDates, setSelectedDates] = useMultipleSelectCalendarState([]);
  const currentdDate = new Date();
  return (
    <Calendar
      calendarClassName=""
      headerContainerClassName=""
      monthClassName=""
      weekDaysClassName=""
      allTilesClassName=""
      activeTilesClassName=""
      selectedTileClassName=""
      disabledTilesClassName={() => "fa"}
      weekDays={["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]}
      LeftArrowIcon={FaChevronLeft}
      RightArrowIcon={FaChevronRight}
      selectedDate={selectedDates}
      selectHandler={setSelectedDates}
      rangeSelect={true}
      // CellComponent={({ day }) => (
      //   <div>
      //     {isSameDay(currentdDate, day) ? "-------- currentDay -------" : "nah"}
      //   </div>
      // )}
    />
  );
};
