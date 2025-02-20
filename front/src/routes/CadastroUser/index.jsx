import './style.css'
import Trash from '../../assets/deletar.svg'
import Api from '../../services/api'
import { useEffect, useState, useRef } from 'react';
function CadastroUser() {

  
  const [users, setUsers] = useState([]);
  
  const inputName = useRef()
  const inputPapel = useRef()
  const inputEmail = useRef()


  async function getUsers() {
    const usersFromApi = await Api.get('/usuarios');

    setUsers(usersFromApi.data);
  }

  async function createUsers() {
    await Api.post('/usuarios', {
      nome: inputName.current.value,
      email: inputEmail.current.value,
      papel: inputPapel.current.value
    })
   
  }

  async function deleteUsers(id) {
    console.log("Entrou aquiiiiiiii")
    await Api.delete(`/usuarios/${id}`)
  }

  useEffect(() => {
    getUsers();
  }, []);
  
  function logg() {
    console.log(inputPapel.current.value)
  }
  
  return (
    <div className="container">
      <form action="" onChange={logg}>
        <h1>Cadastro de usuários</h1>
        <input type="text" name='nome' placeholder='nome' ref={inputName}/>
        <input type="email"  name='email' placeholder='e-mail' ref={inputEmail}/>
        
        <select className="form-select bg-dark text-light" aria-label="Default select example" ref={inputPapel}>
          <option>Selecione o tipo de usuário:</option>
          <option value="admin">Admin</option>
          <option value="gerente">Gerente</option>
          <option value="usuario">Usuário</option>
        </select>

        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map(user => (
        <div className="card" key={user.id} >
          <div>
            <p>Nome: <span>{user.nome}</span></p>
            <p>Papel: <span>{user.papel}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} alt="" />
          </button>
        </div>
      ))}
      
    </div>
  )
}

export default CadastroUser
