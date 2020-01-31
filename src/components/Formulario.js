import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Criptomoneda from './Criptomoneda'
import Error from './Error'


const Formulario = ({ setMoneda, setCriptomoneda }) => {

    const [criptomonedas, setCriptomonedas] = useState([])
    const [monedaCotizar, setMonedaCotizar] = useState("")
    const [criptoCotizar, setCriptoCotizar] = useState("")
    const [error, setError] = useState(false)

    useEffect(() => {
        const consultarApi = async () => {
            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`

            const resultado = await axios.get(url)
            setCriptomonedas(resultado.data.Data)
        }

        consultarApi()

    }, [])

    const cotizarMoneda = (e) => {
        e.preventDefault()

        if (monedaCotizar === "" || criptoCotizar === "") {
            setError(true)
            return;
        }

        setError(false)
        setMoneda(monedaCotizar)
        setCriptomoneda(criptoCotizar)

    }


    const componentError = (error) ? <Error mensaje="Ambos campos son Obligatorios" /> : null;

    return (
        <form
            onSubmit={cotizarMoneda}
        >
            {componentError}
            <div className="row">
                <label htmlFor="">Elige tu Moneda</label>
                <select
                    className="u-full-width"
                    onChange={e => setMonedaCotizar(e.target.value)}
                >
                    <option value="">Elige tu Moneda</option>
                    <option value="USD">Dolar Estadounidense</option>
                    <option value="MXN">Peso Mexicano</option>
                    <option value="GBP">Libras</option>
                    <option value="EUR">Euros</option>
                </select>
            </div>

            <div className="row">
                <label htmlFor="">Elige tu Criptomoneda</label>
                <select
                    className="u-full-width"
                    onChange={e => setCriptoCotizar(e.target.value)}
                >
                    <option value="">Elige tu Criptomoneda</option>
                    {criptomonedas.map((criptomoneda) => {
                        return (
                            <Criptomoneda
                                key={criptomoneda.CoinInfo.Id}
                                criptomoneda={criptomoneda}
                            />
                        )
                    }
                    )}
                </select>
            </div>

            <input type="submit" className="button-primary u-full-width" value="Calcular" />

        </form>
    )
}

export default Formulario
