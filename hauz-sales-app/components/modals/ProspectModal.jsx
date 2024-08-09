import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const ProspectModal = ({ show, handleClose, formData, nextOfKin, handleInputChange, handleNextOfKinChange, handleSubmit }) => {
    return (
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add/Edit Prospect</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="formTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Title</option>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Mrs.">Mrs.</option>
                                    <option value="Miss">Miss</option>
                                    <option value="Dr.">Dr.</option>
                                    <option value="Prof.">Prof.</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formOtherNames">
                                <Form.Label>Other Names</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="otherNames"
                                    value={formData.otherNames}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formDateOfBirth">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formGender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formStateOfOrigin">
                                <Form.Label>State of Origin</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="stateOfOrigin"
                                    value={formData.stateOfOrigin}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formPhone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formMaritalStatus">
                                <Form.Label>Marital Status</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="maritalStatus"
                                    value={formData.maritalStatus}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Marital Status</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Divorced">Divorced</option>
                                    <option value="Widowed">Widowed</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formEmploymentStatus">
                                <Form.Label>Employment Status</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="employmentStatus"
                                    value={formData.employmentStatus}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formPlaceOfWork">
                                <Form.Label>Place of Work</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="placeOfWork"
                                    value={formData.placeOfWork}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formCompanyAddress">
                                <Form.Label>Company Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="companyAddress"
                                    value={formData.companyAddress}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formAreasOfInterest">
                                <Form.Label>Areas of Interest</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="areasOfInterest"
                                    value={formData.areasOfInterest}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formRefererCompany">
                                <Form.Label>Referer Company</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="refererCompany"
                                    value={formData.refererCompany}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formLastCodeGenerated">
                                <Form.Label>Last Code Generated</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastCodeGenerated"
                                    value={formData.lastCodeGenerated}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formRefererIdentity">
                                <Form.Label>Referer Identity</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="refererIdentity"
                                    value={formData.refererIdentity}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formRegCode">
                                <Form.Label>Registration Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="regCode"
                                    value={formData.regCode}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formClientStatus">
                                <Form.Label>Client Status</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="clientStatus"
                                    value={formData.clientStatus}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Client Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="formNextOfKinName">
                                <Form.Label>Next of Kin Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nextOfKinName"
                                    value={nextOfKin.nextOfKinName}
                                    onChange={handleNextOfKinChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formNextOfKinAddress">
                                <Form.Label>Next of Kin Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nextOfKinAddress"
                                    value={nextOfKin.nextOfKinAddress}
                                    onChange={handleNextOfKinChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formNextOfKinPhone">
                                <Form.Label>Next of Kin Phone</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nextOfKinPhone"
                                    value={nextOfKin.nextOfKinPhone}
                                    onChange={handleNextOfKinChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formNextOfKinRelationship">
                                <Form.Label>Next of Kin Relationship</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nextOfKinRelationship"
                                    value={nextOfKin.nextOfKinRelationship}
                                    onChange={handleNextOfKinChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ProspectModal;
