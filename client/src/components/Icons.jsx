import React, { useState } from "react";

const Icons = ({ setContent, content }) => {
  const reactions = [
    '🙂','😀','😄','😆','😅','😂','🤣','😊','🌝','😌','😉','😏','😍',
    '😘','😗','😙','😚','🤗','😳','🙃','😇','😈','😱','😜','🤧','😭',
    '🤔','🙄','😠','☝️','🙏','👏','👊','🌚','💕','♥️','❤️','💚',
    '💙','💜',
  ];

  const [isShow, setIsShow] = useState(false);

  return (
    <div className="">
      <span
        className="nav-link position-relative px-1"
        id="navbarDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span
        className="text-right"
          style={{ opacity: 1}}
          onClick={() => setIsShow((curr) => !curr)}
        >
          {
            isShow ? <i className="fas fa-times text-red-500"/> : '😊'
          }
        </span>
      </span>
      <div className="reactions_nm" style={{maxWidth:"100%"}}>
        {isShow && (
          <>
            {reactions?.map((icon) => (
              <span key={icon} onClick={() => setContent(content + icon)}>
                {icon}
              </span>
            ))}
          </>
        )}
      </div>

    </div>
  );
};

export default Icons;

