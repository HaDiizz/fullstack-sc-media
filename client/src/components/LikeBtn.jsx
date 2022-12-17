import React, { useState, useEffect } from "react";
import {
  AiFillHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
} from "react-icons/ai";

const LikeBtn = ({ isLike, handleLike, handleUnLike }) => {
  return (
    <>
      <span
        className={`hover:animate-bounce w-100 flex justify-center pr-3 ${
          isLike ? "text-red-500" : "hover:text-red-500"
        }`}
        onClick={isLike ? handleUnLike : handleLike}
      >
        <AiFillHeart size={18} />
      </span>
    </>
  );
};

export default LikeBtn;
