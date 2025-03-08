import React from 'react'
import NavbarGuest from './components/Navbar/NavbarGuest'
import NavbarUser from './components/Navbar/NavbarUser'
import Signup from './components/forms/Signup'
import Login from './components/forms/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import ListedItems from './components/ListedItems'
import About from './components/About'


function App() {
  return (
    <>
    <Router>
      <NavbarUser />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/listed_items' element={<ListedItems/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />

        </Routes>

    </Router>
    
    </>
  )
}

export default App