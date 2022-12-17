import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, useModal } from "@nextui-org/react";
import { getProfileUsers } from "../../redux/actions/profileAction";
import EditProfile from "./EditProfile";
import FollowBtn from "./FollowBtn";
import { Link } from "react-router-dom";
import Followers from "./Followers";
import Following from "./Following";

const Info = ({ id, auth, profile, dispatch }) => {
  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const { setVisible, bindings } = useModal();

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      const newData = profile.users.filter((user) => user._id === id);
      setUserData([newData[0]]);
    }
  }, [id, auth, dispatch, profile.users]);

  return (
    <div className="info mt-4">
      {userData.map((user, index) => (
        <div className="info_container" key={index}>
          <Avatar
            css={{ size: "170px" }}
            src={user?.avatar}
            color="gradient"
            bordered
          />
          <div className="info_content text-left ml-4 pt-4">
            <div className="info_content_title">
              <h2>{user?.username}</h2>
              {user?._id === auth.user?._id ? (
                <button
                  className="mx-6 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg text-sm uppercase"
                  onClick={() => {
                    setVisible(true);
                    setOnEdit(true);
                  }}
                >
                  Edit Profile
                </button>
              ) : (
                <FollowBtn user={user} />
              )}
            </div>
            {/* <div className="follow_btn pt-2">
              <span className="mr-4" onClick={() => setShowFollowers(true)}>
                {user?.followers.length} Followers
              </span>
              <span className="ml-4" onClick={() => setShowFollowing(true)}>
                {user?.following.length} Following
              </span>
            </div> */}

            <h6 className="pt-2">
              {user?.fullname}{" "}
              <span className="text-indigo-400 pl-2">{user?.mobile}</span>
            </h6>
            <p>{user?.address}</p>
            <h6 className="font-extrabold">{user?.email}</h6>
            <a
              href={"http://" + user?.website}
              target="_blank"
              rel="noreferrer"
              className="text-violet-500"
            >
              {user?.website}
            </a>
            <p className="pb-2">{user?.story}</p>

            <div className="follow_btn pt-2 grid-cols-3 divide-x-2 font-extrabold flex justify-center pr-4">
            <span className="mr-3 pr-3 pl-4 flex justify-center text-center" onClick={() => setShowFollowers(true)}>
              {user?.followers.length} Followers
            </span>
            <span className="ml-3 pl-5 pr-3 justify-center text-center" onClick={() => setShowFollowing(true)}>
              {user?.following.length} Following
            </span>
          </div>
          </div>

          {onEdit && (
            <EditProfile
              setOnEdit={setOnEdit}
              setVisible={setVisible}
              bindings={bindings}
            />
          )}

          {/* {showFollowers && ( */}
            <Followers
              users={user?.followers}
              setShowFollowers={setShowFollowers}
              showFollowers={showFollowers}
              auth={auth}
            />
          {/* )} */}
          {/* {showFollowing && ( */}
            <Following
              users={user?.following}
              setShowFollowing={setShowFollowing}
              showFollowing={showFollowing}
              auth={auth}
            />
          {/* )} */}
        </div>
      ))}
      
    </div>
  );
};

export default Info;
