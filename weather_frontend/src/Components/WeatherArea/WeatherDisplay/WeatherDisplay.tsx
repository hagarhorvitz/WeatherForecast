import { WeatherModel } from "../../../Models/WeatherModel";
import css from "./WeatherDisplay.module.css";

// type WeatherDisplayProps = {
//     weatherData: Record<string, string | number | string[]> | null;
// }; { weatherData }: WeatherDisplayProps
// <pre>{JSON.stringify(weatherData, null, 2)}</pre>

export function WeatherDisplay(props: WeatherModel): JSX.Element {

    const { hourlyUnitsObj } = { ...props?.hourly_units }
    const { hourlyObj } = { ...props?.hourly }
    const { dailyUnitsObj } = { ...props?.daily_units }
    const { dailyUObj } = { ...props?.daily }

    return (
        <div className={css.WeatherDisplay}>
            <h2>Weather Data</h2>
            {
                props && <div>
                    <h4>Latitude: {props?.latitude}</h4>
                    <h4>Longitude: {props?.longitude}</h4>
                    <h4>Elevation: {props?.elevation}</h4>
                    <h4>Generation Time MS: {props?.generationtime_ms}</h4>
                    <h4>UTC Offset Seconds: {props?.utc_offset_seconds}</h4>
                    <h4>Timezone: {props?.timezone}</h4>
                    <h4>Timezone Abbreviation: {props?.timezone_abbreviation}</h4>
                    {
                        props?.past_days && <h4>Past Days: {props?.past_days}</h4>
                    }
                    {
                        props?.forecast_days && <h4>Forecast Days: {props?.forecast_days}</h4>
                    }
                    {
                        props?.hourly && <span>
                            <h4>Hourly Units: {hourlyUnitsObj}</h4>
                            <h4>Hourly: {hourlyObj}</h4>
                        </span>
                    }
                    {
                        props?.daily && <span>
                            <h4>Daily Units: {dailyUnitsObj}</h4>
                            <h4>Daily: {dailyUObj}</h4>
                        </span>
                    }
                </div>
            }
            {
                !props && <div>
                    <h3>Select weather data</h3>
                </div>
            }

        </div>
    );
}
