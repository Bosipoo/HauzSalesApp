import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { BsSearch, BsPlusLg, BsEye, BsPencilSquare, BsFileEarmarkCheck } from "react-icons/bs"

const Transactions = () => {
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
    const [showPymtModal, setShowPymtModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
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
    const handlePymtShow =() => setShowPymtModal(true);
    const handlePymtClose = () => setShowPymtModal(false);

    return (
        <main className='main-container'>
            <div className='main-title'>
                <h2>TRANSACTIONS</h2>
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
                    <button className="btn btn-primary btn-block" onClick={handlePymtShow}><BsFileEarmarkCheck /> Generate Payment File</button>
                    <button className="btn btn-primary btn-block" onClick={handleShow}><BsPlusLg /> Add Transaction</button>
                </div>
            </div>

            {/* Bootstrap Table */}
            <div className="row mt-4">
                <div className="col-12">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Voucher</th>
                                    <th scope="col">TransID</th>
                                    <th scope="col">VNo</th>
                                    <th scope="col">Entry Date</th>
                                    <th scope="col">GL A/c Name</th>
                                    <th scope="col">Narration</th>
                                    <th scope="col">Debit</th>
                                    <th scope="col">Credit</th>
                                    <th scope="col">SalesID</th>
                                    <th scope="col">ProspectID</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRecords.map(record => (
                                    <tr key={record.ID}>
                                        <th scope="row">{record.ID}</th>
                                        <td>{}</td>
                                        <td>{record.ProspectNum}</td>
                                        <td>{record.Phone}</td>
                                        <td>{record.ProspectNum}</td>
                                        <td>{record.Name}</td>
                                        <td>{record.ID}</td>
                                        <td>{}</td>
                                        <td>{}</td>
                                        <td>{}</td>
                                        <td>
                                            <button className="btn btn-link p-0 me-2" onClick={() => handleView(record.GLID)}>
                                                <BsEye />
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

            {/* Form Modal */}
            <Modal show={showModal} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                <Modal.Title>Property Data Capture Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="row mb-3">
                            <div className="col-md-2">
                                <Form.Group controlId="SSID">
                                    <Form.Label>SSID</Form.Label>
                                    <Form.Control type="number" placeholder="" />
                                </Form.Group>
                            </div>
                            <div className="col-md-4">
                                <Form.Group controlId="projectCode">
                                    <Form.Label>Project Code</Form.Label>
                                    <Form.Control type="text" placeholder="" />
                                </Form.Group>
                            </div>
                        </div>
                        <hr />
                        <div className="form-section">
                            <h5>Personal Information</h5>
                            <div className="row">
                                <div className="col-md-12">
                                    <Form.Group controlId="description">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" rows={3} placeholder="Enter description" />
                                    </Form.Group>
                                </div>
                                <div className="col-md-12">
                                    <Form.Group controlId="address">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control as="textarea" rows={2} placeholder="Enter address" />
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-4">
                                    <Form.Group controlId="offPlanTrancheDisc">
                                        <Form.Label>Off-Plan Tranche Disc</Form.Label>
                                        <Form.Control type="number" defaultValue="0" />
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group controlId="offPlanBulletDisc">
                                        <Form.Label>Off-Plan Bullet Disc</Form.Label>
                                        <Form.Control type="number" defaultValue="0" />
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group controlId="constructionStageDisc">
                                        <Form.Label>Construction Stage Disc</Form.Label>
                                        <Form.Control type="number" className="highlighted" defaultValue="0" />
                                    </Form.Group>
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className="col-md-4">
                                    <Form.Group controlId="noDiscount">
                                        <Form.Label>No Discount</Form.Label>
                                        <Form.Control type="number" className="highlighted" defaultValue="0" />
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group controlId="pricePerFraction">
                                        <Form.Label>Price Per Fraction</Form.Label>
                                        <Form.Control type="number" defaultValue="0" />
                                    </Form.Group>
                                </div>
                                <div className="col-md-4">
                                    <Form.Group controlId="noOfFractions">
                                        <Form.Label>No of Fractions</Form.Label>
                                        <Form.Control type="number" defaultValue="0" />
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-4">
                                    <Form.Group controlId="moniker">
                                        <Form.Label>Moniker</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </div>
                                <div className="col-md-4 d-flex align-items-end">
                                    <Form.Group controlId="active">
                                        <Form.Check type="checkbox" label="Active" />
                                    </Form.Group>
                                </div>
                                <div className="col-md-4 d-flex align-items-end">
                                    <Button variant="secondary" className="w-100">Update</Button>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="form-section">
                        <h5>Property Type Details</h5>
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group controlId="typeName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter type name" />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="typeCode">
                                    <Form.Label>Type Code</Form.Label>
                                    <Form.Control type="text" />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="noOfUnits">
                                    <Form.Label>No of Units</Form.Label>
                                    <Form.Control type="number" defaultValue="0" />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="noOfFractionsPerUnit">
                                    <Form.Label>No of Fractions per Unit</Form.Label>
                                    <Form.Control type="number" defaultValue="0" />
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12">
                            <Form.Group controlId="typeDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} />
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

            {/* Payment Modal */}
            <Modal show={showPymtModal} onHide={handlePymtClose} size='lg' centered>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <>
                        <div className='row'>
                            <h2 className='text-center p-4'>Download Generated File</h2>
                        </div>
                        <div className='row'>
                            <Button variant="success" className="w-50 mx-auto">
                                Download
                            </Button>
                        </div>
                    </>
                </Modal.Body>
            </Modal>
    
        </main>
      )
}

export default Transactions