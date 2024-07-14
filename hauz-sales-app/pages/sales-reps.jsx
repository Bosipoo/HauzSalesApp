import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { BsSearch, BsPlusLg, BsEye, BsPencilSquare } from "react-icons/bs"

const SalesReps = () => {
    const records = [
        { ID: 1, RepCode: 'ABCL-10001', Name: 'ADAMU ADEMOLA CHIGOZIE', Gender: 'Male', Phone: '', AffiliateCoy: 'ABCL', TL: true, TM: true, FL: true, Uplink: 0, Active: true },
        { ID: 2, RepCode: 'XYZL-20001', Name: 'JEGEDE ALIMOTU CHINWE', Gender: 'Female', Phone: '', AffiliateCoy: 'XYZL', TL: true, TM: true, FL: true, Uplink: 0, Active: true },
        { ID: 3, RepCode: 'ABCL-10002', Name: 'OBINNA LEKAN EMEKA', Gender: 'Male', Phone: '', AffiliateCoy: 'ABCL', TL: false, TM: true, FL: true, Uplink: 2, Active: true },
        { ID: 4, RepCode: 'XYZL-20002', Name: 'FOLORUNSO TEMITOPE AJAYI', Gender: 'Male', Phone: '', AffiliateCoy: 'XYZL', TL: false, TM: true, FL: true, Uplink: 1, Active: true },
        { ID: 5, RepCode: 'ABCL-10003', Name: 'IBE MICHAEL AMBROSE', Gender: 'Male', Phone: '', AffiliateCoy: 'ABCL', TL: true, TM: true, FL: true, Uplink: 1, Active: true }
        // ... Add more records up to 100 or more for testing
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        GLAcctNumber: '',
        GLGroupID: '',
        GLTypeID: '',
        TempAcctName: '',
        GLAcctDescription: '',
        GLAcctName: '',
        isActive: false,
    });
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

    const handleView = (id) => {
        console.log(`View record with ID: ${id}`);
    };

    const handleEdit = (id) => {
        console.log(`Edit record with ID: ${id}`);
    };

    return (
        <main className='main-container'>
            <div className='main-title'>
                <h2>SALES REPRESENTATIVE</h2>
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
                            <option defaultValue>Activity Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-7 col-sm-4 text-right d-flex justify-content-end gap-3">
                    {/* Button for adding */}
                    <button className="btn btn-primary btn-block" onClick={handleShow}><BsPlusLg /> Add Sales Representative</button>
                    {/* <button className="btn btn-primary btn-block" onClick={handleShow}><BsFileEarmarkCheck /> Generate Payment File</button> */}
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
                                    <th scope="col">Representative Code</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Affiliate Coy</th>
                                    <th scope="col">TL</th>
                                    <th scope="col">TM</th>
                                    <th scope="col">FL</th>
                                    <th scope="col">Uplink</th>
                                    <th scope="col">Active</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRecords.map(record => (
                                    <tr key={record.ID}>
                                        <th scope="row">{record.ID}</th>
                                        <td>{record.RepCode}</td>
                                        <td>{record.Name}</td>
                                        <td>{record.Gender}</td>
                                        <td>{record.Phone}</td>
                                        <td>{record.AffiliateCoy}</td>
                                        <td>
                                            <input type="checkbox" checked={record.TL} disabled />
                                        </td>
                                        <td>
                                            <input type="checkbox" checked={record.TM} disabled />
                                        </td>
                                        <td>
                                            <input type="checkbox" checked={record.FL} disabled />
                                        </td>
                                        <td>{record.Uplink}</td>
                                        <td>{record.Active}</td>
                                        <td>
                                            <button className="btn btn-link p-0 me-2" onClick={() => handleView(record.ID)}>
                                                <BsEye />
                                            </button>
                                            <button className="btn btn-link p-0" onClick={() => handleEdit(record.ID)}>
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
                                <div className="col-lg-3 col-md-6 col-xs-6">
                                    <Form.Group controlId="firstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </div>
                                <div className="col-lg-3 col-md-6 col-xs-6">
                                    <Form.Group controlId="lastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </div>
                                <div className="col-lg-3 col-md-6 col-xs-6">
                                    <Form.Group controlId="otherNames">
                                        <Form.Label>Other Names</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </div>
                                <div className="col-lg-3 col-md-6 col-xs-6">
                                    <Form.Group controlId="pPhoto">
                                        <Form.Label>P-Photo</Form.Label>
                                        <Form.Control type="file" />
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-lg-3 col-md-6 col-xs-6">
                                    <Form.Group controlId="dob">
                                        <Form.Label>Dt of Birth</Form.Label>
                                        <Form.Control type="date" />
                                    </Form.Group>
                                </div>
                                <div className="col-lg-3 col-md-6 col-xs-6">
                                    <Form.Group controlId="gender">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Control as="select">
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Other</option>
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                                <div className="col-lg-3 col-md-6 col-xs-6">
                                    <Form.Group controlId="state">
                                        <Form.Label>State (Origin)</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-lg-3 col-md-6 col-xs-6">
                                    <Form.Group controlId="phone1">
                                        <Form.Label>Phone 1</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </div>
                                <div className="col-lg-3 col-md-6 col-xs-6">
                                    <Form.Group controlId="phone2">
                                        <Form.Label>Phone 2</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </div>
                                <div className="col-lg-3 col-md-6 col-xs-6">
                                    <Form.Group controlId="email">
                                        <Form.Label>Email Addr.</Form.Label>
                                        <Form.Control type="email" />
                                    </Form.Group>
                                </div>
                                <div className="col-lg-3 col-md-6 col-xs-6">
                                    <Form.Group controlId="dateOfRecruitment">
                                        <Form.Label>Date of Recruitment</Form.Label>
                                        <Form.Control type="date" />
                                    </Form.Group>
                                </div>
                            </div>

                            <div className="row mt-3">
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
                            <h5>Next of Kin Information</h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group controlId="typeName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter type name" />
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group controlId="nokAddress">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control as="textarea" rows={3} />
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group controlId="nokPhone">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group controlId="nokRelationship">
                                        <Form.Label>Relationship</Form.Label>
                                        <Form.Control type="text" defaultValue="" />
                                    </Form.Group>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="form-section">
                            <h5>Registration Identification Number</h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group controlId="typeName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter type name" />
                                    </Form.Group>
                                </div>
                                <div className="col-md-6 col-xs-2">
                                    <Form.Group controlId="ridAffiliateCompany">
                                        <Form.Label>Affiliate Company</Form.Label>
                                        <Form.Control as="select">
                                            <option value="">Select Affiliate Company</option>
                                            <option value="ABCL">ABCL</option>
                                            <option value="XYZL">XYZL</option>
                                            {/* Add more options as needed */}
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group controlId="ridBeneficiaryDetails">
                                        <Form.Label>Beneficiary Details</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </div>                           
                            </div>
                        </div>
                        <hr />
                        <div className="form-section">
                            <h5>Level, Hierarchy & Account Details</h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group controlId="typeName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter type name" />
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group controlId="lhaBankName">
                                        <Form.Label>Bank Name</Form.Label>
                                        <Form.Control as="select">
                                            <option value="">Select Bank</option>
                                            <option value="Acc">Access Bank</option>
                                            <option value="Uba">United Bank of Africa(UBA)</option>
                                            {/* Add more options as needed */}
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group controlId="lhaUplink">
                                        <Form.Label>Uplink</Form.Label>
                                        <Form.Control as="select">
                                            <option value=""></option>
                                            <option value="1">Ada</option>
                                            <option value="2">Obi</option>
                                            {/* Add more options as needed */}
                                        </Form.Control>
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group controlId="typeName">
                                        <Form.Label>Acc Number</Form.Label>
                                        <Form.Control type="text" placeholder="Enter account number" />
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

export default SalesReps
