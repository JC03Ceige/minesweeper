/* This componenet is built with a react-bootstrap Modal, imported below. It is a 
statefull component but it is set in the parent component which is why the state is lifted
in the props. */
import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "./Button";

/* The component is created as an arrow function.

Because it is a very generic component, we pass props for every detail and value that
will be dependant on the states in the parent component.*/
const BoardModal = ({
  handleClose,
  onHide,
  show,
  backdrop,
  title,
  heading,
  content,
  btnContent,
  btnClass,
}) => {
  return (
    <>
      {/* The show and onHide props will be what toggles the state of the modal visibility. */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop={backdrop}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* Note that each possible value is passed in as props. */}
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{heading}</h4>
          <p>{content}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button classname={btnClass} clickEvent={onHide} value={btnContent} />
        </Modal.Footer>
      </Modal>
    </>
  );
};

/* We export this component to be used in the parent component. */
export default BoardModal;
