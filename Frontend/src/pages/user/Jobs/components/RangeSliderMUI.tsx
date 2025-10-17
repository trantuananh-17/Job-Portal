import React from 'react';
import { Slider } from '@mui/material';
import { SALARY_VALUE } from '@constant/rangeValue';

interface RangeSliderMUIProps {
  value: number[];
  onChange: (value: number[]) => void;
}

const RangeSliderMUI: React.FC<RangeSliderMUIProps> = ({ value, onChange }) => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    onChange(newValue as number[]);
  };

  return (
    <div className='flex flex-col gap-5'>
      <h3>Salary</h3>

      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay='auto'
        valueLabelFormat={(value) => `$${value}`}
        min={SALARY_VALUE.MIN}
        max={SALARY_VALUE.MAX}
        disableSwap
      />

      <div className='flex items-center justify-between'>
        <p className='font-semibold'>
          Salary: ${value[0]} - ${value[1]}
        </p>
      </div>
    </div>
  );
};

export default RangeSliderMUI;
