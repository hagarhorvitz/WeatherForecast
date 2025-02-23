import axios from "axios";
import { appConfig } from "../Utils/AppConfig";
import { UserModel } from "../Models/UserModel";
import { RegisterUserProps } from "../Models/RegisterUserProps";
import { CredentialProps } from "../Models/CredentialProps";

class UserServices {
    // ✅ Helper function to get CSRF token from cookies
    private getCsrfToken(): string | null {
    const match = document.cookie.match(new RegExp('(^| )csrf_access_token=([^;]+)'));
    console.log("##service getCsrfToken()## match: ", match);
    console.log("##service getCsrfToken()## match ? match[2] : null: ", match ? match[2] : null);
    return match ? match[2] : null;
    };

    public async register(newUser:RegisterUserProps): Promise<UserModel>{
        const response = await axios.post(appConfig.registerUrl, newUser, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": this.getCsrfToken() || "",  // ✅ Include CSRF token
            },
        });
        console.log("##service register## response: ", response);
        console.log("##service register## response.data.user: ", response.data.user); 
        return response.data.user;
    };

	public async login({identifier, identifierValue, password}: CredentialProps):Promise<UserModel>{
        // console.log("##service login## CredentialProps: username-", username, "email-", email, "password-",password);
        console.log("##service login## CredentialProps: identifier-", identifier, "identifierValue-", identifierValue, "password-",password);
        const params = identifier === "username" ? { "username": identifierValue, "password": password } : { "email": identifierValue, "password": password };
        console.log("##service login## params: ", params);
        console.log("##service login## this.getCsrfToken(): ", this.getCsrfToken());
        const response = await axios.post(appConfig.loginUrl, params, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": this.getCsrfToken() || "",  // ✅ Include CSRF token
            },
        });   
        console.log("##service login## response: ", response);  
        console.log("##service login## response.data.user: ", response.data.user); 
        return response.data.user;
    };

    public async logout():Promise<void> {
        console.log("##service log_out## Attempting logout...");  // ✅ Debugging log before request
        const response = await axios.post(appConfig.logoutUrl, {}, {
            withCredentials: true,
            headers: {
                "X-CSRF-TOKEN": this.getCsrfToken() || "",  // ✅ Include CSRF token
            },
        });
        console.log("##service log_out## response: ", response);
    };
    // public async getOneEmployee(id:number):Promise<EmployeeModel>{
    //     const desireEmployee = store.getState().employees.find( e => e.id === id);
    //     if (desireEmployee) return desireEmployee;

    //     const response = await axios.get<EmployeeModel>(appConfig.employeeUrl + id);
    //     const oneEmployee = await response.data;
    //     return oneEmployee;
    // };

    public async getUserInfo():Promise<UserModel> {
        console.log("##service getUserInfo## this.getCsrfToken(): ", this.getCsrfToken())
        const response = await axios.get(appConfig.getUserUrl, {
            withCredentials: true,
            headers: {
                "X-CSRF-TOKEN": this.getCsrfToken() || "",  // ✅ Include CSRF token
            },
        });   
        console.log("##service getUserInfo## response: ", response);
        console.log("##service getUserInfo## response.data.user: ", response.data.user);
        return response.data.user; 
    };


    public async refreshToken(): Promise<void> {
        try {
            console.log("##service refreshToken## Attempting to refresh token...");
            console.log("##service refreshToken## this.getCsrfToken(): ", this.getCsrfToken())
            const response = await axios.post(appConfig.refreshTokenUrl, {}, {
                withCredentials: true, // ✅ Send cookies (including refresh token)
                headers: {
                    "X-CSRF-TOKEN": this.getCsrfToken() || "",  // ✅ Include CSRF token
                },
            });
            console.log("##service refreshToken## response: ", response);
        } catch (err) {
            console.error("Token refresh failed:", err);
        }
    };
}

export const userService = new UserServices();