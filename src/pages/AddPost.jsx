import 'easymde/dist/easymde.min.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import SimpleMDE from 'react-simplemde-editor';
import axios from '../axios.js';
import { selectIsAuth } from '../redux/slices/auth';
import { fetchAllPosts } from '../redux/slices/post';

const AddPost = () => {
  const { id } = useParams();
  const isAuth = useSelector(selectIsAuth);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const inputFileRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isEditing = Boolean(id);
  const handleChangeFile = async event => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (error) {
      console.log(error);
      alert('Ошибка при загрузке файла');
    }
  };
  const onChange = useCallback(text => {
    setText(text);
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setText(data.text);
          setTags(data.tags);
          setImageUrl(data.imageUrl);
        })
        .catch(err => {
          console.log(err);
          alert('Ошибка при получении статьи');
        });
    }
  }, [id]);

  const onSubmit = useCallback(async () => {
    try {
      const fields = {
        title,
        text,
        imageUrl,
        tags,
      };
      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields);
      const _id = isEditing ? id : data._id;
      dispatch(fetchAllPosts());
      navigate(`/posts/${_id}`);
    } catch (error) {
      console.log(error);
      alert('Ошибка при создании статьи');
    }
  }, [title, text, imageUrl, tags, isEditing, id, navigate, dispatch]);

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className='mx-2'>
      <div className='  max-w-screen-sm mx-auto p-6 bg-white mt-6 rounded-t-lg hover:shadow-md transition-all '>
        <div className='flex flex-col gap-1'>
          <div className=''>
            <button
              onClick={() => inputFileRef.current.click()}
              className='bg-blue-400 text-white rounded-lg px-3 py-1 text-sm mr-4 hover:bg-blue-600 transition-all'
            >
              Добавить превью
            </button>

            {imageUrl && (
              <>
                <button
                  onClick={() => setImageUrl('')}
                  className=' border border-slate-500  rounded-lg px-3 py-1 text-sm hover:bg-slate-100 transition-all  grow-0'
                >
                  Удалить
                </button>
                <img
                  className='max-w-[180px] rounded mt-2'
                  // src={`http://localhost:5555${imageUrl}`}
                  src={`https://mern-blog-api.up.railway.app${imageUrl}`}
                  alt='uploaded'
                />
              </>
            )}

            <input
              onChange={handleChangeFile}
              ref={inputFileRef}
              className='mb-2'
              type='file'
              hidden
            />
          </div>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className='border-b focus:outline-slate-300  p-2 text-sm font-bold text-slate-600'
            placeholder='Заголовок статьи'
          />
          {/* <input
            value={tags}
            onChange={e => setTags(e.target.value)}
            className='border-b focus:outline-slate-300  p-2 text-sm'
            placeholder=''
            disabled
          /> */}

          <select
            onChange={e => setTags(e.target.value)}
            value={tags}
            className='border-b focus:outline-slate-300  p-2 text-sm font-bold text-slate-600 rounded'
          >
            <option value=''>--Выберите тэг--</option>
            <option value='#разработка'>#разработка</option>
            <option value='#спорт'>#спорт</option>
          </select>
        </div>
      </div>
      <SimpleMDE
        className='max-w-screen-sm mx-auto bg-white'
        value={text}
        onChange={onChange}
      />
      <div className='max-w-screen-sm mx-auto p-4 bg-white rounded-b-lg hover:shadow-md transition-all'>
        <button
          onClick={onSubmit}
          className='bg-rose-500 text-white rounded-lg px-4 py-2 text-sm mr-4 hover:bg-rose-600 transition-all'
        >
          {isEditing ? 'Сохранить' : 'Опубликовать'}
        </button>
        <Link to={'/'}>
          <button className=' border border-slate-500  rounded-lg px-4 py-2 text-sm hover:bg-slate-100 transition-all'>
            Отменить
          </button>
        </Link>
      </div>
    </div>
  );
};
export default AddPost;
