import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditarRegistro({ registros, onAtualizar }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [tomouRemedio, setTomouRemedio] = useState('');
  const [nomeRemedio, setNomeRemedio] = useState('');
  const [dosagem, setDosagem] = useState('');
  const [hora, setHora] = useState('');
  const [localizacaoOriginal, setLocalizacaoOriginal] = useState(null);

  useEffect(() => {
    const registroParaEditar = registros.find(reg => reg.id === Number(id));

    if (registroParaEditar) {
      setNome(registroParaEditar.nome);
      setIdade(registroParaEditar.idade);
      setTemperatura(registroParaEditar.temperatura);
      setTomouRemedio(registroParaEditar.tomouRemedio);
      setLocalizacaoOriginal(registroParaEditar.localizacao);

      if (registroParaEditar.tomouRemedio === 'sim' && registroParaEditar.remedio) {
        setNomeRemedio(registroParaEditar.remedio.nome);
        setDosagem(registroParaEditar.remedio.dosagem);
        setHora(registroParaEditar.remedio.hora);
      }
    } else {
        alert("Registro não encontrado!");
        navigate('/registros');
    }
  }, [id, registros, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const registroAtualizado = {
      id: Number(id),
      nome,
      idade,
      temperatura,
      tomouRemedio,
      remedio: tomouRemedio === 'sim' ? { nome: nomeRemedio, dosagem, hora } : null,
      localizacao: localizacaoOriginal 
    };

    onAtualizar(registroAtualizado);

    alert('Registro atualizado com sucesso!');
    navigate('/registros'); 
  };

  return (
    <form onSubmit={handleSubmit} className="conteudo">
      <h3>Editando Registro de: {nome}</h3>
      
      <p>Nome do usuário</p>
      <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
      
      <p>Idade</p>
      <input type="number" value={idade} onChange={(e) => setIdade(e.target.value)} />

      <p>Qual a temperatura?</p>
      <input type="number" step={0.01} value={temperatura} onChange={(e) => setTemperatura(e.target.value)} />

      <p>Tomou remédio?</p>
      <div className="radio-group">
        <label>
          <input type="radio" name="tomouRemedio" value="sim" checked={tomouRemedio === 'sim'} onChange={(e) => setTomouRemedio(e.target.value)} /> Sim
        </label>
        <label>
          <input type="radio" name="tomouRemedio" value="nao" checked={tomouRemedio === 'nao'} onChange={(e) => setTomouRemedio(e.target.value)} /> Não
        </label>
      </div>

      {tomouRemedio === 'sim' && (
        <>
          <p>Qual o nome do remédio?</p>
          <input type="text" value={nomeRemedio} onChange={(e) => setNomeRemedio(e.target.value)} />
          <p>Qual a dosagem?</p>
          <input type="text" value={dosagem} onChange={(e) => setDosagem(e.target.value)} />
          <p>Horário</p>
          <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} />
        </>
      )}
      
      <div className="butao">
        <button type="button" onClick={() => navigate('/registros')}>Cancelar</button>
        <button type="submit">SALVAR ALTERAÇÕES</button>
      </div>
    </form>
  );
}

export default EditarRegistro;