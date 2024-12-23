
class WeatherModel:
    def __init__(self, latitude, longitude, elevation, generationtime_ms, utc_offset_seconds, timezone, timezone_abbreviation, hourly, hourly_units):
        self.latitude = latitude
        self.longitude = longitude
        self.elevation = elevation
        self.generationtime_ms = generationtime_ms
        self.utc_offset_seconds = utc_offset_seconds
        self.timezone = timezone
        self.timezone_abbreviation = timezone_abbreviation
        self.hourly = hourly
        self.hourly_units = hourly_units

    
    def validation_required_parameters(self):
        if not self.latitude: return "Latitude is required, please enter it"
        if not self.longitude: return "Longitude is required, please enter it"
        if float(self.latitude) < -90 or float(self.latitude) > 90: return "Latitude must be between -90 and 90"
        if float(self.longitude) < -180 or float(self.longitude) > 180: return "Latitude must be between -180 and 180"
        if self.elevation or self.generationtime_ms or (self.elevation and self.generationtime_ms):
            if not isinstance(self.elevation, float): return "Elevation must be as a number"
            if not isinstance(self.generationtime_ms, float): return "Generationtime_ms must be as a number"
        return None