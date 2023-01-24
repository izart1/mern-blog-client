import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, selectIsAuth } from '../redux/slices/auth';
import { BsPlusLg } from 'react-icons/bs';
import { fetchPosts } from '../redux/slices/post';
import { useRef } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector(state => state.auth.data);

  const menuRef = useRef();

  useEffect(() => {
    const handler = e => {
      if (!menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, [isOpen]);

  const ocClickLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
  };

  console.count('Header');

  return (
    <div className='w-full h-[54px] bg-slate-800 text-white flex '>
      <div
        ref={menuRef}
        className='container max-w-screen-md mx-auto flex justify-between items-center px-2'
      >
        <Link to={'/'}>
          <h1
            onClick={() => dispatch(fetchPosts({ category: 'top' }))}
            className='font-bold hover:text-rose-400 transition-all text-2xl'
          >
            .BLOG
          </h1>
        </Link>

        {isAuth ? (
          <div className='flex items-center gap-3 text-sm font-semibold'>
            <Link to='/add-post'>
              <div className=' flex gap-2 items-center bg-rose-500 py-1 px-2 rounded-lg hover:bg-rose-600 transition-all'>
                <BsPlusLg />
                <button>Создать</button>
              </div>
            </Link>

            <div
              onClick={e => e.preventDefault()}
              className={
                isOpen
                  ? 'relative cursor-pointer bg-slate-600 h-[54px] flex items-center px-2'
                  : '  px-2'
              }
            >
              <div onClick={() => setIsOpen(!isOpen)}>
                {userData?.avatarUrl ? (
                  <img
                    className='max-w-[30px] rounded-full'
                    src={userData?.avatarUrl}
                    alt={userData?.fullName}
                  />
                ) : (
                  <div className='w-7 h-7 bg-slate-500 rounded-full flex justify-center items-center'>
                    <span>{userData?.fullName.slice(0, 1)}</span>
                  </div>
                )}
              </div>

              {/* MENU  */}
              {isOpen && (
                <ul className='absolute -right-[1px] top-[54px]  rounded-b-lg bg-slate-600 p-6 text-white flex flex-col gap-2 font-semibold w-[280px] z-20 '>
                  <li className='text-sm flex items-center gap-4'>
                    <span>Мой профиль :</span>
                    <span className='flex items-center gap-2'>
                      {userData.fullName}
                      <div>
                        {userData?.avatarUrl ? (
                          <img
                            className='max-w-[26px] rounded-full'
                            src={userData?.avatarUrl}
                            alt={userData.fullName}
                          />
                        ) : (
                          <div className='w-6 h-6 text-sm bg-slate-500 text-white rounded-full flex justify-center items-center'>
                            <span>{userData?.fullName.slice(0, 1)}</span>
                          </div>
                        )}
                      </div>
                    </span>
                  </li>
                  <Link to={'/'}>
                    <li
                      onClick={() =>
                        dispatch(fetchPosts({ user: userData._id }))
                      }
                      className='hover:text-rose-600 transition-all'
                    >
                      Мои посты
                    </li>
                  </Link>

                  {/* <hr /> */}
                  <li className='hover:text-rose-600 transition-all border-t border-slate-500 pt-1'>
                    <button onClick={ocClickLogout}>Выйти</button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        ) : (
          <div className='flex items-center gap-2 text-sm font-semibold'>
            <Link to='/register'>
              <p className='bg-rose-500 py-1 px-2 rounded-lg hover:bg-rose-600 transition-all'>
                Регистрация
              </p>
            </Link>
            <Link to='/login'>
              <p className='bg-slate-600 py-1 px-2 rounded-lg hover:bg-slate-700 transition-all'>
                Войти
              </p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
