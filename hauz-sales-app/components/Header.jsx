import PropTypes from 'prop-types';
import { BsFillBellFill, BsPersonCircle, BsJustify } from 'react-icons/bs';

function Header({ OpenSidebar }) {
    return (
      <header className='header'>
          <div className='menu-icon'>
              <BsJustify className='icon' onClick={OpenSidebar} />
          </div>
          <div className='header-left'>
              {/* <BsSearch  className='icon'/> */}
          </div>
          <div className='header-right'>
              <BsFillBellFill className='icon' />
              <BsPersonCircle className='icon' />
          </div>
      </header>
    );
}

Header.propTypes = {
    OpenSidebar: PropTypes.func.isRequired,
};

export default Header;
