import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTheme, Text, User, Tooltip, Popover } from "@nextui-org/react";
import moment from "moment";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiFillEdit, AiFillDelete, AiOutlineCopy } from "react-icons/ai";
import { GLOBALTYPES } from "../../../redux/actions/globalTypes";
import { deletePost } from "../../../redux/actions/postAction";
import { BASE_URL } from "../../../utils/config";
import DeletePost from "../../DeletePost";

const PostHeader = ({ post }) => {
  const { auth, socket } = useSelector((state) => state);
  const { isDark } = useTheme();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleEdit = () => {
    dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } });
  };

  const handleDeletePost = () => {
    // if (window.confirm("Are you sure?")) {
    // }
    dispatch(deletePost({ post, auth, socket }));
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: "Deleted Post Successfully" },
    });
    return navigate("/");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: "Copied to clipboard" },
    });
  };

  return (
    <div className="flex justify-between pt-3">
      <div className="flex">
        <User src={post?.user?.avatar} name={post?.user?.fullname}>
          <div className="flex">
            <Link to={`/profile/${post?.user?._id}`}>
              @{post?.user?.username}
            </Link>
            <Text className="pl-4 text-muted" size={"90%"}>
              {moment(post?.createdAt).fromNow()}
            </Text>
          </div>
        </User>
      </div>
      <div className="nav-item dropstart">
        <FiMoreHorizontal size={25} data-toggle="dropdown" />
        <div className={`dropdown-menu ${isDark ? "bg-neutral-800" : ""}`}>
          {auth.user?._id === post?.user?._id && (
            <>
              <div
                className={`dropdown-item flex ${
                  isDark ? "text-white hover:bg-neutral-700" : ""
                }`}
                onClick={handleEdit}
              >
                <span className="mr-3 text-violet-500">
                  <AiFillEdit size={20} />
                </span>{" "}
                Edit Post
              </div>
              <Popover placement="top-left">
                <Popover.Trigger>
                  <div
                    className={`dropdown-item flex ${
                      isDark ? "text-white hover:bg-neutral-700" : ""
                    }`}
                    // onClick={handleDeletePost}
                  >
                    <span className="mr-3 text-red-500">
                      <AiFillDelete size={20} />
                    </span>{" "}
                    Delete Post
                  </div>
                </Popover.Trigger>
                <Popover.Content>
                  <DeletePost handleDeletePost={handleDeletePost} />
                </Popover.Content>
              </Popover>
            </>
          )}
          <div
            className={`dropdown-item flex ${
              isDark ? "text-white hover:bg-neutral-700" : ""
            }`}
            onClick={handleCopyLink}
          >
            <span className="mr-3 text-indigo-500">
              <AiOutlineCopy size={20} />
            </span>{" "}
            Copy Link
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
