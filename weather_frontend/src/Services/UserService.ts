import axios from "axios";
import { appConfig } from "../Utils/AppConfig";
import { jwtDecode } from "jwt-decode";
import { UserModel } from "../Models/UserModel";
import { CredentialModel } from "../Models/CredentialModel";
import { RegisterUserProps } from "../Models/RegisterUserProps";

class UserServices {
    // public constructor(){
    //     const token = localStorage.getItem("token");
    //     if(!token) return;

    //     const dbUser = jwtDecode<{user: UserModel}>(token).user;
    //     const action = userActions.login(dbUser);
    //     store.dispatch(action);
    // };

    public async register(newUser:RegisterUserProps): Promise<void>{
        const response = await axios.post<string>(appConfig.registerUrl, newUser);
        const token = response.data;
        console.log("register token: ", token);

        const dbUser = jwtDecode<{user: UserModel}>(token).user;
        console.log("register dbUser: ", dbUser);

        // const action = userActions.register(dbUser); // create action object containing register user
        // store.dispatch(action);

        localStorage.setItem("token", token); // save token to local storage
    };

	public async login(credential: CredentialModel):Promise<void>{    
        const response = await axios.post<string>(appConfig.loginUrl, credential);     
        const token = response.data;
        console.log("login token: ", token);
        const dbUser = jwtDecode<{user: UserModel}>(token).user;
        console.log("login dbUser: ", dbUser);

        // const action = userActions.login(dbUser);
        // store.dispatch(action);

        localStorage.setItem("token", token);
    };

    
    public async logout(user: UserModel):Promise<void> {
        const response = await axios.post<object>(appConfig.logoutUrl, user);  
        console.log("logout response: ", response);
        // const action = userActions.logout(); 
        // store.dispatch(action); 
        // const removeItemsArr = ["token", "totalVacations", "totalUsers", "totalLikes", "likesByDestination"]
        // removeItemsArr.forEach( item => localStorage.removeItem(item));
    };
}

export const userService = new UserServices();