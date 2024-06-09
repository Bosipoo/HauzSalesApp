import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { BsSearch, BsPlusLg, BsEye, BsPencilSquare } from "react-icons/bs"
import { Link } from 'react-router-dom'

const GeneralLedgers = () => {
  const records = [
    { GLID: 1, LedgerAcctID: 'LA001', GLAcctName: 'General Ledger 1', GLAcctDescription: 'Description 1', status: 'Active' },
    { GLID: 2, LedgerAcctID: 'LA002', GLAcctName: 'General Ledger 2', GLAcctDescription: 'Description 2', status: 'Inactive' },
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

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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
    <>
      <main className='main-container'>
        <div className='main-title'>
            <h2>GENERAL LEDGERS</h2>
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
            <button className="btn btn-primary btn-block" onClick={handleShowModal}><BsPlusLg /> Add General Ledger</button>
          </div>
        </div>

         {/* Bootstrap Table */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">GL ID</th>
                    <th scope="col">Ledger Account ID</th>
                    <th scope="col">GL Account Name</th>
                    <th scope="col">GL Account Description</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.map(record => (
                    <tr key={record.GLID}>
                      <th scope="row">{record.GLID}</th>
                      <td><Link to={`/ledger-acc-statement/${record.LedgerAcctID}`}>{record.LedgerAcctID}</Link></td>
                      <td>{record.GLAcctName}</td>
                      <td>{record.GLAcctDescription}</td>
                      <td>{record.status}</td>
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
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>General Ledgers Data Entry</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formGLAcctNumber" className='mb-3'>
                <Form.Label>GL Account Number</Form.Label>
                <Form.Control
                  type="text"
                  name="GLAcctNumber"
                  value={formData.GLAcctNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

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
                  <option value="TM">TM | Payments due to Team Leaders</option>
                  <option value="LGL">LGL | Legal Fees Collected</option>
                  <option value="MKT">MKT | Marketing Levies Collected</option>
                  <option value="PJR">PJR | Amounts due to project</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formGLTypeID" className='mb-3'>
                <Form.Label>GL Type ID</Form.Label>
                <Form.Control
                  as="select"
                  name="GLTypeID"
                  value={formData.GLTypeID}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Type ID</option>
                  {/* Add GL Type ID options here */}
                </Form.Control>
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

              <Button variant="primary" type="submit" className="w-100" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </main>
    
    </>
    
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

export default GeneralLedgers