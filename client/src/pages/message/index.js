import React from "react";
import LeftSide from "../../components/message/LeftSide";

const Message = () => {
  return (
    <div className="message pt-1 flex">
      <div className="col-md-4 border-r border-neutral-600 px-0">
        <LeftSide />
      </div>

      <div className="col-md-8 px-0 right_message">
        <div className="flex justify-center text-center flex-col h-100">
          <i
            className="fab fa-facebook-messenger text-indigo-600 pb-3"
            style={{ fontSize: "5rem" }}
          />
          <h4>Messenger</h4>
        </div>
      </div>
    </div>
  );
};

export default Message;
