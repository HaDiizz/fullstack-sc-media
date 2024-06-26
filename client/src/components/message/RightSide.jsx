import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { User } from "@nextui-org/react";
import { useParams, useNavigate } from "react-router-dom";
import MsgDisplay from "./MsgDisplay";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { imageShow, videoShow } from "../../utils/mediaDisplay";
import IconsModal from "../IconsModal";
import { imageUpload } from "../../utils/imageUpload";
import {
  addMessage,
  getMessages,
  loadMoreMessages,
  deleteConversation,
} from "../../redux/actions/messageAction";
import { Loading } from "@nextui-org/react";

const RightSide = () => {
  const { auth, message, socket, peer } = useSelector((state) => state);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [text, setText] = useState("");
  const [media, setMedia] = useState([]);
  const [loadMedia, setLoadMedia] = useState(false);
  const [data, setData] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(0);
  const [isLoadMore, setIsLoadMore] = useState(0);

  const refDisplay = useRef();
  const pageEnd = useRef();

  useEffect(() => {
    const newData = message.data.find((item) => item._id === id);
    if (newData) {
      setData(newData.messages);
      setResult(newData.result);
      setPage(newData.page);
    }
  }, [message.data, id]);

  useEffect(() => {
    if (id && message.users.length > 0) {
      setTimeout(() => {
        refDisplay.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 50);
      const newUser = message.users.find((user) => user._id === id);
      if (newUser) {
        setUser(newUser);
      }
    }
  }, [message.users, id]);

  const handleChangeUpload = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newMedia = [];

    files.forEach((file) => {
      if (!file) return (err = "File does not exist");
      if (file.size > 1024 * 1024) {
        return (err = "File largest is 5 MB (image/video)");
      }

      return newMedia.push(file);
    });
    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setMedia([...media, ...newMedia]);
  };

  const handleDeleteMedia = (index) => {
    const newArr = [...media];
    newArr.splice(index, 1);
    setMedia(newArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && media.length === 0) return;
    setText("");
    setMedia([]);
    setLoadMedia(true);

    let newArr = [];
    if (media.length > 0) newArr = await imageUpload(media);

    const msg = {
      sender: auth.user._id,
      recipient: id,
      text,
      media: newArr,
      createdAt: new Date().toISOString(),
    };

    setLoadMedia(false);
    await dispatch(addMessage({ msg, auth, socket }));
    if (refDisplay.current) {
      refDisplay.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  useEffect(() => {
    const getMessagesData = async () => {
      if (message.data.every((item) => item._id !== id)) {
        await dispatch(getMessages({ auth, id }));
        setTimeout(() => {
          refDisplay.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }, 50);
      }
    };
    getMessagesData();
  }, [id, dispatch, auth, message.data]);

  // Load More
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoadMore((p) => p + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );
    observer.observe(pageEnd.current);
  }, [setIsLoadMore]);

  useEffect(() => {
    if (isLoadMore > 1) {
      if (result >= page * 9) {
        dispatch(loadMoreMessages({ auth, id, page: page + 1 }));
        setIsLoadMore(1);
      }
    }
    // eslint-disable-next-line
  }, [isLoadMore]);

  const handleDeleteConversation = () => {
    if (window.confirm("Do you want to delete?")) {
      dispatch(deleteConversation({ auth, id }));
      return navigate("/message");
    }
  };

  const caller = ({ video }) => {
    const { _id, avatar, username, fullname } = user;
    const msg = {
      sender: auth.user._id,
      recipient: _id,
      avatar,
      username,
      fullname,
      video,
    };
    dispatch({ type: GLOBALTYPES.CALL, payload: msg });
  };

  const callUser = ({ video }) => {
    const { _id, avatar, username, fullname } = auth.user;
    const msg = {
      sender: _id,
      recipient: user._id,
      avatar,
      username,
      fullname,
      video,
    };
    if (peer.open) msg.peerId = peer._id;
    socket.emit("callUser", msg);
  };

  const handleAudioCall = () => {
    caller({ video: false });
    callUser({ video: false });
  };

  const handleVideoCall = () => {
    caller({ video: true });
    callUser({ video: true });
  };

  return (
    <>
      <div className="message_header" style={{ cursor: "pointer" }}>
        {user.length !== 0 && (
          <User
            className="message_user"
            src={user.avatar}
            name={
              user?.fullname.length > 8
                ? user?.fullname?.substr(0, 8) + "..."
                : user?.fullname
            }
            description={user.username}
          />
        )}
        <div>
          <i className="fas fa-phone-alt" onClick={handleAudioCall} />
          <i className="fas fa-video mx-3" onClick={handleVideoCall} />
          <i
            className="fas fa-trash text-red-500"
            onClick={handleDeleteConversation}
          />
        </div>
      </div>
      <div
        className="chat_container"
        style={{ height: media.length > 0 ? "calc(100% - 180px)" : "" }}
      >
        <div className="chat_display text-left" ref={refDisplay}>
          <button style={{ marginTop: "-25px", opacity: 0 }} ref={pageEnd}>
            Load more
          </button>
          {data.map((msg, index) => (
            <div key={index}>
              {msg.sender !== auth.user._id && (
                <div className="chat_row other_message pt-3">
                  <MsgDisplay user={user} msg={msg} />
                </div>
              )}

              {msg.sender === auth.user._id && (
                <div className="chat_row you_message">
                  <MsgDisplay user={auth.user} msg={msg} data={data} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {loadMedia && (
        <div className="chat_row you_message">
          <Loading type="points" />
        </div>
      )}

      <div
        className="show_media"
        style={{ display: media.length > 0 ? "grid" : "none" }}
      >
        {media.map((item, index) => (
          <div key={index} id={"file_media"}>
            {item.type.match(/video/i)
              ? videoShow(URL.createObjectURL(item))
              : imageShow(URL.createObjectURL(item))}
            <span onClick={() => handleDeleteMedia(index)}>x</span>
          </div>
        ))}
      </div>

      <form className="chat_input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <IconsModal setContent={setText} content={text} />

        <div className="file_upload">
          <i className="fas fa-image text-success" />
          <input
            type="file"
            name="file"
            id="file"
            multiple
            accept="image/*,video/*"
            onChange={handleChangeUpload}
          />
        </div>

        <button
          type="submit"
          className="material-icons"
          disabled={text || media.length > 0 ? false : true}
        >
          near_me
        </button>
      </form>
    </>
  );
};

export default RightSide;
