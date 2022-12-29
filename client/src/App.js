import React, { useEffect } from "react";
import "./App.css";
import "../../client/src/styles/global.css";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import useDarkMode from "use-dark-mode";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageRender from "./customRouter/PageRender";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Alert from "./components/alert/Alert";
import { useSelector, useDispatch } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import StatusModal from "./components/StatusModal";
import { getPosts } from "./redux/actions/postAction";
import { getSuggestions } from "./redux/actions/suggestionsAction";
import io from "socket.io-client";
import { GLOBALTYPES } from "./redux/actions/globalTypes";
import SocketClient from "./SocketClient";
import { getNotifies } from "./redux/actions/notifyAction";
import CallModal from "./components/message/CallModal";
import Peer from "peerjs";

const darkTheme = createTheme({
  type: "dark", // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      primaryLight: "$purple200",
      primaryLightHover: "$purple300",
      primaryLightActive: "$purple400",
      primaryLightContrast: "$purple600",
      primary: "#7c3aed",
      primaryBorder: "$purple500",
      primaryBorderHover: "$purple600",
      primarySolidHover: "$purple700",
      primarySolidContrast: "$white",
      primaryShadow: "$purple500",

      gradient:
        "linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)",
      link: "#5E1DAD",

      // you can also create your own color
      myColor: "#ff4ecd",

      // ...  more colors
    },
    space: {},
    fonts: {},
  },
});

const lightTheme = createTheme({
  type: "light",
  theme: {
    colors: {
      // brand colors
      primaryLight: "$green200",
      primaryLightHover: "$green300",
      primaryLightActive: "$green400",
      primaryLightContrast: "$green600",
      primary: "#4ADE7B",
      primaryBorder: "$green500",
      primaryBorderHover: "$green600",
      primarySolidHover: "$green700",
      primarySolidContrast: "$white",
      primaryShadow: "$green500",

      gradient:
        "linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)",
      link: "#5E1DAD",

      // you can also create your own color
      myColor: "#ff4ecd",

      // ...  more colors
    },
    space: {},
    fonts: {},
  },
});

export default function App() {
  const darkMode = useDarkMode(false);
  const { auth, call } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch])

  useEffect(() => {
    const socket = io("https://server-sc.onrender.com");
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });

    return () => socket.close();
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
      dispatch(getSuggestions(auth.token));
      dispatch(getNotifies(auth.token));
    }
  }, [dispatch, auth.token]);

  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
        }
      });
    }
  }, []);

  useEffect(() => {
    const newPeer = new Peer(undefined, {
      path: "/",
      secure: true,
    });
    dispatch({ type: GLOBALTYPES.PEER, payload: newPeer });
  }, [dispatch]);

  return (
    <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
      <Alert />
      <Router>
        <div className="App">
          {auth.token ? (
            <>
              <Header />
              <Sidebar />
              {<StatusModal />}
              {call && <CallModal />}
              <SocketClient />
              <div className="home pt-5">
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={auth.token ? <Home /> : <Login />}
                  />
                  <Route path="/register" element={auth.token ? <Home /> : <Register />} />
                  <Route path="/:page" element={<PageRender />} />
                  <Route path="/:page/:id" element={<PageRender />} />
                </Routes>
              </div>
            </>
          ) : (
            <>
              <section className="main">
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={auth.token ? <Home /> : <Login />}
                  />
                  <Route path="/:page" element={<PageRender />} />
                  <Route path="/:page/:id" element={<PageRender />} />
                </Routes>
              </section>
            </>
          )}
        </div>
      </Router>
    </NextUIProvider>
  );
}
