import React from 'react';

const Filter = ({ text, handleChange, optionsArr, defaultVal }) => (
  <div className='filter'>
    <span className='filter__txt'>{text}</span>
    <select className='filter__select' onChange={(e) => handleChange(e.target.value)} value={defaultVal}>
      {optionsArr.map((size) => (
        <option key={size} value={size}>
          {size}
        </option>
      ))}
    </select>
  </div>
);

export default Filter;
