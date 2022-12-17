import React from "react";
import Avatar from "./Avartar";

const UserCard = ({
  children,
  user,
  border,
  handleClose,
  setShowFollowers,
  setShowFollowing,
  msg,
}) => {
  return (
    <>
      <Avatar
        src={user.avatar}
        size={"medium-avatar"}
        className="cursor-pointer avatar"
      />
    </>
  );
};

export default UserCard;
