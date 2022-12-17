import React, { useState, useEffect } from "react";
import { useTheme, Row, User } from "@nextui-org/react";
import { Link } from "react-router-dom";
import moment from "moment";
import LikeBtn from "../../LikeBtn";
import { useSelector, useDispatch } from "react-redux";
import CommentMenu from "./CommentMenu";
import {
  updateComment,
  likeComment,
  unLikeComment,
} from "../../../redux/actions/commentAction";
import InputComment from "../InputComment";

const CommentCard = ({ children, comment, post, commentId }) => {
  const { isDark } = useTheme();
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [readMore, setReadMore] = useState(false);

  const [isLike, setIsLike] = useState(false);

  const [onEdit, setOnEdit] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  const [onReply, setOnReply] = useState(false);

  useEffect(() => {
    setContent(comment.content);
    setIsLike(false)
    setOnReply(false)
    if (comment.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    }
  }, [comment, auth.user._id]);

  const styleCard = {
    opacity: comment._id ? 1 : 0.5,
    PointerEvent: comment._id ? "inherit" : "none",
  };

  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true);
    setLoadLike(true);
    await dispatch(likeComment({ comment, post, auth }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;
    setIsLike(false);
    setLoadLike(true);
    await dispatch(unLikeComment({ comment, post, auth }));
    setLoadLike(false);
  };

  const handleUpdate = () => {
    if (comment.content !== content) {
      dispatch(updateComment({ comment, post, content, auth }));
      setOnEdit(false);
    } else {
      setOnEdit(false);
    }
  };

  const handleReply = () => {
    if (onReply) return setOnReply(false);
    setOnReply({ ...comment, commentId });
  };

  return (
    <div
      className={`comment_card mt-2 pb-3 border-b-2 ${
        isDark ? "border-neutral-800" : "border-neutral-200"
      }`}
      style={styleCard}
    >
      <Row justify="space-between">
        <Link to={`/profile/${comment.user._id}`}>
          <User
            size="sm"
            src={comment.user.avatar}
            name={
              auth.user._id === comment.user._id ? "Me" : comment.user.username
            }
          >
            <div>
              <small>{moment(comment.createdAt).fromNow()}</small>
            </div>
          </User>
        </Link>
        <small className="font-weight-bold pt-1">
          <CommentMenu
            post={post}
            comment={comment}
            auth={auth}
            setOnEdit={setOnEdit}
            socket={socket}
          />
        </small>
      </Row>
      <div
        className={`comment_content ${
          isDark ? "bg-neutral-900" : "bg-neutral-100"
        }`}
      >
        <div className="flex-fill">
          {onEdit ? (
            <textarea
              className={`p-3 ${
                isDark
                  ? "bg-neutral-800 text-white"
                  : "bg-white text-neutral-900"
              }`}
              name="content"
              id="content"
              rows="5"
              cols={"250"}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ minWidth: "100%" }}
            />
          ) : (
            <>
            {
              comment.tag && comment.tag._id !== comment.user._id &&
              <Link to={`/profile/${comment.tag._id}`} className="mr-2">
                @{comment.tag.username}
              </Link>
            }
            <span
              className={`${isDark ? "text-neutral-100" : "text-neutral-800"}`}
              style={{ fontSize: "80%" }}
            >
              {content.length < 100
                ? content
                : readMore
                ? content + " "
                : content.slice(0, 100) + "..."}
            </span>
            </>
          )}
          {content.length > 100 && (
            <span className="readMore" onClick={() => setReadMore(!readMore)}>
              {readMore ? "Hide content" : " Read More"}
            </span>
          )}
        </div>
      </div>
      <div className="cursor-pointer flex space-x-5 pt-3 pb-2">
        <small className="font-weight-bold flex">
          <LikeBtn
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
          <span className="pt-1">{comment.likes.length}</span>
          {comment.likes.length > 1 ? (
            <span className="pl-1 pt-1">Likes</span>
          ) : (
            <span className="pl-1 pt-1">Like</span>
          )}
        </small>
        {onEdit ? (
          <>
            <small
              className="font-weight-bold pt-1 text-yellow-500"
              onClick={handleUpdate}
            >
              Update
            </small>
            <small
              className="font-weight-bold pt-1 text-red-500"
              onClick={() => setOnEdit(false)}
            >
              Cancel
            </small>
          </>
        ) : (
          <small className="font-weight-bold pt-1" onClick={handleReply}>
            {onReply ? <span className="text-red-500">cancel</span> : "reply"}
          </small>
        )}
      </div>
      {onReply && (
        <InputComment post={post} onReply={onReply} setOnReply={setOnReply}>
          <Link to={`/profile/${onReply.user._id}`} className="mr-2">
            @{onReply.user.username}:
          </Link>
        </InputComment>
      )}
      {children}
    </div>
  );
};

export default CommentCard;
