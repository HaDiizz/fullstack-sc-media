import React from "react";
import Status from "../components/home/Status";
import Posts from "../components/home/Posts";
import { useSelector } from "react-redux";
import { Loading } from "@nextui-org/react";
import MoonSVG from "./../images/moon.svg";

const Home = () => {
  const { homePosts } = useSelector((state) => state);

  return (
    <div className="pt-[2rem] main pr-2 pb-3">
      <div className="col-md-12 mr-2 ml-2">
        <Status />
        {homePosts.loading ? (
          <Loading
            type="gradient"
            className="pt-4"
            loadingCss={{ $$loadingSize: "100px", $$loadingBorder: "10px" }}
          />
        ) : (homePosts.result === 0 && homePosts.posts.length === 0) ? (
          <div className="pt-5">
            <div className="flex justify-center">
              <img src={MoonSVG} alt="logo" className="border-none w-[15rem] h-[15rem]" />
            </div>
            <h4 className="text-center pt-5" style={{letterSpacing:"3px"}}>No Post...</h4>
          </div>
        ) : (
          <Posts />
        )}
      </div>
    </div>
  );
};

export default Home;
