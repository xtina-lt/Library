import './App.css';
import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Catchall from './components/site/Catchall';
import Home from './components/site/Home';
import LoginOReg from './components/site/LoginOReg';
import Dashboard from './components/site/Dashboard'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<Catchall/>}/>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/login' element={<LoginOReg/>}/>
        <Route exact path='/dash/:id' element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
