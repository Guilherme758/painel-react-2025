import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [paises, setPaises] = useState([])
  const [pais, setPais] = useState([])
  const [paisesFiltrados, setPaisesFiltrados] = useState([])

  // Faz a requisição na API
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(resposta => {
      console.log(resposta.data)

      const data = resposta.data.map(item => {
        return {"name": item.name.common,
                "official_name": item.name.official,
                "start_week": item.startOfWeek,
                "capital": item.capital,
                "population": item.population,
                "area": item.area,
                "languages": item.languages,
                "continents": item.continents,
                "flag": item.flags && item.flags.svg
        };
      })
      setPaises(data)
      setPais(undefined)
    })
  }, [])

// Bloco responsavel por filtrar os Paises por continente
  return (
    <div id="div-principal" className='container mt-4 mb-4'>

      {/* Bloco responsavel por exibir botões de filtro de continentes */}
      <div id="div-filtros" className="overflow-auto d-flex flex-wrap justify-content-center gap-3 mt-3">
        {pais == undefined ? 
        <>
          <button type='button' className='btn btn-primary' onClick={() => {
            setPaisesFiltrados(paises.filter((pais) => {
              return pais.continents.includes('Africa')
            }))
          }}>África</button>
          <button type='button' className='btn btn-primary' onClick={() => {
            setPaisesFiltrados(paises.filter((pais) => {
              return pais.continents.includes('North America', 'Central America', 'South America')
            }))
          }}>América</button>
          <button type='button' className='btn btn-primary' onClick={() => {
            setPaisesFiltrados(paises.filter((pais) => {
              return pais.continents.includes('Asia')
            }))
          }}>Ásia</button>
          <button type='button' className='btn btn-primary' onClick={() => {
            setPaisesFiltrados(paises.filter((pais) => {
              return pais.continents.includes('Europe')
            }))
          }}>Europa</button>
          <button type='button' className='btn btn-primary' onClick={() => {
            setPaisesFiltrados(paises.filter((pais) => {
              return pais.continents.includes('Oceania')
            }))
          }}>Oceania</button>
          <button type='button' className='btn btn-primary' onClick={() => {
             setPaisesFiltrados(paises)
          }}>Todos</button>
        </>: <></>}</div>

      {/* Bloco responsavel por exibir botões de todos os países que vierem na API */}
      <div id="div-paises" className='overflow-auto d-flex flex-wrap justify-content-center gap-3 mt-3'>
                {pais == undefined && paisesFiltrados.length == 0 ? paises.map(pais => {
        return (
          <div key={pais.name} className='pais'>
            <button type="button" className='btn btn-dark' onClick={() => setPais(pais)}>{pais.name}</button>
          </div>
        )
      })
      : <></>}
      </div>

      {/* Bloco responsavel por exibir botões dos países de acordo com filtro de continente */}
      <div id="div-paises-filtrados" className='overflow-auto d-flex flex-wrap justify-content-center gap-3 mt-3'>
        {pais === undefined && paisesFiltrados.length > 0 && ( 
                    paisesFiltrados.map(pais => (
          <div key={pais.name} className='pais'>
            <button type="button" className='btn btn-dark' onClick={() => setPais(pais)}>{pais.name}</button>
          </div>
        ))
      )}
      <></>
      </div>

      {/* Bloco responsavel pela listagem das informaçoes do país que for selecionado */}
      <div id="dados-pais">
          {pais != undefined ? 
            <>
               <p>
                  {pais.flag && (
                    <div className='text-top container mt-4 mb-4'>
                      <img src={pais.flag} style={{maxWidth: '100px', width: '100%', height: 'auto'}} />
                      </div>
                  )}
                
              </p>
              <ul className="info-paises"> 
                <li className="list-group-item"><strong>Nome:</strong> {pais.name}</li>
                <li className="list-group-item"><strong>Nome Oficial:</strong> {pais.official_name}</li>
                <li className="list-group-item"><strong>Começo da Semana:</strong> {pais.start_week}</li>
                <li className="list-group-item"><strong>Capital:</strong> {pais.capital}</li>
                <li className="list-group-item"><strong>População:</strong> {pais.population}</li>
                <li className="list-group-item"><strong>Área:</strong> {pais.area} m²</li>
                <li className="list-group-item"><strong>Continentes:</strong> {pais.continents}</li>
                  {pais.languages && (
                    <li className="list-group-item">
                    <strong>Idiomas:</strong> {Object.values(pais.languages).join(', ')}
                  </li>)}   
                    </ul>

              <button type="button" className='btn btn-dark' onClick={() => setPais(undefined)}>Voltar</button>
            </>: <></>}
      </div>
    </div>
  )
}

export default App
