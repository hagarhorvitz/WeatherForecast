import { useState } from "react";
import css from "./WeatherForm.module.css";
import { WeatherFormModel } from "../../../Models/WeatherFormModel";

interface FormSubmissionProps {
    submitWeatherData: (formValues: WeatherFormModel) => void;
}

export function WeatherForm({ submitWeatherData }: FormSubmissionProps): JSX.Element {

    const [newWeather, setNewWeather] = useState<WeatherFormModel>({
        latitude: 0,
        longitude: 0,
        timezone: "",
        past_days: 0,
        forecast_days: 7,
        hourly: [],
        daily: [],
    });

    function handleCheckedChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value, checked } = event.target;
        console.log('{ name, value, checked }', name, value, checked)
        if (name === "hourly" || name === "daily") {
            setNewWeather( (currentWeather) => ({
                ...currentWeather,
                [name]: checked
                    ? [...currentWeather[name], value]
                    : currentWeather[name].filter((item) => item !== value),
            }));
        }
    };
    // console.log('newWeather', newWeather)

    const hourlyVariables = [
        { inputValue: "temperature_2m", label: "Temperature (2 m)" },
        { inputValue: "relative_humidity_2m", label: "Relative Humidity (2 m)" },
        { inputValue: "dew_point_2m", label: "Dewpoint (2 m)" },
        { inputValue: "apparent_temperature", label: "Apparent Temperature" },
        { inputValue: "precipitation_probability", label: "Precipitation Probability" },
        { inputValue: "precipitation", label: "Precipitation (rain + showers + snow)" },
        { inputValue: "rain", label: "Rain" },
        { inputValue: "showers", label: "Showers" },
        { inputValue: "snowfall", label: "Snowfall" },
        { inputValue: "snow_depth", label: "Snow Depth" },
        { inputValue: "weather_code", label: "Weather Code" },
        { inputValue: "pressure_msl", label: "Sealevel Pressure" },
        { inputValue: "surface_pressure", label: "Surface Pressure" },
        { inputValue: "cloud_cover", label: "Cloud Cover Total" },
        { inputValue: "cloud_cover_low", label: "Cloud Cover Low" },
        { inputValue: "cloud_cover_mid", label: "Cloud Cover Mid" },
        { inputValue: "cloud_cover_high", label: "Cloud Cover High" },
        { inputValue: "visibility", label: "Visibility" },
        { inputValue: "evapotranspiration", label: "Evapotranspiration" },
        { inputValue: "et0_fao_evapotranspiration", label: "Reference Evapotranspiration (ET₀)" },
        { inputValue: "vapour_pressure_deficit", label: "Vapour Pressure Deficit" },
        { inputValue: "wind_speed_10m", label: "Wind Speed (10 m)" },
        { inputValue: "wind_speed_80m", label: "Wind Speed (80 m)" },
        { inputValue: "wind_speed_120m", label: "Wind Speed (120 m)" },
        { inputValue: "wind_speed_180m", label: "Wind Speed (180 m)" },
        { inputValue: "wind_direction_10m", label: "Wind Direction (10 m)" },
        { inputValue: "wind_direction_80m", label: "Wind Direction (80 m)" },
        { inputValue: "wind_direction_120m", label: "Wind Direction (120 m)" },
        { inputValue: "wind_direction_180m", label: "Wind Direction (180 m)" },
        { inputValue: "wind_gusts_10m", label: "Wind Gusts (10 m)" },
        { inputValue: "temperature_80m", label: "Temperature (80 m)" },
        { inputValue: "temperature_120m", label: "Temperature (120 m)" },
        { inputValue: "temperature_180m", label: "Temperature (180 m)" },
        { inputValue: "soil_temperature_0cm", label: "Soil Temperature (0 cm)" },
        { inputValue: "soil_temperature_6cm", label: "Soil Temperature (6 cm)" },
        { inputValue: "soil_temperature_18cm", label: "Soil Temperature (18 cm)" },
        { inputValue: "soil_temperature_54cm", label: "Soil Temperature (54 cm)" },
        { inputValue: "soil_moisture_0_to_1cm", label: "Soil Moisture (0-1 cm)" },
        { inputValue: "soil_moisture_1_to_3cm", label: "Soil Moisture (1-3 cm)" },
        { inputValue: "soil_moisture_3_to_9cm", label: "Soil Moisture (3-9 cm)" },
        { inputValue: "soil_moisture_9_to_27cm", label: "Soil Moisture (9-27 cm)" },
        { inputValue: "soil_moisture_27_to_81cm", label: "Soil Moisture (27-81 cm)" }
    ];
    const dailyVariables = [
        { inputValue: "weather_code", label: "Weather Code" },
        { inputValue: "temperature_2m_max", label: "Maximum Temperature (2 m)" },
        { inputValue: "temperature_2m_min", label: "Minimum Temperature (2 m)" },
        { inputValue: "apparent_temperature_max", label: "Maximum Apparent Temperature (2 m)" },
        { inputValue: "apparent_temperature_min", label: "Minimum Apparent Temperature (2 m)" },
        { inputValue: "sunrise", label: "Sunrise" },
        { inputValue: "sunset", label: "Sunset" },
        { inputValue: "daylight_duration", label: "Daylight Duration" },
        { inputValue: "sunshine_duration", label: "Sunshine Duration" },
        { inputValue: "uv_index_max", label: "UV Index" },
        { inputValue: "uv_index_clear_sky_max", label: "UV Index Clear Sky" },
        { inputValue: "precipitation_sum", label: "Precipitation Sum" },
        { inputValue: "rain_sum", label: "Rain Sum" },
        { inputValue: "showers_sum", label: "Showers Sum" },
        { inputValue: "snowfall_sum", label: "Snowfall Sum" },
        { inputValue: "precipitation_hours", label: "Precipitation Hours" },
        { inputValue: "precipitation_probability_max", label: "Precipitation Probability Max" },
        { inputValue: "wind_speed_10m_max", label: "Maximum Wind Speed (10 m)" },
        { inputValue: "wind_gusts_10m_max", label: "Maximum Wind Gusts (10 m)" },
        { inputValue: "wind_direction_10m_dominant", label: "Dominant Wind Direction (10 m)" },
        { inputValue: "shortwave_radiation_sum", label: "Shortwave Radiation Sum" },
        { inputValue: "et0_fao_evapotranspiration", label: "Reference Evapotranspiration (ET₀)" }
    ];    

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        submitWeatherData(newWeather);
    }

    return (
        <div className={css.WeatherFormContainer}>
            <form onSubmit={handleSubmit}>
                <label>
                    Latitude:
                    <input
                        type="number"
                        step="0.0001"
                        name="latitude"
                        min={-90}
                        max={90}
                        value={newWeather?.latitude}
                        onChange={(e)=>setNewWeather({...newWeather, latitude: e.target.valueAsNumber})}
                        required
                    />
                </label>
                <label>
                    Longitude:
                    <input
                        type="number"
                        step="0.0001"
                        name="longitude"
                        min={-180}
                        max={180}
                        value={newWeather?.longitude}
                        onChange={(e)=>setNewWeather({...newWeather, longitude: e.target.valueAsNumber})}
                        required
                    />
                </label>
                <label>
                    Timezone:
                    <select
                        name="timezone"
                        value={newWeather?.timezone}
                        onChange={(e)=>setNewWeather({...newWeather, timezone: e.target.value})}
                    >
                        <option value="">Not set (GMT+0)</option>
                        <option value="America/Anchorage">America/Anchorage</option>
                        <option value="America/Los_Angeles">America/Los Angeles</option>
                        <option value="America/Denver">America/Denver</option>
                        <option value="America/Chicago">America/Chicago</option>
                        <option value="America/New_York">America/New York</option>
                        <option value="America/Sao_Paulo">America/Sao Paulo</option>
                        <option value="Europe/London">Europe/London</option>
                        <option value="Europe/Berlin">Europe/Berlin</option>
                        <option value="Europe/Moscow">Europe/Moscow</option>
                        <option value="Africa/Cairo">Africa/Cairo</option>
                        <option value="Asia/Bangkok">Asia/Bangkok</option>
                        <option value="Asia/Singapore">Asia/Singapore</option>
                        <option value="Asia/Tokyo">Asia/Tokyo</option>
                        <option value="Australia/Sydney">Australia/Sydney</option>
                        <option value="Pacific/Auckland">Pacific/Auckland</option>
                        <option value="GMT">GMT+0</option>
                        <option value="auto">Automatically detect time zone</option>
                    </select>
                </label>
                <label>
                    Forecast Days:
                    <select
                        name="forecast_days"
                        value={newWeather?.forecast_days}
                        onChange={(e)=>setNewWeather({...newWeather, forecast_days: Number(e.target.value)})}
                    >
                        <option value="1">1 day</option>
                        <option value="3">3 days</option>
                        <option value="7">7 days (default)</option>
                        <option value="14">14 days</option>
                        <option value="16">16 days</option>
                    </select>
                </label>
                <label>
                    Past Days:
                    <select
                        name="past_days"
                        value={newWeather?.past_days}
                        onChange={(e)=>setNewWeather({...newWeather, past_days: Number(e.target.value)})}
                    >
                        <option value="0">0 (default)</option>
                        <option value="1">1 day</option>
                        <option value="2">2 days</option>
                        <option value="3">3 days</option>
                        <option value="5">5 days</option>
                        <option value="7">1 week</option>
                        <option value="14">2 weeks</option>
                        <option value="31">1 month</option>
                        <option value="61">2 months</option>
                        <option value="92">3 months</option>
                    </select>
                </label>
                <fieldset id="hourlyFields" >
                    <legend>Hourly Weather Variables</legend>
                    {
                        hourlyVariables.map( (variable)=> (
                            <label key={variable.inputValue}>
                            <input
                                type="checkbox"
                                name="hourly"
                                value={variable.inputValue}
                                onChange={handleCheckedChange}
                            />
                            {variable.label}
                        </label>
                        ))
                    }
                </fieldset>

                <fieldset id="dailyFields">
                    <legend>Daily Weather Variables</legend>
                    {
                        dailyVariables.map( (variable)=> (
                            <label key={variable.inputValue}>
                            <input
                                type="checkbox"
                                name="daily"
                                value={variable.inputValue}
                                onChange={handleCheckedChange}
                            />
                            {variable.label}
                        </label>
                        ))
                    }
                </fieldset>

                <button type="submit">Get Weather</button>
            </form>
        </div>
    );
}

    // const [hourlyData, setHourlyData] = useState<string[]>([])
    // const [dailyData, setDailyData] = useState<string[]>([])

    // function onHourlyChecked(event:React.ChangeEvent<HTMLInputElement>){
    //     const updatedHourlyArray = event.target.checked ? [...hourlyData, event.target.value] : hourlyData.filter(item => item !== event.target.value);
    //     console.log('hourly: event.target.checked', event.target.checked)
    //     console.log('hourly: event.target.value', event.target.value)
    //     setHourlyData(updatedHourlyArray)
    //     setNewWeather({...newWeather, hourly: updatedHourlyArray})
    // };
    // console.log('hourlyData', hourlyData)
    

    // function onDailyChecked(event: React.ChangeEvent<HTMLInputElement>){
    //     const updatedDailyArray = event.target.checked ? [...dailyData, event.target.value] : dailyData.filter(item => item !== event.target.value);
    //     console.log('daily: event.target.checked', event.target.checked)
    //     console.log('daily: event.target.value', event.target.value)
    //     setDailyData(updatedDailyArray)
    //     setNewWeather({...newWeather, daily: updatedDailyArray})
    // };
    // console.log('dailyData', dailyData)