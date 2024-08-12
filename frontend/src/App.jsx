import Dashboard from './components/Dashboard/Dashboard'
import { Routes, Route } from 'react-router-dom'


import './App.css'

function App() {
  

  return (
    <>
    <Routes>
      <Route path='dashboard/*' element={<Dashboard/>} /> 
    </Routes>

      
    </>
  )
}

export default App
