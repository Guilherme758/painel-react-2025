import { useState, useEffect } from 'react'
// import './App.css'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [paises, setPaises] = useState([])
  const [pais, setPais] = useState([])
  const [paisesFiltrados, setPaisesFiltrados] = useState([])

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
                "continents": item.continents
        };
      })
      setPaises(data)
      setPais(undefined)
    })
  }, [])

  return (
    <div className='container-sm'>
      <div id="div-filtros">
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
             setPaisesFiltrados([])
          }}>Todos</button>
        </>: <></>}</div>
      <div id="div-paises" className='overflow-auto'>
        {pais == undefined && paisesFiltrados.length == 0 ? paises.map(pais => {
        return (
          <div key={pais.name} className='pais'>
            <button type="button" className='btn btn-dark' onClick={() => setPais(pais)}>{pais.name}</button>
          </div>
        )
      })
      : <></>}
      </div>
      <div id="div-paises" className='overflow-auto'>
        {pais == undefined && paisesFiltrados.length > 0 ? paisesFiltrados.map(pais => {
        return (
          <div key={pais.name} className='pais'>
            <button type="button" className='btn btn-dark' onClick={() => setPais(pais)}>{pais.name}</button>
          </div>
        )
      })
      : <></>}
      </div>
      <div id="dados-pais">
          {pais != undefined ? 
            <>
              <p>Nome: {pais.name}</p>
              <p>Nome Oficial: {pais.official_name}</p>
              <p>Começo da Semana: {pais.start_week}</p>
              <p>Capital: {pais.capital}</p>
              <p>População: {pais.population}</p>
              <p>Área: {pais.area} m²</p>
              {/* <p>Linguas: {JSON.stringify(pais.languages)}</p> */}
              <p>Continentes: {pais.continents}</p>
              <button type="button" className='btn btn-dark' onClick={() => setPais(undefined)}>Voltar</button>
            </>: <></>}
      </div>
    </div>
  )
}

export default App
