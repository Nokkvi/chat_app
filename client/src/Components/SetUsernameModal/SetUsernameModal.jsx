import React, { useState } from "react";

import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";

const SetUsernameModal = ({ open, onSubmit, onClose, user }) => {
  const [newUserName, setNewUserName] = useState(user);
  return (
    <Modal show={open}>
      <Modal.Header closeButton>
        <Modal.Title>Set Username</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup>
          <FormControl
            placeholder="Username"
            onChange={(e) => setNewUserName(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                onSubmit(newUserName);
                onClose();
              }
            }}
            value={newUserName}
          />
        </InputGroup>
      </Modal.Body>

      <Modal.Footer>
        <Button
          disabled={!user}
          variant="secondary"
          onClick={() => {
            if (user) {
              onClose();
            }
          }}
        >
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            onSubmit(newUserName);
            onClose();
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SetUsernameModal;
