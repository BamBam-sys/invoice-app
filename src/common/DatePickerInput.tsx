import React, { useState } from 'react';
import { ReactComponent as CalenderIcon } from '../assets/icon-calendar.svg';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type props = {
  dateValue: Date;
  handleCalendar: (value: Date) => void;
};

const DatePickerInput = ({ dateValue, handleCalendar }: props) => {
  const [calender, setCalender] = useState<boolean>(false);

  const date = `${dateValue.getDate()} ${dateValue.toLocaleString('default', {
    month: 'short',
  })} ${dateValue.getFullYear()}`;

  return (
    <>
      <label htmlFor="">
        <div className="bodyOne text-variant-three mb-[1rem]">Issue Date</div>
      </label>
      <div className="relative">
        <input
          readOnly
          name="date"
          id="date"
          onClick={() => setCalender((prev) => !prev)}
          value={date}
          className="w-full outline-none border-solid border-[1px] border-primary-200 dark:border-none px-[2rem] py-[1.6rem] rounded-[4px] h4 dark:text-white dark:bg-secondary-100 focus:border-primary-100  hover:border-primary-100 cursor-pointer "
        />
        <CalenderIcon className="absolute top-[50%] transform translate-y-[-50%]  right-[1.6rem] " />

        {/*  */}
        {calender && (
          <div className="absolute top-[5.6rem] shadow-one bg-variant-three">
            <Calendar
              onChange={(value: Date) => {
                handleCalendar(value);
                setCalender((prev) => !prev);
              }}
              value={dateValue}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default DatePickerInput;
