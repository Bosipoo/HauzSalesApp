import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { BsSearch, BsPlusLg, BsEye, BsPencilSquare } from "react-icons/bs";
import { getSalesRep } from '../services/api';
import AddSalesRepModal from '../components/modals/AddSalesRepModal';

const SalesReps = () => {
    const [records, setRecords] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const recordsPerPage = 15;

    useEffect(() => {
        fetchSalesReps();
    }, []);

    const fetchSalesReps = async () => {
        const response = await getSalesRep();
        setRecords(response);
    };

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

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredRecords = records.filter(record =>
        record.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className='main-container'>
            <div className='main-title'>
                <h2>SALES REPRESENTATIVE</h2>
            </div>

            <div className="row main-header">
                <div className="col-md-3 col-sm-4">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            placeholder="Search.."
                            name="search2"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <button type="submit"><BsSearch className='card-icon' /></button>
                    </div>
                </div>
                {/* <div className="col-md-2 col-sm-4">
                    <div className="input-group mb-3">
                        <select className="form-select" id="activityStat" name="activityStat">
                            <option defaultValue>Activity Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div> */}
                <div className="col-md-7 col-sm-4 text-right d-flex justify-content-end gap-3">
                    {/* Button for adding */}
                    <button className="btn btn-primary btn-block" onClick={handleShow}><BsPlusLg /> Add Sales Representative</button>
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
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">State</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord).map(record => (
                                    <tr key={record.id}>
                                        <th scope="row">{record.id}</th>
                                        <td>{record.firstName}</td>
                                        <td>{record.lastName}</td>
                                        <td>{record.email}</td>
                                        <td>{record.phone1}</td>
                                        <td>{record.state}</td>
                                        <td>{record.gender}</td>
                                        <td>
                                            <button className="btn btn-link p-0 me-2" onClick={() => handleView(record.id)}>
                                                <BsEye />
                                            </button>
                                            <button className="btn btn-link p-0" onClick={() => handleEdit(record.id)}>
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

            {/* Add Sales Representative Modal */}
            <AddSalesRepModal show={showModal} handleClose={handleClose} refreshData={fetchSalesReps} />
        </main>
    );
};

export default SalesReps;
