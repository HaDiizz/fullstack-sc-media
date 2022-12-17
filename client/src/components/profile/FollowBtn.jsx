import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RiUserHeartFill } from "react-icons/ri";
import { follow, unfollow } from "../../redux/actions/profileAction";

const FollowBtn = ({ user }) => {
  const [followed, setFollowed] = useState(false);
  const { auth, profile, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth.user.following.find((item) => item?._id === user?._id)) {
      setFollowed(true);
    }
    return () => setFollowed(false);
  }, [auth.user.following, user?._id]);

  const handleFollow = async () => {
    if (loading) return;
    setFollowed(true);
    setLoading(true);
    await dispatch(follow({ users: profile.users, user, auth, socket }));
    setLoading(false);
  };

  const handleUnfollow = async () => {
    if (loading) return;
    setFollowed(false);
    setLoading(true);
    await dispatch(unfollow({ users: profile.users, user, auth, socket }));
    setLoading(false);
  };

  return (
    <>
      {followed ? (
        <button
          className="mx-5 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-sm uppercase flex justify-center pl-2 pr-2 hover:bg-black text-white outline outline-1 outline-sky-200"
          onClick={handleUnfollow}
        >
          Unfollow <RiUserHeartFill size={18} className="text-red-200" />
        </button>
      ) : (
        <button
          className="mx-5 py-2 bg-transparent outline outline-1 outline-indigo-500 hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white rounded-lg text-sm uppercase pl-2 pr-2 hover:outline hover:outline-sky-200"
          onClick={handleFollow}
        >
          Follow
        </button>
      )}
    </>
  );
};

export default FollowBtn;
