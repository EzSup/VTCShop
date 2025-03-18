import { useEffect, useRef, useState } from "react";
import "./Message.scss";
import { createPortal } from "react-dom";

const Message = ({ children, open, duration, onClose, type }) => {
  const dialog = useRef();
  const safeDuration = Math.max(duration, 1000);

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else if (onClose) onClose();
  }, [open]);

  setTimeout(() => {
    if (open) {
      onClose();
      setTimeout(() => {
        dialog.current.close();
      }, 500)
    }
  }, safeDuration);

  return createPortal(
    <div className="message">
      <dialog
        ref={dialog}
        className={`message_content ${open ? "fade-in" : "fade-out"} ${type}`}
      >
        {Array.isArray(children) ? (
            <div className="message_textbox">{children}</div>
        ) : (
            <p className="b2">{children}</p>
        )
        }
      </dialog>
    </div>,
    document.getElementById("root")
  );
};
export default Message;
