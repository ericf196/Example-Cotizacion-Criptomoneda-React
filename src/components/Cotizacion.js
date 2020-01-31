import React from 'react'

const Cotizacion = ({ resultado }) => {

    if (Object.keys(resultado).length === 0) return null

        return (
            <div className="resultado">
                <h2>Resultado</h2>
                <p  className="precio">El Precio es <span>{resultado.PRICE}</span></p>

                <p>El Precio mas alto del dia: <span>{resultado.HIGHDAY}</span></p>
                <p>El Precio mas bajo del dia: <span>{resultado.LOWDAY}</span></p>
                <p>Variacion Ultimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}</span>%</p>
                <p>Ultima Actualizacion: <span>{resultado.LASTUPDATE}</span></p>
            </div>
        )
    
}
export default Cotizacion