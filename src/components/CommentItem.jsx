import React, { useCallback } from 'react';
import dateFormat from 'dateformat';
import { useDispatch, useSelector } from 'react-redux';
import { removeComment } from '../redux/slices/post';
import { useParams } from 'react-router-dom';
import { MdDeleteOutline } from 'react-icons/md';

const CommentItem = ({ comment, user, created, _id }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const postId = params.id;
  const userData = useSelector(state => state.auth.data);

  console.count('CommentItem');

  const handleSubmit = useCallback(async () => {
    try {
      const fields = {
        comment,
        postId,
      };

      dispatch(removeComment(fields));
    } catch (error) {
      console.log(error);
      alert('Ошибка при удалении комментария.');
    }
  }, [comment, postId, dispatch]);

  const isOwner = userData?._id === user._id;

  console.log('is owner', isOwner);

  return (
    <>
      <div className='px-1 py-3 border-t flex items-start justify-between'>
        <div className=''>
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
          </div>
          <div className='py-2'>{comment}</div>
        </div>
        {isOwner && (
          <button
            onClick={handleSubmit}
            className='text-xs px-1 py-1 bg-slate-300 rounded text-white flex items-center gap-1 hover:bg-rose-300'
          >
            <MdDeleteOutline className='text-xl' />
            Удалить
          </button>
        )}
      </div>
    </>
  );
};
export default CommentItem;
