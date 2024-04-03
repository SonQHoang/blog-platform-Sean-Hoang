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
    payload: posts,
  }
}

const acGetAllPosts = (posts) => {
  console.log("What is my post===>", posts)
  return {
    type: GET_ALL_POSTS,
    payload: posts,
  }
}

const acGetUserPosts = (posts) => {
  return {
    type: GET_USER_POSTS,
    payload: posts,
  }
}

const acGetPostsByID = (posts) => {
  return {
    type: GET_POSTS_BY_ID,
    payload: posts,
  }
}

const acUpdatePost = (posts) => {
  return {
    type: UPDATE_POST,
    payload: posts,
  }
}

const acDeletePost = (posts) => {
  return {
    type: DELETE_POST,
    payload: posts,
  }
}

//Thunks

export const createPost = (postData) => async (dispatch, getState) => {
  const userId = getState().session.user.id
  const dataWithUserId = { ...postData, userId }
  try {
    const response = await fetch(`/api/posts/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataWithUserId),
    })
    if (response.ok) {
      const post = await response.json()
      dispatch(acCreatePost(post))
      return post
    } else {
      const errors = await response.text()
      throw new Error(`Failed to create tip: ${errors}`)
    }
  } catch (error) {
    console.error(error)
  }
}

export const getAllPosts = () => async (dispatch) => {
  try {
    const response = await fetch(`/api/posts/all`)
    // console.log("What is the response===>", response)
    if (response.ok) {
      const data = await response.json()
      // console.log("So what is my data====>", data)
      dispatch(acGetAllPosts(data))
    } else {
      console.error("Response not ok:", response.status)
    }
  } catch (error) {
    console.error(error)
  }
}

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
      return {
        ...state,
        allPosts: { ...state.allPosts, [action.posts.id]: action.posts },
      }
    }

    case GET_ALL_POSTS: {
      return {
        ...state,
        allPosts: action.payload,
      }
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
