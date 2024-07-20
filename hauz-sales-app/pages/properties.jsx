import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import PropertyModal from '../components/modals/PropertyModal';
import AddPropertyTypeModal from '../components/modals/AddPropertyTypeModal';
import { BsPlusLg, BsEye, BsPencilSquare } from 'react-icons/bs';
import { getProperties } from '../services/api';
import withAuth from '../hoc/withAuth';
import checkTokenExpiration from '../hoc/checkTokenExpiration';

const Properties = () => {
  const [showAddPropertyTypeModal, setShowAddPropertyTypeModal] = useState(false);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 20;

  const fetchProperties = async () => {
    try {
      const data = await getProperties();
      setProperties(data);
      setFilteredProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error.message);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = properties.filter((property) =>
      property.projectCode.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProperties(filtered);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleShowPropertyModal = () => setShowPropertyModal(true);
  const handleClosePropertyModal = () => setShowPropertyModal(false);

  const openAddPropertyTypeModal = () => setShowAddPropertyTypeModal(true);
  const closeAddPropertyTypeModal = () => setShowAddPropertyTypeModal(false);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredProperties.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredProperties.length / recordsPerPage);

  return (
    <main className="main-container">
      <div className="main-title">
        <h2>PROPERTIES</h2>
      </div>

      <div className="row main-header">
        <div className="col-md-3 col-sm-4">
          <div className="input-group mb-3">
            <input
              type="text"
              placeholder="Search.."
              value={searchTerm}
              onChange={handleSearch}
              className="form-control"
              name="search2"
            />
          </div>
        </div>
        <div className="col-md-2 col-sm-4">
          <div className="input-group mb-3">
            <select className="form-select" id="activityStat" name="activityStat">
              <option defaultValue>Activity Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="col-md-7 col-sm-4 text-right d-flex justify-content-end">
          <button className="btn btn-primary btn-block" onClick={handleShowPropertyModal}>
            <BsPlusLg /> Add Property
          </button>
          <Button variant="success" className="ms-4" onClick={openAddPropertyTypeModal}>
            Add Property Type
          </Button>
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
                  <th scope="col">No. of Fractions</th>
                  <th scope="col">Price per Fraction</th>
                  <th scope="col">Offplan Tranche</th>
                  <th scope="col">Offplan Bullet</th>
                  <th scope="col">Construction Stage</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((record) => (
                  <tr key={record.id}>
                    <th scope="row">{record.id}</th>
                    <td>{record.projectCode}</td>
                    <td>{record.noOfFractions}</td>
                    <td>{record.pricePerFraction}</td>
                    <td>{record.offPlanTrancheDisc}</td>
                    <td>{record.offPlanBulletDisc}</td>
                    <td>{record.constructionStageDisc}</td>
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
      <PropertyModal
        showModal={showPropertyModal}
        handleClose={handleClosePropertyModal}
        fetchProperties={fetchProperties}
      />
      <AddPropertyTypeModal
        showModal={showAddPropertyTypeModal}
        handleClose={closeAddPropertyTypeModal}
      />
    </main>
  );
};

export default withAuth(checkTokenExpiration(Properties));
