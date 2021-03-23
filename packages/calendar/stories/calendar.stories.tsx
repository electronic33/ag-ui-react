import React, { useState } from "react";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Calendar } from "../src";
// import { Calendar, useMultipleSelectCalendarState } from "../src";

export default {
  title: "OTHERS/Calendar",
  component: Calendar,
};

export const Default = (): React.ReactElement => {
  const [selectedDates, setSelectedDates] = useState([]);

  // const [selectedDates, setSelectedDates] = useMultipleSelectCalendarState([]);
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
      rangeSelect
      // CellComponent={({ day }) => (
      //   <div>
      //     {isSameDay(currentdDate, day) ? "-------- currentDay -------" : "nah"}
      //   </div>
      // )}
    />
  );
};
