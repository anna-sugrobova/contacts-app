import React from "react";
import ReactDOM from "react-dom";
import ClearIcon from "@mui/icons-material/Clear";
import SvgIcon from "@mui/material/SvgIcon";

import "./Modal.css";

type ModalProps = {
  isShowing: boolean;
  hide: () => void;
  children: JSX.Element;
};

const Modal = ({ isShowing, hide, children }: ModalProps) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay" />
          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal">
              <div className="modal-header">
                <button
                  type="button"
                  className="modal-close-button"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={hide}
                >
                  <SvgIcon>
                    <ClearIcon />
                  </SvgIcon>
                </button>
              </div>
              {children}
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;

export default Modal;
