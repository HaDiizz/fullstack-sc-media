import React, { useState } from "react";
import {
  Dropdown,
  useTheme,
  Avatar,
  Tooltip,
  User,
  Switch,
  Row,
} from "@nextui-org/react";
import { RiGlobalFill } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import { RiMessengerLine } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
import Badge from "@mui/material/Badge";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authAction";
import NotifyModal from "./NotifyModal";
import useDarkMode from "use-dark-mode";
import { SunIcon } from "./SunIcon";
import { MoonIcon } from "./MoonIcon";

const Header = () => {
  const darkMode = useDarkMode(false);
  const { isDark } = useTheme();
  const [isDisplay, setIsDisplay] = useState(false);

  const { auth, notify } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const isActive = (pn) => {
    if (pn === pathname) return "text-indigo-500";
  };

  return (
    <>
      <div
        className={`actives header fixed-top ${
          isDark ? "bg-neutral-900" : "bg-white border-b-2 border-slate-100"
        }`}
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <div
          className="header_icons"
          style={{ justifyContent: "space-between" }}
        >
          <div className="pt-4 flex text-center">
            <ul className="flex justify-center space-x-10 cursor-pointer">
              <Tooltip content="Home" color="secondary" placement="bottom">
                <li className="hover:animate-bounce">
                  <Link to="/" className={`${isActive("/")}`}>
                    <AiFillHome size={25} />
                  </Link>
                </li>
              </Tooltip>
              <Tooltip content="Global" color="secondary" placement="bottom">
                <li className="hover:animate-bounce">
                  <Link to="/discover" className={`${isActive("/discover")}`}>
                    <RiGlobalFill size={25} />
                  </Link>
                </li>
              </Tooltip>
              <Tooltip content="Message" color="secondary" placement="bottom">
                <li className="hover:animate-bounce">
                  <Link to="/message" className={`${isActive("/message")}`}>
                    <RiMessengerLine size={25} />
                  </Link>
                </li>
              </Tooltip>
              <Tooltip
                content="Notification"
                color="secondary"
                placement="bottom"
              >
                <div
                  className="hover:animate-bounce pr-4"
                  onClick={() => setIsDisplay((prev) => !prev)}
                >
                  <Badge
                    color="secondary"
                    variant="dot"
                    invisible={
                      notify.data.length > 0
                        ? notify.data.every((el) => el.isRead === true)
                          ? true
                          : false
                        : true
                    }
                  >
                    <Link to="#">
                      <IoIosNotificationsOutline size={25} />
                    </Link>
                  </Badge>
                </div>
              </Tooltip>
              <NotifyModal setIsDisplay={setIsDisplay} isDisplay={isDisplay} />
            </ul>
          </div>
          <div className="pr-3 absolute right-0">
            <Dropdown placement="left">
              <Dropdown.Trigger>
                <Avatar
                  bordered
                  size="md"
                  as="button"
                  color="secondary"
                  src={auth.user.avatar}
                />
              </Dropdown.Trigger>
              <Dropdown.Menu color="primary" aria-label="User Actions">
                <Dropdown.Item key="self" css={{ height: "$18" }} textValue>
                  <User
                    src={auth.user.avatar}
                    name={auth.user.username}
                    description={auth.user.fullname}
                  />
                </Dropdown.Item>
                <Dropdown.Item
                  key="profile"
                  withDivider
                  textValue
                  className="pb-1"
                  css={{ height: "$15" }}
                >
                  <Link
                    to={`/profile/${auth.user._id}`}
                    className={`${isDark ? "text-white" : "text-black"}`}
                  >
                    <div className="pt-2">Profile</div>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item
                  key="mode"
                  css={{ height: "$15" }}
                  textValue
                  className="pt-1"
                >
                  <Row justify="space-between">
                    <span
                      className={`mode-text text ${
                        isDark ? "text-white" : "text-black"
                      }`}
                    >
                      {isDark ? "Dark " : "Light "}mode
                    </span>
                    <div className="toggle-switch">
                      <Switch
                        checked={darkMode.value}
                        onChange={() => darkMode.toggle()}
                        size="md"
                        iconOn={<SunIcon filled className="text-white" />}
                        iconOff={<MoonIcon filled />}
                      />
                    </div>
                  </Row>
                </Dropdown.Item>
                <Dropdown.Item key="logout" color="error" withDivider textValue>
                  <Link
                    to="/"
                    className="text-red-500 hover:text-red-400"
                    onClick={() => dispatch(logout())}
                  >
                    <div className="pt-2">Logout</div>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
