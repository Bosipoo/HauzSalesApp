import { useState, useEffect } from 'react';
import { BsSearch, BsPlusLg, BsEye, BsPencilSquare } from "react-icons/bs";
import Link from 'next/link';
import GeneralLedgerModal from '../components/modals/GeneralLedgerModal';
import { addLedger, getLedgers } from '../services/api';
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
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(records.length / recordsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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
      setFormData({
        GLGroupID: '',
        GLTypeID: '',
        TempAcctName: '',
        GLAcctDescription: '',
        GLAcctName: '',
        isActive: false,
      });
      handleCloseModal();
    } catch (error) {
      alert('Failed to submit form');
    } finally {
      setLoading(false);
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
            <form className="top" action="#">
              <input type="text" placeholder="Search.." name="search2" />
              <button type="submit"><BsSearch className='card-icon' /></button>
            </form>
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
                  <tr key={record.glId}>
                    <th scope="row">{record.glId}</th>
                    <td><Link href={`/ledger-acc-statement/${record.accountNumber}`}>{record.accountNumber}</Link></td>
                    <td>{record.glAccName}</td>
                    <td>{record.glAccDescription}</td>
                    <td>{record.status ? 'Active' : 'Inactive'}</td>
                    <td>
                      <button className="btn btn-link p-0 me-2" onClick={() => handleView(record.glId)}>
                        <BsEye />
                      </button>
                      <button className="btn btn-link p-0" onClick={() => handleEdit(record.glId)}>
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

      <GeneralLedgerModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={loading}
      />
    </main>
  );

  function handleView(id) {
    alert(`View item with id: ${id}`);
    // Add your view logic here
  }

  function handleEdit(id) {
    alert(`Edit item with id: ${id}`);
    // Add your edit logic here
  }
}

export default withAuth(checkTokenExpiration(GeneralLedgers));
