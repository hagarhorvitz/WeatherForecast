export class WeatherModel {
	latitude: number;
    longitude: number;
    elevation: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    hourly: string[]; //{time ["2024-12-24T00:00",]LIST + weather_code [1,1,0,]LIST} - obj
    hourly_units: string[]; //{time "iso8601" + weather_code "wmo code"} - obj  
    daily: string[]; //{sunrise ["2024-12-23T18:43",]LIST + time ["2024-12-24",]LIST} - obj
    daily_units: string[]; //{sunrise "iso8601", + time "iso8601"} - obj
    past_days: number;
    forecast_days: number;
}
