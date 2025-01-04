import { useState } from 'react';
import './App.css'
import { WeatherForm } from './Components/WeatherArea/WeatherForm/WeatherForm'
import { weatherService } from './Services/WeatherServices';
import { WeatherFormModel } from './Models/WeatherFormModel';
import { WeatherModel } from './Models/WeatherModel';
import { WeatherDisplay } from './Components/WeatherArea/WeatherDisplay/WeatherDisplay';

function App() {

    const [weatherData, setWeatherData] = useState<WeatherModel>()
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    async function getWeatherData(formValues: WeatherFormModel) {
        console.log('formValues', formValues)
        if (error) setError("");
        setLoading(true);
        try{
            const response = await weatherService.fetchWeather(formValues);
            setWeatherData(response)
        }
        catch (err) {
            setError("Failed to fetch weather data. Please try again!");
            console.error("Error fetching weather data:", err);
        } 
        finally {
            setLoading(false);
        }
    }

    console.log('weatherData', weatherData)

    function clearWeather(){
        setWeatherData(undefined)
    }

    return (
        <div>
            <h1>Weather App</h1>
            {loading && <p>Loading...🦖</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {
                !weatherData && <div>
                    <WeatherForm submitWeatherData={getWeatherData} />
                </div>
            }
            {
                weatherData && <div>
                    <WeatherDisplay weather={weatherData}/>
                    <button onClick={clearWeather}>Get new weather</button>
                </div>
            }
        </div>
    )
}

export default App      

    // const [newWeather, setNewWeather] = useState<WeatherFormModel>()

    // const hour = new Date().getUTCHours()
    // const minutes = new Date().getUTCMinutes()
    // const sec = new Date().getUTCSeconds()
    // const milisec = new Date().getMilliseconds()
    // const fullTime = hour + ':' + minutes + ':' + sec + ':' + milisec
//               <WeatherDisplay
// key={weatherData.elevation}
// {...weatherData} />

    // function sendWeatherData(weather: WeatherFormModel) {
    //     console.log('weather', weather)
    //     setNewWeather(weather)
    // }
    // useEffect(() => {
    //     async function getWeatherData() {
    //         console.log("1")
    //         try {
    //             console.log('newWeather', newWeather)
    //             const response = await weatherService.fetchWeather(newWeather);
    //             console.log('response', response)
    //             setWeatherData(response)
    //         }
    //         catch (err) {
    //             console.error("Error fetching weather data:", err);
    //         }
    //     }
    //     console.log("2")
    //     if (!newWeather) {
            
    //         return
    //     };
    //     getWeatherData()
    //     console.log("3")
    // }, [newWeather])




// {
//     weatherData.map((weather) => (
//         <WeatherDisplay
//             key={weather.elevation}
//             {...weather} />
//     ))
// }

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