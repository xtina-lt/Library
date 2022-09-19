import './App.css';
import React, {useState} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/site/Header';
import Nav from './components/site/Nav';
import Catchall from './components/site/Catchall';
import LoginOReg from './components/users/LoginOReg';
import Dashboard from './components/users/Dashboard';
import GifShop from './components/gifshop/GifShop';
import Home from './components/site/Home';
import ProjectsAdmin from './components/projects/ProjectsCreate';
import Projects from './components/projects/Projects';

function App() {
  const [header, setHeader] = useState('XTINA.CODES')
  return (
    <>
    <Header header={header}/>
    <Nav/>
    <main>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<Catchall setHeader={setHeader}/>}/>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/login' element={<LoginOReg/>}/>
          <Route exact path='/dash' element={<Dashboard setHeader={setHeader}/>} />
          <Route exact path='/gifshop' element={<GifShop setHeader={setHeader}/>}/>
          <Route exact path='/projects-admin' element={<ProjectsAdmin/>}/>
          <Route exact path='/projects' element={<Projects setHeader={setHeader}/>}/>
        </Routes>
      </BrowserRouter>
    </main>
    </>
  )
}

export default App;
