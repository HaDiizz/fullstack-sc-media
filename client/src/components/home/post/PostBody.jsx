import React from "react";
import { useState } from "react";
import Carousel from "../../Carousel";
import { Loading } from "@nextui-org/react";

const PostBody = ({ post }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <>
      <p className="text-left pt-4 text-sm">
        {post?.content?.length < 60
          ? post?.content
          : readMore
          ? post?.content + " "
          : post?.content?.slice(0, 60) + "..."}
      </p>
      {post?.content?.length > 60 && (
        <span
          className="readMore text-violet-600"
          onClick={() => setReadMore(!readMore)}
        >
          {readMore ? "Hide Content" : "Read More"}
        </span>
      )}
      <div className="card_body flex justify-center">
        {/* {post.images.map((img, index) => ( */}
        <div
          className="flex justify-center pt-3 card_body-content"
          style={{ width: "700px" }}
        >
          {post?.images?.length > 0 ? (
            <Carousel images={post?.images} id={post?._id} />
          ) : (
            <Loading type="points" />
          )}
        </div>
        {/* ))} */}
      </div>
    </>
  );
};

export default PostBody;
