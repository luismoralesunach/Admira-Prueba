import Dashboard from './components/Dashboard/Dashboard'
import Home from './components/Home/Home'
import { Routes, Route } from 'react-router-dom'


import './App.css'

function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='dashboard/*' element={<Dashboard/>} /> 
    </Routes>

      
    </>
  )
}

export default App
