import React from "react";
import { Modal } from "react-bootstrap";

function ModalComponent({
  title,
  children,
  show,
  extraClassName = "",
  extraTitleClassName = "",
  onHandleVisible,
  onHandleCancel,
  closeButton = true,
  modalClassName = ""
}) {
  return (
    <>
      {/* {show ? (
        <div className="modal fade show" id="addForm">
          <div className={`modal-dialog ${extraClassName}`} role="document">
            <div className="modal-content">
              <a
                className="close"
                // data-dismiss="modal"
                aria-label="Close"
                onClick={onHandleShow}
              >
                <em className="icon ni ni-cross" />
              </a>
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
              </div>
              <div className="modal-body">{children}</div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )} */}
      <Modal
        show={show}
        onHide={onHandleCancel}
        onHandleShow={onHandleVisible}
        backdrop="static"
        keyboard={false}
        dialogClassName={extraClassName}
        centered
        className={modalClassName}
      >
        <Modal.Header
          className={`${extraTitleClassName}`}
          closeButton={closeButton}
          closeVariant="white"
        >
          {title ? (
            <Modal.Title>
              <h5 className="modal-title text-white">{title}</h5>
            </Modal.Title>
          ) : (
            ""
          )}
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
}

export default ModalComponent;
