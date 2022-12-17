import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../utils/fetchData";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { Link } from "react-router-dom";
import {
  Modal,
  Input,
  Row,
  Checkbox,
  Button,
  Text,
  useModal,
  Col,
  Grid,
  User,
  Loading,
} from "@nextui-org/react";
import FollowBtn from "./profile/FollowBtn";

const SearchModal = ({ setIsClick }) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { setVisible, bindings } = useModal();

  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   // setIsClick(true);
  //   setLoading(true);
  //   if (!search) return;
  //   // setVisible(true);
  //   try {
  //     const res = await getDataAPI(`search?username=${search}`, auth.token);
  //     setUsers(res.data.users);
  //     setLoading(false);
  //   } catch (err) {
  //     dispatch({
  //       type: GLOBALTYPES.ALERT,
  //       payload: { error: err.response.data.msg },
  //     });
  //   }
  // };

  useEffect(() => {
    setLoading(true);
    if (!search) return;
    // setVisible(true);
    try {
      getDataAPI(`search?username=${search}`, auth.token).then((res) => {
        setUsers(res.data.users);
        setLoading(false);
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  }, [search]);

  const handleClose = () => {
    setVisible(false);
    setSearch("");
    setUsers([]);
  };

  const handleOpenModal = () => {
    setVisible(true);
  };

  return (
    <>
      <>
        {/* <form onClick={handleSearch}>
        <li className="search-box">
          <i className="bx bx-search icon" />
          <input
            type="text"
            placeholder="Search..."
            name="search"
            value={search}
            id="search"
            onChange={(e) =>
              setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
            }
          />
        </li>
        <button type="submit" style={{ display: "none" }}>
          Search
        </button>
      </form> */}
      </>

      <li className="search-box flex justify-center" onClick={handleOpenModal}>
        <i className="bx bx-search icon" />
      </li>

      <Modal
        blur
        scroll
        width="600px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        style={{ minHeight: "20rem" }}
        {...bindings}
        onClose={handleClose}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            User List
          </Text>
        </Modal.Header>
        <Modal.Body>
          {/* <form */}
          {/* // onClick={handleSearch} */}
          {/* > */}
          <Input
            aria-labelledby="tac"
            clearable
            width="100%"
            type="text"
            placeholder="Search..."
            name="search"
            value={search}
            id="search"
            contentRight={<i className="bx bx-search icon" />}
            onChange={(e) =>
              setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
            }
          />
          {/* <button type="submit" style={{ display: "none" }}>
              Search
            </button> */}
          {/* </form> */}
          <div id="modal-description">
            {search && users.length > 0
              ? users.map((user) => (
                  <div className="col-md-12" key={user._id}>
                    <Row className="space-x-10 pb-4" justify="space-between">
                      <User src={user.avatar} name={user.username}>
                        <Link to={`/profile/${user._id}`} onClick={handleClose}>
                          {user.fullname}
                        </Link>
                      </User>
                      {auth.user._id !== user._id && <FollowBtn user={user} />}
                    </Row>
                  </div>
                ))
              : search !== "" &&
                !loading && (
                  <h3 className="pt-4 tracking-widest uppercase">
                    user Not found
                  </h3>
                )}
            {loading && search !== "" && (
              <div className="text-center pt-[5rem]">
                <Loading type="points" />
                <p className="pt-2 tracking-widest uppercase">Searching...</p>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-dark" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SearchModal;
