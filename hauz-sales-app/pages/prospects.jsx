import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { BsSearch, BsPlusLg, BsEye, BsPencilSquare } from "react-icons/bs";
import { getProspect, addProspect } from '../services/api';
import ProspectModal from '../components/modals/ProspectModal';

const Prospects = () => {
    const [prospects, setProspects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [clientStatusFilter, setClientStatusFilter] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        firstName: "",
        lastName: "",
        otherNames: "",
        dateOfBirth: "",
        gender: "",
        stateOfOrigin: "",
        phone: "",
        maritalStatus: "",
        email: "",
        address: "",
        employmentStatus: "",
        placeOfWork: "",
        companyAddress: "",
        areasOfInterest: "",
        refererCompany: "",
        lastCodeGenerated: "",
        refererIdentity: "",
        regCode: "",
        clientStatus: ""
    });

    const [nextOfKin, setNextOfKin] = useState({
        nextOfKinName: "",
        nextOfKinAddress: "",
        nextOfKinPhone: "",
        nextOfKinRelationship: ""
    });

    const recordsPerPage = 15;

    useEffect(() => {
        fetchProspects();
    }, []);

    const fetchProspects = async () => {
        try {
            const data = await getProspect();
            setProspects(data);
        } catch (error) {
            console.error("Failed to fetch prospects: ", error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleView = (id) => {
        console.log(`Viewing record with ID: ${id}`);
    };

    const handleEdit = (id) => {
        console.log(`Editing record with ID: ${id}`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleNextOfKinChange = (e) => {
        const { name, value } = e.target;
        setNextOfKin({ ...nextOfKin, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { ...formData, ...nextOfKin };
            await addProspect(data);
            fetchProspects(); // Refresh the prospects list after adding a new one
            handleClose();
        } catch (error) {
            console.error("Failed to add prospect: ", error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleStatusFilterChange = (e) => {
        setClientStatusFilter(e.target.value);
    };

    const filterProspects = () => {
        return prospects.filter(prospect => {
            const matchesSearchTerm =
                searchTerm === "" ||
                prospect.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                prospect.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                prospect.phone.includes(searchTerm) ||
                prospect.regCode.includes(searchTerm);
            const matchesStatusFilter =
                clientStatusFilter === "" || prospect.clientStatus === clientStatusFilter;
            return matchesSearchTerm && matchesStatusFilter;
        });
    };

    const filteredProspects = filterProspects();
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredProspects.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredProspects.length / recordsPerPage);

    return (
        <main className='main-container'>
            <div className='main-title'>
                <h2>PROSPECTS</h2>
            </div>

            <div className="row main-header">
                <div className="col-md-3 col-sm-4">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            placeholder="Search.."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="form-control"
                        />
                        <button type="button" className="btn btn-secondary">
                            <BsSearch className='card-icon' />
                        </button>
                    </div>
                </div>
                <div className="col-md-2 col-sm-4">
                    <div className="input-group mb-3">
                        <select className="form-select" id="activityStat" name="activityStat" value={clientStatusFilter} onChange={handleStatusFilterChange}>
                            <option value="">Client Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-7 col-sm-4 text-right d-flex justify-content-end gap-3">
                    <button className="btn btn-primary btn-block" onClick={handleShow}><BsPlusLg /> Add Prospect</button>
                </div>
            </div>

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
                                    {/* <th scope="col">Acc. Officer</th>
                                    <th scope="col">Acc. Officer Phone</th> */}
                                    <th scope="col">Active</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRecords.map(record => (
                                    <tr key={record.id}>
                                        <th scope="row">{record.id}</th>
                                        <td>{record.regCode}</td>
                                        <td>{`${record.title} ${record.firstName} ${record.lastName}`}</td>
                                        <td>{record.phone}</td>
                                        <td>{record.gender}</td>
                                        <td>{new Date(record.dateOfBirth).toLocaleDateString()}</td>
                                        <td>{record.clientStatus}</td>
                                        {/* <td>{record.accOfficer}</td>
                                        <td>{record.accOfficerPhone}</td> */}
                                        <td>{record.active}</td>
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
                </div>
            </div>

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

            <ProspectModal
                show={showModal}
                handleClose={handleClose}
                formData={formData}
                nextOfKin={nextOfKin}
                handleInputChange={handleInputChange}
                handleNextOfKinChange={handleNextOfKinChange}
                handleSubmit={handleSubmit}
            />
        </main>
    );
};

export default Prospects;
