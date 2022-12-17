import React, { useState, useEffect } from "react";
import {
  AiFillHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  likePost,
  unLikePost,
  savePost,
  unSavePost,
} from "../../../redux/actions/postAction";
import ShareModal from "../../ShareModal";
import { BASE_URL } from "../../../utils/config";

const PostFooter = ({ post }) => {
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  const [isShare, setIsShare] = useState(false);

  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [saved, setSaved] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);

  useEffect(() => {
    if (post?.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post?.likes, auth.user._id]);

  const handleLike = async () => {
    if (loadLike) return;

    setIsLike(true);

    setLoadLike(true);
    await dispatch(likePost({ post, auth, socket }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;

    setIsLike(false);

    setLoadLike(true);
    await dispatch(unLikePost({ post, auth, socket }));
    setLoadLike(false);
  };

  useEffect(() => {
    if (auth.user?.saved.find((id) => id === post?._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [auth.user?.saved, post?._id]);

  const handleSave = async () => {
    if (saveLoad) return;

    setSaveLoad(true);
    await dispatch(unSavePost({ post, auth }));
    setSaveLoad(false);
  };

  const handleUnSave = async () => {
    if (saveLoad) return;

    setSaveLoad(true);
    await dispatch(savePost({ post, auth }));
    setSaveLoad(false);
  };

  return (
    <>
      <div className="flex pt-4">
        <h6 style={{ padding: "0 14px", cursor: "pointer" }}>
          {post?.likes?.length}
          {post?.likes?.length <= 1 ? (
            <span className="pl-2 pr-2">Like</span>
          ) : (
            <span className="pl-2 pr-2">Likes</span>
          )}
        </h6>
        <h6 style={{ padding: "0 25px", cursor: "pointer" }}>
          {post?.comments?.length}
          {post?.comments?.length <= 1 ? (
            <span className="pl-2 pr-2">Comment</span>
          ) : (
            <span className="pl-2 pr-2">Comments</span>
          )}
        </h6>
        {saved ? (
          <i className="fas fa-bookmark text-warning" onClick={handleSave} />
        ) : (
          <i className="far fa-bookmark" onClick={handleUnSave} />
        )}
      </div>
      <div className="flex justify-between text-gray-500 pt-2">
        <div
          className={`hover:bg-red-500 items-center w-100 p-3 rounded-xl pt-4 ${
            isLike ? "hover:text-red-300 text-red-500" : "hover:text-white"
          }`}
          onClick={isLike ? handleUnLike : handleLike}
        >
          <span className="hover:animate-bounce w-100 flex justify-center">
            <AiFillHeart size={25} />
            <h6
              style={{ padding: "0 20px", cursor: "pointer" }}
              className="pt-1"
            >
              {post?.likes?.length}
            </h6>
          </span>
        </div>
        <div className="hover:bg-indigo-500 w-100 p-3 hover:text-white rounded-xl pt-4">
          <Link
            to={`/post/${post?._id}`}
            className="text-gray-500 hover:text-white"
          >
            <span className="hover:animate-bounce w-100 flex justify-center">
              <AiOutlineComment size={25} />
              <h6
                style={{ padding: "0 20px", cursor: "pointer" }}
                className="pt-1"
              >
                {post?.comments?.length}
              </h6>
            </span>
          </Link>
        </div>
        <div
          className={`hover:bg-violet-500 w-100 p-3 hover:text-white rounded-xl pt-4 ${
            isShare && "bg-violet-500 text-white"
          }`}
          onClick={() => setIsShare((click) => !click)}
        >
          <span className="hover:animate-bounce w-100 flex justify-center">
            <AiOutlineShareAlt size={25} />
          </span>
        </div>
      </div>

      {isShare && <ShareModal url={`${BASE_URL}/post/${post._id}`} />}
    </>
  );
};

export default PostFooter;
