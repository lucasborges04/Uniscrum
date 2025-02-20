import './style.css'
import Api from '../../services/api'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function AdminDashboard() {  
  const [users, setUsers] = useState([]);

  async function getUsers() {
    const usersFromApi = await Api.get('/usuarios');

    setUsers(usersFromApi.data);
  }

  useEffect(() => {
    getUsers();
  }, []);
  
  return (
    <div className="container">
      {users.map(user => (
        <Link to={"/usuario/" + user.id} key={user.id} >
          <button className="button" >
            <div className="card">
              <div>
                <p>Nome: <span>{user.nome}</span></p>
                <p>Papel: <span>{user.papel}</span></p>
                <p>Email: <span>{user.email}</span></p>
              </div>
            </div>
          </button>
        </Link>
      ))}
      
    </div>
  )
}

export default AdminDashboard
