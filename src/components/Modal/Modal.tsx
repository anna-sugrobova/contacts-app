import React from "react";
import ReactDOM from "react-dom";
import { CloseButton } from '../Buttons/CloseButton/CloseButton';

import "./Modal.scss";

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
                  <CloseButton
                      onClick={hide}
                      dataDismiss='modal'
                      ariaLabel="Close"
                  />
              </div>
              {children}
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;

export default Modal;
