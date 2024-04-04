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
      throw new Error(`Failed to create post: ${errors}`)
    }
  } catch (error) {
    console.error(error)
  }
}

export const getAllPosts = () => async (dispatch) => {
  try {
    const response = await fetch(`/api/posts/all`)
    if (response.ok) {
      const data = await response.json()
      dispatch(acGetAllPosts(data))
    } else {
      console.error("Unable to fetch all of your posts:", response.status)
    }
  } catch (error) {
    console.error(error)
  }
}

export const getUserPosts = () => async (dispatch) => {}

export const getPostById = (postId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/posts/${postId}`)
    if (response.ok) {
      const post = await response.json()
      dispatch(acGetPostsByID(post))
    }
  } catch (error) {
    console.error(error)
  }
}

export const updatePost = (postId, updatedPost) => async (dispatch) => {
  try {
    const response = await fetch(`/api/posts/${postId}/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPost),
    })
    if (response.ok) {
      const data = await response.json()
      dispatch(acUpdatePost(data))
    } else {
      console.error(
        "There was an error in updating your posts:",
        response.status
      )
    }
  } catch (error) {
    console.error(error)
  }
}

export const deletePost = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (response.ok) {
    dispatch(acDeletePost(Number(postId)))
  }

  return response
}

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
        allPosts: {
          ...state.allPosts,
          [action.payload.id]: action.payload,
        },
      }
    }

    case GET_ALL_POSTS: {
      return {
        ...state,
        allPosts: action.payload,
      }
    }

    case GET_POSTS_BY_ID: {
      return {
        ...state,
        singlePost: action.payload,
      }
    }

    case UPDATE_POST: {
      return {
        ...state,
        allPosts: {
          ...state.allPosts,
          [action.payload.id]: action.payload,
        },
      }
    }

    case DELETE_POST: {
      const newState = {
        ...state,
        allPosts: { ...state.allPosts },
      }
      delete newState.allPosts[action.payload]
      return newState
    }

    default:
      return state
  }
}

export default postReducer
