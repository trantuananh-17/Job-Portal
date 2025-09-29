import React, { useState } from 'react';
import { Slider } from '@mui/material';
import { SALARY_VALUE } from '@constant/rangeValue';

const RangeSliderMUI: React.FC = () => {
  const [value, setValue] = useState<number[]>([SALARY_VALUE.MIN, SALARY_VALUE.MAX]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <div className='flex flex-col gap-5'>
      <h3>Salary</h3>

      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay='auto'
        valueLabelFormat={(value) => `$${value}`}
        min={0}
        max={9999}
        disableSwap
      />

      <div className='flex items-center justify-between'>
        <p className='font-semibold'>
          Salary: ${value[0]} - ${value[1]}
        </p>

        <button className='bg-primary rounded-[4px] px-[17px] py-[7px]'>
          <p className='text-[14px] font-semibold text-white'>Apply</p>
        </button>
      </div>
    </div>
  );
};

export default RangeSliderMUI;
