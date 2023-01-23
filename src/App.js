import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import CommentBox from './components/CommentsBox';
import Layout from './components/Layout';
import AddPost from './pages/AddPost';
import FullPost from './pages/FullPost';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import { fetchAuthMe } from './redux/slices/auth';
// import { fetchPosts } from './redux/slices/post';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(fetchPosts({ category }));
  // }, [dispatch, category]);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/posts/:id' element={<FullPost />}>
          <Route path='/posts/:id/comments' element={<CommentBox />} />
        </Route>
        <Route path='/posts/:id/edit' element={<AddPost />} />
        <Route path='/add-post' element={<AddPost />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
