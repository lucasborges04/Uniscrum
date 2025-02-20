import './style.css'

import Api from '../../services/api'
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
function Home() {

  
  const [users, setUsers] = useState([]);
  
  const navigate = useNavigate();
  
  const inputId = useRef()


  async function getUsers() {
    const usersFromApi = await Api.get('/usuarios');

    setUsers(usersFromApi.data);
  }


  async function getUserById() {
    
    try {
      const response = await Api.get(`/usuarios/${inputId.current.value}`);
      navigate(`/usuario/${response.data.id}`); // Redireciona para a rota desejada
    } catch (error) {
      console.error("Erro ao buscar o usuário:", error);
    }
  }

  async function redirectCadastrarUsuario() {
      navigate(`/cadastroUser`); // Redireciona para a rota desejada
  }

  useEffect(() => {
    getUsers();
  }, []);
  

  
  return (
    <div className="container">
      <form action="">
        <h1>Login</h1>
        <input type="text"  name='id' placeholder='id' ref={inputId}/>
       
        <button type='button'  onClick={getUserById}>Iniciar</button>
        <button type='button'  onClick={redirectCadastrarUsuario}>Cadastrar</button>
      </form>
      <h1>Copie um dos id abaixo para logar, ou crie um novo usuario:</h1>
      {users.map(user => (
        <div className="card" key={user.id} >
          <div>
            <p>Nome: <span>{user.nome}</span></p>
            <p>Papel: <span>{user.papel}</span></p>
            <p>Email: <span>{user.email}</span></p>
            <p>id: <span>{user.id}</span></p>
          </div>
        </div>
      ))}
      
    </div>
  )
}

export default Home
