import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario'
import Spinner from './components/Spinner'
import Cotizacion from './components/Cotizacion'
import image from './cryptomonedas.png'
import axios from 'axios'

const App = () => {

  const [moneda, setMoneda] = useState("")
  const [criptomoneda, setCriptomoneda] = useState("")
  const [cargando, setCargando] = useState(false)
  const [resultado, setResultado] = useState({})

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (moneda !== "") {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

        const resultado = await axios.get(url)

        setCargando(true)

        setTimeout(() => {
          setCargando(false)
          setResultado(resultado.data.DISPLAY[criptomoneda][moneda])
          console.log(resultado)
        }, 3000);


      }
    }
    cotizarCriptomoneda()

  }, [criptomoneda, moneda])

  //Mostrar Spinner

  const componenteSpinner = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />

  return (
    <div className="container">
      <div className="row">
        <div className="one-half column">
          <img src={image} alt="imagen criptomonedas" />
        </div>
        <div className="one-half column">
          <h1>Cotiza Criptomonedas al Instante</h1>

          <Formulario
            setMoneda={setMoneda}
            setCriptomoneda={setCriptomoneda}
          />

          {componenteSpinner}
        </div>
      </div>
    </div>
  );

}

export default App;
