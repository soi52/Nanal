import nmr from '../src_assets/img/name-mark-red.svg'
import diaryImgRed from '../src_assets/img/diary-home-img.svg'
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

const MyDiary = () => {
  
  const [value, onChange] = useState(new Date());

  return <div className="relative w-[1440px] mx-auto">
    <div className='border-none absolute inset-y-52 left-60 z-10'>
        <Calendar
          onChange={onChange}
          value={value}
          calendarType='ISO 8601'
          formatDay={(locale, date) =>
            date.toLocaleString('en', { day: 'numeric' })
          }
        />
    </div>
    <p className="absolute z-20 left-[330px] inset-y-28">내 일기</p>
    <img src={nmr} className='absolute z-10 left-60 inset-y-20'/>
    <img src={diaryImgRed} className='absolute w-[1440px] z-0' />
    <div>
      
    </div>
  </div>
}

export default MyDiary