import React from "react";

const back_Header = () => {
  return (
    <div>
      {" "}
      <header className="">
        <a
          className="logo hover:bg-gradient-to-r from-cyan-400 to-blue-500 font-bold hover:text-gradient drop-shadow-md"
          style={{ textDecoration: "none" }}
        >
          {" "}
          Next Sc-Media{" "}
        </a>

        <nav className={"navbar "}>
          <a href="">Home</a>

          <a href="">Profile</a>
        </nav>

        <div className="icons d-flex">
          <a className="react_icon" onClick={{}}>
            {<HiMenuAlt1 id="bars" />}
          </a>
        </div>
      </header>
    </div>
  );
};

export default back_Header;
