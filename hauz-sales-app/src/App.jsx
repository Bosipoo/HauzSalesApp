import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login'
import Home from './pages/Home'
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import GeneralLedgers from './pages/GeneralLedgers';
import './App.css'

function App() {
  const [openSidebarToggle, setOpenSidebarToogle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToogle(!openSidebarToggle);
  };


  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <Router>
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/general-ledgers" element={<GeneralLedgers />} />
          </Routes>
      </Router>
    </div>
  )
}

export default App
