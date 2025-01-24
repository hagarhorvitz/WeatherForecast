
class WeatherModel:
    def __init__(self, latitude, longitude, timezone, hourly, daily, past_days, forecast_days):
        self.latitude = latitude
        self.longitude = longitude
        self.timezone = timezone
        self.hourly = hourly
        self.daily = daily
        self.past_days = past_days
        self.forecast_days = forecast_days


    past_days_options = [0, 1, 2, 3, 5, 7, 14, 31, 61, 92]
    forecast_days_options = [1, 3, 7, 14, 16]
    @staticmethod
    def check_days(number, days_list):
        for day in days_list:
            if number == day:
                return True
        return False


    def validation_parameters(self):
        if not self.latitude: return "Latitude is required, please enter"
        if not self.longitude: return "Longitude is required, please enter"
        if not self.timezone: return "Timezone is required, please select"
        if not self.hourly: return "'Hourly' options are required, please select at least one"
        if not self.daily: return "'Daily' options are required, please select at least one"
        if not self.past_days: return "'Past days' is required, please select default or another option"
        if not self.forecast_days: return "'Forecast days' is required, please select default or another option"
        if float(self.latitude) < -90 or float(self.latitude) > 90: return "Latitude must be between -90 and 90"
        if float(self.longitude) < -180 or float(self.longitude) > 180: return "Latitude must be between -180 and 180"
        if self.check_days(self.past_days, self.past_days_options) == False: return "'Past day' selected is not valid, please select from the options only"
        if self.check_days(self.forecast_days, self.forecast_days_options) == False: return "'Forecast day' selected is not valid, please select from the options only"
        return None
    
