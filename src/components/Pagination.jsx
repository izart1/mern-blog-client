import React from 'react';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';

const Pagination = ({ countOfPage, setPage, currentPage }) => {
  const pageNumbers = [];

  const prevPage = () => {
    if (currentPage > 1) {
      setPage(prev => prev - 1);
    }
  };
  const nextPage = () => {
    if (currentPage < countOfPage) {
      setPage(prev => prev + 1);
    }
  };

  for (let i = 1; i <= countOfPage; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className='flex items-center justify-center'>
      <nav className='inline-flex items-center justify-center my-6 text-slate-400   px-6 rounded'>
        <button
          onClick={prevPage}
          className={`block px-3 py-2 ml-0  bg-white border border-gray-300 rounded-l-lg hover:bg-slate-50 hover:text-slate-700`}
        >
          <AiOutlineDoubleLeft class='w-5 h-5' />
        </button>
        <ul className='flex justify-between items-center '>
          {pageNumbers.map(number => (
            <li
              key={number}
              onClick={() => setPage(number)}
              className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 cursor-pointer ${
                number === currentPage
                  ? ' z-10  text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
                  : null
              }`}
            >
              {number}
            </li>
          ))}
        </ul>
        <button
          onClick={nextPage}
          className={
            'block px-3 py-2 ml-0  bg-white border border-gray-300 rounded-r-lg hover:bg-slate-50 hover:text-slate-700'
          }
        >
          <AiOutlineDoubleRight class='w-5 h-5' />
        </button>
      </nav>
    </div>
  );
};
export default Pagination;
