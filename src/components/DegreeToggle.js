import React from 'react';

const DegreeToggle = ({ degreeType, action }) => {
  return (
    <>
      <div className='form-check form-check-inline'>
        <input className='form-check-input' type='radio' name='degree-type' id='celsius' value='celsius' checked={degreeType === 'celsius'} onChange={action} />
        <label className='form-check-label' htmlFor='celsius'>
          Celsius
        </label>
      </div>
      <div className='form-check form-check-inline'>
        <input className='form-check-input' type='radio' name='degree-type' id='farenheit' value='fahrenheit' checked={degreeType === 'fahrenheit'} onChange={action} />
        <label className='form-check-label' htmlFor='farenheit'>
          Farenheit
        </label>
      </div>
    </>
  );
};

export { DegreeToggle };
