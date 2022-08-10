import axios from "axios";

// GET_POSTS: 요청 -> 로딩
// GET_POSTS_SUCCESS: 요청 성공 후 응답 데이터 저장
// GET_POSTS_ERROR: 요청 실패 후 에러 저장
const GET_POSTS = "posts/GET_POSTS";
const GET_POSTS_SUCCESS = "posts/GET_POSTS_SUCCESS";
const GET_POSTS_ERROR = "posts/GET_POSTS_ERROR";

// 액션 함수 (객체 생성이 아닌 바로 dispatch하는 함수)
// GET_POSTS만 해도 후속 dispatch들이 실행된다.
export const getPosts = () => async (dispatch, getState) => {
  dispatch({ type: GET_POSTS });
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    dispatch({ type: GET_POSTS_SUCCESS, payload: { posts: res.data } });
  } catch (e) {
    dispatch({ type: GET_POSTS_ERROR, error: e });
  }
};

// 초기 값
const initialState = {
  loading: false,
  data: null,
  error: null,
};

// 리듀서
export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case GET_POSTS_SUCCESS:
      return {
        loading: false,
        data: action.payload.posts,
        error: null,
      };
    case GET_POSTS_ERROR:
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      return state;
  }
}
