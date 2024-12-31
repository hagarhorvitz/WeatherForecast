import axios from "axios";
import { appConfig } from "../Utils/AppConfig";
import { WeatherModel } from "../Models/WeatherModel";
import { WeatherFormModel } from "../Models/WeatherFormModel";

class WeatherServices {
	public async fetchWeather (props:WeatherFormModel): Promise<WeatherModel> {
        const response = await axios.get(appConfig.weatherUrl, {
            params: props,
        });
        console.log("service fetchWeather response.data: ", response.data);
        return response.data;
    };
}

export const weatherService = new WeatherServices();
