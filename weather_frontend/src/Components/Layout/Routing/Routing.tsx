import { Route, Routes } from "react-router-dom";
import css from "./Routing.module.css";
import { RegisterForm } from "../../UserArea/RegisterForm/RegisterForm";
import { GetWeather } from "../../WeatherArea/GetWeather/GetWeather";
import { PageNotFound } from "../PageNotFound/PageNotFound";
import { LoginForm } from "../../UserArea/LoginForm/LoginForm";
import { HomePage } from "../HomePage/HomePage";

export function Routing(): JSX.Element {
    return (
        <div className={css.Routing}>
			<Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/weather" element={<GetWeather/>}/>
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/register" element={<RegisterForm/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </div>
    );
}
