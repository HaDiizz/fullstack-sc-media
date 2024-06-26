import React, { useState, useEffect } from "react";
import PostThumb from "../PostThumb";
import { Loading } from "@nextui-org/react";
import LoadMoreBtn from "../LoadMoreBtn";
import { getDataAPI } from "../../utils/fetchData";
import { PROFILE_TYPES } from "../../redux/actions/profileAction";

const Posts = ({ id, auth, profile, dispatch }) => {
  const [posts, setPosts] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    profile.posts.forEach((data) => {
      if (data._id === id) {
        setPosts(data.posts);
        setResult(data.result);
        setPage(data.page);
      }
    });
  }, [profile.posts, id]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `user_posts/${id}?limit=${page * 8}`,
      auth.token
    );
    const newData = {...res.data, page: page + 1, _id: id}
    dispatch({type: PROFILE_TYPES.UPDATE_POST, payload: newData})

    setLoad(false);
  };

  return (
    <div className="pt-4 p-2 mr-4">
      <PostThumb posts={posts} result={result} />
      {load && <Loading type="points" className="d-block mx-auto" />}
      <LoadMoreBtn
        result={result}
        page={page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default Posts;
