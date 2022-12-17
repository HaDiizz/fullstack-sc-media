import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Spacer, Button } from "@nextui-org/react";
import { login } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import "../styles/auth.css";

const Login = () => {
  const { auth } = useSelector((state) => state);
  const navigate = useNavigate();
  const initialState = {
    email: "",
    password: "",
  };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const dispatch = useDispatch();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  useEffect(() => {
    if (auth.token) navigate("/");
  }, [auth.token, navigate]);

  return (
    <>
      <>
        {/* <form className="" onSubmit={handleSubmit}>
        <h3 className="text-uppercase text-center">Next Social Media</h3>
        <Spacer y={1.5} />
        <div className="form-group">
          <Input
            autoComplete="on"
            type="email"
            labelPlaceholder="Email"
            width="100%"
            value={email}
            name="email"
            onChange={(e) => handleChangeInput(e)}
          />
        </div>
        <Spacer y={1.5} />
        <div className="form-group">
          <Input.Password
            labelPlaceholder="Password"
            width="100%"
            value={password}
            name="password"
            onChange={(e) => handleChangeInput(e)}
          />
        </div>
        <Spacer y={1.5} />
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-dark"
            disabled={email && password ? false : true}
          >
            เข้าสู่ระบบ
          </button>

          <p className="my-3">
            ยังไม่มีบัญชี?
            <Link
              style={{
                color: "blue",
                paddingLeft: "5px",
                textDecoration: "none",
              }}
              to="/register"
            >
              สมัครสมาชิก
            </Link>
          </p>
        </div>
      </form> */}
      </>

      <section className="fixed">
        <div className="color"></div>
        <div className="color"></div>
        <div className="color"></div>
        <div className="box pl-[30px]">
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>

          <div className="container">
            <div className="form">
              <form className="" onSubmit={handleSubmit}>
                <h3 className="text-uppercase text-center">
                  Next Social Media
                </h3>
                <Spacer y={1.5} />
                <div className="form-group">
                  <Input
                    autoComplete="on"
                    type="email"
                    labelPlaceholder="Email"
                    width="100%"
                    value={email}
                    name="email"
                    onChange={(e) => handleChangeInput(e)}
                  />
                </div>
                <Spacer y={1.5} />
                <div className="form-group">
                  <Input.Password
                    labelPlaceholder="Password"
                    width="100%"
                    value={password}
                    name="password"
                    onChange={(e) => handleChangeInput(e)}
                  />
                </div>
                <Spacer y={1.5} />
                <div className="form-group">
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      // color="gradient"
                      // auto
                      className="btn btn-dark"
                      disabled={email && password ? false : true}
                    >
                      Login
                    </button>
                  </div>

                  <p className="my-3">
                    Not register yet?
                    <Link
                      style={{
                        color: "blue",
                        paddingLeft: "5px",
                        textDecoration: "none",
                      }}
                      to="/register"
                    >
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
