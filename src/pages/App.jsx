import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Formulario from './Formulario';
import Registros from '../pages/Registros';
import EditarRegistro from '../pages/EditarRegistro';


const CHAVE_STORAGE = 'alerta-febre-registros';

function App() {
  const [registros, setRegistros] = useState(() => {
    const dadosSalvos = localStorage.getItem(CHAVE_STORAGE);

    if (dadosSalvos) {
      return JSON.parse(dadosSalvos);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(registros));
  }, [registros]);


  const handleAdicionarRegistro = (novoRegistro) => {
    setRegistros((registrosAnteriores) => [...registrosAnteriores, novoRegistro]);
  };

  const handleDeletarRegistro = (id) => {
    setRegistros((registrosAnteriores) =>
      registrosAnteriores.filter(reg => reg.id !== id)
    );
    alert('Registro deletado com sucesso!');
  };
  
  const handleAtualizarRegistro = (registroAtualizado) => {
    setRegistros((registrosAnteriores) =>
      registrosAnteriores.map(reg =>
        reg.id === registroAtualizado.id ? registroAtualizado : reg
      )
    );

  };


  return (
    <BrowserRouter>
      <div className="principal">
        <p>AlertaFebre</p>
        <p className='fraseEfeito'>Saúde acompanhada com carinho.</p>

        <Routes>
          <Route
            path="/"
            element={<Formulario onAdicionarRegistro={handleAdicionarRegistro} />}
          />

          <Route
            path="/registros"
            element={
              <Registros
                registros={registros}
                onDeletar={handleDeletarRegistro}
              />
            }
          />

          <Route
            path="/editar/:id"
            element={
              <EditarRegistro
                registros={registros}
                onAtualizar={handleAtualizarRegistro}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;