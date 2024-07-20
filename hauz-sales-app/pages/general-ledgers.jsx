import { useState, useEffect } from 'react';
import { BsSearch, BsPlusLg, BsEye, BsPencilSquare } from "react-icons/bs";
import Link from 'next/link';
import GeneralLedgerModal from '../components/modals/GeneralLedgerModal';
import { addLedger, getLedgers, getLedgerById } from '../services/api';
import withAuth from '../hoc/withAuth';
import checkTokenExpiration from '../hoc/checkTokenExpiration';

const GeneralLedgers = () => {
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    GLGroupID: '',
    GLTypeID: '',
    TempAcctName: '',
    GLAcctDescription: '',
    GLAcctName: '',
    isActive: false,
  });
  const [loading, setLoading] = useState(false);
  const [activityFilter, setActivityFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isViewMode, setIsViewMode] = useState(false);
  const recordsPerPage = 15;

  useEffect(() => {
    const fetchLedgers = async () => {
      try {
        const data = await getLedgers();
        setRecords(data);
      } catch (error) {
        console.error('Error fetching ledgers:', error);
      }
    };

    fetchLedgers();
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  let filteredRecords = records;

  if (activityFilter === 'active') {
    filteredRecords = records.filter(record => record.status);
  } else if (activityFilter === 'inactive') {
    filteredRecords = records.filter(record => !record.status);
  }

  if (searchQuery.trim() !== '') {
    filteredRecords = filteredRecords.filter(record =>
      record.glId.toString().includes(searchQuery.trim()) ||
      record.accountNumber.includes(searchQuery.trim()) ||
      record.glAccName.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      record.glAccDescription.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
  }

  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setIsViewMode(false);
    resetFormData();
  };

  const resetFormData = () => {
    setFormData({
      GLGroupID: '',
      GLTypeID: '',
      TempAcctName: '',
      GLAcctDescription: '',
      GLAcctName: '',
      isActive: false,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
      GLAcctName: name === 'GLGroupID' || name === 'TempAcctName'
        ? `${formData.GLGroupID} | ${formData.TempAcctName}`
        : formData.GLAcctName,
    };

    if (name === 'GLGroupID') {
      updatedFormData.GLTypeID = getGLTypeID(value);
    }

    setFormData(updatedFormData);
  };

  const getGLTypeID = (glGroupID) => {
    switch (glGroupID) {
      case 'INF':
        return 'INF | Inflow for Buyer';
      case 'FL':
        return 'FL | Comm to Freelancer';
      case 'TM':
        return 'TM | Comm to Members';
      case 'TL':
        return 'TL | Comm to Leaders';
      case 'LGL':
        return 'LGL | Legal Fees Charged';
      case 'MKT':
        return 'MKT | Marketing Levy';
      case 'PJR':
        return 'PJR | Project Development';
      default:
        return '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const ledgerData = {
        glGroupId: formData.GLGroupID,
        glTypeId: formData.GLTypeID,
        tempAccName: formData.TempAcctName,
        glAccDescription: formData.GLAcctDescription,
        glAccName: formData.GLAcctName,
        status: formData.isActive,
      };
      await addLedger(ledgerData);
      alert('Form submitted successfully');
      resetFormData();
      handleCloseModal();
    } catch (error) {
      alert('Failed to submit form');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleView = async (id) => {
    resetFormData();
    try {
      const ledgerData = await getLedgerById(id);
      setFormData({
        GLGroupID: ledgerData.glGroupId,
        GLTypeID: ledgerData.glTypeId,
        TempAcctName: ledgerData.tempAccName,
        GLAcctDescription: ledgerData.glAccDescription,
        GLAcctName: ledgerData.glAccName,
        isActive: ledgerData.status,
      });
      setIsViewMode(true);
      handleShowModal();
    } catch (error) {
      console.error('Error fetching ledger details:', error);
    }
  };

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h2>GENERAL LEDGERS</h2>
      </div>

      <div className="row main-header">
        <div className="col-md-3 col-sm-4">
          <div className="input-group mb-3">
            <form className="top" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Search.." name="search2" value={searchQuery} onChange={handleSearchChange} />
              <button type="submit"><BsSearch className='card-icon' /></button>
            </form>
          </div>
        </div>
        <div className="col-md-2 col-sm-4">
          <div className="input-group mb-3">
            <select
              className="form-control"
              value={activityFilter}
              onChange={(e) => setActivityFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="col-md-7 col-sm-4">
          <div className='row'>
            <div className='col-md-12 col-sm-12'>
              <Link href="#" className="btn add-btn bg-primary text-white">
                <span className='add-icon'>
                  <BsPlusLg />
                </span>
                <span className="btn-txt" onClick={() => setShowModal(true)}>Add GL Account</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row card-container">
        <div className="col-12">
          <div className="card bg-none">
            <table className="table">
              <thead>
                <tr>
                  <th>GL ID</th>
                  <th>Account Number</th>
                  <th>GL Account Name</th>
                  <th>GL Account Description</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((record) => (
                  <tr key={record.glId}>
                    <td>{record.glId}</td>
                    <td>{record.accountNumber}</td>
                    <td>{record.glAccName}</td>
                    <td>{record.glAccDescription}</td>
                    <td>{record.status ? 'Active' : 'Inactive'}</td>
                    <td>
                      <button className='btn' onClick={() => handleView(record.glId)}>
                        <BsEye />
                      </button>
                      <button className='btn' onClick={() => handleEdit(record.glId)}>
                        <BsPencilSquare />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <nav>
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
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

      <GeneralLedgerModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={loading}
        isViewMode={isViewMode} // Pass view mode to modal
      />
    </main>
  );

  function handleEdit(id) {
    alert(`Edit item with id: ${id}`);
    // Add your edit logic here
  }
}

export default withAuth(checkTokenExpiration(GeneralLedgers));
