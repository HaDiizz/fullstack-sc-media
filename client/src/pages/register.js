import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Input, Spacer, Row, Button } from "@nextui-org/react";
import { register } from "../redux/actions/authAction";

const Register = () => {
  const { auth, alert } = useSelector((state) => state);
  const navigate = useNavigate();

  const initialState = {
    email: "",
    password: "",
    fullname: "",
    username: "",
    cf_password: "",
    gender: "male",
  };
  const [userData, setUserData] = useState(initialState);
  const { email, password, fullname, username, cf_password } = userData;

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
    dispatch(register(userData));
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
            aria-labelledby="tac"
            autoComplete="on"
            type="text"
            placeholder="FullName"
            width="100%"
            value={fullname}
            name="fullname"
            onChange={(e) => handleChangeInput(e)}
            status={`${alert.fullname ? "error" : ""}`}
            helperText={`${alert.fullname ? alert.fullname : ""}`}
            helperColor={`${alert.fullname ? "error" : ""}`}
          />
        </div>
        <Spacer y={1.5} />
        <div className="form-group">
          <Input
            aria-labelledby="tac"
            autoComplete="on"
            type="text"
            placeholder="Username"
            width="100%"
            value={username.toLowerCase().replace(/ /g, "")}
            name="username"
            onChange={(e) => handleChangeInput(e)}
            status={`${alert.username ? "error" : ""}`}
            helperText={`${alert.username ? alert.username : ""}`}
            helperColor={`${alert.username ? "error" : ""}`}
          />
        </div>
        <Spacer y={1.5} />
        <div className="form-group">
          <Input
            aria-labelledby="tac"
            autoComplete="on"
            type="email"
            placeholder="Email"
            width="100%"
            value={email}
            name="email"
            onChange={(e) => handleChangeInput(e)}
            status={`${alert.email ? "error" : ""}`}
            helperText={`${alert.email ? alert.email : ""}`}
            helperColor={`${alert.email ? "error" : ""}`}
          />
        </div>
        <Spacer y={1.5} />
        <div className="form-group">
          <Input.Password
            aria-labelledby="tac"
            placeholder="Password"
            width="100%"
            value={password}
            name="password"
            onChange={(e) => handleChangeInput(e)}
            status={`${alert.password ? "error" : ""}`}
            helperText={`${alert.password ? alert.password : ""}`}
            helperColor={`${alert.password ? "error" : ""}`}
          />
        </div>
        <Spacer y={1.5} />
        <div className="form-group">
          <Input.Password
            aria-labelledby="tac"
            placeholder="Confirm Password"
            width="100%"
            value={cf_password}
            name="cf_password"
            onChange={(e) => handleChangeInput(e)}
            status={`${alert.cf_password ? "error" : ""}`}
            helperText={`${alert.cf_password ? alert.cf_password : ""}`}
            helperColor={`${alert.cf_password ? "error" : ""}`}
          />
        </div>

        <Row justify="space-between" className="pt-4">
          <label htmlFor="male">
            Male:{" "}
            <input
              type="radio"
              id="male"
              name="gender"
              value={"male"}
              defaultChecked
              onChange={handleChangeInput}
            />
          </label>
          <label htmlFor="female">
            Female:{" "}
            <input
              type="radio"
              id="female"
              name="gender"
              value={"female"}
              onChange={handleChangeInput}
            />
          </label>
          <label htmlFor="other">
            Other:{" "}
            <input
              type="radio"
              id="other"
              name="gender"
              value={"other"}
              onChange={handleChangeInput}
            />
          </label>
        </Row>

        <Spacer y={1.5} />
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-dark"
            // disabled={email && password ? false : true}
          >
            สมัครสมาชิก
          </button>

          <p className="my-3">
            มีบัญชีเรียบร้อยแล้ว?
            <Link
              style={{
                color: "blue",
                paddingLeft: "5px",
                textDecoration: "none",
              }}
              to="/login"
            >
              เข้าสู่ระบบ
            </Link>
          </p>
        </div>
      </form> */}
      </>

      <section className="fixed">
        <div className="color"></div>
        <div className="color"></div>
        <div className="color"></div>
        <div className="box">
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>

          <div className="container">
            <div className="form">
              <form className="" onSubmit={handleSubmit}>
                <h3 className="text-uppercase text-center pt-2">
                  Next Social Media
                </h3>
                <Spacer y={1.5} />
                <div className="form-group">
                  <Input
                    aria-labelledby="tac"
                    autoComplete="on"
                    type="text"
                    placeholder="FullName"
                    width="100%"
                    value={fullname}
                    name="fullname"
                    onChange={(e) => handleChangeInput(e)}
                    status={`${alert.fullname ? "error" : ""}`}
                    helperText={`${alert.fullname ? alert.fullname : ""}`}
                    helperColor={`${alert.fullname ? "error" : ""}`}
                  />
                </div>
                <Spacer y={1.5} />
                <div className="form-group">
                  <Input
                    aria-labelledby="tac"
                    autoComplete="on"
                    type="text"
                    placeholder="Username"
                    width="100%"
                    value={username.toLowerCase().replace(/ /g, "")}
                    name="username"
                    onChange={(e) => handleChangeInput(e)}
                    status={`${alert.username ? "error" : ""}`}
                    helperText={`${alert.username ? alert.username : ""}`}
                    helperColor={`${alert.username ? "error" : ""}`}
                  />
                </div>
                <Spacer y={1.5} />
                <div className="form-group">
                  <Input
                    aria-labelledby="tac"
                    autoComplete="on"
                    type="email"
                    placeholder="Email"
                    width="100%"
                    value={email}
                    name="email"
                    onChange={(e) => handleChangeInput(e)}
                    status={`${alert.email ? "error" : ""}`}
                    helperText={`${alert.email ? alert.email : ""}`}
                    helperColor={`${alert.email ? "error" : ""}`}
                  />
                </div>
                <Spacer y={1.5} />
                <div className="form-group">
                  <Input.Password
                    aria-labelledby="tac"
                    placeholder="Password"
                    width="100%"
                    value={password}
                    name="password"
                    onChange={(e) => handleChangeInput(e)}
                    status={`${alert.password ? "error" : ""}`}
                    helperText={`${alert.password ? alert.password : ""}`}
                    helperColor={`${alert.password ? "error" : ""}`}
                  />
                </div>
                <Spacer y={1.5} />
                <div className="form-group">
                  <Input.Password
                    aria-labelledby="tac"
                    placeholder="Confirm Password"
                    width="100%"
                    value={cf_password}
                    name="cf_password"
                    onChange={(e) => handleChangeInput(e)}
                    status={`${alert.cf_password ? "error" : ""}`}
                    helperText={`${alert.cf_password ? alert.cf_password : ""}`}
                    helperColor={`${alert.cf_password ? "error" : ""}`}
                  />
                </div>

                <Row justify="space-between" className="pt-4">
                  <label htmlFor="male">
                    Male:{" "}
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value={"male"}
                      defaultChecked
                      onChange={handleChangeInput}
                    />
                  </label>
                  <label htmlFor="female">
                    Female:{" "}
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value={"female"}
                      onChange={handleChangeInput}
                    />
                  </label>
                  <label htmlFor="other">
                    Other:{" "}
                    <input
                      type="radio"
                      id="other"
                      name="gender"
                      value={"other"}
                      onChange={handleChangeInput}
                    />
                  </label>
                </Row>

                <Spacer y={1} />
                <div className="form-group">
                  <div className="flex justify-center">
                    <button
                      className="btn bg-neutral-800 text-white"
                      type="submit"
                      // color="gradient"
                      // auto
                      // disabled={email && password ? false : true}
                    >
                      Register
                    </button>
                  </div>

                  <p className="my-3">
                    Already registered?
                    <Link
                      style={{
                        color: "blue",
                        paddingLeft: "5px",
                        textDecoration: "none",
                      }}
                      to="/login"
                    >
                      Login
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

export default Register;
