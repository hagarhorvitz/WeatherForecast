import { useState } from "react";
import css from "./WeatherForm.module.css";
import { WeatherFormModel } from "../../../Models/WeatherFormModel";
// import { weatherService } from "../../../Services/WeatherServices";
// import { WeatherDisplay } from "../WeatherDisplay/WeatherDisplay";
// import { WeatherModel } from "../../../Models/WeatherModel";

interface FormProps {
    sendWeatherData: (weather: WeatherFormModel)=>void
}

export function WeatherForm({sendWeatherData}: FormProps): JSX.Element {
    
    // const [hourlyData, setHourlyData] = useState<string[]>([])
    // const [dailyData, setDailyData] = useState<string[]>([])

    const [newWeather, setNewWeather] = useState<WeatherFormModel>({
        latitude: 0,
        longitude: 0,
        timezone: "",
        past_days: 0,
        forecast_days: 7,
        hourly: [],
        daily: [],
    });

    // useEffect( ()=> {
    //     async function getWeatherData() {
    //         try {
    //             const response = await weatherService.fetchWeather(newWeather); 
    //             setWeatherData(response)
    //         }
    //         catch (err){
    //             console.error("Error fetching weather data:", err);
    //         }
    //     }
    // }, [])
    // const getWeatherData = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     try {
    //         const response = await weatherService.fetchWeather(formData);
    //         return (response.map( (weather, index) => (
    //             <WeatherDisplay 
    //             key={index} 
    //             {...weather}/>
    //         )))
    //     }
    //     catch (err) {
    //         console.error("Error fetching weather data:", err);
    //     }
    // };

    return (
        <div className={css.WeatherFormContainer}>
            <form className={css.WeatherForm} onSubmit={()=>sendWeatherData(newWeather)}>
                <label>
                    Latitude:
                    <input
                        type="number"
                        step="0.0001"
                        name="latitude"
                        min={-90}
                        max={90}
                        value={newWeather?.latitude}
                        onChange={(e)=>setNewWeather({...newWeather, latitude: Number(e.target.value)})}
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
                        onChange={(e)=>setNewWeather({...newWeather, longitude: Number(e.target.value)})}
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
                        <option value="" selected>Not set (GMT+0)</option>
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
                        <option value="7" selected >7 days (default)</option>
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
                        <option value="0" selected >0 (default)</option>
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
                <fieldset>
                    <legend>Hourly Weather Variables</legend>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="temperature_2m"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Temperature (2 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="relative_humidity_2m"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Relative Humidity (2 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="dewpoint_2m"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Dewpoint (2 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="apparent_temperature"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                            //onSelect={}
                        />
                        Apparent Temperature
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="precipitation_probability"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Precipitation Probability
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="precipitation"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Precipitation (rain + showers + snow)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="rain"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Rain
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="showers"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Showers
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="snowfall"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Snowfall
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="snow_depth"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Snow Depth
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="weather_code"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Weather Code
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="sealevel_pressure"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Sealevel Pressure
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="surface_pressure"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Surface Pressure
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="cloud_cover_total"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Cloud Cover Total
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="cloud_cover_low"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Cloud Cover Low
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="cloud_cover_mid"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Cloud Cover Mid
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="cloud_cover_high"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Cloud Cover High
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="visibility"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Visibility
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="evapotranspiration"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Evapotranspiration
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="reference_evapotranspiration"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Reference Evapotranspiration (ET₀)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="vapour_pressure_deficit"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Vapour Pressure Deficit
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="wind_speed_10m"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Wind Speed (10 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="wind_speed_80m"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Wind Speed (80 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="wind_speed_120m"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Wind Speed (120 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="wind_speed_180m"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Wind Speed (180 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="wind_direction_10m"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Wind Direction (10 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="wind_direction_80m"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Wind Direction (80 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="wind_direction_120m"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Wind Direction (120 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="wind_direction_180m"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Wind Direction (180 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="wind_gusts_10m"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Wind Gusts (10 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="temperature_80m"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Temperature (80 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="temperature_120m"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Temperature (120 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="temperature_180m"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Temperature (180 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="soil_temperature_0cm"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Soil Temperature (0 cm)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="soil_temperature_6cm"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Soil Temperature (6 cm)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="soil_temperature_18cm"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Soil Temperature (18 cm)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="soil_temperature_54cm"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Soil Temperature (54 cm)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="soil_moisture_0_1cm"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Soil Moisture (0-1 cm)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="soil_moisture_1_3cm"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Soil Moisture (1-3 cm)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="soil_moisture_3_9cm"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Soil Moisture (3-9 cm)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="soil_moisture_9_27cm"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Soil Moisture (9-27 cm)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourly"
                            value="soil_moisture_27_81cm"
                            onChange={(e)=>setNewWeather({...newWeather, hourly: [...newWeather.hourly ,e.target.value]})}
                        />
                        Soil Moisture (27-81 cm)
                    </label>
                </fieldset>

                <fieldset>
                    <legend>Daily Weather Variables</legend>
                    <label>
                        <input
                            type="checkbox"
                            name="daily"
                            value="weather_code"
                            onChange={(e)=>setNewWeather({...newWeather, daily: [...newWeather.daily ,e.target.value]})}
                        />
                        Weather Code
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="daily"
                            value="max_temperature_2m"
                            onChange={(e)=>setNewWeather({...newWeather, daily: [...newWeather.daily ,e.target.value]})}
                        />
                        Maximum Temperature (2 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="daily"
                            value="min_temperature_2m"
                            onChange={(e)=>setNewWeather({...newWeather, daily: [...newWeather.daily ,e.target.value]})}
                        />
                        Minimum Temperature (2 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="daily"
                            value="max_apparent_temperature_2m"
                            onChange={(e)=>setNewWeather({...newWeather, daily: [...newWeather.daily ,e.target.value]})}
                        />
                        Maximum Apparent Temperature (2 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="daily"
                            value="min_apparent_temperature_2m"
                            onChange={(e)=>setNewWeather({...newWeather, daily: [...newWeather.daily ,e.target.value]})}
                        />
                        Minimum Apparent Temperature (2 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="daily"
                            value="sunrise"
                            onChange={(e)=>setNewWeather({...newWeather, daily: [...newWeather.daily ,e.target.value]})}
                        />
                        Sunrise
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="daily"
                            value="sunset"
                            onChange={(e)=>setNewWeather({...newWeather, daily: [...newWeather.daily ,e.target.value]})}
                        />
                        Sunset
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="daily"
                            value="daylight_duration"
                            onChange={(e)=>setNewWeather({...newWeather, daily: [...newWeather.daily ,e.target.value]})}
                        />
                        Daylight Duration
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="daily"
                            value="sunshine_duration"
                            onChange={(e)=>setNewWeather({...newWeather, daily: [...newWeather.daily ,e.target.value]})}
                        />
                        Sunshine Duration
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="daily"
                            value="uv_index"
                            onChange={(e)=>setNewWeather({...newWeather, daily: [...newWeather.daily ,e.target.value]})}
                        />
                        UV Index
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="daily"
                            value="uv_index_clear_sky"
                            onChange={(e)=>setNewWeather({...newWeather, daily: [...newWeather.daily ,e.target.value]})}
                        />
                        UV Index Clear Sky
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="daily"
                            value="precipitation_sum"
                            onChange={(e)=>setNewWeather({...newWeather, daily: [...newWeather.daily ,e.target.value]})}
                        />
                        Precipitation Sum
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="daily"
                            value="rain_sum"
                            onChange={(e)=>setNewWeather({...newWeather, daily: [...newWeather.daily ,e.target.value]})}
                        />
                        Rain Sum
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="daily"
                            value="showers_sum"
                            onChange={(e)=>setNewWeather({...newWeather, daily: [...newWeather.daily ,e.target.value]})}
                        />
                        Showers Sum
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="daily"
                            value="snowfall_sum"
                            onChange={(e)=>setNewWeather({...newWeather, daily: [...newWeather.daily ,e.target.value]})}
                        />
                        Snowfall Sum
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="daily"
                            value="precipitation_hours"
                            onChange={(e)=>setNewWeather({...newWeather, daily: [...newWeather.daily ,e.target.value]})}
                        />
                        Precipitation Hours
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="daily"
                            value="precipitation_probability_max"
                            onChange={(e)=>setNewWeather({...newWeather, daily: [...newWeather.daily ,e.target.value]})}
                        />
                        Precipitation Probability Max
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="daily"
                            value="max_wind_speed_10m"
                            onChange={(e)=>setNewWeather({...newWeather, daily: [...newWeather.daily ,e.target.value]})}
                        />
                        Maximum Wind Speed (10 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="daily"
                            value="max_wind_gusts_10m"
                            onChange={(e)=>setNewWeather({...newWeather, daily: [...newWeather.daily ,e.target.value]})}
                        />
                        Maximum Wind Gusts (10 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="daily"
                            value="dominant_wind_direction_10m"
                            onChange={(e)=>setNewWeather({...newWeather, daily: [...newWeather.daily ,e.target.value]})}
                        />
                        Dominant Wind Direction (10 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="daily"
                            value="shortwave_radiation_sum"
                            onChange={(e)=>setNewWeather({...newWeather, daily: [...newWeather.daily ,e.target.value]})}
                        />
                        Shortwave Radiation Sum
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="daily"
                            value="reference_evapotranspiration"
                            onChange={(e)=>setNewWeather({...newWeather, daily: [...newWeather.daily ,e.target.value]})}
                        />
                        Reference Evapotranspiration (ET₀)
                    </label>
                </fieldset>

                <button type="submit">Get Weather</button>
            </form>
        </div>
    );
}



// type WeatherFormProps = {
//     onFetchWeather: (params: Record<string, string | number | string[]>) => void;
// };
//{ onFetchWeather }: WeatherFormProps

    // const [formData, setFormData] = useState({
    //     latitude: 0,
    //     longitude: 0,
    //     timezone: "GMT+0",
    //     forecastDays: 7,
    //     pastDays: 0,
    //     hourlyVariables: [] as string[],
    //     dailyVariables: [] as string[],
    // });

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     onFetchWeather(formData);
    // };

    // const handleMultiSelect = (e: React.ChangeEvent<HTMLSelectElement>, type: string) => {
    //     const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    //     setFormData((prev) => ({ ...prev, [type]: selectedOptions }));
    // };

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //     const { name, value, type } = e.target;
    //     const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    
    //     if (type === "checkbox") {
    //         setFormData((prev) => {
    //             const updatedArray = checked
    //                 ? [...(prev[name as keyof typeof formData] as string[]), value]
    //                 : (prev[name as keyof typeof formData] as string[]).filter(
    //                     (item) => item !== value
    //                 );
    //             return { ...prev, [name]: updatedArray };
    //         });
    //     } else {
    //         setFormData((prev) => ({ ...prev, [name]: value }));
    //     }
    // };

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     try {
    //         const response = await weatherService.fetchWeather(formData);
    //         return (response.map( (weather, index) => (
    //             <WeatherDisplay 
    //             key={index} 
    //             {...weather}/>
    //         )))
    //     }
    //     catch (err) {
    //         console.error("Error fetching weather data:", err);
    //     }
    // };