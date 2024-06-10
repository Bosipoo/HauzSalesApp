import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Home from './pages/Home'
import GeneralLedgers from './pages/GeneralLedgers'
import Properties from './pages/Properties'
import Prospects from './pages/Prospects'
import Sales from './pages/Sales'
import SalesReps from './pages/SalesReps'
import Transactions from './pages/Transactions'
import LedgerAccStatement from './pages/LedgerAccStatement'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout><Home /></Layout>}/>
            <Route path="/general-ledgers" element={<Layout><GeneralLedgers /></Layout>} />
            <Route path="/properties" element={<Layout><Properties /></Layout>} />
            <Route path="/prospects" element={<Layout><Prospects /></Layout>} />
            <Route path="/sales" element={<Layout><Sales /></Layout>} />
            <Route path="/sales-reps" element={<Layout><SalesReps /></Layout>} />
            <Route path="/transactions" element={<Layout><Transactions /></Layout>} />
            <Route path="/ledger-acc-statement/:id" element={<Layout><LedgerAccStatement /></Layout>} />
        </Routes>
    </Router>
  )
}

export default App
