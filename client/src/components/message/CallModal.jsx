import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Avatar from "../Avartar";
import { addMessage } from "../../redux/actions/messageAction";
import { useCallback } from "react";
import RingCall from "../../audio/facebook_call.mp3";

const CallModal = () => {
  const { call, auth, peer, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [second, setSecond] = useState(0);
  const [total, setTotal] = useState(0);
  const [answer, setAnswer] = useState(false);
  const youVideo = useRef();
  const otherVideo = useRef();
  const [tracks, setTracks] = useState(null);
  const [newCall, setNewCall] = useState(null);

  useEffect(() => {
    const setTime = () => {
      setTotal((t) => t + 1);
      setTimeout(setTime, 1000);
    };
    setTime();
    return () => setTotal(0);
  }, []);

  useEffect(() => {
    setSecond(total % 60);
    setMins(parseInt(total / 60));
    setHours(parseInt(total / 3600));
  }, [total]);

  const addCallMessage = useCallback(
    (call, times, disconnect) => {
      if (call.recipient !== auth.user._id || disconnect) {
        const msg = {
          sender: call.sender,
          recipient: call.recipient,
          text: "",
          media: [],
          call: { video: call.video, times },
          createdAt: new Date().toISOString(),
        };
        dispatch(addMessage({ msg, auth, socket }));
      }
    },
    [auth, dispatch, socket]
  );

  useEffect(() => {
    if (answer) {
      setTotal(0);
    } else {
      const timer = setTimeout(() => {
        socket.emit("endCall", { ...call, times: 0 });
        addCallMessage(call, 0);
        dispatch({ type: GLOBALTYPES.CALL, payload: null });
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, answer, socket, call, addCallMessage]);

  const handleEndCall = () => {
    if (tracks) {
      tracks.forEach((track) => track.stop());
    }
    if (newCall) newCall.close();
    let times = answer ? total : 0;
    socket.emit("endCall", { ...call, times });

    addCallMessage(call, times);
    dispatch({ type: GLOBALTYPES.CALL, payload: null });
  };

  useEffect(() => {
    socket.on("endCallToClient", (data) => {
      if (tracks) {
        tracks.forEach((track) => track.stop());
      }
      if (newCall) newCall.close();
      addCallMessage(data, data.times);
      dispatch({ type: GLOBALTYPES.CALL, payload: null });
    });
    return () => socket.off("endCallToClient");
  }, [socket, dispatch, tracks, addCallMessage, newCall]);

  const openStream = (video) => {
    const config = { audio: true, video };
    return navigator.mediaDevices.getUserMedia(config);
  };

  const playStream = (tag, stream) => {
    let video = tag;
    video.srcObject = stream;
    video.play();
  };

  const handleAnswer = () => {
    openStream(call.video).then((stream) => {
      playStream(youVideo.current, stream);
      const track = stream.getTracks();
      setTracks(track);
      var newCall = peer.call(call.peerId, stream);
      newCall.on("stream", function (remoteStream) {
        playStream(otherVideo.current, remoteStream);
      });
      setAnswer(true);
      setNewCall(newCall);
    });
  };

  useEffect(() => {
    peer.on("call", (newCall) => {
      openStream(call.video).then((stream) => {
        if (youVideo.current) {
          playStream(youVideo.current, stream);
        }
        const track = stream.getTracks();
        setTracks(track);
        newCall.answer(stream);
        newCall.on("stream", function (remoteStream) {
          if (otherVideo.current) {
            playStream(otherVideo.current, remoteStream);
          }
        });
        setAnswer(true);
        setNewCall(newCall);
      });
    });

    return () => peer.removeListener("call");
  }, [peer, call.video]);

  useEffect(() => {
    socket.on("callerDisconnect", () => {
      if (tracks) {
        tracks.forEach((track) => track.stop());
      }
      if (newCall) newCall.close();
      let times = answer ? total : 0;
      addCallMessage(call, times, true);
      dispatch({ type: GLOBALTYPES.CALL, payload: null });
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: `${call.username} disconnected` },
      });
    });
    return () => socket.off("callerDisconnect");
  }, [socket, call, dispatch, tracks, addCallMessage, answer, total, newCall]);
  // -> 14.00
  const playAudio = (newAudio) => {
    newAudio.play();
  };
  const stopAudio = (newAudio) => {
    newAudio.pause();
    newAudio.currentTime = 0;
  };

  useEffect(() => {
    let newAudio = new Audio(RingCall);
    if (answer) {
      stopAudio(newAudio);
    } else {
      playAudio(newAudio);
    }
    return () => stopAudio(newAudio);
  }, [answer]);

  return (
    <>
      <div className="call_modal">
        <div
          className="call_box"
          style={{
            display: answer && call.video ? "none" : "flex",
          }}
        >
          <div className="text-center" style={{ padding: "20px" }}>
            <Avatar src={call.avatar} size="supper-avatar" />
            <h4>{call.username}</h4>
            <h6>{call.fullname}</h6>
            {answer ? (
              <div style={{ fontSize: "12px" }}>
                <small>
                  <span>
                    {hours.toString().length < 2 ? "0" + hours : hours}
                  </span>
                </small>
                <small>:</small>
                <span>{mins.toString().length < 2 ? "0" + mins : mins}</span>
                <span>:</span>
                <span>
                  {second.toString().length < 2 ? "0" + second : second}
                </span>
              </div>
            ) : (
              <div>
                {call.video ? (
                  <span>calling video...</span>
                ) : (
                  <span>calling audio...</span>
                )}
              </div>
            )}
          </div>
          {!answer && (
            <div className="timer">
              <small>{mins.toString().length < 2 ? "0" + mins : mins}</small>
              <small>:</small>
              <small>
                {second.toString().length < 2 ? "0" + second : second}
              </small>
            </div>
          )}
          <div className="call_menu">
            <span
              className="material-icons text-red-500"
              onClick={handleEndCall}
            >
              call_end
            </span>
            {call.recipient === auth.user._id && !answer && (
              <>
                {call.video ? (
                  <span
                    className="material-icons text-green-500"
                    onClick={handleAnswer}
                  >
                    videocam
                  </span>
                ) : (
                  <span
                    className="material-icons text-green-500"
                    onClick={handleAnswer}
                  >
                    call
                  </span>
                )}
              </>
            )}
          </div>
        </div>
        <div
          className="show_video"
          style={{
            opacity: answer && call.video ? "1" : "0",
          }}
        >
          <video ref={youVideo} className="you_video" playsInline muted />
          <video ref={otherVideo} className="other_video" playsInline />

          <div className="time_video">
            <span>{hours.toString().length < 2 ? "0" + hours : hours}</span>
            <small>:</small>
            <span>{mins.toString().length < 2 ? "0" + mins : mins}</span>
            <span>:</span>
            <span>{second.toString().length < 2 ? "0" + second : second}</span>
          </div>
          <span
            className="material-icons text-red-500 end_call"
            onClick={handleEndCall}
          >
            call_end
          </span>
        </div>
      </div>
    </>
  );
};

export default CallModal;
