import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { BsSearch, BsPlusLg, BsEye, BsPencilSquare } from "react-icons/bs";

const Prospects = () => {
    const records = [
        { ID: 1, ProspectNum: 'PRN1-10001', Name: 'Mr. Tochukwu Chiroma Adeleke', Phone: '09087777777', Gender: 'Male', CapDate: '11/04/2024', ClientStatus: true, AccOfficer: 'ADAMU ADEMOLA CHIGOZIE', AccOfficerPhone: '080233333333', Active: true },
        { ID: 2, ProspectNum: 'PRN1-10002', Name: 'Mrs. Eunice Ijeoma Abuloma', Phone: '09087777777', Gender: 'Female', CapDate: '11/04/2024', ClientStatus: true, AccOfficer: 'JEGEDE ALIMOTU CHINWE', AccOfficerPhone: '080233333333', Active: true },
        { ID: 3, ProspectNum: 'PRN1-10003', Name: 'Mr. Omotayo Adewunmi', Phone: '09087777777', Gender: 'Male', CapDate: '11/04/2024', ClientStatus: true, AccOfficer: 'ADAMU ADEMOLA CHIGOZIE', AccOfficerPhone: '080233333333', Active: true },
        { ID: 4, ProspectNum: 'PRN2-10001', Name: 'Mr. Olayide Lookman', Phone: '09087777777', Gender: 'Male', CapDate: '11/04/2024', ClientStatus: true, AccOfficer: 'ADAMU ADEMOLA CHIGOZIE', AccOfficerPhone: '080233333333', Active: true },
        { ID: 5, ProspectNum: 'PRN3-10001', Name: 'Ms. Ngozi Abel', Phone: '09087777777', Gender: 'Female', CapDate: '12/05/2024', ClientStatus: true, AccOfficer: 'ADAMU ADEMOLA CHIGOZIE', AccOfficerPhone: '080233333333', Active: true }
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

    // Define handleView and handleEdit functions
    const handleView = (id) => {
        // Implement view functionality
        console.log(`Viewing record with ID: ${id}`);
    };

    const handleEdit = (id) => {
        // Implement edit functionality
        console.log(`Editing record with ID: ${id}`);
    };

    // Remove unused state and functions
    // const [show, setShow] = useState(false);
    // const [formData, setFormData] = useState({
    //     name: '',
    //     email: '',
    //     checkboxes: [
    //         { label: 'Checkbox 1', checked: false },
    //         { label: 'Checkbox 2', checked: false },
    //         { label: 'Checkbox 3', checked: false },
    //         { label: 'Checkbox 4', checked: false },
    //         { label: 'Checkbox 5', checked: false },
    //         { label: 'Checkbox 6', checked: false },
    //         { label: 'Checkbox 7', checked: false },
    //         { label: 'Checkbox 8', checked: false },
    //         { label: 'Checkbox 9', checked: false },
    //         { label: 'Checkbox 10', checked: false },
    //     ],
    // });

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };

    // const handleCheckboxChange = (index) => {
    //     const updatedCheckboxes = formData.checkboxes.map((checkbox, i) =>
    //         i === index ? { ...checkbox, checked: !checkbox.checked } : checkbox
    //     );
    //     setFormData({ ...formData, checkboxes: updatedCheckboxes });
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(formData);
    //     handleClose();
    // };

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
                </div>
            </div>

            {/* Pagination */}
            <div className="row mt-4">
                <div className="col-12">
                    <nav>
                        <ul className="pagination justify-content-center">
                            {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
                                <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(pageNumber)}>
                                        {pageNumber}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Modal */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add/Edit Prospect</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Form to add/edit prospects */}
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" />
                        </Form.Group>
                        <Form.Group controlId="formPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" placeholder="Enter phone number" />
                        </Form.Group>
                        {/* Add more fields as necessary */}
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </main>
    );
};

export default Prospects;
