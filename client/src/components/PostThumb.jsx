import React from "react";
import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";

const PostThumb = ({ posts, result }) => {
  if (result === 0)
    return (
      <h3
        className="text-center uppercase text-secondary"
        style={{ letterSpacing: "5px" }}
      >
        No Post...
      </h3>
    );

  return (
    <div className="post_thumb">
      {posts.map((post) => (
        <Link key={post._id} to={`/post/${post._id}`}>
          <div className="post_thumb_display">
            {post.images[0].url.match(/video/i) ? (
              <video controls src={post.images[0].url} alt={post.images[0].url} />
            ) : (
              <img src={post.images[0].url} alt={post.images[0].url} />
            )}

            <div className="post_thumb_menu">
              <i className="far fa-heart">
                <span className="pl-2">{post.likes.length}</span>
              </i>
              <i className="far fa-comment">
                <span className="pl-2">{post.comments.length}</span>
              </i>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostThumb;
