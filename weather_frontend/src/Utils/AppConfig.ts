class AppConfig {
    public readonly weatherUrl = 'http://localhost:5000/weather';
    public readonly registerUrl = 'http://localhost:5000/register';
    public readonly loginUrl = 'http://localhost:5000/login';
    public readonly logoutUrl = 'http://localhost:5000/logout';
    public readonly getUserUrl = 'http://localhost:5000/user_info';
    public readonly refreshTokenUrl = 'http://localhost:5000/refresh';
}

export const appConfig = new AppConfig();