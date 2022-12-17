import React, { useState, useEffect } from "react";
import {
  Modal,
  Row,
  useTheme,
  Text,
  Input,
  Textarea,
  Spacer,
} from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillCamera } from "react-icons/ai";
import { checkImage } from "../../utils/imageUpload";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { updateProfileUser } from "../../redux/actions/profileAction";

const EditProfile = ({ setVisible, bindings }) => {
  const initState = {
    fullname: "",
    mobile: "",
    address: "",
    website: "",
    story: "",
    gender: "",
  };
  const { isDark } = useTheme();
  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState(initState);
  const { fullname, mobile, address, website, story, gender } = userData;

  const [avatar, setAvatar] = useState("");

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    const err = checkImage(file);
    if (err) {
      setVisible(false);
      return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    }
    setAvatar(file);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfileUser({ userData, avatar, auth }));
    setVisible(false);
  };

  useEffect(() => {
    setUserData(auth.user);
  }, [auth.user]);

  return (
    <>
      <Modal
        blur
        // scroll
        width="800px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        style={{ minHeight: "40rem" }}
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Edit User
          </Text>
        </Modal.Header>
        <Modal.Body>
          <div className="edit_profile">
            <div className="info_avatar">
              <img
                src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
                alt="avatar"
              />
              <span>
                <div className="flex justify-center pt-2">
                  <AiFillCamera />
                </div>
                <p>Change</p>
                <input
                  type="file"
                  name="file"
                  id="file_up"
                  accept="image/*"
                  onChange={changeAvatar}
                />
              </span>
            </div>
          </div>
          {alert.error && (
            <div className="flex justify-center">
              <span className="text-red-500 uppercase text-sm">
                {alert.error}
              </span>
            </div>
          )}
          <Row justify="space-between" className="space-x-10">
            <Input
              aria-labelledby="tac"
              helperColor="error"
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="FullName"
              id="fullname"
              name="fullname"
              value={fullname}
              onChange={handleInput}
              contentRight={
                <Text
                  size={13}
                  color={fullname.length > 20 ? "error" : "success"}
                >
                  {fullname.length}/20
                </Text>
              }
            />
            <Input
              aria-labelledby="tac"
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Mobile"
              id="mobile"
              name="mobile"
              value={mobile}
              onChange={handleInput}
            />
          </Row>
          <Input
            aria-labelledby="tac"
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Address"
            id="address"
            name="address"
            value={address}
            onChange={handleInput}
          />
          <Input
            aria-labelledby="tac"
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Website (www.example.com)"
            id="website"
            name="website"
            value={website}
            onChange={handleInput}
          />
          <Textarea
            aria-labelledby="tac"
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Story"
            helperColor={story.length > 200 ? "error" : "success"}
            helperText={`${story.length}/200`}
            id="story"
            name="story"
            value={story}
            onChange={handleInput}
          />
          <div className="input-group-prepend px-0 mb-4 pt-3">
            <select
              name="gender"
              id="gender"
              value={gender}
              className={`custom-select capitalize ${
                isDark ? "text-white bg-neutral-900 border-neutral-800" : ""
              }`}
              onChange={handleInput}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Row justify="space-between" className="space-x-8">
            <button
              className="px-5 py-2 rounded text-white bg-red-600 hover:bg-red-500 uppercase"
              onClick={() => setVisible(false)}
            >
              Close
            </button>
            <button
              className="px-5 py-2 rounded text-white bg-violet-600 hover:bg-violet-500 uppercase"
              onClick={handleSubmit}
            >
              Save
            </button>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditProfile;
