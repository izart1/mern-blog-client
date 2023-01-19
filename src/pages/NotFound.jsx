import React from 'react';

const NotFound = () => {
  return (
    <div className='container text-center mt-10 py-10 bg-white rounded-xl'>
      <h2 className='font-bold text-5xl'>404</h2>
      <h2 className='font-bold text-4xl pb-4'> Страница не найдена.</h2>
      <p className='text-sm text-slate-500'>
        Возможо она была перемещена, или вы просто неверно укаазали адрес.
      </p>
    </div>
  );
};
export default NotFound;
