import React from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import {
  MdDeleteOutline,
  MdOutlineModeComment,
  MdOutlineModeEditOutline,
} from 'react-icons/md';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts, fetchRemovePost } from '../redux/slices/post';

import dateFormat from 'dateformat';
import { declOfComments } from '../utils/declensionComment';
import { declOfViews } from '../utils/declensionViews';
import Like from './Like';

const Post = ({
  title,
  text,
  id,
  user,
  viewsCount,
  imageUrl,
  isOwner,
  comments,
  createdAt,
  likes,
  userId,
}) => {
  const dispatch = useDispatch();

  const onClickRemove = () => {
    if (window.confirm('Удалить статью?')) {
      dispatch(fetchRemovePost(id));
      dispatch(fetchPosts({ category: 'top' }));
    }
  };

  console.count('Post');
  return (
    <div className={'mb-6'}>
      <div className='max-w-screen-sm mx-auto p-6 bg-white rounded-t-lg '>
        <div className='flex items-center justify-between'>
          <div className='flex gap-2 items-center cursor-default '>
            {user?.avatarUrl ? (
              <img
                className='max-w-[30px] rounded-full'
                src={user?.avatarUrl}
                alt={user?.fullName}
              />
            ) : (
              <div className='w-7 h-7 bg-slate-500 text-white rounded-full flex justify-center items-center'>
                <span>{user?.fullName.slice(0, 1)}</span>
              </div>
            )}

            <div className=' text-sm'>{user.fullName}</div>
            <div className='text-xs  text-slate-400'>
              <span>{dateFormat(createdAt, 'dd.mm.yy HH:MM')}</span>
            </div>
          </div>
        </div>

        <Link to={`/posts/${id}`}>
          <h3 className='cursor-pointer font-semibold py-4'>{title}</h3>
          <p className='cursor-pointer text-sm'>{text}</p>
        </Link>
      </div>

      <div className='max-w-screen-sm mx-auto bg-white rounded-b-lg '>
        <div className='bg-slate-200 flex items-center justify-center'>
          {imageUrl ? (
            // <img src={`http://localhost:5555${imageUrl}`} alt='article img' />
            <img src={`https://mern-blog-api.up.railway.app${imageUrl}`} alt='article img' />
          ) : (
            ''
          )}
        </div>

        <div className='flex items-center justify-between p-4'>
          <div className='flex items-center gap-4 text-slate-500 '>
            <span className='flex items-center gap-1 cursor-pointer hover:text-slate-900  transition-all'>
              <MdOutlineModeComment className='text-xl' />
              <span className='text-xs'>{comments?.length}</span>
              <span className='text-xs'>
                {`${declOfComments(comments?.length)}`}
              </span>
            </span>
            {/* <span className='flex items-center gap-1 cursor-pointer hover:text-slate-900 transition-all'>
              <MdIosShare className='text-xl' />{' '}
              <span className='text-xs '>Поделиться</span>
            </span> */}
            <span className='flex items-center gap-1 cursor-default'>
              <AiOutlineEye className='text-xl' />
              <span className='text-xs'>{viewsCount}</span>
              <span className='text-xs '>{`${declOfViews(viewsCount)}`}</span>
            </span>
            {isOwner && (
              <>
                <span
                  onClick={onClickRemove}
                  className='flex items-center gap-1 cursor-pointer hover:text-slate-900  transition-all'
                >
                  <MdDeleteOutline className='cursor-pointer hover:rose-500 text-xl' />
                  <span className='text-xs'>Удалить</span>
                </span>

                <Link to={`/posts/${id}/edit`}>
                  <span className='flex items-center gap-1 cursor-pointer hover:text-slate-900  transition-all'>
                    <MdOutlineModeEditOutline className='cursor-pointer text-xl' />
                    <span className='text-xs'>Изменить</span>
                  </span>
                </Link>
              </>
            )}
          </div>

          <Like likes={likes} userId={userId} id={id} />
        </div>
      </div>
    </div>
  );
};
export default Post;
