import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { getDataAPI } from "../../utils/fetchData";
import { User } from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";
import { getConversations } from "../../../src/redux/actions/messageAction";
import { MESS_TYPES } from "../../../src/redux/actions/messageAction";

const LeftSide = () => {
  const { auth, message, online } = useSelector((state) => state);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { id } = useParams();

  const [search, setSearch] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);

  const pageEnd = useRef();
  const [page, setPage] = useState(0);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!search) return setSearchUsers([]);

    try {
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      setSearchUsers(res.data.users);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

  const handleAddUser = (user) => {
    setSearch("");
    setSearchUsers([]);
    dispatch({
      type: MESS_TYPES.ADD_USER,
      payload: { ...user, text: "", media: [] },
    });
    return navigate(`/message/${user._id}`);
  };

  const isActive = (user) => {
    if (id === user._id) return "bg-gradient-to-r from-cyan-500 to-blue-500";
    return "";
  };

  useEffect(() => {
    if (message.firstLoad) return;
    dispatch(getConversations({ auth }));
  }, [dispatch, auth, message.firstLoad]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );
    observer.observe(pageEnd.current);
  }, [setPage]);

  useEffect(() => {
    if (message.resultUsers >= (page - 1) * 9 && page > 1) {
      dispatch(getConversations({ auth, page }));
    }
  }, [message.resultUsers, page, auth, dispatch]);

  // Check User Online or Offline
  useEffect(() => {
    if (message.firstLoad) {
      dispatch({ type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online });
    }
  }, [message.firstLoad, online, dispatch]);

  const showMsg = (user) => {
    return (
      <>
        <div>{user.text}</div>
        {user.media?.length > 0 && (
          <div>
            {user.media?.length} <i className="fas fa-image" />
          </div>
        )}
        {user.call && (
          <span className="material-icons">
            {user.call.times === 0
              ? user.call.video
                ? "videocam_off"
                : "phone_disabled"
              : user.call.video
              ? "video_camera_front"
              : "call"}
          </span>
        )}
      </>
    );
  };

  return (
    <>
      <form className="message_header" onClick={handleSearch}>
        <input
          type="text"
          value={search}
          placeholder="Enter to Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" id="search" style={{ display: "none" }}>
          Search
        </button>
      </form>

      <div className="message_chat_list pl-3 pt-3">
        {searchUsers.length !== 0 ? (
          <>
            {searchUsers.map((user) => (
              <div
                key={user._id}
                className={`text-left pb-2 pr-[13px]`}
                onClick={() => handleAddUser(user)}
              >
                <div className={`message_user ${isActive(user)}`}>
                  <User
                    src={user.avatar}
                    name={user.fullname}
                    description={user.username}
                  />
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {message.users.map((user) => (
              <div
                key={user._id}
                className={`text-left pb-2 pr-[13px]`}
                onClick={() => handleAddUser(user)}
                style={{ justifyContent: "space-between" }}
              >
                <div
                  className={`message_user w-100 hover:bg-gradient-to-r from-cyan-500 to-blue-500 ${isActive(
                    user
                  )}`}
                >
                  <User
                    src={user.avatar}
                    name={user.fullname}
                    description={true ? showMsg(user) : user.username}
                  />
                  {user.online ? (
                    <i className={`fas fa-circle active pr-2 pt-1`} />
                  ) : auth.user.following.find(
                      (item) => item._id === user._id
                    ) ? (
                    <i className={`fas fa-circle pr-2 pt-1`} />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
          </>
        )}
        <button ref={pageEnd} style={{ opacity: 0 }}>
          Load More
        </button>
      </div>
    </>
  );
};

export default LeftSide;
