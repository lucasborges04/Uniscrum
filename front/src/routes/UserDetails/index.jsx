import './style.css';
import { useParams } from 'react-router-dom';
import Api from '../../services/api';
import { useEffect, useState } from 'react';

function UserDetails() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [sprintsWithDailies, setSprintsWithDailies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    try {
      const userResponse = await Api.get(`/usuarios/${id}`);
      setUser(userResponse.data);
    } catch (err) {
      setError('Erro ao buscar os dados do usuário.');
      console.error(err);
    }
  };

  const fetchSprintsAndDailies = async () => {
    try {
      const participantesSprint = await Api.get(`/participantes-sprint/${id}`);
      const participantesDaily = await Api.get(`/participantes-daily/${id}`);

      // Obter sprints
      const sprintPromises = participantesSprint.data.map(({ sprintId }) =>
        Api.get(`/sprints/${sprintId}`).then((res) => res.data)
      );
      const sprints = await Promise.all(sprintPromises);

      // Obter dailies
      const dailyPromises = participantesDaily.data.map(({ dailyId }) =>
        Api.get(`/dailies/${dailyId}`).then((res) => res.data)
      );
      const dailies = await Promise.all(dailyPromises);

      // Vincular dailies às sprints
      const sprintsWithDailies = sprints.map((sprint) => {
        const relatedDailies = dailies.filter((daily) => daily.sprintId === sprint.id);
        return { ...sprint, dailies: relatedDailies };
      });

      setSprintsWithDailies(sprintsWithDailies);
    } catch (err) {
      setError('Erro ao buscar sprints e dailies.');
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchUserData();
      await fetchSprintsAndDailies();
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  if (loading) {
    return <div className="container">Carregando...</div>;
  }

  if (error) {
    return <div className="container">{error}</div>;
  }

  return (
    <div className="container">
      <h1>Detalhes do Usuário</h1>
      {user && (
        <div className="card">
          <div>
            <p>Nome: <span>{user.nome}</span></p>
            <p>Papel: <span>{user.papel}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
        </div>
      )}

      <h1>Sprints e suas Dailies</h1>
      {sprintsWithDailies.length > 0 ? (
        sprintsWithDailies.map((sprint) => (
          <div className="card" key={sprint.id}>
            <div>
              <p>Nome: <span>{sprint.nome}</span></p>
              <p>Objetivo: <span>{sprint.objetivo}</span></p>
              <p>Data Início: <span>{formatDate(sprint.dataInicio)}</span></p>
              <p>Data Fim: <span>{formatDate(sprint.dataFim)}</span></p>
            </div>
            <div>
              <h3>Dailies</h3>
              {sprint.dailies.length > 0 ? (
                sprint.dailies.map((daily) => (
                  <div className="sub-card" key={daily.id}>
                    <p>Notas: <span>{daily.notas}</span></p>
                    <p>Avaliacao: <span>{daily.avaliacao}</span></p>
                    <p>Data e Hora: <span>{formatDate(daily.dataHora)}</span></p>
                  </div>
                ))
              ) : (
                <p>Sem dailies associadas.</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>O usuário não participa de nenhuma sprint.</p>
      )}
    </div>
  );
}

export default UserDetails;
