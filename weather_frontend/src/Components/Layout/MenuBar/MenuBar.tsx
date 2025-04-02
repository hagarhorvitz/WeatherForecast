import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import css from "./MenuBar.module.css";
import { useNotify } from "../../../Context/NotifyContext";

export function MenuBar(): JSX.Element {

    const { user, log_out } = useAuth();
    console.log("MenuBar user:", user);
    const { notify } = useNotify();

    const navigate = useNavigate();
    function noUserNoWeather() {
        notify.error("Getting weather is available to logged in users only!", 4500)
        navigate("/home")
    };

    // function logoutUser(){

    //     logout();

    // }


    return (
        <div className={css.MenuBar}>
            {user ? (
                <div>
                    <NavLink to="/">Home</NavLink>&nbsp;
                    <NavLink to="/weather">Get Weather</NavLink>&nbsp;
                    <div>
                        <span>Hello {user.first_name} {user.last_name}</span>&nbsp;
                        {/* <button onClick={}>Remind me what is my Username</button>&nbsp; */}
                        <button onClick={log_out}>Logout</button>
                    </div>
                </div>

            ) : (
                <div>
                    <NavLink to="/">Home</NavLink>&nbsp;
                    <button onClick={noUserNoWeather}>Get Weather</button>
                    <div>
                        <span>Hey you!</span>&nbsp;
                        <NavLink to="/login">Login</NavLink>&nbsp;
                        <NavLink to="/register">Register</NavLink>
                    </div>
                </div>
            )}
        </div>
    );
}
