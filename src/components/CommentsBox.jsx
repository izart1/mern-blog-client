import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CommentItem from './CommentItem.jsx';
import Spinner from './Spinner.jsx';

const CommentBox = () => {
  const params = useParams();
  const postId = params.id;

  const currentPost = useSelector(state =>
    state.posts.posts.items.find(obj => obj._id === postId)
  );
  const statusPost = useSelector(state => state.posts.posts.status);

  console.log('currentPost', currentPost);

  console.count('CommentBox');

  return (
    <div>
      {/* <div className='flex gap-4 text-slate-500 pb-2'>
        <button className='hover:text-slate-900 hover:font-semibold transition-all'>
          Свежие
        </button>
        <button className='hover:text-slate-900 hover:font-semibold transition-all'>
          Лучшие
        </button>
      </div>
      <hr /> */}

      {statusPost === 'loading' ? (
        <Spinner />
      ) : (
        <div className='mt-4 '>
          {currentPost?.comments?.map(obj => (
            <CommentItem key={obj._id} {...obj} user={obj.user} />
          ))}
        </div>
      )}
    </div>
  );
};
export default CommentBox;
