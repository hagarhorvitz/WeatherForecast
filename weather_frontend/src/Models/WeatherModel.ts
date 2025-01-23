export class WeatherModel {
    latitude: number;
    longitude: number;
    elevation: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    hourly_units: {
        time: string,
        [key: string]: string;
    };
    hourly: {
        time: string[],
        [key: string]: string[] | number[];
    };
    daily_units: {
        time: string,
        [key: string]: string;
    };
    daily: {
        time: string[],
        [key: string]: string[] | number[];
    };
    past_days: number;
    forecast_days: number;
}
