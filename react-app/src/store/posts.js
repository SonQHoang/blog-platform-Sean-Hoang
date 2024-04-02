// Action Creators

const CREATE_POST = "posts/new"
const GET_ALL_POSTS = "posts/getPosts"
const DELETE_POST = "posts/delete"
const GET_USER_POSTS = "posts/user"
const GET_POSTS_BY_ID = "posts/postById"
const UPDATE_POST = "posts/update"

const acCreatePost = (posts) => {
  return {
    type: CREATE_POST,
    posts,
  }
}

const acGetAllPosts = (posts) => {
  return {
    type: GET_ALL_POSTS,
    posts,
  }
}

const acGetUserPosts = (posts) => {
  return {
    type: GET_USER_POSTS,
    posts,
  }
}

const acGetPostsByID = (posts) => {
  return {
    type: GET_POSTS_BY_ID,
    posts,
  }
}

const acUpdatePost = (posts) => {
  return {
    type: UPDATE_POST,
    posts,
  }
}

const acDeletePost = (posts) => {
  return {
    type: DELETE_POST,
    posts,
  }
}

//Thunks

export const createPost = (data, userId) => async (dispatch) => {}

export const getAllPosts = () => async (dispatch) => {}

export const getUserPosts = () => async (dispatch) => {}

export const getPostById = (postId) => async (dispatch) => {}

export const updatePost = (postId, updatedPost) => async (dispatch) => {}

export const deletePost = (postId) => async (dispatch) => {}

// Reducers

const initialState = {
  allPosts: {},
  singlePost: {},
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST: {
      return {}
    }

    case GET_ALL_POSTS: {
      return {}
    }

    case GET_POSTS_BY_ID: {
      return {}
    }

    case UPDATE_POST: {
      return {}
    }

    case DELETE_POST: {
      return {}
    }

    default:
      return state
  }
}

export default postReducer
