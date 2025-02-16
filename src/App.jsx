import { useState } from 'react'

import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Header from './components/Header/Header'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import Create from './components/Create/Create'
import Post from './store/PostContext'
import View from './components/View/View'
import Footer from './components/Footer/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Post>
     <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/view' element={<View/>}/>
      </Routes>
     
     </Router>
     </Post>
    </>
  )
}

export default App
