import React, { useEffect, useState } from "react";
import Info from "../../components/profile/Info";
import Posts from "../../components/profile/Posts";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "@nextui-org/react";
import { getProfileUsers } from "../../redux/actions/profileAction";
import { useParams } from "react-router-dom";
import Saved from "../../components/profile/Saved";

const Profile = () => {
  const { profile, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [saveTab, setSaveTab] = useState(false)

  useEffect(() => {
    if (profile.ids.every((item) => item !== id))
      dispatch(getProfileUsers({ id, auth }));
  }, [id, profile.users, auth, dispatch, profile.ids]);

  return (
    <div className="pt-5 profile p-2">
      <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />
      {
        auth.user._id === id &&
        <div className="profile_tab pt-3 pb-3">
          <button className={saveTab ? '' : 'active'} onClick={() => setSaveTab(false)}>Post</button>
          <button className={saveTab ? 'active' : ''} onClick={() => setSaveTab(true)}>Saved</button>
        </div>
      }

      {profile.loading ? (
        <div className="flex justify-center text-center pt-[15rem]">
          <Loading type="points" />
        </div>
      ) : (
        <>
          {
            saveTab ?
            <Saved auth={auth} dispatch={dispatch} />
            :
            <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
          }
        </>
      )}
    </div>
  );
};

export default Profile;
