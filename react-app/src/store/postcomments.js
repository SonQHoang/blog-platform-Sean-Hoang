const GET_POST_COMMENTS = "posts/getComments"
const POST_COMMENTS = "posts/new"
const DELETE_POST_COMMENTS = "posts/deleteComments"

const acPostComment = (postComment) => {
  return {
    type: POST_COMMENTS,
    payload: postComment,
  }
}

const acGetPostComment = (postComment) => {
  return {
    type: GET_POST_COMMENTS,
    payload: postComment,
  }
}

const acDeleteComment = (postComment) => {
  return {
    type: DELETE_POST_COMMENTS,
    payload: postComment,
  }
}

export const postComment = (commentData) => async (dispatch, getState) => {
  const userId = getState().session.user.id
  const dataWithUserId = { ...commentData, userId }
  try {
    const response = await fetch(`/api/comments/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataWithUserId),
    })
    if (response.ok) {
      const comment = await response.json()
      dispatch(acPostComment(comment))
      return comment
    } else {
      const errors = await response.text()
      throw new Error(`Failed to create comment: ${errors}`)
    }
  } catch (error) {
    console.error(error)
  }
}

export const getComments = (postId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/comments/posts/${postId}`)
    if (response.ok) {
      const data = await response.json()
      dispatch(acGetPostComment(data))
    } else {
      console.error("Unable to fetch all of your comments", response.status)
    }
  } catch (error) {
    console.error(error)
  }
}

export const deleteComment = (commentId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/comments/posts/${commentId}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (response.ok) {
      const data = await response.json()
      dispatch(acDeleteComment(data))
    }
  } catch (error) {
    console.error(error)
  }
}

const initialState = {
  comments: [],
}

const postCommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_COMMENTS: {
      return {
        ...state,
        comments: [...state.comments, action.payload],
      }
    }

    case GET_POST_COMMENTS: {
      return {
        ...state,
        comments: action.payload,
      }
    }

    case DELETE_POST_COMMENTS: {
      const newState = {
        ...state,
        comments: { ...state.comments },
      }
      delete newState.comments[action.payload]
      return newState
    }

    default:
      return state
  }
}

export default postCommentsReducer
