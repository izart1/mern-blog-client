import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth, selectIsAuth } from '../redux/slices/auth';

const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setError,
  } = useForm({ mode: 'onChange' });

  const onSubmit = async values => {
    try {
      const data = await dispatch(fetchAuth(values)).unwrap();

      if ('token' in data) {
        window.localStorage.setItem('token', data.token);
      }
    } catch (error) {
      const formError = {
        type: 'server',
        message: 'Неправильный логин или пароль',
      };
      setError('password', formError);
      setError('email', formError);
    }
  };

  if (isAuth) {
    return <Navigate to='/' />;
  }

  return (
    <div className='max-w-md mx-auto p-8 bg-white my-6 rounded-lg shadow-md'>
      <div>
        <h3 className='text-2xl font-semibold mb-6'>Вход в аккаунт</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex gap-4 flex-col'>
            <label>
              <input
                {...register('email', {
                  required: { value: true, message: 'Введите почту' },
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Некорректный email',
                  },
                })}
                className='w-full resize-none border rounded-lg placeholder:italic text-sm p-2 focus:outline-none bg-slate-100 focus:bg-slate-50'
                placeholder='Почта'
              />
              {errors?.email && (
                <span className='text-rose-500 text-xs'>
                  {errors?.email?.message}
                </span>
              )}
            </label>

            <label>
              <input
                {...register('password', {
                  required: { value: true, message: 'Введите пароль' },
                  minLength: {
                    value: 8,
                    message: 'Длина пароля не менее 8 символов',
                  },
                })}
                className='w-full resize-none border rounded-lg placeholder:italic text-sm p-2 focus:outline-none bg-slate-100 focus:bg-slate-50'
                type='password'
                placeholder='Пароль'
              />
              {errors?.password && (
                <span className='text-rose-500 text-xs'>
                  {errors?.password?.message}
                </span>
              )}
            </label>

            <input
              className={
                !isValid
                  ? 'cursor-not-allowed mt-2 bg-slate-400 text-white py-2 px-4 rounded-lg font-semibold'
                  : 'mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600'
              }
              type='submit'
              value='Войти'
              disabled={!isValid}
            />
          </div>
        </form>
        <div className='flex gap-1 text-sm text-slate-600 mt-1'>
          <span>Нет аккаунта?</span>
          <span className='text-blue-500 font-semibold hover:text-blue-600 hover:underline transition-all'>
            <Link to='/register'>Регистрация</Link>
          </span>
        </div>
      </div>
    </div>
  );
};
export default Login;
