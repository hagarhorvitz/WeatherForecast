# WeatherForecast

### Table of Contents
1. [Overview](#overview)  
2. [Project Structure](#project-structure)  
3. [Backend Details (Flask)](#backend-details-flask)  
   - [Key Features (Backend)](#key-features-backend)  
   - [File/Folder Explanation (Backend)](#filefolder-explanation-backend)  
   - [Installation & Setup (Backend)](#installation--setup-backend)  
   - [Running & Testing (Backend)](#running--testing-backend)  
4. [Frontend Details (React + TypeScript + Vite)](#frontend-details-react--typescript--vite)  
   - [Key Features (Frontend)](#key-features-frontend)  
   - [File/Folder Explanation (Frontend)](#filefolder-explanation-frontend)  
   - [Installation & Setup (Frontend)](#installation--setup-frontend)  
   - [Running & Building (Frontend)](#running--building-frontend)  
5. [Database Setup (MySQL)](#database-setup-mysql)  
6. [Environment Variables](#environment-variables)  
7. [Future Improvements](#future-improvements)  
8. [License](#license)  

---

## Overview
This **Weather Forecast** project is a full-stack web application that lets users register and log in, then retrieve weather data through the [Open-Meteo API](https://open-meteo.com/) based on their chosen parameters. It uses a **Flask** backend connected to a **MySQL** database for user management and credentials handling, along with a **React + TypeScript + Vite** frontend that provides an interactive UI for fetching and visualizing weather details.

---

## Project Structure
```css
WeatherForecast/
│
├── backend/ (or any folder name you choose, containing the Flask app)
│   ├── .gitignore
│   ├── requirements.txt
│   └── src/
│       ├── app.py
│       ├── tests/
│       ├── views/
│       ├── utils/
│       ├── models/
│       ├── logic/
│       └── facade/
│
└── weather_frontend/ (React + TypeScript + Vite)
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── src/
    │   ├── App.tsx
    │   ├── main.tsx
    │   ├── Components/
    │   ├── Context/
    │   ├── Models/
    │   ├── Services/
    │   └── Utils/
    └── ...
```

---

## Backend Details (Flask)
### Key Features (Backend)
1. **User Management (Registration & Login)**  
   - Passwords are salted and hashed (using `sha512 + salt`).  
   - JWT-based authentication (access & refresh tokens stored in **HttpOnly cookies**).  
   - Register endpoint sends a welcome email to the user.

2. **Weather API Integration (Open-Meteo)**  
   - A protected route (`/weather`) that fetches weather data from [Open-Meteo](https://open-meteo.com/).  
   - Users must be logged in (JWT required) to access `/weather`.

3. **MySQL Database Integration**  
   - A `users` table stores user info (`user_id`, `first_name`, `last_name`, `username`, `email`, `password`).  
   - Data access handled by a `DAL` class in `dal.py`.

4. **Automated Testing**  
   - `pytest` tests in the `src/tests/` folder (e.g., `test_user_login.py`, `test_weather_api.py`).

---

### File/Folder Explanation (Backend)
- **`app.py`**  
  Main Flask application. Configures CORS, JWT, Mail, registers Blueprints for routes, and manages error handlers.

- **`views/`**  
  - **`api_weather_view.py`**: Defines the `/weather` route, enforces JWT auth, calls facade to get weather.  
  - **`users_view.py`**: Endpoints for registration, login, logout, retrieving user info, and refreshing tokens.

- **`utils/`**  
  - **`app_config.py`**: Loads environment variables (using `dotenv`) for database, mail server, secrets, etc.  
  - **`cyber_hash.py`**: Password hashing and verification logic.  
  - **`dal.py`**: Data Access Layer for MySQL queries (CRUD).  
  - **`email_service.py`**: Configures and sends emails using Flask-Mail.

- **`models/`**  
  - **`status_code_model.py`**: Enum for HTTP status codes.  
  - **`error_model.py`**: Custom exceptions (e.g., `ValidationError`, `AuthenticationError`).  
  - **`users_model.py` & `credentials_model.py`**: Validate user input during registration/login.  
  - **`weather_model.py`**: Validate parameters for fetching weather data.

- **`logic/`**  
  - **`users_logic.py`**: Actual MySQL queries for user data (check email, insert user, etc.).  
  - **`weather_logic.py`**: Responsible for making HTTP requests to the Open-Meteo API.

- **`facade/`**  
  - **`users_facade.py`**: Bridges between logic and views, handles user registration & login flows, hashing, validations.  
  - **`weather_facade.py`**: Gathers weather request parameters, validates them, calls the logic to retrieve data.

- **`tests/`**  
  - **`conftest.py`**: Pytest fixtures, test client setup.  
  - **`test_user_login.py`, `test_user_register.py`, `test_weather_api.py`**: Unit/integration tests verifying user login, registration, and weather endpoints.

- **`requirements.txt`**  
  All Python dependencies (Flask, Flask-JWT-Extended, Flask-Mail, mysql-connector-python, etc.).

---

### Installation & Setup (Backend)
1. **Clone the repository & navigate to the backend folder**  
   ```bash
   git clone https://github.com/hagarhorvitz/WeatherForecast.git
   cd WeatherForecast/backend  # or wherever your backend code resides
   ```

2. **Create & activate a virtual environment (recommended)**  
   ```bash
    python -m venv venv
    source venv/bin/activate   # On Linux/Mac
    # or
    venv\Scripts\activate      # On Windows
    ```
    
3. **Install dependencies**  
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up your environment variables (see Environment Variables)**  
   ```bash
   Create a .env file in the backend folder, or set these variables in your system environment.
   ```

---

### Running & Testing (Backend)
#### Run the Flask app
   ```bash
    python src/app.py
    By default, Flask often runs on port 5000. Access endpoints like http://127.0.0.1:5000/users, http://127.0.0.1:5000/weather, etc.
   ```

#### Run tests
   ```bash
    pytest --maxfail=1 --disable-warnings -q
    This should execute all tests under src/tests/ and report success/failure.
   ```

---

## Frontend Details (React + TypeScript + Vite)
### Key Features (Frontend)
1. **User Authentication**  
   - Registration form for new users (with validation).  
   - Login form that can use either username or email.  
   - Uses JWT in HttpOnly cookies — handled in the backend, so minimal token handling needed on the client side.

2. **Weather Search & Display**  
   - A form that allows the user to pick latitude, longitude, timezone, plus “past days” and “forecast days.”  
   - Checkboxes to select various hourly or daily weather variables.  
   - The resulting data is displayed neatly, including arrays of times, temperatures, precipitation, etc.

3. **Context Management (React Context)**  
   - `AuthContext` tracks the current user’s state and offers a `log_out` method.  
   - `NotifyContext` leverages the `notistack` library to display success/error snackbars.

4. **Routing (React Router)**  
   - `/home`, `/weather`, `/login`, `/register`, etc.  
   - `PageNotFound` for unknown routes.

---

### File/Folder Explanation (Frontend)
- **`index.html`**  
  Main HTML entry point for the React app.

- **`package.json` & `package-lock.json`**  
  Node.js dependencies and scripts (`vite`, `eslint`, etc.).

- **`tsconfig.*.json`**  
  TypeScript configuration files (including bundler & node configs).

- **`vite.config.ts`**  
  Vite configuration for dev server, build optimizations, etc.

- **`src/`**  
  - **`main.tsx`**: Entry point rendering `<App>` into `#root` with React Router, SnackbarProvider, `AuthProvider`, etc.  
  - **`App.tsx`**: Top-level component that includes a `<MenuBar>` and `<Routing>`.

  - **`Components/`**  
    - **`Layout/`**:  
      - `HomePage`, `MenuBar`, `PageNotFound`, `Routing`  
    - **`UserArea/`**:  
      - `SelectLogin`, `LoginForm`, `RegisterForm`  
    - **`WeatherArea/`**:  
      - `GetWeather`, `WeatherForm`, `WeatherDisplay`  

  - **`Context/`**  
    - `AuthContext.tsx`: Provides `user, setUser, log_out`, checks tokens on mount.  
    - `NotifyContext.tsx`: Provides a `notify` object for success/error snackbars.

  - **`Models/`**  
    - `UserModel.ts`, `RegisterUserProps.ts`, `CredentialProps.ts`, `WeatherFormModel.ts`, `WeatherModel.ts`.

  - **`Services/`**  
    - `UserService.ts`: Functions for registering, logging in, refreshing tokens, logging out, etc.  
    - `WeatherServices.ts`: Sends weather requests to `GET /weather` route in the backend.

  - **`Utils/`**  
    - `AppConfig.ts`: Typically contains base URLs or other config.  
    - `Notify.ts`: Helper class that wraps `enqueueSnackbar` for easier calls.

---

### Installation & Setup (Frontend)
1. **Move into your frontend folder**  
   ```bash
   cd WeatherForecast/weather_frontend
   ```

2. **Install Node dependencies**  
   ```bash
    npm install
    # or
    yarn install
   ```

---

### Running & Building (Frontend)
#### Start Development Server
   ```bash
    npm run dev
    By default, Vite typically runs on port 5173. Open http://localhost:5173 in your browser.
   ```

#### Build for Production
   ```bash
    npm run build
    The compiled, production-ready code goes into dist/.
   ```

---

## Database Setup (MySQL)
1. **Install & configure MySQL** on your environment.  
2. **Create a database** (e.g., `open_meteo_weather`).  
3. **Create a users table** (or run a migration script). A possible table schema:
   ```sql
   CREATE TABLE users (
       user_id INT AUTO_INCREMENT PRIMARY KEY,
       first_name VARCHAR(45) NOT NULL,
       last_name VARCHAR(45) NOT NULL,
       username VARCHAR(90) NOT NULL,
       email VARCHAR(80) NOT NULL,
       password VARCHAR(250) NOT NULL
   );
   ```
4. **Update your `.env`** or environment variables for `MYSQL_HOST`, `MYSQL_USER`, `MYSQL_PASSWORD`, and `MYSQL_DATABASE`.
 
---

## Future Improvements
1. **Forgot Password / Username:** Implement additional endpoints and pages for recovery.
2. **More Weather Data Visualization:** Display charts, graphs, or maps for the returned data.
3. **Fully style:** Completely design and style the web interface.
4. **Deployment:** Containerize with Docker or deploy to a cloud platform, hooking up domain & SSL.

---

## License
This project is licensed under the MIT License.
