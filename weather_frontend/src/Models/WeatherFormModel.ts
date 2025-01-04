export class WeatherFormModel {
    latitude: number;
    longitude: number;
    timezone: string;
    hourly: string[]; 
    daily: string[]; 
    past_days: number;
    forecast_days: number;
}
