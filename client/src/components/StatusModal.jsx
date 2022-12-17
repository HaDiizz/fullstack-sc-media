import React, { useState, useEffect, useRef } from "react";
import { Modal, Text } from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { createPost, updatePost } from "../redux/actions/postAction";
import Icons from "./Icons";
import { videoShow, imageShow } from "../utils/mediaDisplay";

const StatusModal = () => {
  const { status, auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [stream, setStream] = useState(false);

  const videoRef = useRef();
  const canvasRef = useRef();
  const [tracks, setTracks] = useState("");

  const handleChangeImages = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newImages = [];

    files.forEach((file) => {
      if (!file) return (err = "File does not exist");
      if (file.size > 1024 * 1024) {
        return (err = "File largest is 5 MB (image/video)");
      }

      return newImages.push(file);
    });
    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setImages([...images, ...newImages]);
  };

  const deleteImages = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleStream = () => {
    setStream(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
          const track = mediaStream.getTracks();
          setTracks(track[0]);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCapture = () => {
    const width = videoRef.current.clientWidth;
    const height = videoRef.current.clientHeight;

    canvasRef.current.setAttribute("width", width);
    canvasRef.current.setAttribute("height", height);
    const ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, width, height);
    let URL = canvasRef.current.toDataURL();
    setImages([...images, { camera: URL }]);
  };

  const handleStopStream = () => {
    tracks.stop();
    setStream(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length === 0) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Please add your photo" },
      });

      return dispatch({ type: GLOBALTYPES.STATUS, payload: false });
    }

    if (status.onEdit) {
      dispatch(updatePost({ content, images, auth, status }));
    } else {
      dispatch(createPost({ content, images, auth, socket }));
    }

    setContent("");
    setImages([]);
    if (tracks) tracks.stop();
    dispatch({ type: GLOBALTYPES.STATUS, payload: false });
  };

  // const closeHandler = () => {
  //   setVisible(false);
  //   console.log("closed");
  // };

  useEffect(() => {
    if (status.onEdit) {
      setContent(status.content);
      setImages(status.images);
    }
  }, [status]);

  return (
    <>
      <Modal
        width="600px"
        closeButton
        style={{ minHeight: "20rem" }}
        blur
        aria-labelledby="modal-title"
        open={status}
        onClose={() => {
          setContent("");
          setImages([]);
          dispatch({ type: GLOBALTYPES.STATUS, payload: false });
        }}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Create Post
          </Text>
        </Modal.Header>
        <Modal.Body>
          <div className="status_body pt-5 pb-5">
            <textarea
              name="content"
              cols={40}
              placeholder={`${auth.user.username}, What are you thinking?`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="flex">
              <div className="flex-fill"></div>
              <Icons setContent={setContent} content={content} />
            </div>

            <div className="show_images">
              {images.map((img, index) => (
                <div key={index} id="file_img">
                  {/* <img
                    src={img.camera ? img.camera : img.url ? img.url : URL.createObjectURL(img)}
                    alt="images"
                    className=""
                  /> */}
                  {img.camera ? (
                    imageShow(img.camera)
                  ) : img.url ? (
                    <>
                      {img.url.match(/video/i)
                        ? videoShow(img.url)
                        : imageShow(img.url)}
                    </>
                  ) : (
                    <>
                      {img.type.match(/video/i)
                        ? videoShow(URL.createObjectURL(img))
                        : imageShow(URL.createObjectURL(img))}
                    </>
                  )}
                  <span onClick={() => deleteImages(index)}>&times;</span>
                </div>
              ))}
            </div>

            {stream && (
              <div className="stream relative">
                <video
                  autoPlay
                  muted
                  ref={videoRef}
                  width="100%"
                  height="100%"
                />
                <span onClick={handleStopStream}>&times;</span>
                <canvas ref={canvasRef} style={{ display: "none" }} />
              </div>
            )}

            <div className="input_images pt-3">
              {stream ? (
                <i className="fas fa-camera" onClick={handleCapture}></i>
              ) : (
                <>
                  <i className="fas fa-camera" onClick={handleStream}></i>
                  <div className="file_upload">
                    <i className="fas fa-image" />
                    <input
                      type="file"
                      name="file"
                      id="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={handleChangeImages}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-danger"
            onClick={() => {
              setContent("");
              setImages([]);
              dispatch({ type: GLOBALTYPES.STATUS, payload: false });
            }}
          >
            Close
          </button>
          <button className="btn btn-dark" onClick={handleSubmit}>
            Post
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StatusModal;
