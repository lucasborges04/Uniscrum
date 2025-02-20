
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <ul className="nav nav-pills">
      <li className="nav-item">
        <Link to="/"><a className="nav-link active" aria-current="page" href="#">Home</a></Link>
      </li>
      <li className="nav-item">
        <Link to="/cadastroUser"> <a className="nav-link" href="#">Cadastrar Usuario</a></Link>
        <a className="nav-link" href="#"></a>
      </li>
    
    </ul>
  )
}

export default Navbar
