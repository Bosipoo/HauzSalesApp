import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { BsSearch, BsPlusLg, BsEye, BsPencilSquare } from "react-icons/bs";

const Sales = () => {
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

    const handleView = (id) => {
        // Implement the logic for viewing the record
        console.log("Viewing record with ID:", id);
    };

    const handleEdit = (id) => {
        // Implement the logic for editing the record
        console.log("Editing record with ID:", id);
    };

    return (
        <main className='main-container'>
            <div className='main-title'>
                <h2>SALES</h2>
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
                    <div className="input-group mb-3">
                        <select className="form-select" id="activityStat" name="activityStat">
                            <option defaultValue>Client Status</option>
                            <option value="active">Is Client</option>
                            <option value="inactive">Yet to Be</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-7 col-sm-4 text-right d-flex justify-content-end gap-3">
                    <button className="btn btn-primary btn-block" onClick={handleShow}><BsPlusLg /> Record Sale</button>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-12">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Ref Number</th>
                                    <th scope="col">Property Code</th>
                                    <th scope="col">AKA</th>
                                    <th scope="col">PRN Number</th>
                                    <th scope="col">Client Number</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Outstanding Balance</th>
                                    <th scope="col">Discount Type</th>
                                    <th scope="col">Acc. Officer</th>
                                    <th scope="col">Is Received</th>
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
                                        <td>{record.AccOfficerPhone}</td>
                                        <td>{record.Active}</td>
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

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Sales Data Capture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="row">
                            <div className="col-md-3">
                                <Form.Group controlId="saledId">
                                    <Form.Label>Sales ID</Form.Label>
                                    <Form.Control type="text" />
                                </Form.Group>
                            </div>
                            <div className='col-md-3'></div>
                            <div className='col-md-6'>
                                <Form.Group controlId="salesRefNo">
                                    <Form.Label>Sales Reference Number</Form.Label>
                                    <Form.Control type="text" />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="client">
                                    <Form.Label>Client</Form.Label>
                                    <Form.Control as="select">
                                        <option value=""></option>
                                        <option value="PRN1">PRN1-100002|Mr. Tochukwu Adeleke</option>
                                        <option value="PRN2">PRN2-100003|Mrs. Eunice Abulomo</option>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div className='col-md-6'>
                                <Form.Group controlId="purchaseQty">
                                    <Form.Label>Purchase Quantity</Form.Label>
                                    <Form.Control type="number" />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="project">
                                    <Form.Label>Project</Form.Label>
                                    <Form.Control as="select">
                                        <option value=""></option>
                                        <option value="URBC-YAB-1">URBC-YAB-1|Majoro</option>
                                        <option value="URBC-LSR-1">URBC-LSR-1|Adetola</option>
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            <div className='col-md-6'>
                                <Form.Group controlId="priceComp">
                                    <Form.Label>Price Computation</Form.Label>
                                    <Form.Control type="number" />
                                </Form.Group>
                            </div>
                            <div className="col-md-6">
                                <Form.Group controlId="fractionPrice">
                                    <Form.Label>Price per Fraction</Form.Label>
                                    <Form.Control type="text" />
                                </Form.Group>
                            </div>
                            <div className='col-md-6'>
                                <Form.Group controlId="availFractions">
                                    <Form.Label>Fractions Available</Form.Label>
                                    <Form.Control type="number" />
                                </Form.Group>
                            </div>
                            <div className='col-md-6'>
                                <Form.Group controlId="amtPaid">
                                    <Form.Label>Amount Paid</Form.Label>
                                    <Form.Control type="text" />
                                </Form.Group>
                            </div>
                            <div className='col-md-6'>
                                <Form.Group controlId="discountType">
                                    <Form.Label>Discount Type</Form.Label>
                                    <Form.Control type="number" />
                                </Form.Group>
                            </div>
                            <div className='col-md-6'>
                                <Form.Group controlId="outstandingBal">
                                    <Form.Label>Outstanding Balance</Form.Label>
                                    <Form.Control type="text" />
                                </Form.Group>
                            </div>
                            <div className='col-md-6'>
                                <Form.Group controlId="notes">
                                    <Form.Label>Notes</Form.Label>
                                    <Form.Control as="textarea" rows={2} />
                                </Form.Group>
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
    );
};

export default Sales;
