import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Post from '../components/Post.jsx';

import icon from '../assets/icon-thinking.png';
import Spinner from '../components/Spinner.jsx';
import { fetchAllPosts, fetchPosts } from '../redux/slices/post.js';
import Pagination from '../components/Pagination.jsx';

const Home = ({ navList, setCategory, category }) => {
  const [page, setPage] = useState(1);
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

  if (isPostLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className='max-w-screen-sm mx-auto py-4'>
        <div className='bg-white rounded-lg '>
          <ul className='flex items-center p-2 font-semibold gap-4 text-slate-600 overflow-auto '>
            {navList.map(item => (
              <li
                onClick={() => setCategory(item.category)}
                key={item.category}
                className='flex items-center gap-1 cursor-pointer hover:bg-slate-200 p-2 rounded-lg transition-all'
              >
                {item.icon}
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <>
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
      </>
      <Pagination
        countOfPage={countOfPage}
        setPage={setPage}
        currentPage={currentPage}
      />
    </>
  );
};
export default Home;
