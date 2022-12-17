import React, { useState } from "react";
import { Switch, useTheme } from "@nextui-org/react";
import { SunIcon } from "./SunIcon";
import { MoonIcon } from "./MoonIcon";
import useDarkMode from "use-dark-mode";
import SearchModal from "./SearchModal";
import { useSelector, useDispatch } from "react-redux";
import { Badge as BD, Tooltip, Loading, Row, Grid } from "@nextui-org/react";
import Avatar from "./Avartar";
import { getSuggestions } from "../redux/actions/suggestionsAction";
import UserTooltipCard from "./UserTooltipCard";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isClick, setIsClick] = useState(false);
  const darkMode = useDarkMode(false);
  const { isDark } = useTheme();
  const { auth, suggestions } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleToggle = () => setIsClick((value) => !value);

  return (
    <>
      <nav
        className={`sidebar ${isClick ? "" : "close"}  ${
          isDark ? "bg-neutral-900" : "bg-slate-100"
        }`}
      >
        <header>
          <i
            className="bx bx-chevron-right toggle"
            onClick={() => handleToggle()}
          />
        </header>
        <div className="menu-bar pt-4">
          <div className="menu">
            <li className="menu-links">
              <Link
                to={`/profile/${auth.user._id}`}
                className="cursor-pointer pl-[14px]"
              >
                <BD
                  content=""
                  color="success"
                  placement="bottom-right"
                  shape="circle"
                  variant="dot"
                  size="md"
                >
                  <Avatar
                    src={auth.user.avatar}
                    size={"medium-avatar"}
                    className="cursor-pointer avatar"
                  />
                </BD>
                <span className="text nav-text pl-3">{auth.user.fullname}</span>
              </Link>
            </li>
            <SearchModal setIsClick={setIsClick} />

            <li className="search-box flex justify-center bg-transparent">
              <div className="cursor-pointer pt-3">
                {!suggestions.loading && (
                  <i
                    className="bx bx-redo icon cursor-pointer"
                    onClick={() => dispatch(getSuggestions(auth.token))}
                  />
                )}
                {/* <span className="text nav-text">Suggestion</span> */}
              </div>
            </li>

            {/* <li className="search-box bg-transparent flex justify-center">
              <a href="#" className="cursor-pointer text-black">
                <i className="bx bx-redo icon" />
                <span className="text nav-text">Suggestion</span>
              </a>
            </li> */}

            {suggestions.loading ? (
              <Loading type="points-opacity" />
            ) : (
              <div className="suggestions">
                {suggestions.users.map((user) => (
                  <li className="menu-links" key={user._id}>
                    <a href="#!" className="cursor-pointer pl-[14px]">
                      <Tooltip
                        content={<UserTooltipCard user={user} />}
                        rounded
                        // color="primary"
                        placement="right"
                      >
                        <Avatar
                          src={user.avatar}
                          size={"medium-avatar"}
                          className="cursor-pointer avatar"
                        />
                        {/* <UserCard user={user}> */}
                        {/* <span className="pl-1 text nav-text">
                        <FollowBtn user={user} />
                      </span> */}
                        {/* </UserCard> */}
                        <Grid.Container>
                          <Row justify="space-between" className="pl-3 pr-3">
                            <span className="pl-1 text nav-text">
                              {user.fullname}
                            </span>
                            {/* <span className="pl-1 text nav-text">
                            {user.followers.length}
                          </span> */}
                          </Row>
                        </Grid.Container>

                        {/* <span className="pl-1 text nav-text">
                        <FollowBtn user={user} />
                      </span> */}
                      </Tooltip>
                    </a>
                  </li>
                ))}
              </div>
            )}
          </div>
          {/* <div className="bottom-content border-t-2 pt-2">
            <li className="mode">
              <div className="sun-moon">
                {isDark ? (
                  <i className="bx bx-moon icon moon text nav-text" />
                ) : (
                  <i className="bx bx-sun icon text nav-text" />
                )}
              </div>
              <span className="mode-text text">
                {isDark ? "Dark " : "Light "}mode
              </span>
              <div className="toggle-switch">
                <Switch
                  checked={darkMode.value}
                  onChange={() => darkMode.toggle()}
                  size="xs"
                  iconOn={<SunIcon filled className="text-white" />}
                  iconOff={<MoonIcon filled />}
                />
              </div>
            </li>
          </div> */}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
