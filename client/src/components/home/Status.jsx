import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, useTheme } from "@nextui-org/react";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const Status = () => {
  const { auth } = useSelector((state) => state);
  const { isDark } = useTheme();
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center pt-3">
      <div className="status my-3 col-md-6 flex">
        <Avatar size="lg" src={auth.user.avatar} color="secondary" bordered />
        <button
          className={`statusBtn flex-fill text-sm ${
            isDark
              ? "bg-neutral-800 hover:bg-neutral-900"
              : "bg-neutral-100 hover:bg-neutral-50"
          }`}
          onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}
        >
          {auth.user.username}, What are you thinking?
        </button>
      </div>
    </div>
  );
};

export default Status;
