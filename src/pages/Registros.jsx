import { Link } from 'react-router-dom';
import '../pages/Registros.css';

function Registros({ registros, onDeletar }) {

  const handleDeletarClick = (id, nome) => {
    if (window.confirm(`Tem certeza que deseja deletar o registro de "${nome}"?`)) {
      onDeletar(id);
    }
  };

  return (
    <div className="registros-container">
      <h1>Registros de Temperatura</h1>
      
      <Link to="/" className="btn-voltar">Novo Registro</Link>

      {registros.length === 0 ? (
        <p className="nenhum-registro">Nenhum registro encontrado.</p>
      ) : (
        <div className="lista-registros">
          {registros.map((reg) => (
            <div key={reg.id} className="card-registro">
              <div className="card-conteudo">
                <h2>{reg.nome}, {reg.idade} anos</h2>
                <p className="temperatura">
                  Temperatura: <span>{reg.temperatura}°C</span>
                </p>

                {reg.localizacao && (
                  <p style={{ fontSize: '0.9rem', color: '#6c757d', fontStyle: 'italic' }}>

                    {reg.localizacao.endereco ? (
                      <>
                        <strong>Local: </strong> {reg.localizacao.endereco}
                      </>
                    
                    /* Se não, mostre as coordenadas */
                    ) : (
                      <>
                        <strong>Coords: </strong> {reg.localizacao.latitude.toFixed(4)}, {reg.localizacao.longitude.toFixed(4)}
                      </>
                    )}
                  </p>
                )}
                

                <p>Tomou remédio: <strong>{reg.tomouRemedio.toUpperCase()}</strong></p>
                
                {reg.tomouRemedio === 'sim' && reg.remedio && (
                  <div className="detalhes-remedio">
                    <h4>Detalhes do Remédio</h4>
                    <p>Nome: {reg.remedio.nome}</p>
                    <p>Dosagem: {reg.remedio.dosagem}</p>
                    <p>Horário: {reg.remedio.hora}</p>
                  </div>
                )}
              </div>
              
              <div className="card-acoes">
                <Link to={`/editar/${reg.id}`} className="btn-acao btn-editar">Editar</Link>
                <button 
                  onClick={() => handleDeletarClick(reg.id, reg.nome)} 
                  className="btn-acao btn-excluir"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Registros;