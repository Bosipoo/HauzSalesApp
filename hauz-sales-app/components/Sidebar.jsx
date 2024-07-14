import { BsCart3, BsGridFill, BsFileText, BsBuilding, BsPeople, BsPersonCheck, BsBag, BsCreditCard } from 'react-icons/bs';
import PropTypes from 'prop-types';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar'>
                <div className='sidebar-title'>
                    <div className='sidebar-brand'>
                        <BsCart3 className='icon_header' /> HAUZ
                    </div>
                    <span className='icon close_icon' onClick={OpenSidebar}>X</span>
                </div>
            </div>

            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <a href="/">
                        <BsGridFill className='icon' /> Dashboard
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="/general-ledgers">
                        <BsFileText className='icon' /> General Ledgers
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="/properties">
                        <BsBuilding className='icon' /> Properties
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="/sales-reps">
                        <BsPeople className='icon' /> Sales Reps
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="/prospects">
                        <BsPersonCheck className='icon' /> Prospects
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="/sales">
                        <BsBag className='icon' /> Sales
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="/transactions">
                        <BsCreditCard className='icon' /> Transactions
                    </a>
                </li>
            </ul>
        </aside>
    );
}

Sidebar.propTypes = {
    openSidebarToggle: PropTypes.bool.isRequired,
    OpenSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
