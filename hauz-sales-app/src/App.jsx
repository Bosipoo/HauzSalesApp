import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Home from './pages/Home'
import GeneralLedgers from './pages/GeneralLedgers'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
        <Switch>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout><Home /></Layout>}/>
            <Route path="/general-ledgers" element={<Layout><GeneralLedgers /></Layout>} />
        </Switch>
    </Router>
  )
}

export default App
