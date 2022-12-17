import React from "react";
import { AiOutlineMore, AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../../redux/actions/commentAction";

const CommentMenu = ({ post, comment, auth, setOnEdit, socket }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (post.user._id === auth.user._id || comment.user._id === auth.user._id) {
      dispatch(deleteComment({ post, auth, comment, socket }));
    }
  };

  const MenuItem = () => {
    return (
      <>
        <div className="dropdown-item flex" onClick={() => setOnEdit(true)}>
          <span className="pr-3 text-violet-500">
            <AiFillEdit />
          </span>
          Edit
        </div>
        <div className="dropdown-item flex" onClick={handleDelete}>
          <span className="pr-3 text-red-500">
            <AiFillDelete />
          </span>
          Delete
        </div>
      </>
    );
  };

  return (
    <div className="menu">
      {(post?.user?._id === auth?.user?._id ||
        comment.user?._id === auth.user?._id) && (
        <div className="nav-item sm:dropleft md:dropdown">
          <AiOutlineMore size={18} data-toggle="dropdown" id="moreLink" />
          <div className="dropdown-menu" aria-labelledby="moreLink">
            {post.user._id === auth.user._id ? (
              comment.user._id === auth.user._id ? (
                MenuItem()
              ) : (
                <div className="dropdown-item flex" onClick={handleDelete}>
                  <span className="pr-3 text-red-500">
                    <AiFillDelete />
                  </span>
                  Delete
                </div>
              )
            ) : (
              comment.user._id === auth.user._id && MenuItem()
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentMenu;
