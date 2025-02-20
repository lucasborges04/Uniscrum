import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="container">
      <Navbar/>
      <Outlet />
      <h1>footer</h1>
    </div>
  )
}

export default App
