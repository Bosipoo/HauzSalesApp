import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { BsSearch, BsPlusLg, BsEye, BsPencilSquare, BsFileEarmarkCheck } from "react-icons/bs"

const Prospects = () => {
    const records = [
        { ID: 1, ProspectNum: 'PRN1-10001', Name: 'Mr. Tochukwu Chiroma Adeleke', Phone: '09087777777', Gender: 'Male', CapDate: '11/04/2024', ClientStatus: true, AccOfficer: 'ADAMU ADEMOLA CHIGOZIE', AccOfficerPhone: '080233333333',  Active: true },
        { ID: 2, ProspectNum: 'PRN1-10002', Name: 'Mrs. Eunice Ijeoma Abuloma', Phone: '09087777777', Gender: 'Female', CapDate: '11/04/2024', ClientStatus: true, AccOfficer: 'JEGEDE ALIMOTU CHINWE', AccOfficerPhone: '080233333333',  Active: true },
        { ID: 3, ProspectNum: 'PRN1-10003', Name: 'Mr. Omotayo Adewunmi', Phone: '09087777777', Gender: 'Male', CapDate: '11/04/2024', ClientStatus: true, AccOfficer: 'ADAMU ADEMOLA CHIGOZIE', AccOfficerPhone: '080233333333',  Active: true },
        { ID: 4, ProspectNum: 'PRN2-10001', Name: 'Mr. Olayide Lookman', Phone: '09087777777', Gender: 'Male', CapDate: '11/04/2024', ClientStatus: true, AccOfficer: 'ADAMU ADEMOLA CHIGOZIE', AccOfficerPhone: '080233333333',  Active: true },
        { ID: 5, ProspectNum: 'PRN3-10001', Name: 'Ms. Ngozi Abel', Phone: '09087777777', Gender: 'Female', CapDate: '12/05/2024', ClientStatus: true, AccOfficer: 'ADAMU ADEMOLA CHIGOZIE', AccOfficerPhone: '080233333333',  Active: true }
        // ... Add more records up to 100 or more for testing
      ];
    
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const recordsPerPage = 15;
    
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(records.length / recordsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        checkboxes: [
            { label: 'Checkbox 1', checked: false },
            { label: 'Checkbox 2', checked: false },
            { label: 'Checkbox 3', checked: false },
            { label: 'Checkbox 4', checked: false },
            { label: 'Checkbox 5', checked: false },
            { label: 'Checkbox 6', checked: false },
            { label: 'Checkbox 7', checked: false },
            { label: 'Checkbox 8', checked: false },
            { label: 'Checkbox 9', checked: false },
            { label: 'Checkbox 10', checked: false },
        ],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (index) => {
        const updatedCheckboxes = formData.checkboxes.map((checkbox, i) =>
            i === index ? { ...checkbox, checked: !checkbox.checked } : checkbox
        );
        setFormData({ ...formData, checkboxes: updatedCheckboxes });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        handleClose();
    };

    return (
        <main className='main-container'>
            <div className='main-title'>
                <h2>PROSPECTS</h2>
            </div>

            <div className="row main-header">
                <div className="col-md-3 col-sm-4">
                    <div className="input-group mb-3">
                        <form className="top" action="#">
                            <input type="text" placeholder="Search.." name="search2" />
                            <button type="submit"><BsSearch className='card-icon' /></button>
                        </form>
                    </div>
                </div>
                <div className="col-md-2 col-sm-4">
                    {/* Dropdown for filtering */}
                    <div className="input-group mb-3">
                        <select className="form-select" id="activityStat" name="activityStat">
                            <option defaultValue>Client Status</option>
                            <option value="active">Is Client</option>
                            <option value="inactive">Yet to Be</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-7 col-sm-4 text-right d-flex justify-content-end gap-3">
                    {/* Button for adding */}
                    <button className="btn btn-primary btn-block" onClick={handleShow}><BsPlusLg /> Add Prospect</button>
                </div>
            </div>

            {/* Bootstrap Table */}
            <div className="row mt-4">
                <div className="col-12">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Prospect Number</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Cap Date</th>
                                    <th scope="col">Client Status</th>
                                    <th scope="col">Acc. Officer</th>
                                    <th scope="col">Acc. Officer Phone</th>
                                    <th scope="col">Active</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRecords.map(record => (
                                    <tr key={record.ID}>
                                        <th scope="row">{record.ID}</th>
                                        <td>{record.ProspectNum}</td>
                                        <td>{record.Name}</td>
                                        <td>{record.Phone}</td>
                                        <td>{record.Gender}</td>
                                        <td>{record.CapDate}</td>
                                        <td>{record.ClientStatus}</td>
                                        <td>{record.AccOfficer}</td>
                                        <td>{record.AccOfficerPhone}</td>
                                        <td>{record.Active}</td>
                                        <td>
                                            <button className="btn btn-link p-0 me-2" onClick={() => handleView(record.GLID)}>
                                                <BsEye />
                                            </button>
                                            <button className="btn btn-link p-0" onClick={() => handleEdit(record.GLID)}>
                                                <BsPencilSquare />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <nav>
                        <ul className="pagination justify-content-center">
                            {[...Array(totalPages)].map((_, index) => (
                            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                                {index + 1}
                                </button>
                            </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Modal */}
            <Modal show={showModal} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Capture Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="form-section">
                            <h5>Personal Information</h5>
                            <div className="row">
                                <div className="col-lg-4 col-md-5 col-xs-5">
                                    <Form.Group controlId="piTitle">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control as="select">
                                            <option>Mr.</option>
                                            <option>Mrs.</option>
                                            <option>Ms.</option>
                                            <option>Chief</option>
                                            <option>Dr.</option>
                                            <option>Prof.</option>
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                                <div className='col-lg-4 col-md-1 col-xs-1'></div>
                                <div className="col-lg-4 col-md-5 col-xs-5">
                                    <Form.Group controlId="pPhoto">
                                        <Form.Label>P-Photo</Form.Label>
                                        <Form.Control type="file" />
                                    </Form.Group>
                                </div>
                                <div className="col-lg-4 col-md-6 col-xs-6">
                                    <Form.Group controlId="firstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </div>
                                <div className="col-lg-4 col-md-6 col-xs-6">
                                    <Form.Group controlId="lastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </div>
                                <div className="col-lg-4 col-md-6 col-xs-6">
                                    <Form.Group controlId="otherNames">
                                        <Form.Label>Other Names</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </div>
                                <div className="col-lg-4 col-md-6 col-xs-6">
                                    <Form.Group controlId="dob">
                                        <Form.Label>Dt of Birth</Form.Label>
                                        <Form.Control type="date" />
                                    </Form.Group>
                                </div>
                                <div className="col-lg-4 col-md-6 col-xs-6">
                                    <Form.Group controlId="gender">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Control as="select">
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Other</option>
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                                <div className="col-lg-4 col-md-6 col-xs-6">
                                    <Form.Group controlId="state">
                                        <Form.Label>State (Origin)</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </div>
                                <div className="col-lg-4 col-md-6 col-xs-6">
                                    <Form.Group controlId="phone1">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </div>
                                <div className="col-lg-4 col-md-6 col-xs-6">
                                    <Form.Group controlId="gender">
                                        <Form.Label>Marital Status</Form.Label>
                                        <Form.Control as="select">
                                            <option>Married</option>
                                            <option>Single</option>
                                            <option>Widowed</option>
                                            <option>Divorced</option>
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                                <div className="col-lg-4 col-md-6 col-xs-6">
                                    <Form.Group controlId="email">
                                        <Form.Label>Email Addr.</Form.Label>
                                        <Form.Control type="email" />
                                    </Form.Group>
                                </div>
                                <div className="col-md-12">
                                    <Form.Group controlId="address">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control as="textarea" rows={2} placeholder="Enter address" />
                                    </Form.Group>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="form-section">
                            <h5>Employment Details</h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group controlId="employmentStat">
                                        <Form.Label>Employment Status</Form.Label>
                                        <Form.Control as="select">
                                            <option value="">Select Status</option>
                                            <option value="Employed">Employed</option>
                                            <option value="Entrepreneur">Entrepreneur</option>
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group controlId="coyName">
                                        <Form.Label>Place of Work</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </div>
                                <div className="col-md-12">
                                    <Form.Group controlId="companyAdd">
                                        <Form.Label>Company Address</Form.Label>
                                        <Form.Control as="textarea" rows={2} placeholder="Enter address"  />
                                    </Form.Group>
                                </div>
                                
                            </div>
                        </div>
                        <hr />
                        <div className="form-section">
                            <h5>Next of Kin Informations</h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group controlId="nikName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group controlId="nikAdd">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control as="textarea" rows={2}  />
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group controlId="nikPhone">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group controlId="nikRelationship">
                                        <Form.Label>Relationship</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </div>                           
                            </div>
                        </div>
                        <hr />
                        <div className="form-section">
                            <h5>Ares of interest</h5>
                            <div className="row">
                                <div className='col-md-2'>
                                    <Form.Group controlId='check-1' key='1'>
                                        <Form.Check 
                                            type="checkbox"
                                            label='Basic'
                                            checked= {false}
                                            onChange={() => handleCheckboxChange(index)}
                                        />
                                    </Form.Group>
                                </div>
                                <div className='col-md-2'>
                                    <Form.Group controlId='check-2' key='2'>
                                        <Form.Check 
                                            type="checkbox"
                                            label='Lunch'
                                            checked={false}
                                            onChange={() => handleCheckboxChange(index)}
                                        />
                                    </Form.Group>
                                </div>
                                <div className='col-md-2'>
                                    <Form.Group controlId='check-3' key='2'>
                                        <Form.Check 
                                            type="checkbox"
                                            label='COLA'
                                            checked={false}
                                            onChange={() => handleCheckboxChange(index)}
                                        />
                                    </Form.Group>
                                </div>
                                
                                <div className='col-md-2'>
                                    <Form.Group controlId='FestiveBonus' key='2'>
                                        <Form.Check 
                                            type="checkbox"
                                            label='Festive Bonus'
                                            checked={false}
                                            onChange={() => handleCheckboxChange(index)}
                                        />
                                    </Form.Group>
                                </div>
                                <div className='col-md-2'>
                                    <Form.Group controlId='CarMtce' key='2'>
                                        <Form.Check 
                                            type="checkbox"
                                            label='Car Mtce'
                                            checked={false}
                                            onChange={() => handleCheckboxChange(index)}
                                        />
                                    </Form.Group>
                                </div>
                                <div className='col-md-2'>
                                    <Form.Group controlId='Utility' key='2'>
                                        <Form.Check 
                                            type="checkbox"
                                            label='Utility'
                                            checked={false}
                                            onChange={() => handleCheckboxChange(index)}
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="form-section">
                            <h5>Referers Details</h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group controlId="rdCompany">
                                        <Form.Label>Referer's Company</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group controlId="rdLastCode">
                                        <Form.Label>Last Code Generated</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group controlId="rdIdentity">
                                        <Form.Label>Referer's Identity</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group controlId="rdRegCode">
                                        <Form.Label>Reg Code</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </div>                                      
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="modal-footer-custom">
                    <Button variant="primary" className="w-100">
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </main>
      )
}

export default Prospects