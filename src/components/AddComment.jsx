import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createComment } from '../redux/slices/post';

const AddComment = () => {
  const [comment, setComment] = useState('');
  const isRegister = Boolean(useSelector(state => state.auth.data));

  const params = useParams();
  const postId = params.id;
  const dispatch = useDispatch();

  const handleSubmit = useCallback(async () => {
    try {
      const fields = {
        comment,
        postId,
      };

      dispatch(createComment(fields));
      setComment('');
    } catch (error) {
      console.log(error);
      alert(
        'Ошибка при создании комментария. Комментарий не может быть пустым'
      );
    }
  }, [comment, postId, dispatch]);

  const onChangeComment = e => {
    setComment(e.target.value);
  };

  return (
    <>
      {isRegister ? (
        <p className='font-bold text-xl pb-4'>Комментарии</p>
      ) : (
        <p className='font-semibold pb-4'>
          Только зарегестрированные пользователи могут оставлять комментарии
        </p>
      )}
      <p className='font-bold text-xl pb-4'></p>
      <div className=''>
        <textarea
          disabled={!isRegister}
          value={comment}
          onChange={onChangeComment}
          className=' w-full  h-24 resize-none border rounded-lg placeholder:italic text-sm p-2 focus:outline-none bg-slate-100 focus:bg-slate-50'
          placeholder='А вы что думаете?'
        />
        <div className='flex'>
          <span className='text-xs text-slate-500'>
            Комментарии модерируются. Пишите корректно и дружелюбно.
          </span>
          <button
            disabled={!isRegister}
            onClick={handleSubmit}
            className={`flex ml-auto mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold ${
              isRegister ? 'hover:bg-blue-600' : 'bg-blue-300'
            } `}
          >
            Отправить
          </button>
        </div>
      </div>
    </>
  );
};
export default AddComment;
