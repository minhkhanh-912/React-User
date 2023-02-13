import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import userApi from "../api/userApi";

const ModalAddnew = ({
  show = false,
  handleClose = () => {},
  handleUpdateUser = {},
  dataEdit = {},
}) => {
  const [name, setname] = useState("");
  const [job, setjob] = useState("");
  const handleSaveUser = async () => {
    const data = { name, job };
    const respone = await userApi.AddNewUser(data);
    console.log(respone);
    if (respone && respone.id) {
      handleClose();
      setname("");
      setjob("");
      handleUpdateUser({
        first_name: name,
        last_name: name,
        email: `${name}@gmail.com`,
        id: respone.id,
      });
    }
  };
  const handleEditUser = async () => {
    const data = { name, job };
    const respone = await userApi.UpdateUser(dataEdit.id, data);
    console.log(respone);
    if (respone) {
      handleClose();
      setname("");
      setjob("");
    }
  };
  useEffect(() => {
    if (show) {
      setname(dataEdit?.first_name);
      setjob(dataEdit?.last_name);
    } else {
      setname("");
      setjob("");
    }
  }, [dataEdit]);
  console.log(dataEdit);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>ADD new user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>job: </Form.Label>
            <Form.Control
              type="job"
              value={job}
              placeholder="Enter job"
              onChange={(e) => setjob(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={
            Object.values(dataEdit).length > 0 ? handleEditUser : handleSaveUser
          }>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddnew;
