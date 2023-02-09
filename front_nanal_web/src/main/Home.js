import diaryImg from '../src_assets/img/diaryImg.svg'
import Calendar from 'react-calendar';
import React, { useState } from 'react';
import '../src_assets/css/Calendar.css';


const leftPad = (value) => {
  if (value >= 10) {
    return value;
  }
  return `0${value}`;
};

const toStringByFormatting = (value, delimeter = '-') => {
  const year = value.getFullYear();
  const month = leftPad(value.getMonth() + 1);
  const date = leftPad(value.getDate());

  return [year, month, date].join(delimeter);
};

const Home = () => {
  
  const [value, onChange] = useState(new Date());

  return <div className="relative">
    <div className='border-none absolute inset-y-60 left-28'>
        <Calendar
          onChange={onChange}
          value={value}
          calendarType='ISO 8601'
          formatDay={(locale, date) =>
            date.toLocaleString('en', { day: 'numeric' })
          }
        />
      </div>
    <img src={diaryImg} className='min-w-[1536px] origin-center '/>
  </div>
}

export default Home