import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Post from '../components/Post.jsx';

import icon from '../assets/icon-thinking.png';
import Spinner from '../components/Spinner.jsx';
import { fetchPosts } from '../redux/slices/post.js';
import Pagination from '../components/Pagination.jsx';

import { MdSportsSoccer } from 'react-icons/md';
import { SlFire } from 'react-icons/sl';
import { RiComputerLine } from 'react-icons/ri';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { Outlet } from 'react-router-dom';

const navList = [
  {
    category: 'top',
    title: 'Топ',
    icon: <SlFire />,
  },
  {
    category: 'new',
    title: 'Новые',
    icon: <AiOutlineClockCircle />,
  },

  {
    category: 'webdev',
    title: 'Разработка',
    icon: <RiComputerLine />,
  },
  {
    category: 'sport',
    title: 'Спорт',
    icon: <MdSportsSoccer />,
  },
];

const Home = () => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(navList[0].category);
  const dispatch = useDispatch();

  const { status, countOfPage, currentPage } = useSelector(
    state => state.posts.posts
  );
  const isPostLoading = status === 'loading';

  useEffect(() => {
    dispatch(fetchPosts({ category, page: page }));
  }, [dispatch, category, page]);

  const userData = useSelector(state => state.auth.data);
  const allPosts = useSelector(state => state.posts.posts);

  const selectedCategory = item => {
    setCategory(item);
  };

  if (isPostLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className='max-w-screen-sm py-4 mx-auto'>
        <div className='bg-white rounded-lg mx-2'>
          <ul className='flex items-center  px-4 py-2 font-semibold gap-2  sm:gap-4 text-slate-600 overflow-auto '>
            {navList.map((item, index) => (
              <li
                onClick={() => selectedCategory(item.category)}
                key={item.category}
                className={`flex items-center gap-1 cursor-pointer hover:bg-slate-200 p-1 sm:p-2 rounded-lg transition-all ${
                  item.category === category
                    ? ' text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
                    : null
                }`}
              >
                {item.icon}
                <span className={`sm:text-lg`}>{item.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='mx-2'>
        {allPosts.items.length >= 1 ? (
          allPosts.items.map(item => (
            <Post
              key={item._id}
              {...item}
              id={item._id}
              isOwner={userData?._id === item.user._id}
              userId={userData?._id}
            />
          ))
        ) : (
          <div className={'mb-6'}>
            <div className='max-w-screen-sm  mx-auto p-6 bg-white rounded-lg flex gap-2 justify-center'>
              <h2 className={'text-2xl font-semibold'}>
                Соответствующих постов нет
              </h2>
              <img className={'w-[30px]'} src={icon} alt='icon' />
            </div>
          </div>
        )}
      </div>
      {countOfPage > 1 && (
        <Pagination
          countOfPage={countOfPage}
          setPage={setPage}
          currentPage={currentPage}
        />
      )}
    </>
  );
};
export default Home;
