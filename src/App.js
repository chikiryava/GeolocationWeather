import './style.css';
import { useState, useEffect } from 'react';

function App() {
    const [weather, setWeather] = useState({});
    const [error, setError] = useState('Fetching weather data...');
    const [loading, setLoading] = useState(true);

    const getWeatherData = async (latitude, longitude) => {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=95dd3a72edc84294a6b52437231110&q=${latitude},${longitude}`);
            const json = await response.json();
            setWeather(json);
        } catch (err) {
            setError(`Error fetching weather data: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (result) => {
                getWeatherData(result.coords.latitude, result.coords.longitude);
            },
            (error) => {
                setError("You did not allow access to geolocation");
                console.error(error.message);
                setLoading(false);
            }
        );
    };

    useEffect(() => {
        getLocation();
    }, []);

    return (
        <>
            <h1>Weather App</h1>
            <div className="content">
                {loading ? (
                    <div className="content-wait">{error}</div>
                ) : (
                    <>
                        <div className="content-temperature">{weather.current?.temp_c} ℃</div>
                        <div>{weather.current?.condition?.text}</div>
                        <div>{weather.location?.name}, {weather.location?.country}</div>
                    </>
                )}
            </div>
        </>
    );
}

export default App;
