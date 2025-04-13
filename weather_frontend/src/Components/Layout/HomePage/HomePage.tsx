import css from "./HomePage.module.css";
import MainLogo from "../../../assets/Images/weather_logo_small.png"

export function HomePage(): JSX.Element {
    return (
        <div className={css.HomePage}>
            <span className={css.HomeText}>Welcome to the real time weather data website!</span>
            <img src={MainLogo} alt="Logo" className={css.HomeLogo} />
        </div>
    );
}
