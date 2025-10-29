import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Formulario({ onAdicionarRegistro }) {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [tomouRemedio, setTomouRemedio] = useState('');
  const [nomeRemedio, setNomeRemedio] = useState('');
  const [dosagem, setDosagem] = useState('');
  const [hora, setHora] = useState('');
  
  const [estaSalvando, setEstaSalvando] = useState(false);


  const handleVerRegistros = () => {
    navigate('/registros');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!nome || !idade || !temperatura || !tomouRemedio) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    setEstaSalvando(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        let enderecoFormatado = null;
        try {
          const urlApi = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
          
          const respostaApi = await fetch(urlApi);
          
          if (!respostaApi.ok) {
            throw new Error('Não foi possível conectar à API de geocodificação.');
          }
          
          const dados = await respostaApi.json();

          if (dados.display_name) {
            enderecoFormatado = dados.display_name;
          }

        } catch (error) {
          console.error("Erro ao buscar endereço (reverse geocoding):", error);
        }
        
        const novoRegistro = {
          id: new Date().getTime(),
          nome,
          idade,
          temperatura,
          tomouRemedio,
          remedio: tomouRemedio === 'sim' ? { nome: nomeRemedio, dosagem, hora } : null,
          localizacao: {
            latitude: latitude,
            longitude: longitude,
            endereco: enderecoFormatado 
          }
        };

        onAdicionarRegistro(novoRegistro);
        alert('Registro salvo com sucesso!');

        setNome('');
        setIdade('');
        setTemperatura('');
        setTomouRemedio('');
        setNomeRemedio('');
        setDosagem('');
        setHora('');
        
        setEstaSalvando(false);
      },


      (error) => {
        console.error("Erro ao obter localização: ", error);
        alert(`Não foi possível obter a localização: ${error.message}. O registro não foi salvo.`);
        setEstaSalvando(false);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="conteudo">

      <p>Nome do usuário</p>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        disabled={estaSalvando}
      />

      <p>Idade</p>
      <input
        type="number"
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
        disabled={estaSalvando}
      />

      <p>Qual a temperatura?</p>
      <input
        type="number"
        step={0.01}
        value={temperatura}
        onChange={(e) => setTemperatura(e.target.value)}
        disabled={estaSalvando}
      />

      <p>Tomou remédio?</p>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="tomouRemedio"
            value="sim"
            checked={tomouRemedio === 'sim'}
            onChange={(e) => setTomouRemedio(e.target.value)}
            disabled={estaSalvando}
          /> Sim
        </label>
        <label>
          <input
            type="radio"
            name="tomouRemedio"
            value="nao"
            checked={tomouRemedio === 'nao'}
            onChange={(e) => setTomouRemedio(e.target.value)}
            disabled={estaSalvando}
          /> Não
        </label>
      </div>

      {tomouRemedio === 'sim' && (
        <>
          <p>Qual o nome do remédio?</p>
          <input
            type="text"
            placeholder="Remédio"
            value={nomeRemedio}
            onChange={(e) => setNomeRemedio(e.target.value)}
            disabled={estaSalvando}
          />
          <p>Qual a dosagem?</p>
          <input
            type="text"
            placeholder="Dosagem"
            value={dosagem}
            onChange={(e) => setDosagem(e.target.value)}
            disabled={estaSalvando}
          />
          <p>Horário</p>
          <input
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            disabled={estaSalvando}
          />
        </>
      )}


      <div className="butao">
        <button type="button" onClick={handleVerRegistros} disabled={estaSalvando}>
          VER REGISTROS
        </button>

        <button type="submit" disabled={estaSalvando}>
          {estaSalvando ? 'SALVANDO...' : 'SUBMETER'}
        </button>
      </div>
    </form>
  );
}

export default Formulario;