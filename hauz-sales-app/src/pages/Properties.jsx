import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { BsSearch, BsPlusLg, BsEye, BsPencilSquare } from "react-icons/bs"
import './../Properties.css'

const Properties = () => {
    const records = [
        { ID: 1, PropertyCode: 'URBC-YAB-1', Name: 'Majaro', FractionNo: 315, QtyOrdered: 74.5, Balance: 240.5, PricePerFraction: '$125000', Date: '14/04/2024', OffplanTranche: '7.50%', OffplanBullet: '5%', ConstructionStage: '2%', Active: true },
        { ID: 2, PropertyCode: 'URBC-LSR-1', Name: 'Adetola', FractionNo: 350, QtyOrdered: 45, Balance: 300, PricePerFraction: '$165000', Date: '18/04/2024', OffplanTranche: '7.50%', OffplanBullet: '5%', ConstructionStage: '2%', Active: true }
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
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
          ...formData,
          [name]: type === 'checkbox' ? checked : value,
        });
    
        if (name === 'GLGroupID' || name === 'TempAcctName') {
          setFormData((prevState) => ({
            ...prevState,
            GLAcctName: `${formData.GLGroupID} | ${formData.TempAcctName}`
          }));
        }
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        alert('Form submitted');
        handleCloseModal();
      };

    return (
        <main className='main-container'>
            <div className='main-title'>
                <h2>PROPERTIES</h2>
            </div>

            <div className="row main-header">
                <div className="col-md-3 col-sm-4">
                    <div className="input-group mb-3">
                    <form class="top" action="#">
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
                <div className="col-md-7 col-sm-4 text-right  d-flex justify-content-end">
                    {/* Button for adding general ledgers */}
                    <button className="btn btn-primary btn-block" onClick={handleShow}><BsPlusLg /> Add Property</button>
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
                        <th scope="col">Property Code</th>
                        <th scope="col">Name</th>
                        <th scope="col">No. of Fractions</th>
                        <th scope="col">Qty Ordered</th>
                        <th scope="col">Balance</th>
                        <th scope="col">Price per Fraction</th>
                        <th scope="col">Date</th>
                        <th scope="col">Offplan Tranche</th>
                        <th scope="col">Offplan Bullet</th>
                        <th scope="col">Construction Stage</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentRecords.map(record => (
                        <tr key={record.ID}>
                        <th scope="row">{record.ID}</th>
                        <td>{record.PropertyCode}</td>
                        <td>{record.Name}</td>
                        <td>{record.FractionNo}</td>
                        <td>{record.QtyOrdered}</td>
                        <td>{record.Balance}</td>
                        <td>{record.PricePerFraction}</td>
                        <td>{record.Date}</td>
                        <td>{record.OffplanTranche}</td>
                        <td>{record.OffplanBullet}</td>
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
      </main>
    )

    function handleView(id) {
        alert(`View item with id: ${id}`);
        // Add your view logic here
      }
    
      function handleEdit(id) {
        alert(`Edit item with id: ${id}`);
        // Add your edit logic here
      }
}

export default Properties