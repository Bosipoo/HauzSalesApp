import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table, Spinner } from 'react-bootstrap';
import { addProperty, getPropertyTypes } from '../../services/api';

const PropertyModal = ({ showModal, handleClose, fetchProperties }) => {
  const initialFormData = {
    projectCode: '',
    description: '',
    address: '',
    offPlanTrancheDisc: 0,
    offPlanBulletDisc: 0,
    constructionStageDisc: 0,
    pricePerFraction: '',
    noOfFractions: 0,
    moniker: '',
    active: false,
    propertyTypeId: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchPropertyTypes = async () => {
      try {
        const data = await getPropertyTypes();
        setPropertyTypes(data);
        setLoading(false);
      } catch (error) {
        alert('Error fetching property types: ' + error.message);
        setLoading(false);
      }
    };
    fetchPropertyTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleRadioChange = (e) => {
    setFormData({
      ...formData,
      propertyTypeId: parseInt(e.target.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addProperty(formData);
      alert('Property added successfully');
      setFormData(initialFormData); // Reset form after success
      fetchProperties();
      handleClose();
    } catch (error) {
      alert('Error adding property: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Property Data Capture Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-2 col-sm-4">
              <Form.Group controlId="projectCode">
                <Form.Label>Project Code</Form.Label>
                <Form.Control
                  type="text"
                  name="projectCode"
                  value={formData.projectCode}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-4 col-sm-6">
              <Form.Group controlId="moniker">
                <Form.Label>Moniker</Form.Label>
                <Form.Control
                  type="text"
                  name="moniker"
                  value={formData.moniker}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
          </div>
          <hr />
          <div className="prop-form-section">
            <h5>Description</h5>
            <div className="row">
              <div className="col-md-12">
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-md-12">
                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-4">
                <Form.Group controlId="offPlanTrancheDisc">
                  <Form.Label>Off-Plan Tranche Disc</Form.Label>
                  <Form.Control
                    type="number"
                    name="offPlanTrancheDisc"
                    value={formData.offPlanTrancheDisc}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group controlId="offPlanBulletDisc">
                  <Form.Label>Off-Plan Bullet Disc</Form.Label>
                  <Form.Control
                    type="number"
                    name="offPlanBulletDisc"
                    value={formData.offPlanBulletDisc}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group controlId="constructionStageDisc">
                  <Form.Label>Construction Stage Disc</Form.Label>
                  <Form.Control
                    type="number"
                    name="constructionStageDisc"
                    value={formData.constructionStageDisc}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-4">
                <Form.Group controlId="pricePerFraction">
                  <Form.Label>Price per Fraction</Form.Label>
                  <Form.Control
                    type="number"
                    name="pricePerFraction"
                    value={formData.pricePerFraction}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group controlId="noOfFractions">
                  <Form.Label>Number of Fractions</Form.Label>
                  <Form.Control
                    type="number"
                    name="noOfFractions"
                    value={formData.noOfFractions}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </div>
            </div>
          </div>
          <hr />
          <div className="form-section">
            <h5>Property Type</h5>
            {loading ? (
              <p>Loading property types...</p>
            ) : (
              <Table bordered>
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Units</th>
                    <th>Fractions/Unit</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {propertyTypes.map((type) => (
                    <tr key={type.id}>
                      <td>
                        <Form.Check
                          type="radio"
                          id={`type-${type.id}`}
                          name="propertyType"
                          value={type.id}
                          onChange={handleRadioChange}
                          required
                        />
                      </td>
                      <td>{type.name}</td>
                      <td>{type.code}</td>
                      <td>{type.noOfUnits}</td>
                      <td>{type.noOfFractionsPerUnit}</td>
                      <td>{type.typeDescription}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
          <div className="row mt-4">
            <div className="col-md-12 d-flex justify-content-end">
              <Button variant="secondary" onClick={handleClose}>Cancel</Button>
              <Button variant="primary" type="submit" className="ml-4" disabled={submitting}>
                {submitting ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Submit'}
              </Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PropertyModal;
