import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'

export default function App() {
  return <BrowserRouter>
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/"><span className="brand-mark">A</span><span>Atrium <small>HOTEL OPERATIONS</small></span></NavLink>
        <nav className="main-nav" aria-label="Main navigation"><NavLink to="/" end>People</NavLink><NavLink to="/create">Add staff</NavLink></nav>
        <div className="account-chip"><span className="online-dot" /> Admin desk</div>
      </header>
      <Routes><Route path="/" element={<HomePage />} /><Route path="/create" element={<CreatePage />} /></Routes>
    </div>
  </BrowserRouter>
}
