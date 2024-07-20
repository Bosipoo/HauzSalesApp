import React, { useState } from 'react';
import { Button, Modal, Form, Spinner } from 'react-bootstrap';
import { addPropertyType } from '../../services/api';

const AddPropertyTypeModal = ({ showModal, handleClose, fetchPropertyTypes }) => {
  const initialFormData = {
    name: '',
    code: '',
    noOfUnits: 0,
    noOfFractionsPerUnit: 0,
    typeDescription: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addPropertyType(formData);
      alert('Property type added successfully');
      setFormData(initialFormData); // Reset form after success
      fetchPropertyTypes();
      handleClose();
    } catch (error) {
      alert('Error adding property type: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Property Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="code">
            <Form.Label>Code</Form.Label>
            <Form.Control
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="noOfUnits">
            <Form.Label>Number of Units</Form.Label>
            <Form.Control
              type="number"
              name="noOfUnits"
              value={formData.noOfUnits}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="noOfFractionsPerUnit">
            <Form.Label>Number of Fractions per Unit</Form.Label>
            <Form.Control
              type="number"
              name="noOfFractionsPerUnit"
              value={formData.noOfFractionsPerUnit}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="typeDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="typeDescription"
              value={formData.typeDescription}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button variant="success" type="submit" className="ml-4" disabled={submitting}>
              {submitting ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Submit'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddPropertyTypeModal;
