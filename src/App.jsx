import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'

export default function App() {
  return (
    <div>
      <nav>Hotel Staff Management</nav>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/create' element={<CreatePage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
