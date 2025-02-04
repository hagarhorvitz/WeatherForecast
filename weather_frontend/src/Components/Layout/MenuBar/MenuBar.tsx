import { useAuth } from "../../../Context/AuthContext";
import css from "./MenuBar.module.css";

export function MenuBar(): JSX.Element {

    const { user, logout } = useAuth();

    return (
        <div className={css.MenuBar}>
			{user ? (
        <div>
          <span>Hello {user.first_name} {user.last_name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>Please Login / Register</div>
      )}
        </div>
    );
}
