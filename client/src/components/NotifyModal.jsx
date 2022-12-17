import React from "react";
import {
  Modal,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  Avatar,
} from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { isReadNotify, NOTIFY_TYPES, deleteAllNotifies } from "../redux/actions/notifyAction";

const NotifyModal = ({ isDisplay, setIsDisplay }) => {
  const { auth, notify } = useSelector((state) => state);
  const dispatch = useDispatch();

  const closeHandler = () => {
    setIsDisplay(false);
    // console.log("closed");
  };

  const handleIsRead = (msg) => {
    setIsDisplay(false);
    dispatch(isReadNotify({ msg, auth }));
  };

  const handleSound = () => {
    dispatch({ type: NOTIFY_TYPES.UPDATE_SOUND, payload: !notify.sound });
  };

  const handleDeleteAll = () => {
    const newArr = notify.data.filter(item => item.isRead === false)
    if(newArr.length === 0) return dispatch(deleteAllNotifies(auth.token))

    if(window.confirm(`You have ${newArr.length} unread notices, Are you sure to delete all ?`)) {
      return dispatch(deleteAllNotifies(auth.token))
    }
  }

  return (
    <>
      <Modal
        scroll
        width="600px"
        blur
        style={{ minHeight: "30rem" }}
        closeButton
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={isDisplay}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" b size={18}>
            NOTIFICATION
            <Text b size={18} className="pl-3 cursor-pointer">
              {notify.sound ? (
                <i className="fas fa-bell text-red-500" onClick={handleSound} />
              ) : (
                <i
                  className="fas fa-bell-slash text-red-500"
                  onClick={handleSound}
                />
              )}
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          {notify.data.length === 0 && "No Notify"}

          <div 
          // style={{ maxHeight: "calc(100vh - 200px", overflow: "auto" }}
          >
            {notify.data.map((msg, index) => (
              <div key={index} className="px-2 mb-3">
                <Link
                  to={`${msg.url}`}
                  className="flex justify-center text-left"
                  onClick={() => handleIsRead(msg)}
                >
                  <Avatar size={"md"} src={msg.user.avatar} />

                  <div className="mx-2 flex-fill">
                    <div>
                      <strong className="mr-1">{msg.user.username}</strong>
                      <span>{msg.text}</span>
                    </div>
                    {msg.content && (
                      <small>{msg.content.slice(0, 20)}...</small>
                    )}
                  </div>
                  <div>{msg.image && <Avatar src={msg.image} size="md" />}</div>
                </Link>
                <small
                  className="text-muted flex pt-1"
                  style={{ justifyContent: "space-between" }}
                >
                  {moment(msg.createdAt).fromNow()}
                  {!msg.isRead && (
                    <i className="fas fa-circle text-indigo-500" />
                  )}
                </small>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="text-right text-red-500 mr-2 text-md" onClick={handleDeleteAll}>Delete All</div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NotifyModal;
