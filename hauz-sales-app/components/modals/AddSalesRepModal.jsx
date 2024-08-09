import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { addSalesRep } from '../../services/api';

const AddSalesRepModal = ({ show, handleClose, refreshData }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        otherNames: '',
        photo: '',
        dob: '',
        gender: '',
        state: '',
        phone1: '',
        phone2: '',
        email: '',
        dateOfRecruitment: '',
        address: '',
        nokName: '',
        nokAddress: '',
        nokPhone: '',
        nokRelationship: '',
        ridName: '',
        ridAffiliateCompany: '',
        ridBeneficiaryDetails: '',
        lhaName: '',
        lhaBankName: '',
        lhaUplink: '',
        lhaAccountNumber: '',
        salesRepresentative: ''
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'photo' && files.length > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result.split(',')[1];
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: base64String
                }));
            };
            reader.readAsDataURL(files[0]);
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Sales form data: ", formData);
        const response = await addSalesRep(formData);
        if (response.status === 'success') {
            alert('Sales Representative added successfully');
            handleClose();
            refreshData();
        } else {
            alert(`Error: ${response.message}`);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Sales Representative</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <div className="form-section">
                        <h5>Personal Information</h5>
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-xs-6">
                                <Form.Group controlId="firstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                                </Form.Group>
                            </div>
                            <div className="col-lg-3 col-md-6 col-xs-6">
                                <Form.Group controlId="lastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                                </Form.Group>
                            </div>
                            <div className="col-lg-3 col-md-6 col-xs-6">
                                <Form.Group controlId="otherNames">
                                    <Form.Label>Other Names</Form.Label>
                                    <Form.Control type="text" name="otherNames" value={formData.otherNames} onChange={handleChange} />
                                </Form.Group>
                            </div>
                            
                        </div>

                        <div className="row mt-3">
                            <div className="col-lg-3 col-md-6 col-xs-6">
                                <Form.Group controlId="dob">
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control type="date" name="dob" value={formData.dob} onChange={handleChange} />
                                </Form.Group>
                            </div>
                            <div className="col-lg-3 col-md-6 col-xs-6">
                                <Form.Group controlId="gender">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Control as="select" name="gender" value={formData.gender} onChange={handleChange}>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div className="col-lg-3 col-md-6 col-xs-6">
                                <Form.Group controlId="state">
                                    <Form.Label>State (Origin)</Form.Label>
                                    <Form.Control type="text" name="state" value={formData.state} onChange={handleChange} />
                                </Form.Group>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-lg-3 col-md-6 col-xs-6">
                                <Form.Group controlId="phone1">
                                    <Form.Label>Phone 1</Form.Label>
                                    <Form.Control type="text" name="phone1" value={formData.phone1} onChange={handleChange} />
                                </Form.Group>
                            </div>
                            <div className="col-lg-3 col-md-6 col-xs-6">
                                <Form.Group controlId="phone2">
                                    <Form.Label>Phone 2</Form.Label>
                                    <Form.Control type="text" name="phone2" value={formData.phone2} onChange={handleChange} />
                                </Form.Group>
                            </div>
                            <div className="col-lg-3 col-md-6 col-xs-6">
                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
                                </Form.Group>
                            </div>
                            
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg-3 col-md-6 col-xs-6">
                                <Form.Group controlId="dateOfRecruitment">
                                    <Form.Label>Date of Recruitment</Form.Label>
                                    <Form.Control type="date" name="dateOfRecruitment" value={formData.dateOfRecruitment} onChange={handleChange} />
                                </Form.Group>
                            </div>
                            <div className="col-lg-6 col-md-6 col-xs-6">
                                <Form.Group controlId="photo">
                                    <Form.Label>Photo</Form.Label>
                                    <Form.Control type="file" name="photo" onChange={handleChange} />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-12">
                                <Form.Group controlId="address">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control as="textarea" rows={2} name="address" value={formData.address} onChange={handleChange} placeholder="Enter address" />
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="form-section">
                        <h5>Next of Kin Information</h5>
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group controlId="nokName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="nokName" value={formData.nokName} onChange={handleChange} placeholder="Enter type name" />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="nokAddress">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control as="textarea" rows={3} name="nokAddress" value={formData.nokAddress} onChange={handleChange} />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="nokPhone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="text" name="nokPhone" value={formData.nokPhone} onChange={handleChange} />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="nokRelationship">
                                    <Form.Label>Relationship</Form.Label>
                                    <Form.Control type="text" name="nokRelationship" value={formData.nokRelationship} onChange={handleChange} />
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="form-section">
                        <h5>Registration Identification Number</h5>
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group controlId="ridName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="ridName" value={formData.ridName} onChange={handleChange} placeholder="Enter type name" />
                                </Form.Group>
                            </div>
                            <div className="col-md-6 col-xs-2">
                                <Form.Group controlId="ridAffiliateCompany">
                                    <Form.Label>Affiliate Company</Form.Label>
                                    <Form.Control as="select" name="ridAffiliateCompany" value={formData.ridAffiliateCompany} onChange={handleChange}>
                                        <option value="">Select Affiliate Company</option>
                                        <option value="ABCL">ABCL</option>
                                        <option value="XYZL">XYZL</option>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="ridBeneficiaryDetails">
                                    <Form.Label>Beneficiary Details</Form.Label>
                                    <Form.Control type="text" name="ridBeneficiaryDetails" value={formData.ridBeneficiaryDetails} onChange={handleChange} />
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="form-section">
                        <h5>Level, Hierarchy & Account Details</h5>
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group controlId="lhaName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="lhaName" value={formData.lhaName} onChange={handleChange} placeholder="Enter type name" />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="lhaBankName">
                                    <Form.Label>Bank Name</Form.Label>
                                    <Form.Control as="select" name="lhaBankName" value={formData.lhaBankName} onChange={handleChange}>
                                        <option value="">Select Bank</option>
                                        <option value="Acc">Access Bank</option>
                                        <option value="Uba">United Bank of Africa(UBA)</option>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group controlId="lhaUplink">
                                    <Form.Label>Uplink</Form.Label>
                                    <Form.Control as="select" name="lhaUplink" value={formData.lhaUplink} onChange={handleChange}>
                                        <option value=""></option>
                                        <option value="1">Ada</option>
                                        <option value="2">Obi</option>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="lhaAccountNumber">
                                    <Form.Label>Account Number</Form.Label>
                                    <Form.Control type="text" name="lhaAccountNumber" value={formData.lhaAccountNumber} onChange={handleChange} placeholder="Enter account number" />
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                    <Modal.Footer className="modal-footer-custom">
                        <Button variant="primary" type="submit" className="w-100">
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddSalesRepModal;
