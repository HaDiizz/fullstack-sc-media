import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../../redux/actions/postAction";
import { Loading, useTheme } from "@nextui-org/react";
import Posts from "../../components/home/Posts";
import Comments from "../../components/home/Comments";
import InputComment from "../../components/home/InputComment";
import PostHeader from "../../components/home/post/PostHeader";
import PostBody from "../../components/home/post/PostBody";
import PostFooter from "../../components/home/post/PostFooter.jsx";
import SkeletonLoading from "../../images/693-skeleton-loading.gif";

const Post = () => {
  const { isDark } = useTheme();
  const { id } = useParams();
  const [post, setPost] = useState([]);

  const { auth, detailPost } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost({ detailPost, id, auth }));
    if (detailPost.length > 0) {
      const newArr = detailPost.filter((post) => post._id === id);
      setPost([newArr[0]]);
    }
  }, [detailPost, dispatch, id, auth]);

  return (
    <div className="pt-5 post p-2">
      {post.length === 0 && (
        // <Loading type="points" className="d-block mx-auto my-4" />
        <div
          className={`flex justify-center text-center ${
            isDark ? "opacity-10" : "opacity-20"
          }`}
          style={{ height: "40%" }}
        >
          <img src={SkeletonLoading} alt="SkeletonLoading" />
        </div>
      )}
      {post.map((item, index) => (
        <div
          className={`p-2 cursor-pointer rounded-lg  ${
            isDark ? "border-2 border-neutral-800" : ""
          }`}
          key={index}
        >
          <PostHeader post={item} />
          <div className="card_body">
            <PostBody post={item} />
          </div>
          <div>
            <PostFooter post={item} />
          </div>
          <div className="text-left pt-3 pb-3">
            <Comments post={item} />
            <InputComment post={item} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;
