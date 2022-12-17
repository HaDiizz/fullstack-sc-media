import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CommentCard from "./CommentCard";

const CommentDisplay = ({ comment, post, replyCm }) => {
  const [showRep, setShowRep] = useState([]);
  const [next, setNext] = useState(1);

  useEffect(() => {
    setShowRep(replyCm.slice(0, next));
  }, [next, replyCm]);

  return (
    <div className="comment_display">
      <CommentCard comment={comment} post={post} commentId={comment._id}>
        <div className="pl-4">
          {showRep.map(
            (item, index) =>
              item.reply && (
                <CommentCard
                  key={index}
                  comment={item}
                  post={post}
                  commentId={comment._id}
                />
              )
          )}

          {replyCm.length - next > 0 ? (
            <div
              className="p-2 cursor-pointer font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-700 text-sm"
              onClick={() => setNext((prev) => prev + 10)}
            >
              See more comments...
            </div>
          ) : (
            replyCm.length > 1 && (
              <div
                className="p-2 cursor-pointer font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-700 text-sm"
                onClick={() => setNext(1)}
              >
                Hide comments
              </div>
            )
          )}
        </div>
      </CommentCard>
    </div>
  );
};

export default CommentDisplay;
