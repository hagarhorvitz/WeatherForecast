import axios from "axios";
import { appConfig } from "../Utils/AppConfig";
import { jwtDecode } from "jwt-decode";
import { UserModel } from "../Models/UserModel";
import { RegisterUserProps } from "../Models/RegisterUserProps";
import { CredentialProps } from "../Models/CredentialProps";

class UserServices {
    // public constructor(){
    //     const token = localStorage.getItem("token");
    //     if(!token) return;

    //     const dbUser = jwtDecode<{user: UserModel}>(token).user;
    //     const action = userActions.login(dbUser);
    //     store.dispatch(action);
    // };

    public async register(newUser:RegisterUserProps): Promise<string>{
        // The server returns just a token (string), or an object with token. Adjust as needed.
        const response = await axios.post<string>(appConfig.registerUrl, newUser);
        console.log("register response: ", response);

        const token = response.data;  // Typically the token is the response (or an object with token)
        // You can decode here if you want to confirm
        const decodedUser = jwtDecode<{user: UserModel}>(token).user;
        console.log("register ##token (response.data): ", token, "##decodedUser: ", decodedUser);

        // Store token in local storage (optional, or let the context do it)
        localStorage.setItem("token", token);
        return token
    };

	public async login(credential: CredentialProps):Promise<string>{    
        const response = await axios.post<string>(appConfig.loginUrl, credential);   
        console.log("login response: ", response);  

        const token = response.data;
        const decodedUser = jwtDecode<{user: UserModel}>(token).user;
        console.log("login ##token (response.data): ", token, "##decodedUser: ", decodedUser);

        // Optionally store in local storage
        localStorage.setItem("token", token);
        return token
    };

    
    public async log_out():Promise<void> {
        localStorage.removeItem("token");
    };
}

export const userService = new UserServices();