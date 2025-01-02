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

    const [newWeather, setNewWeather] = useState<WeatherFormModel>({
        latitude: 0,
        longitude: 0,
        timezone: "",
        past_days: 0,
        forecast_days: 7,
        hourly: [],
        daily: [],
    });

    const [hourlyData, setHourlyData] = useState<string[]>([])
    const [dailyData, setDailyData] = useState<string[]>([])

    function onHourlyChecked(event:React.ChangeEvent<HTMLInputElement>){
        const updatedHourlyArray = event.target.checked ? [...hourlyData, event.target.value] : hourlyData.filter(item => item !== event.target.value);
        console.log('hourly: event.target.checked', event.target.checked)
        console.log('hourly: event.target.value', event.target.value)
        setHourlyData(updatedHourlyArray)
        setNewWeather({...newWeather, hourly: updatedHourlyArray})
    };
    console.log('hourlyData', hourlyData)

    function onDailyChecked(event: React.ChangeEvent<HTMLInputElement>){
        const updatedDailyArray = event.target.checked ? [...dailyData, event.target.value] : dailyData.filter(item => item !== event.target.value);
        console.log('daily: event.target.checked', event.target.checked)
        console.log('daily: event.target.value', event.target.value)
        setDailyData(updatedDailyArray)
        setNewWeather({...newWeather, daily: updatedDailyArray})
    };
    console.log('dailyData', dailyData)

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
                <fieldset name="hourly">
                    <legend>Hourly Weather Variables</legend>
                    <label>
                        <input
                            type="checkbox"
                            value="temperature_2m"
                            onChange={onHourlyChecked}
                        />
                        Temperature (2 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="relative_humidity_2m"
                            onChange={onHourlyChecked}
                        />
                        Relative Humidity (2 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="dewpoint_2m"
                            onChange={onHourlyChecked}
                        />
                        Dewpoint (2 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="apparent_temperature"
                            onChange={onHourlyChecked}
                        />
                        Apparent Temperature
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="precipitation_probability"
                            onChange={onHourlyChecked}
                        />
                        Precipitation Probability
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="precipitation"
                            onChange={onHourlyChecked}
                        />
                        Precipitation (rain + showers + snow)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="rain"
                            onChange={onHourlyChecked}
                        />
                        Rain
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="showers"
                            onChange={onHourlyChecked}
                        />
                        Showers
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="snowfall"
                            onChange={onHourlyChecked}
                        />
                        Snowfall
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="snow_depth"
                            onChange={onHourlyChecked}
                        />
                        Snow Depth
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="weather_code"
                            onChange={onHourlyChecked}
                        />
                        Weather Code
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="sealevel_pressure"
                            onChange={onHourlyChecked}
                        />
                        Sealevel Pressure
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="surface_pressure"
                            onChange={onHourlyChecked}
                        />
                        Surface Pressure
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="cloud_cover_total"
                            onChange={onHourlyChecked}
                        />
                        Cloud Cover Total
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="cloud_cover_low"
                            onChange={onHourlyChecked}
                        />
                        Cloud Cover Low
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="cloud_cover_mid"
                            onChange={onHourlyChecked}
                        />
                        Cloud Cover Mid
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="cloud_cover_high"
                            onChange={onHourlyChecked}
                        />
                        Cloud Cover High
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="visibility"
                            onChange={onHourlyChecked}
                        />
                        Visibility
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="evapotranspiration"
                            onChange={onHourlyChecked}
                        />
                        Evapotranspiration
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="reference_evapotranspiration"
                            onChange={onHourlyChecked}
                        />
                        Reference Evapotranspiration (ET₀)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="vapour_pressure_deficit"
                            onChange={onHourlyChecked}
                        />
                        Vapour Pressure Deficit
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="wind_speed_10m"
                            onChange={onHourlyChecked}
                        />
                        Wind Speed (10 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="wind_speed_80m"
                            onChange={onHourlyChecked}
                        />
                        Wind Speed (80 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="wind_speed_120m"
                            onChange={onHourlyChecked}
                        />
                        Wind Speed (120 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="wind_speed_180m"
                            onChange={onHourlyChecked}
                        />
                        Wind Speed (180 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="wind_direction_10m"
                            onChange={onHourlyChecked}
                        />
                        Wind Direction (10 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="wind_direction_80m"
                            onChange={onHourlyChecked}
                        />
                        Wind Direction (80 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="wind_direction_120m"
                            onChange={onHourlyChecked}
                        />
                        Wind Direction (120 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="wind_direction_180m"
                            onChange={onHourlyChecked}
                        />
                        Wind Direction (180 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="wind_gusts_10m"
                            onChange={onHourlyChecked}
                        />
                        Wind Gusts (10 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="temperature_80m"
                            onChange={onHourlyChecked}
                        />
                        Temperature (80 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="temperature_120m"
                            onChange={onHourlyChecked}
                        />
                        Temperature (120 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="temperature_180m"
                            onChange={onHourlyChecked}
                        />
                        Temperature (180 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="soil_temperature_0cm"
                            onChange={onHourlyChecked}
                        />
                        Soil Temperature (0 cm)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="soil_temperature_6cm"
                            onChange={onHourlyChecked}
                        />
                        Soil Temperature (6 cm)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="soil_temperature_18cm"
                            onChange={onHourlyChecked}
                        />
                        Soil Temperature (18 cm)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="soil_temperature_54cm"
                            onChange={onHourlyChecked}
                        />
                        Soil Temperature (54 cm)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="soil_moisture_0_1cm"
                            onChange={onHourlyChecked}
                        />
                        Soil Moisture (0-1 cm)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="soil_moisture_1_3cm"
                            onChange={onHourlyChecked}
                        />
                        Soil Moisture (1-3 cm)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="soil_moisture_3_9cm"
                            onChange={onHourlyChecked}
                        />
                        Soil Moisture (3-9 cm)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="soil_moisture_9_27cm"
                            onChange={onHourlyChecked}
                        />
                        Soil Moisture (9-27 cm)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="soil_moisture_27_81cm"
                            onChange={onHourlyChecked}
                        />
                        Soil Moisture (27-81 cm)
                    </label>
                </fieldset>

                <fieldset name="daily">
                    <legend>Daily Weather Variables</legend>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="weather_code"
                            onChange={onDailyChecked}
                        />
                        Weather Code
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="max_temperature_2m"
                            onChange={onDailyChecked}
                        />
                        Maximum Temperature (2 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="min_temperature_2m"
                            onChange={onDailyChecked}
                        />
                        Minimum Temperature (2 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="max_apparent_temperature_2m"
                            onChange={onDailyChecked}
                        />
                        Maximum Apparent Temperature (2 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="min_apparent_temperature_2m"
                            onChange={onDailyChecked}
                        />
                        Minimum Apparent Temperature (2 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="sunrise"
                            onChange={onDailyChecked}
                        />
                        Sunrise
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="sunset"
                            onChange={onDailyChecked}
                        />
                        Sunset
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="daylight_duration"
                            onChange={onDailyChecked}
                        />
                        Daylight Duration
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="sunshine_duration"
                            onChange={onDailyChecked}
                        />
                        Sunshine Duration
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="uv_index"
                            onChange={onDailyChecked}
                        />
                        UV Index
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="uv_index_clear_sky"
                            onChange={onDailyChecked}
                        />
                        UV Index Clear Sky
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="precipitation_sum"
                            onChange={onDailyChecked}
                        />
                        Precipitation Sum
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="rain_sum"
                            onChange={onDailyChecked}
                        />
                        Rain Sum
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="showers_sum"
                            onChange={onDailyChecked}
                        />
                        Showers Sum
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="snowfall_sum"
                            onChange={onDailyChecked}
                        />
                        Snowfall Sum
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="precipitation_hours"
                            onChange={onDailyChecked}
                        />
                        Precipitation Hours
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="precipitation_probability_max"
                            onChange={onDailyChecked}
                        />
                        Precipitation Probability Max
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="max_wind_speed_10m"
                            onChange={onDailyChecked}
                        />
                        Maximum Wind Speed (10 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="max_wind_gusts_10m"
                            onChange={onDailyChecked}
                        />
                        Maximum Wind Gusts (10 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="dominant_wind_direction_10m"
                            onChange={onDailyChecked}
                        />
                        Dominant Wind Direction (10 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="shortwave_radiation_sum"
                            onChange={onDailyChecked}
                        />
                        Shortwave Radiation Sum
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            
                            value="reference_evapotranspiration"
                            onChange={onDailyChecked}
                        />
                        Reference Evapotranspiration (ET₀)
                    </label>
                </fieldset>

                <button onClick={()=>sendWeatherData(newWeather)}>Get Weather</button>
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