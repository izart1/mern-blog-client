import React from 'react';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { likePost } from '../redux/slices/post';

const Like = ({ userId, likes, id }) => {
  const dispatch = useDispatch();

  const isRegister = Boolean(useSelector(state => state.auth.data));

  return (
    <button
      disabled={!isRegister}
      onClick={() => dispatch(likePost({ id, userId }))}
      className={`group relative  flex items-center gap-2 min-w-[51px] text-white bg-blue-500 rounded px-2 cursor-pointer ${
        !isRegister ? null : 'hover:bg-blue-600 '
      } `}
    >
      <span className='font-semibold'>{likes?.length}</span>
      <span className=' text-lg'>
        {Boolean(likes.includes(userId)) ? <AiFillLike /> : <AiOutlineLike />}
      </span>

      {!isRegister && (
        <>
          <div className='absolute flex-col items-center -left-20 bottom-9 hidden group-hover:flex'>
            <div
              className={`bottom-full flex flex-col items-center text-center  
          }`}
            >
              <span className='relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md'>
                Необходимо зарегестрироваться
              </span>
              <div className='absolute right-4 -bottom-1 w-3 h-3 -mt-2 rotate-45 bg-gray-600' />
            </div>
          </div>
        </>
      )}
    </button>
  );
};
export default Like;
