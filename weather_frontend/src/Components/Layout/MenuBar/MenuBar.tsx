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

    return (
        <div className={css.MenuBar}>
            {user ? (
                <div className={css.MenuBarContainer}>
                    <div className={css.LeftMenuBar}>
                    <NavLink to="/">Home</NavLink>&nbsp;|&nbsp;
                    <NavLink to="/weather">Get Weather</NavLink>
                    </div>
                    <div className={css.RightMenuBar}>
                        <span>Hey {user.first_name} {user.last_name}</span>&nbsp;|&nbsp;
                        {/* <button onClick={}>Remind me what is my Username</button>&nbsp; */}
                        <button onClick={log_out}>Logout</button>
                    </div>
                </div>

            ) : (
                <div className={css.MenuBarContainer}>
                    <div className={css.LeftMenuBar}>
                    <NavLink to="/">Home</NavLink> | 
                    <button onClick={noUserNoWeather}>Get Weather</button>
                    </div>
                    <div className={css.RightMenuBar}>
                        <span>Hello guest</span>&nbsp;|&nbsp;
                        <NavLink to="/login">Login</NavLink>&nbsp;|&nbsp;
                        <NavLink to="/register">Register</NavLink>
                    </div>
                </div>
            )}
        </div>
    );
}
