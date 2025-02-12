/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useContext } from 'react';
// import { jwtDecode } from "jwt-decode";
import { UserModel } from '../Models/UserModel';
import { useNavigate } from 'react-router-dom';
import { userService } from '../Services/UserService';

interface AuthContextProps {
  user: UserModel | null;
//   token: string | null;
//   setToken: (token: string | null) => void;
  setUser: (user: UserModel | null) => void;
  log_out: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserModel | null>(null);
    console.log("##AuthContext user:", user); // ✅ Debugging log

    useEffect(() => {
        async function fetchUser() {
            console.log("##AuthContext Fetching user after refresh...");
            try {
                let userData = await userService.getUserInfo(); // ✅ First, try using access token
                console.log("##AuthContext Fetched user by getUserInfo() (1):", userData);
                if (userData) {
                    setUser(userData);
                    return
                }
                    // ✅ If user is null, try refreshing the token
                console.log("##AuthContext Attempting token refresh...");
                await userService.refreshToken();

                    // ✅ Fetch user again after token refresh
                userData = await userService.getUserInfo();
                console.log("##AuthContext Fetched user after refresh token getUserInfo() (2):", userData);
                if (userData) setUser(userData);
            } catch (err) {
                console.error("##AuthContext Failed to fetch user:", err);
                setUser(null);
            }
        }
        fetchUser();
    }, []);


    const navigate = useNavigate();
    async function log_out() {
        try {
            await userService.logout()
            console.log("##AuthContext Logout successful!");
            setUser(null);
            navigate("/home")
        } catch (err) {
            console.error("##AuthContext Logout failed:", err);
        }
    }

    return (
        <AuthContext.Provider
        value={{
            user,
            setUser,
            log_out
        }}
        >
        {children}
        </AuthContext.Provider>
    );
};

// Helper hook so we can do: const { user, ... , ... } = useAuth()
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}











// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     // 1) Initialize token from localStorage
//     const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
//     // 2) Store the decoded user
//     const [user, setUser] = useState<UserModel | null>(null);
//     // 3) Whenever token changes, decode the user (or clear it if no token)
//     useEffect(() => {
//       if (token) {
//         try {
//           // Example shape: { user: { ...UserModel... } }
//           const decodedUser = jwtDecode<{ user: UserModel }>(token).user;
//           console.log("AuthContext decodedUser: ", decodedUser);
//           setUser(decodedUser);
//         } catch (err) {
//           console.error('Token decode failed:', err);
//           setUser(null);
//         }
//       } else {
//         setUser(null);
//       }
//     }, [token]);
  
    
//     const navigate = useNavigate();
  
//     // 4) Provide a logout function that clears token + user
//     function log_out() {
//       localStorage.removeItem('token');
//       setToken(null);
//       setUser(null);
//       navigate("/home")
//     }
  
//     return (
//       <AuthContext.Provider
//         value={{
//           user,
//           token,
//           setToken,
//           setUser,
//           log_out
//         }}
//       >
//         {children}
//       </AuthContext.Provider>
//     );
//   };