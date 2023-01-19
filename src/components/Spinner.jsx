import React from 'react';
import LoadingSpinner from '../assets/spinner.gif';

const Spinner = () => {
  return (
    <div className='h-screen flex justify-center items-center'>
      <img src={LoadingSpinner} alt='Spinner' />
    </div>
  );
};
export default Spinner;
