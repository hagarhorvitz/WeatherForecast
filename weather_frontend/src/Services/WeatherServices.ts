import axios from "axios";
import { appConfig } from "../Utils/AppConfig";
import { WeatherModel } from "../Models/WeatherModel";
import { WeatherFormModel } from "../Models/WeatherFormModel";

//{latitude, longitude, timezone, past_days, forecast_days, hourly, daily}
// params : {
//     'latitude': latitude,
//     'longitude': longitude,
//     'hourly': hourly,
//     'daily': daily,
//     'timezone': timezone,
//     'past_days': past_days,
//     'forecast_days': forecast_days
// }

class WeatherServices {
	public async fetchWeather (props:WeatherFormModel): Promise<WeatherModel> {
        console.log("service fetchWeather props: ", props);
        const queryParams = {
            ...props,
            hourly: props.hourly.join(','),
            daily: props.daily.join(','),
        };
        const response = await axios.get(appConfig.weatherUrl, {
            params: {
                ...queryParams
            }
        });
        console.log("service fetchWeather response: ", response);
        console.log("service fetchWeather response.data: ", response.data);
        return response.data;
    };
}

export const weatherService = new WeatherServices();
