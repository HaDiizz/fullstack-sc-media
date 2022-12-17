import React, { useState } from "react";
import { Modal, User, Row, Text } from "@nextui-org/react";
import { Link } from "react-router-dom";
import FollowBtn from "./FollowBtn";

const Followers = ({ users, setShowFollowers, showFollowers, auth }) => {
  const closeHandler = () => {
    setShowFollowers(false);
  };

  return (
    <>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        style={{ minHeight: "20rem" }}
        open={showFollowers}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Followers
          </Text>
        </Modal.Header>
        <Modal.Body>
          <div id="modal-description">
            {users && users.length > 0 ? (
              users.map((user) => (
                <div className="col-md-12" key={user._id}>
                  <Row className="space-x-10 pb-4" justify="space-between">
                    <User src={user.avatar} name={user.username}>
                      <Link to={`/profile/${user._id}`} onClick={closeHandler}>
                        {user.fullname}
                      </Link>
                    </User>
                    {
                        auth.user._id !== user._id &&
                        <FollowBtn user={user} />
                    }
                  </Row>
                </div>
              ))
            ) : (
              <h3 className="pt-[4.5rem] tracking-widest uppercase">
                No Follower
              </h3>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-dark" onClick={closeHandler}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Followers;
