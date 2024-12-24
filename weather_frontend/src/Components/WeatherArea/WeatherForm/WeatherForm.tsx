import { useState } from "react";
import css from "./WeatherForm.module.css";


type WeatherFormProps = {
    onFetchWeather: (params: Record<string, string | number | string[]>) => void;
};

export function WeatherForm({ onFetchWeather }: WeatherFormProps): JSX.Element {

    const [formData, setFormData] = useState({
        latitude: 0,
        longitude: 0,
        timezone: "GMT+0",
        forecastDays: 7,
        pastDays: 0,
        hourlyVariables: [] as string[],
        dailyVariables: [] as string[],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    
        if (type === "checkbox") {
            setFormData((prev) => {
                const updatedArray = checked
                    ? [...(prev[name as keyof typeof formData] as string[]), value]
                    : (prev[name as keyof typeof formData] as string[]).filter(
                        (item) => item !== value
                    );
                return { ...prev, [name]: updatedArray };
            });
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };
    

    // const handleMultiSelect = (e: React.ChangeEvent<HTMLSelectElement>, type: string) => {
    //     const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    //     setFormData((prev) => ({ ...prev, [type]: selectedOptions }));
    // };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onFetchWeather(formData);
    };

    return (
        <div className={css.WeatherFormContainer}>
            <form className={css.WeatherForm} onSubmit={handleSubmit}>
                <label>
                    Latitude:
                    <input
                        type="number"
                        step="0.0001"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Longitude:
                    <input
                        type="number"
                        step="0.0001"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Timezone:
                    <select
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleChange}
                    >
                        <option value="anchorage">America/Anchorage</option>
                        <option value="los_angeles">America/Los Angeles</option>
                        <option value="denver">America/Denver</option>
                        <option value="chicago">America/Chicago</option>
                        <option value="new_york">America/New York</option>
                        <option value="sao_paulo">America/Sao Paulo</option>
                        <option value="london">Europe/London</option>
                        <option value="berlin">Europe/Berlin</option>
                        <option value="moscow">Europe/Moscow</option>
                        <option value="cairo">Africa/Cairo</option>
                        <option value="bangkok">Asia/Bangkok</option>
                        <option value="singapore">Asia/Singapore</option>
                        <option value="tokyo">Asia/Tokyo</option>
                        <option value="sydney">Australia/Sydney</option>
                        <option value="auckland">Pacific/Auckland</option>
                        <option value="Not_set">Not set (GMT+0)</option>
                        <option value="GMT+0">GMT+0</option>
                        <option value="auto_timezone">Automatically detect time zone</option>
                    </select>
                </label>
                <label>
                    Forecast Days:
                    <select
                        name="forecastDays"
                        value={formData.forecastDays}
                        onChange={handleChange}
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
                        name="pastDays"
                        value={formData.pastDays}
                        onChange={handleChange}
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
                <fieldset>
                    <legend>Hourly Weather Variables</legend>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="temperature_2m"
                            onChange={handleChange}
                        />
                        Temperature (2 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="relative_humidity_2m"
                            onChange={handleChange}
                        />
                        Relative Humidity (2 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="dewpoint_2m"
                            onChange={handleChange}
                        />
                        Dewpoint (2 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="apparent_temperature"
                            onChange={handleChange}
                        />
                        Apparent Temperature
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="precipitation_probability"
                            onChange={handleChange}
                        />
                        Precipitation Probability
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="precipitation"
                            onChange={handleChange}
                        />
                        Precipitation (rain + showers + snow)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="rain"
                            onChange={handleChange}
                        />
                        Rain
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="showers"
                            onChange={handleChange}
                        />
                        Showers
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="snowfall"
                            onChange={handleChange}
                        />
                        Snowfall
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="snow_depth"
                            onChange={handleChange}
                        />
                        Snow Depth
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="weather_code"
                            onChange={handleChange}
                        />
                        Weather Code
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="sealevel_pressure"
                            onChange={handleChange}
                        />
                        Sealevel Pressure
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="surface_pressure"
                            onChange={handleChange}
                        />
                        Surface Pressure
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="cloud_cover_total"
                            onChange={handleChange}
                        />
                        Cloud Cover Total
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="cloud_cover_low"
                            onChange={handleChange}
                        />
                        Cloud Cover Low
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="cloud_cover_mid"
                            onChange={handleChange}
                        />
                        Cloud Cover Mid
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="cloud_cover_high"
                            onChange={handleChange}
                        />
                        Cloud Cover High
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="visibility"
                            onChange={handleChange}
                        />
                        Visibility
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="evapotranspiration"
                            onChange={handleChange}
                        />
                        Evapotranspiration
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="reference_evapotranspiration"
                            onChange={handleChange}
                        />
                        Reference Evapotranspiration (ET₀)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="vapour_pressure_deficit"
                            onChange={handleChange}
                        />
                        Vapour Pressure Deficit
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="wind_speed_10m"
                            onChange={handleChange}
                        />
                        Wind Speed (10 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="wind_speed_80m"
                            onChange={handleChange}
                        />
                        Wind Speed (80 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="wind_speed_120m"
                            onChange={handleChange}
                        />
                        Wind Speed (120 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="wind_speed_180m"
                            onChange={handleChange}
                        />
                        Wind Speed (180 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="wind_direction_10m"
                            onChange={handleChange}
                        />
                        Wind Direction (10 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="wind_direction_80m"
                            onChange={handleChange}
                        />
                        Wind Direction (80 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="wind_direction_120m"
                            onChange={handleChange}
                        />
                        Wind Direction (120 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="wind_direction_180m"
                            onChange={handleChange}
                        />
                        Wind Direction (180 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="wind_gusts_10m"
                            onChange={handleChange}
                        />
                        Wind Gusts (10 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="temperature_80m"
                            onChange={handleChange}
                        />
                        Temperature (80 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="temperature_120m"
                            onChange={handleChange}
                        />
                        Temperature (120 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="temperature_180m"
                            onChange={handleChange}
                        />
                        Temperature (180 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="soil_temperature_0cm"
                            onChange={handleChange}
                        />
                        Soil Temperature (0 cm)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="soil_temperature_6cm"
                            onChange={handleChange}
                        />
                        Soil Temperature (6 cm)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="soil_temperature_18cm"
                            onChange={handleChange}
                        />
                        Soil Temperature (18 cm)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="soil_temperature_54cm"
                            onChange={handleChange}
                        />
                        Soil Temperature (54 cm)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="soil_moisture_0_1cm"
                            onChange={handleChange}
                        />
                        Soil Moisture (0-1 cm)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="soil_moisture_1_3cm"
                            onChange={handleChange}
                        />
                        Soil Moisture (1-3 cm)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="soil_moisture_3_9cm"
                            onChange={handleChange}
                        />
                        Soil Moisture (3-9 cm)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="soil_moisture_9_27cm"
                            onChange={handleChange}
                        />
                        Soil Moisture (9-27 cm)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hourlyVariables"
                            value="soil_moisture_27_81cm"
                            onChange={handleChange}
                        />
                        Soil Moisture (27-81 cm)
                    </label>
                </fieldset>

                <fieldset>
                    <legend>Daily Weather Variables</legend>
                    <label>
                        <input
                            type="checkbox"
                            name="dailyVariables"
                            value="weather_code"
                            onChange={handleChange}
                        />
                        Weather Code
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="dailyVariables"
                            value="max_temperature_2m"
                            onChange={handleChange}
                        />
                        Maximum Temperature (2 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="dailyVariables"
                            value="min_temperature_2m"
                            onChange={handleChange}
                        />
                        Minimum Temperature (2 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="dailyVariables"
                            value="max_apparent_temperature_2m"
                            onChange={handleChange}
                        />
                        Maximum Apparent Temperature (2 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="dailyVariables"
                            value="min_apparent_temperature_2m"
                            onChange={handleChange}
                        />
                        Minimum Apparent Temperature (2 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="dailyVariables"
                            value="sunrise"
                            onChange={handleChange}
                        />
                        Sunrise
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="dailyVariables"
                            value="sunset"
                            onChange={handleChange}
                        />
                        Sunset
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="dailyVariables"
                            value="daylight_duration"
                            onChange={handleChange}
                        />
                        Daylight Duration
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="dailyVariables"
                            value="sunshine_duration"
                            onChange={handleChange}
                        />
                        Sunshine Duration
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="dailyVariables"
                            value="uv_index"
                            onChange={handleChange}
                        />
                        UV Index
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="dailyVariables"
                            value="uv_index_clear_sky"
                            onChange={handleChange}
                        />
                        UV Index Clear Sky
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="dailyVariables"
                            value="precipitation_sum"
                            onChange={handleChange}
                        />
                        Precipitation Sum
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="dailyVariables"
                            value="rain_sum"
                            onChange={handleChange}
                        />
                        Rain Sum
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="dailyVariables"
                            value="showers_sum"
                            onChange={handleChange}
                        />
                        Showers Sum
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="dailyVariables"
                            value="snowfall_sum"
                            onChange={handleChange}
                        />
                        Snowfall Sum
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="dailyVariables"
                            value="precipitation_hours"
                            onChange={handleChange}
                        />
                        Precipitation Hours
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="dailyVariables"
                            value="precipitation_probability_max"
                            onChange={handleChange}
                        />
                        Precipitation Probability Max
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="dailyVariables"
                            value="max_wind_speed_10m"
                            onChange={handleChange}
                        />
                        Maximum Wind Speed (10 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="dailyVariables"
                            value="max_wind_gusts_10m"
                            onChange={handleChange}
                        />
                        Maximum Wind Gusts (10 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="dailyVariables"
                            value="dominant_wind_direction_10m"
                            onChange={handleChange}
                        />
                        Dominant Wind Direction (10 m)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="dailyVariables"
                            value="shortwave_radiation_sum"
                            onChange={handleChange}
                        />
                        Shortwave Radiation Sum
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="dailyVariables"
                            value="reference_evapotranspiration"
                            onChange={handleChange}
                        />
                        Reference Evapotranspiration (ET₀)
                    </label>
                </fieldset>

                <button type="submit">Get Weather</button>
            </form>
        </div>
    );
}