export class WeatherFormModel {
    latitude: number;
    longitude: number;
    timezone: string;
    hourly: string[]; //{time ["2024-12-24T00:00",]LIST + weather_code [1,1,0,]LIST} - obj
    daily: string[]; //{sunrise ["2024-12-23T18:43",]LIST + time ["2024-12-24",]LIST} - obj
    past_days: number;
    forecast_days: number;
}
