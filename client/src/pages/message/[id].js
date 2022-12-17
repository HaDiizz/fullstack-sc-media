import React from "react";
import LeftSide from "../../components/message/LeftSide";
import RightSide from "../../components/message/RightSide";

const Conversation = () => {
  return (
    <div className="message pt-3 flex">
      <div className="col-md-4 border-r border-neutral-600 px-0 left_message">
        <LeftSide />
      </div>

      <div className="col-md-8 px-0">
        <RightSide />
      </div>
    </div>
  );
};

export default Conversation;
