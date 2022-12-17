import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";

const Toast = ({ msg }) => {
  injectStyle();
  const customId = "custom-id-yes";
  useEffect(() => {
    if (msg.statusErr) {
      toast.error(`${msg.msg}`, {
        toastId: customId,
      });
    }
    if (msg.statusSucc) {
      toast.success(`${msg.msg}`, {
        toastId: customId,
      });
    }
  }, []);

  return (
    <ToastContainer
      position="top-center"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
};

export default Toast;
