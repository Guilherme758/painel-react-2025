import { useState, useEffect } from 'react'
// import './App.css'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [paises, setPaises] = useState([])

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
    })
  }, [])

  return (
    <div className='container-sm'>
      <div id="div-paises">
        {paises.map(pais => {
        return (
          <div className='pais'>
            <button type="button" className='btn btn-dark'>{pais.name}</button>
          </div>
        )
      })
      }
      </div>
      <div id="div-filtros">
        <button type='button' className='btn btn-primary'>África</button>
        <button type='button' className='btn btn-primary'>América</button>
        <button type='button' className='btn btn-primary'>Ásia</button>
        <button type='button' className='btn btn-primary'>Europa</button>
        <button type='button' className='btn btn-primary'>Oceania</button>
      </div>
    </div>
  )
}

export default App
