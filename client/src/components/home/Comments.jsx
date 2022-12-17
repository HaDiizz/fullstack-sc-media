import React, { useState, useEffect } from "react";
import CommentDisplay from "./comments/CommentDisplay";

const Comments = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState([]);
  const [next, setNext] = useState(2);

  const [replyComments, setReplyComments] = useState([]);

  useEffect(() => {
    const newCm = post?.comments.filter((cm) => !cm.reply);
    setComments(newCm);
    // console.log(newCm.length)
    // console.log(next)
    setShowComments(newCm?.slice(0, next));
  }, [post?.comments, next]);

  useEffect(() => {
    const newRep = post?.comments.filter((cm) => cm.reply);
    setReplyComments(newRep);
  }, [post?.comments]);

  return (
    <div className="comments">
      {showComments?.map((comment, index) => (
        <CommentDisplay key={index} comment={comment} post={post} replyCm={replyComments?.filter(item => item.reply === comment?._id)} />
      ))}
      {comments?.length - next > 0 ? (
        <div
          className="p-2 cursor-pointer font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-700 text-sm"
          onClick={() => setNext((prev) => prev + 10)}
        >
          See more comments...
        </div>
      ) : (
        comments?.length > 2 && (
          <div
            className="p-2 cursor-pointer font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-700 text-sm"
            onClick={() => setNext(2)}
          >
            Hide comments
          </div>
        )
      )}
    </div>
  );
};

export default Comments;