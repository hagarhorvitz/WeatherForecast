import { useEffect, useState } from 'react';
import './App.css'
import { WeatherForm } from './Components/WeatherArea/WeatherForm/WeatherForm'
import { weatherService } from './Services/WeatherServices';
import { WeatherFormModel } from './Models/WeatherFormModel';
import { WeatherModel } from './Models/WeatherModel';
import { WeatherDisplay } from './Components/WeatherArea/WeatherDisplay/WeatherDisplay';

function App() {
    // const [weatherData, setWeatherData] = useState<Record<string, string | number | string[]> | null>(null);

    // const fetchWeather = async (params: Record<string, string | number | string[]>) => {
    //     try {
    //         const query = new URLSearchParams(params).toString();
    //         const response = await fetch(`/weather?${query}`);
    //         if (!response.ok) {
    //             throw new Error("Failed to fetch weather data.");
    //         }
    //         const data = await response.json();
    //         setWeatherData(data);
    //     } catch (error) {
    //         console.error("Error fetching weather data:", error);
    //     }
    // };
    const [weatherData, setWeatherData] = useState<WeatherModel>()
    const [newWeather, setNewWeather] = useState<WeatherFormModel>()

    function sendWeatherData(weather: WeatherFormModel) {
        console.log('weather', weather)
        setNewWeather(weather)
        console.log('newWeather', newWeather)
    }

    useEffect(() => {
        async function getWeatherData() {
            try {
                const response = await weatherService.fetchWeather(newWeather);
                setWeatherData(response)
            }
            catch (err) {
                console.error("Error fetching weather data:", err);
            }
        }
        getWeatherData()
        console.log('weatherData', weatherData)
    }, [newWeather, weatherData])

    return (
        <div>
            <h1>Weather App</h1>
            {
                !newWeather && <div>
                    <WeatherForm sendWeatherData={sendWeatherData} />
                </div>
            }
            {
                weatherData && <div>
                    <WeatherDisplay
                        key={weatherData.elevation}
                        {...weatherData} />
                </div>
            }
            {/* <WeatherForm onFetchWeather={fetchWeather} />
        <WeatherDisplay weatherData={weatherData} /> */}
        </div>
    )
}

export default App

// {
//     weatherData.map((weather) => (
//         <WeatherDisplay
//             key={weather.elevation}
//             {...weather} />
//     ))
// }