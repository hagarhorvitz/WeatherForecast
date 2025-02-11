import axios from "axios";
import { appConfig } from "../Utils/AppConfig";
// import { jwtDecode } from "jwt-decode";
import { UserModel } from "../Models/UserModel";
import { RegisterUserProps } from "../Models/RegisterUserProps";
import { CredentialProps } from "../Models/CredentialProps";

class UserServices {

    public async register(newUser:RegisterUserProps): Promise<UserModel>{
        const response = await axios.post(appConfig.registerUrl, newUser,{ withCredentials: true }  );
        console.log("register response: ", response);
        console.log("##service login## response.data: ", response.data); 
        console.log("##service login## response.data.user: ", response.data.user); 
        return response.data.user;
    };

	public async login({username, email, password}: CredentialProps):Promise<UserModel>{
        console.log("##service login## CredentialProps: username-", username, "email-", email, "password-",password);
        
        const params = username !== null ? { "username": username, "password": password } : { "email": email, "password": password };
        console.log("##service login## params: ", params);

        const response = await axios.post(appConfig.loginUrl, params, { withCredentials: true }  );   
        console.log("##service login## response: ", response);  
        console.log("##service login## response.data: ", response.data); 
        console.log("##service login## response.data.user: ", response.data.user); 
        return response.data.user;
    };

    public async logout():Promise<void> {
        console.log("Attempting logout...");  // ✅ Debugging log before request
        try {
            const response = await axios.post(appConfig.logoutUrl, {}, { withCredentials: true }  );// ✅ Ensures cookies are cleared server-side
            console.log("##service log_out## response: ", response);
            console.log("##service log_out## response.data: ", response.data);
            console.log("##service log_out## response.data.message: ", response.data.message);
        } catch (err) {
            console.error("##service Logout failed:", err);
        }
    };

    public async getUserInfo():Promise<UserModel> {
        const response = await axios.get(appConfig.getUserUrl, { withCredentials: true }  );   
        console.log("##service getUserInfo## response: ", response);
        console.log("##service getUserInfo## response.data.user: ", response.data.user);
        return response.data.user; // Return user data
}
}

export const userService = new UserServices();