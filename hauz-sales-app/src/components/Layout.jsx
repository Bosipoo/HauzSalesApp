import { useState } from 'react';
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './../Layout.css'

const Layout = ({ children }) => {
    const [openSidebarToggle, setOpenSidebarToogle] = useState(false);

    const OpenSidebar = () => {
        setOpenSidebarToogle(!openSidebarToggle);
    };

    return (
        <div className='grid-container'>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        
            {children}
        
        </div>
    );
};

export default Layout;
