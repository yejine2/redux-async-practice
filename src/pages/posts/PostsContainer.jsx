import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../modules/posts";
import PostsPresenter from "./PostsPresenter";

function PostsContainer() {
  const { data, loading, error } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  // 글 가져오는 과정 수행! (아래 코드가 수행되고 나면 이제 data 에 글이 담겨 있음)
  useEffect(() => {
    !data && dispatch(getPosts());
  }, [data, dispatch]);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생</div>;
  if (!data) return null;
  return <PostsPresenter posts={data} />;
}

export default PostsContainer;
