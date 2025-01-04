import { WeatherModel } from "../../../Models/WeatherModel";
import css from "./WeatherDisplay.module.css";

interface WeatherDisplayProps {
    weather: WeatherModel;
}

export function WeatherDisplay({ weather }: WeatherDisplayProps): JSX.Element {

    const { hourlyUnitsObj } = { ...weather?.hourly_units }
    const { hourlyObj } = { ...weather?.hourly }
    const { dailyUnitsObj } = { ...weather?.daily_units }
    const { dailyUObj } = { ...weather?.daily }

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
                            <h4>Hourly Units: {hourlyUnitsObj}</h4>
                            <h4>Hourly: {hourlyObj}</h4>
                        </span>
                    }
                    {
                        weather?.daily && <span>
                            <h4>Daily Units: {dailyUnitsObj}</h4>
                            <h4>Daily: {dailyUObj}</h4>
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
