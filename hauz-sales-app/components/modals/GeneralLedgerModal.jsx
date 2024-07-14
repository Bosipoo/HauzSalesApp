import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';

const GeneralLedgerModal = ({ showModal, handleCloseModal, formData, handleChange, handleSubmit, isLoading }) => {

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>General Ledgers Data Entry</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formGLGroupID" className='mb-3'>
            <Form.Label>GL Group ID</Form.Label>
            <Form.Control
              as="select"
              name="GLGroupID"
              value={formData.GLGroupID}
              onChange={handleChange}
              required
            >
              <option value="">Select Group ID</option>
              <option value="INF">INF | Payments Collected from Buyers</option>
              <option value="FL">FL | Payments due to Freelances</option>
              <option value="TM">TM | Payments due to Team Members</option>
              <option value="TL">TL | Payments due to Team Leaders</option>
              <option value="LGL">LGL | Legal Fees Collected</option>
              <option value="MKT">MKT | Marketing Levies Collected</option>
              <option value="PJR">PJR | Amounts due to project</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formGLTypeID" className='mb-3'>
            <Form.Label>GL Type ID</Form.Label>
            <Form.Control
              type="text"
              name="GLTypeID"
              value={formData.GLTypeID}
              readOnly
            />
          </Form.Group>

          <Form.Group controlId="formTempAcctName" className='mb-3'>
            <Form.Label>Temp. Account Name</Form.Label>
            <Form.Control
              type="text"
              name="TempAcctName"
              value={formData.TempAcctName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formGLAcctDescription" className='mb-3'>
            <Form.Label>GL Account Description</Form.Label>
            <Form.Control
              type="text"
              name="GLAcctDescription"
              value={formData.GLAcctDescription}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formGLAcctName" className='mb-3'>
            <Form.Label>GL Account Name</Form.Label>
            <Form.Control
              type="text"
              name="GLAcctName"
              value={`${formData.GLGroupID} | ${formData.TempAcctName}`}
              readOnly
            />
          </Form.Group>

          <Form.Group controlId="formIsActive" className='mb-3'>
            <Form.Check
              type="checkbox"
              label="Active"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Submit'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

GeneralLedgerModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    GLGroupID: PropTypes.string,
    GLTypeID: PropTypes.string,
    TempAcctName: PropTypes.string,
    GLAcctDescription: PropTypes.string,
    isActive: PropTypes.bool
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default GeneralLedgerModal;
