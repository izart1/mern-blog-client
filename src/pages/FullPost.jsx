import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from '../axios.js';

import dateFormat from 'dateformat';

import { AiFillLike, AiOutlineEye, AiOutlineLike } from 'react-icons/ai';
import {
  MdDeleteOutline,
  // MdIosShare,
  MdOutlineModeComment,
  MdOutlineModeEditOutline,
} from 'react-icons/md';

import { declOfViews } from '../utils/declensionViews.js';

import AddComment from '../components/AddComment.jsx';
import CommentBox from '../components/CommentsBox.jsx';
import Spinner from '../components/Spinner.jsx';
import { fetchRemovePost, likePost } from '../redux/slices/post.js';
import { declOfComments } from '../utils/declensionComment.js';
// import Like from '../components/Like.jsx';

const FullPost = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const userData = useSelector(state => state.auth.data);

  console.count('FullPost');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentPost = useSelector(state =>
    state.posts.posts.items.find(obj => obj._id === id)
  );

  const isRegister = Boolean(useSelector(state => state.auth.data));

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then(res => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.warn(err);
        alert('Ошибка при получении статьи');
        setIsLoading(false);
        navigate('/');
      });
  }, [id, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  const onClickRemove = async () => {
    if (window.confirm('Удалить статью?')) {
      await dispatch(fetchRemovePost(id));
      await navigate('/');
    }
  };

  const isOwner = userData?._id === data?.user._id;

  return (
    <>
      <div className='relative group max-w-screen-sm mx-auto p-6 bg-white mt-6 rounded-t-lg  '>
        <div className='flex gap-4 items-center '>
          <div className='flex items-center gap-2'>
            {currentPost?.user?.avatarUrl ? (
              <img
                className='max-w-[30px] rounded-full'
                src={currentPost?.user?.avatarUrl}
                alt={currentPost?.user?.fullName}
              />
            ) : (
              <div className='w-7 h-7 bg-slate-500 text-white rounded-full flex justify-center items-center'>
                <span>{currentPost?.user?.fullName.slice(0, 1)}</span>
              </div>
            )}

            <div className='cursor-pointer text-sm'>
              {currentPost?.user?.fullName}
            </div>
          </div>

          <div className='text-xs  text-slate-400 cursor-default'>
            <span>
              {dateFormat(currentPost?.createdAt, 'dd.mm.yy   HH:MM')}
            </span>
          </div>

          <span className='text-xs  text-slate-400 cursor-default'>
            {currentPost?.tags}
          </span>
        </div>
        <Link to={`/posts/${id}`}>
          <h3 className='cursor-pointer font-semibold py-4'>
            {currentPost?.title}
          </h3>
          <p className='cursor-pointer text-sm'>{currentPost?.text}</p>
        </Link>
      </div>

      <div className='max-w-screen-sm mx-auto bg-white rounded-b-lg '>
        <div className='bg-slate-200 flex items-center justify-center'>
          {currentPost?.imageUrl ? (
            <img
              className=''
              // src={`http://localhost:5555${currentPost?.imageUrl}`}
              src={`https://mern-blog-api.up.railway.app${currentPost?.imageUrl}`}
              alt='title'
            />
          ) : (
            ''
          )}
        </div>
        <div className='flex items-center justify-between p-4'>
          <div className='flex items-center gap-4 text-slate-500 '>
            <span className='flex items-center gap-1 transition-all cursor-default'>
              <MdOutlineModeComment className='text-xl' />
              <span className='text-xs'>{currentPost?.comments.length}</span>
              <span className='text-xs hidden sm:flex'>
                {`${declOfComments(currentPost?.comments.length)}`}
              </span>
            </span>
            {/* <span className='flex items-center gap-1 cursor-pointer hover:text-slate-900 transition-all'>
              <MdIosShare className='text-xl' />{' '}
              <span className='text-xs '>Поделиться</span>
            </span> */}
            <span className='flex items-center gap-1 cursor-default'>
              <AiOutlineEye className='text-xl' />
              <span className='text-xs'>{currentPost?.viewsCount}</span>
              <span className='text-xs hidden sm:flex'>{`${declOfViews(
                data.viewsCount
              )}`}</span>
            </span>
            {isOwner && (
              <>
                <span
                  onClick={onClickRemove}
                  className='flex items-center gap-1 cursor-pointer hover:text-blue-600  transition-all'
                >
                  <MdDeleteOutline className='cursor-pointer hover:rose-500 text-xl' />
                  <span className='text-xs hidden sm:flex'>Удалить</span>
                </span>

                <Link to={`/posts/${id}/edit`}>
                  <span className='flex items-center gap-1 cursor-pointer hover:text-blue-600  transition-all'>
                    <MdOutlineModeEditOutline className='cursor-pointer text-xl' />
                    <span className='text-xs hidden sm:flex'>Изменить</span>
                  </span>
                </Link>
              </>
            )}
          </div>

          <button
            disabled={!isRegister}
            onClick={() => dispatch(likePost({ id, userId: userData?._id }))}
            className={`group relative  flex items-center gap-2 min-w-[51px] text-white bg-blue-500 rounded px-2 cursor-pointer ${
              !isRegister ? null : 'hover:bg-blue-600 '
            } `}
          >
            <span className='font-semibold'>{currentPost?.likes?.length}</span>
            <span className=' text-lg'>
              {Boolean(currentPost?.likes?.includes(userData?._id)) ? (
                <AiFillLike />
              ) : (
                <AiOutlineLike />
              )}
            </span>

            {!isRegister && (
              <>
                <div className='absolute  flex-col items-center -left-20 bottom-9 hidden group-hover:flex'>
                  <div
                    className={` bottom-full flex flex-col items-center text-center  
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

          {/* <Like userId={userData?._id} likes={currentPost?.likes} id={id} /> */}
        </div>
      </div>
      <div className='max-w-screen-sm mx-auto p-6 bg-white my-6 rounded-lg shadow-md '>
        <AddComment />
        <CommentBox />
      </div>
    </>
  );
};
export default React.memo(FullPost);
