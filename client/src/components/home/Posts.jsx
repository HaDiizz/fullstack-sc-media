import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PostHeader from "./post/PostHeader";
import PostBody from "./post/PostBody";
import PostFooter from "./post/PostFooter";
import { useTheme, Loading } from "@nextui-org/react";
import Comments from "./Comments";
import InputComment from "./InputComment";
import { useState } from "react";
import LoadMoreBtn from "../LoadMoreBtn";
import { getDataAPI } from "../../utils/fetchData";
import { POST_TYPES } from "../../redux/actions/postAction";

const Posts = () => {
  const { homePosts, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { isDark } = useTheme();
  const [load, setLoad] = useState(false);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `posts?limit=${homePosts.page * 8}`,
      auth.token
    );
    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: { ...res.data, page: homePosts.page + 1 },
    });
    setLoad(false);
  };

  return (
    <div className="card bg-transparent">
      {homePosts.posts?.map((post) => (
        <div
          className={`p-2 cursor-pointer rounded-lg  ${
            isDark ? "border-2 border-neutral-800" : ""
          }`}
          key={post._id}
        >
          <PostHeader post={post} />
          <div className="card_body">
            <PostBody post={post} />
          </div>
          <div>
            <PostFooter post={post} />
          </div>
          <div className="text-left pt-3 pb-3">
            <Comments post={post} />
            <InputComment post={post} />
          </div>
        </div>
      ))}
      {load && <Loading type="points" className="d-block mx-auto" />}
      <LoadMoreBtn
        result={homePosts.result}
        page={homePosts.page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default Posts;
