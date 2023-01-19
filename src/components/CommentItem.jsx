import React from 'react';
import dateFormat from 'dateformat';

// import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
// import { fetchRemovePost, likePost } from '../redux/slices/post';
// import { useDispatch } from 'react-redux';

const CommentItem = ({ comment, user, created, ...obj }) => {
  // const dispatch = useDispatch();

  console.count('CommentItem');

  return (
    <div className='px-1 py-3 border-t'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-row gap-3 items-center'>
          {user?.avatarUrl ? (
            <img
              className='max-w-[30px] rounded-full'
              src={user?.avatarUrl}
              alt={user?.fullName}
            />
          ) : (
            <div className='w-7 h-7 bg-slate-500 text-white rounded-full flex justify-center items-center'>
              <span>{user?.fullName?.slice(0, 1)}</span>
            </div>
          )}
          <div>
            <div className='cursor-pointer text-sm'>{user?.fullName}</div>
            <div className='text-xs  text-slate-400'>
              <span>{dateFormat(created, 'dd.mm HH:MM')}</span>
            </div>
          </div>
        </div>
        {/* <div
          onClick={() => dispatch(likePost({ id, userId }))}
          className='flex items-center gap-2 min-w-[51px] text-white bg-blue-500 hover:bg-blue-600 rounded px-2 cursor-pointer'
        >
          <span className='font-semibold'>{likes?.length}</span>
          <span className=' text-lg'>
            {isLiked ? <AiFillLike /> : <AiOutlineLike />}
          </span>
        </div> */}
      </div>
      <div className='py-2'>{comment}</div>
    </div>
  );
};
export default CommentItem;
