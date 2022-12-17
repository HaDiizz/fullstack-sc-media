import React, { useState, useEffect } from "react";
import LoadMoreBtn from "../LoadMoreBtn";
import PostThumb from "../PostThumb";
import { Loading } from "@nextui-org/react";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const Saved = ({ auth, dispatch }) => {
  const [savePosts, setSavePosts] = useState([]);
  const [result, setResult] = useState(8);
  const [page, setPage] = useState(2);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    getDataAPI(`getSavedPosts`, auth.token)
      .then((res) => {
        setSavePosts(res.data.savePosts);
        setResult(res.data.result);
        setLoad(false);
      })
      .catch((err) =>
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        })
      );

    return () => setSavePosts([]);
  }, [auth.token, dispatch]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`getSavedPosts?limit=${page * 8}`, auth.token);
    setSavePosts(res.data.savePosts);
    setResult(res.data.result);
    setPage(page + 1);
    setLoad(false);
  };

  return (
    <div className="pt-4 p-2 mr-4">
      <PostThumb posts={savePosts} result={result} />
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

export default Saved;
