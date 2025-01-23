import { WeatherModel } from "../../../Models/WeatherModel";
import css from "./WeatherDisplay.module.css";

interface WeatherDisplayProps {
    weather: WeatherModel;
}

export function WeatherDisplay({ weather }: WeatherDisplayProps): JSX.Element {


    return (
        <div className={css.WeatherDisplay}>
            <h2>Weather Data</h2>
            {
                weather && <div>
                    <h4>Latitude: {weather?.latitude}</h4>
                    <h4>Longitude: {weather?.longitude}</h4>
                    <h4>Elevation: {weather?.elevation}</h4>
                    <h4>Generation Time MS: {weather?.generationtime_ms}</h4>
                    <h4>UTC Offset Seconds: {weather?.utc_offset_seconds}</h4>
                    <h4>Timezone: {weather?.timezone}</h4>
                    <h4>Timezone Abbreviation: {weather?.timezone_abbreviation}</h4>
                    {
                        weather?.past_days && <h4>Past Days: {weather?.past_days}</h4>
                    }
                    {
                        weather?.forecast_days && <h4>Forecast Days: {weather?.forecast_days}</h4>
                    }
                    {
                        weather?.hourly && <span>
                            <h4>Hourly Units:</h4>
                            <ul>
                                <li>time: {weather?.hourly_units.time}</li>
                                {Object.entries(weather?.hourly_units).map(([key, value]) => (
                                    key !== 'time' && <li key={key}>{key}: {value}</li>
                                ))}
                            </ul>
                            <h4>Hourly:</h4>
                            <ul>
                                <li>time: {weather?.hourly.time.join(", ")}</li>
                                {Object.entries(weather?.hourly).map(([key, value]) => (
                                    key !== 'time' && <li key={key} style={{wordBreak: 'break-all'}}>{key}: {value.join(", ")}</li>
                                ))}
                            </ul>
                        </span>
                    }
                    {
                        weather?.daily && <span>
                            <h4>Daily Units:</h4>
                            <ul>
                                <li>time: {weather?.daily_units.time}</li>
                                {Object.entries(weather?.daily_units).map(([key, value]) => (
                                    key !== 'time' && <li key={key}>{key}: {value}</li>
                                ))}
                            </ul>
                            <h4>Daily:</h4>
                            <ul>
                                <li>time: {weather?.daily.time.join(", ")}</li>
                                {Object.entries(weather?.daily).map(([key, value]) => (
                                    key !== 'time' && <li key={key} style={{wordBreak: 'break-all'}}>{key}: {value.join(", ")}</li>
                                ))}
                            </ul>
                        </span>
                    }
                </div>
            }
            {
                !weather && <div>
                    <h3>Select weather data</h3>
                </div>
            }

        </div>
    );
}
