import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios.js';

const initialState = {
  posts: {
    items: [],
    currentPage: null,
    countOfPage: null,
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
  likes: {
    items: [],
    status: 'loading',
  },
  comments: {
    items: [],
    status: 'loading',
  },
};

export const fetchAllPosts = createAsyncThunk(
  'posts/fetchAllPosts',
  async () => {
    try {
      const { data } = await axios.get(`/posts`);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ category, user, page }, { rejectWithValue, dispatch }) => {
    try {
      if (!category && !user) {
        const data = await axios.get(`/posts`, {
          params: { page: page },
        });
        dispatch(setPosts(data.items.posts));
      }
      if (category && !user) {
        const { data } = await axios.get(`/posts`, {
          params: { category, page: page },
        });
        dispatch(setPosts(data));
      }
      if (user && !category) {
        const { data } = await axios.get(`/posts`, {
          params: { user, page: page },
        });
        dispatch(setPosts(data));
      }
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

export const likePost = createAsyncThunk(
  'posts/likePost',
  async ({ id, userId }, { dispatch }) => {
    try {
      const { data } = await axios.patch(`/posts/${id}/likes`, userId);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const fetchRemovePost = createAsyncThunk(
  'posts/fetchRemovePost',
  async postId => {
    const { data } = axios.delete(`/posts/${postId}`);
    return data;
  }
);

export const createComment = createAsyncThunk(
  'comment/createComment',
  async ({ postId, comment }) => {
    const { data } = await axios.put(`/comments/${postId}`, {
      comment,
    });

    return data;
  }
);

export const removeComment = createAsyncThunk(
  'comment/removeComment',
  async ({ postId, comment }) => {
    const { data } = await axios.put(`delete/comments/${postId}`, {
      comment,
    });

    return data;
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts.currentPage = action.payload.currentPage;
      state.posts.countOfPage = action.payload.countOfPage;
      state.posts.items = action.payload.posts;
    },
  },

  extraReducers: {
    //  POST
    [fetchPosts.pending]: state => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.status = 'loaded';
    },
    [fetchPosts.rejected]: state => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
    // FETCH ALL POST
    [fetchAllPosts.pending]: state => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchAllPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchAllPosts.rejected]: state => {
      state.posts.items = [];
      state.posts.status = 'error';
    },

    //     //REMOVE_POST
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.status = 'loading';
    },
    [fetchRemovePost.fulfilled]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        obj => obj._id !== action.meta.arg
      );
      debugger;
      state.posts.status = 'loaded';
    },
    [fetchRemovePost.rejected]: state => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
    //TAGS
    [fetchTags.pending]: state => {
      state.tags.items = [];
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items.push(action.payload);
      state.tags.status = 'loaded';
    },
    [fetchTags.rejected]: state => {
      state.tags.items = [];
      state.tags.status = 'error';
    },
    //LIKES
    [likePost.pending]: state => {
      state.likes.items = [];
      state.likes.status = 'loading';
    },
    [likePost.fulfilled]: (state, action) => {
      state.posts.status = 'loaded';
      const currentPost = state.posts.items.find(
        obj => obj._id === action.payload._id
      );

      if (currentPost.likes.includes(action.meta.arg.userId)) {
        const index = currentPost.likes.indexOf(action.meta.arg.userId);
        currentPost.likes.splice(index);

        // currentPost.likes.filter(obj => obj !== action.meta.arg.userId);
      } else {
        currentPost.likes.push(action.meta.arg.userId);
      }
    },
    [likePost.rejected]: state => {
      state.likes.items = [];
      state.likes.status = 'error';
    },
    // CREATE COMMENTS
    [createComment.pending]: state => {
      state.comments.items = [];
      state.comments.status = 'loading';
    },
    [createComment.fulfilled]: (state, action) => {
      const currentPost = state.posts.items.find(
        obj => obj._id === action.meta.arg.postId
      );

      if (currentPost) {
        currentPost.comments = action.payload.comments;
      }
      // debugger;
      state.comments.status = 'loaded';
    },
    [createComment.rejected]: state => {
      state.comments.items = [];
      state.comments.status = 'error';
    },
    //     //REMOVE_COMMENT
    [removeComment.pending]: state => {
      state.comments.items = [];
      state.comments.status = 'loading';
    },
    [removeComment.fulfilled]: (state, action) => {
      const currentPost = state.posts.items.find(
        obj => obj._id === action.meta.arg.postId
      );

      if (currentPost) {
        currentPost.comments = action.payload.comments;
      }
      // debugger;
      state.comments.status = 'loaded';
    },
    [removeComment.rejected]: state => {
      state.comments.items = [];
      state.comments.status = 'error';
    },
  },
});

export const selectPostById = (state, postId) =>
  state.posts.items.find(post => post._id === postId);

export const { setPosts } = postSlice.actions;
export const postsReducer = postSlice.reducer;
