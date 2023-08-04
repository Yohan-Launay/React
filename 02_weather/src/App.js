import './App.css';
import React, { useEffect, useState } from "react";
import Weather from './components/Weather';

export default function App() {
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });

                setLat(position.coords.latitude);
                setLong(position.coords.longitude);

                const response = await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`);
                if (!response.ok) {
                    throw new Error('Weather data not available.');
                }

                const result = await response.json();
                setData(result);
                console.log(result);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="App">
            {Object.keys(data).length > 0 ? (
                <Weather weatherData={data} />
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
