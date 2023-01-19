import { useEffect, useState } from 'react';

import { MdSportsSoccer } from 'react-icons/md';
import { SlFire } from 'react-icons/sl';
import { RiComputerLine } from 'react-icons/ri';
import { AiOutlineClockCircle } from 'react-icons/ai';

import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import AddPost from './pages/AddPost';
import FullPost from './pages/FullPost';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import { fetchAuthMe } from './redux/slices/auth';
import { fetchPosts } from './redux/slices/post';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  const navList = [
    {
      category: 'top',
      title: 'Популярные',
      icon: <SlFire />,
    },
    {
      category: 'new',
      title: 'Новые',
      icon: <AiOutlineClockCircle />,
    },

    {
      category: 'webdev',
      title: 'Разработка',
      icon: <RiComputerLine />,
    },
    {
      category: 'sport',
      title: 'Спорт',
      icon: <MdSportsSoccer />,
    },
  ];
  const [category, setCategory] = useState(navList[0].category);

  useEffect(() => {
    dispatch(fetchPosts({ category }));
  }, [dispatch, category]);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route
          path='/'
          element={
            <Home
              navList={navList}
              setCategory={setCategory}
              category={category}
            />
          }
        />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='posts/:id' element={<FullPost />} />
        <Route path='posts/:id/edit' element={<AddPost />} />
        <Route path='/add-post' element={<AddPost />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
