import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";

const ShareModal = ({ url }) => {
  return (
    <div className="flex justify-between p-4">
      <FacebookShareButton url={url}>
        <FacebookIcon round={true} size={32} />
      </FacebookShareButton>
      <RedditShareButton url={url}>
        <RedditIcon round={true} size={32} />
      </RedditShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon round={true} size={32} />
      </TwitterShareButton>
      <WhatsappShareButton url={url}>
        <WhatsappIcon round={true} size={32} />
      </WhatsappShareButton>
      <TelegramShareButton url={url}>
        <TelegramIcon round={true} size={32} />
      </TelegramShareButton>
    </div>
  );
};

export default ShareModal;
