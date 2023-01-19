import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, selectIsAuth } from '../redux/slices/auth';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const Register = () => {
  const [isShown, setIsSHown] = useState(false);
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Введите почту').email('Некорректный email'),

    fullName: Yup.string()
      .required('Введите имя')
      .matches(/^[a-z0-9]+$/i, 'Имя должно содержать только буквы и цифры')
      .min(3, 'Имя минимум 3 символа'),
    password: Yup.string()
      .required('Введите пароль')
      .min(8, 'Пароль минимум 8 символов'),
    confirmPassword: Yup.string()
      .required('Повторите пароль')
      .oneOf([Yup.ref('password')], 'Пароли не совпадают'),
  });
  // const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setError,
  } = useForm({ mode: 'onChange', resolver: yupResolver(validationSchema) });

  const onSubmit = async values => {
    try {
      const data = await dispatch(fetchRegister(values)).unwrap();
      if ('token' in data) {
        window.localStorage.setItem('token', data.token);
      }
    } catch (error) {
      setError('fullName', {
        type: 'server',
        message: 'Это имя занято. Попробуйте другое',
      });
      setError('email', {
        type: 'server',
        message: 'Эта почта уже зарегистрирована',
      });
    }
  };

  const togglePassword = () => {
    setIsSHown(isShown => !isShown);
  };

  if (isAuth) {
    return <Navigate to='/' />;
  }

  return (
    <div className='max-w-md mx-auto p-8 bg-white my-6 rounded-lg shadow-md'>
      <div>
        <h3 className='text-2xl font-semibold mb-6'>Регистрация</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex gap-6 flex-col'>
            <label className='relative flex flex-col'>
              <input
                {...register('fullName')}
                className={
                  errors?.fullName
                    ? 'w-full resize-none border border-red-500 rounded-lg placeholder:italic text-sm p-2 focus:outline-none bg-slate-100 focus:bg-slate-50'
                    : 'w-full resize-none border rounded-lg placeholder:italic text-sm p-2 focus:outline-none bg-slate-100 focus:bg-slate-50'
                }
                placeholder='Имя'
              />
              <span className='absolute -bottom-4 text-rose-500 text-xs'>
                {errors?.fullName?.message}
              </span>
            </label>

            <label className='relative flex flex-col'>
              <input
                {...register('email')}
                className={
                  errors?.email
                    ? 'w-full resize-none border border-red-500 rounded-lg placeholder:italic text-sm p-2 focus:outline-none bg-slate-100 focus:bg-slate-50'
                    : 'w-full resize-none border rounded-lg placeholder:italic text-sm p-2 focus:outline-none bg-slate-100 focus:bg-slate-50'
                }
                placeholder='Почта'
              />

              <span className='absolute -bottom-4 text-rose-500 text-xs'>
                {errors?.email?.message}
              </span>
            </label>

            <label className='relative flex flex-col'>
              <input
                {...register('password')}
                className={
                  errors?.password || errors?.confirmPassword
                    ? 'w-full resize-none border border-red-500 rounded-lg placeholder:italic text-sm p-2 focus:outline-none bg-slate-100 focus:bg-slate-50'
                    : 'w-full resize-none border rounded-lg placeholder:italic text-sm p-2 focus:outline-none bg-slate-100 focus:bg-slate-50'
                }
                type={isShown ? 'text' : 'password'}
                placeholder='Пароль'
              />
              <span
                onClick={togglePassword}
                className='absolute right-2 top-3 cursor-pointer text-lg'
              >
                {isShown ? <FaEyeSlash /> : <FaEye />}
              </span>
              <span className='absolute -bottom-4 text-rose-500 text-xs'>
                {errors?.password?.message}
              </span>
            </label>

            <label className='relative flex flex-col'>
              <input
                {...register('confirmPassword')}
                className={
                  errors?.confirmPassword
                    ? '   w-full resize-none border border-red-500 rounded-lg placeholder:italic text-sm p-2 focus:outline-none bg-slate-100 focus:bg-slate-50'
                    : '   w-full resize-none border rounded-lg placeholder:italic text-sm p-2 focus:outline-none bg-slate-100 focus:bg-slate-50'
                }
                type={isShown ? 'text' : 'password'}
                placeholder='Повторите пароль'
              />

              <span className='absolute -bottom-4 text-rose-500 text-xs'>
                {errors?.confirmPassword?.message}
              </span>
            </label>

            <input
              className={
                !isValid
                  ? 'cursor-not-allowed mt-2 bg-slate-400 text-white py-2 px-4 rounded-lg font-semibold'
                  : 'mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600'
              }
              type='submit'
              value='Регистрация'
              disabled={!isValid}
            />
          </div>
        </form>
        <div className='flex gap-1 text-sm text-slate-600 mt-1'>
          <span>Есть аккаунт?</span>
          <span className='text-blue-500 font-semibold hover:text-blue-600 hover:underline transition-all'>
            <Link to='/login'>Войти</Link>
          </span>
        </div>
      </div>
    </div>
  );
};
export default Register;
