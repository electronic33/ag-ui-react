import React, { useState } from 'react';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Calendar } from '../src';
// import { Calendar, useMultipleSelectCalendarState } from "../src";

export default {
  title: 'OTHERS/Calendar',
  component: Calendar,
};

export const Default = (): React.ReactElement => {
  const [selectedDates, setSelectedDates] = useState<Date | Date[]>([]);
  // const [selectedDates, setSelectedDates] = useState([
  //   new Date('2021-04-10'),
  //   new Date('2021-04-11'),
  //   new Date('2021-04-12'),
  //   new Date('2021-04-13'),
  // ]);
  // const [selectedDates, setSelectedDates] = useMultipleSelectCalendarState([]);
  return (
    <div>
      <Calendar
        calendarClassName="w-48 "
        headerContainerClassName=""
        monthClassName=""
        arrowsClassName=""
        weekDaysClassName=""
        allTilesClassName=""
        activeTilesClassName=""
        selectedTileClassName=""
        disabledTilesClassName={() => ''}
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
    </div>
  );
};
