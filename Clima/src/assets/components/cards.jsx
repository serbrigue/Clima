import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint, faThermometerHalf, faTemperatureHigh, faTemperatureLow } from '@fortawesome/free-solid-svg-icons';

const Cards = () => {
    const [search, setSearch] = useState('');
    const [data1, setData1] = useState(null);
    const [data2, setData2] = useState(null);
    const [selectedDateData, setSelectedDateData] = useState(null);
    const [city, setCity] = useState('Valparaiso, Chile');
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                //Preparar la URL para la busqueda de la ciudad
                const searchUrl = `http://127.0.0.1:5000/buscador/${city}`;
                const searchResponse = await axios.get(searchUrl);
                const { lat, lon } = searchResponse.data;

                //Preparar la URL para la busqueda de los datos
                const url1 = `http://127.0.0.1:5000/days/${lat}/${lon}/`;
                const url2 = `http://127.0.0.1:5000/datos/${lat}/${lon}/`;
                const responses = await Promise.all([axios.get(url1), axios.get(url2)]);
                
                //Extraer los datos de las respuestas
                const data1 = responses[0].data;
                const data2 = responses[1].data;

                //Actualizar los estados
                setData1(data1); 
                setData2(data2);
            } catch (error) {

                //Mostrar un mensaje de error en la consola
                console.error('Error fetching data: ', error);
            }
        };
    

        //Si la ciudad existe, se llama a la funcion fetchData
        if (city) {
            fetchData();
        }
    }, [city]);


    //Funcion que se encarga de manejar el click en una tarjeta
    const handleCardClick = (date) => {
        setSelectedDateData(data2[date]);
    };

    //Funcion que se encarga de manejar el cambio en el input de busqueda
    const handleSearchChange = (event) => {
        setSearch(event.target.value); 
    };

    //Funcion que se encarga de manejar el submit del formulario de busqueda
    const handleSearchSubmit = (event) => {
        event.preventDefault(); 
        setCity(search); 
    };

    //Si no hay datos, se muestra un mensaje de carga
    if (!data1 || !data2) {
        return <div>Loading...</div>;
    }


    return (

        //Se muestra la ciudad y el formulario de busqueda
        <div className="p-4">
            <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
                <h1 className="text-xl font-bold">Clima para la ciudad de</h1>
                <p className="text-gray-500">{city}</p>
            </div>
            <form onSubmit={handleSearchSubmit} className="flex justify-center mt-5 w-1/2 mx-auto">
                <input 
                    type="text" 
                    value={search} 
                    onChange={handleSearchChange} 
                    placeholder="Enter city name" 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button 
                    type="submit" 
                    className="ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Search
                </button>
            </form>
             
            <div className="flex flex-wrap justify-center mb-4">
                {Object.entries(data1).map(([date, dateData]) => {
                    const fecha = new Date(date + 'T00:00');
                    const format_date = format(fecha, 'EEEE dd', { locale: es });
                    return (
                        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 cursor-pointer" key={date} onClick={() => handleCardClick(date)}>
                            <div className="px-2 py-4">
                                <div className="font-bold text-xl mb-2 text-center">{format_date}</div>
                                <p className="text-gray-700 text-base">
                                    <FontAwesomeIcon icon={faTint} /> Precipitacion: {Math.round(dateData.precipitation)}
                                </p>
                                <p className="text-gray-700 text-base">
                                    <FontAwesomeIcon icon={faThermometerHalf} /> Temp. actual: {Math.round(dateData.temperature_instant)}°C
                                </p>
                                <p className="text-gray-700 text-base">
                                    <FontAwesomeIcon icon={faTemperatureHigh} /> Temp. max: {Math.round(dateData.temperature_max)}°C
                                </p>
                                <p className="text-gray-700 text-base">
                                    <FontAwesomeIcon icon={faTemperatureLow} /> Temp. min: {Math.round(dateData.temperature_min)}°C
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
            {selectedDateData && Object.entries(selectedDateData).map(([time, data]) => (
                <div key={time} className="bg-white shadow overflow-hidden sm:rounded-lg p-4 mb-4 flex ">
                <h2 className="text-lg leading-6 font-medium text-gray-900 w-full">{time}</h2>
                <div className="mt-1 max-w-2xl text-sm text-gray-500 w-1/2">
                    <p>Precipitacion: {data.precipitation}</p>
                    <p>Temp. actual: {data.temperature_instant}°C</p>
                </div>
                <div className="mt-1 max-w-2xl text-sm text-gray-500 w-1/2">
                    <p>Temp. max: {data.temperature_max}°C</p>
                    <p>Temp. min: {data.temperature_min}°C</p>
                </div>
        </div>
            ))}
        </div>
    );
};

export default Cards;