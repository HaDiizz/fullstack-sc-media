import React, { useState } from "react";
import { Input, useTheme } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../redux/actions/commentAction";
import IconsModal from '../IconsModal'

const InputComment = ({ children, post, onReply, setOnReply }) => {
  const { isDark } = useTheme();
  const [content, setContent] = useState("");

  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      if (setOnReply) return setOnReply(false);
      return;
    }

    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user,
    };

    dispatch(createComment({ post, newComment, auth, socket }));
    if(setOnReply) return setOnReply(false)
    setContent("");
  };

  return (
    <form className="card-footer comment_input" onSubmit={handleSubmit}>
      {children}
      <Input
        width="100%"
        aria-labelledby="tac"
        clearable
        underlined
        placeholder="Comments..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <IconsModal setContent={setContent} content={content} />
      <button
        type="submit"
        className={`mx-6 py-2 pl-4 pr-4 rounded-lg uppercase text-sm ${
          isDark
            ? "bg-neutral-800 hover:bg-neutral-900"
            : "bg-neutral-100 hover:bg-neutral-50"
        }`}
      >
        Post
      </button>
    </form>
  );
};

export default InputComment;
