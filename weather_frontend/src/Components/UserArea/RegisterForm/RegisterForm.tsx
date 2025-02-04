import { useEffect, useState } from "react";
import css from "./RegisterForm.module.css";
import { RegisterUserProps } from "../../../Models/RegisterUserProps";
import { userService } from "../../../Services/UserService";
import { Box, Button, IconButton, InputAdornment, OutlinedInput, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNotify } from "../../../Context/NotifyContext";
import { useAuth } from "../../../Context/AuthContext";

export function RegisterForm(): JSX.Element {
    
    const { notify } = useNotify();
    const { setToken } = useAuth();

    const [formData, setFormData] = useState<RegisterUserProps>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    });
    const [disable, setDisable] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const [objError, setObjError] = useState({
        firstnameError: false,
        lastnameError: false,
        emailError: false,
        passwordError: false
    });

    function checkError():void {
        if (formData?.first_name?.length < 2 && formData?.first_name?.length !== 0) objError.firstnameError = true; else objError.firstnameError = false
        if (formData?.last_name?.length < 2 && formData?.last_name?.length !== 0) objError.lastnameError = true; else objError.lastnameError = false
        if (formData?.email?.length < 5 && formData?.email?.length !== 0) objError.emailError = true; else objError.emailError = false
        if (formData?.password?.length < 4 && formData?.password?.length !== 0 && formData?.password?.length > 20) objError.passwordError = true; else objError.passwordError = false
        setObjError({ ...objError });
    };

    function checkEnable(){
        if (formData?.first_name?.length >= 2 && formData?.last_name?.length >= 2 && formData?.email?.length > 5 && formData?.password?.length >= 4) setDisable(false); else setDisable(true)
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setIsPressed(true);
            registerUser();
        }
    };

    useEffect(() => {
        if (isPressed) {
            const timeoutId = setTimeout(() => {
                setIsPressed(false);
            }, 200);
            return () => clearTimeout(timeoutId);
        }
    }, [isPressed]);

    const navigate = useNavigate();

    async function registerUser() {
        try {
            const token = await userService.register(formData)
            setToken(token);
            notify.success("Register successfully!", 4000)
            navigate("/home")
        }
        catch (err) {
            notify.error(err, 4500);
        }
    };

    const gotoLogin = ()=> navigate("/login")

    return (
        <div className={css.RegisterForm}>
            <Box
                component="form"
                onKeyDown={handleKeyDown}
                sx={{ maxWidth: 400, mx: "auto", mt: 4 }}
            >
                <Typography variant="h5" gutterBottom>
                    Register
                </Typography>
                <Stack spacing={2}>
                    <OutlinedInput required
                        error={objError.firstnameError}
                        label="First Name"
                        id="firstNameBox"
                        name="first_name"
                        type="text"
                        fullWidth
                        value={formData?.first_name}
                        onChange={(e)=> setFormData({...formData, first_name: e.target.value})}
                        onKeyDown={checkError}
                        onKeyUp={checkEnable}
                    />
                    <OutlinedInput required
                        error={objError.lastnameError}
                        label="Last Name"
                        id="lastNameBox"
                        name="last_name"
                        type="text"
                        fullWidth
                        value={formData?.last_name}
                        onChange={(e)=> setFormData({...formData, last_name: e.target.value})}
                        onKeyDown={checkError}
                        onKeyUp={checkEnable}
                    />
                    <OutlinedInput required
                        error={objError.emailError}
                        label="Email"
                        id="emailBox"
                        name="email"
                        type="email"
                        fullWidth
                        value={formData?.email}
                        onChange={(e)=> setFormData({...formData, email: e.target.value})}
                        onKeyDown={checkError}
                        onKeyUp={checkEnable}
                    />
                    <OutlinedInput required
                        error={objError.passwordError}
                        label="Password"
                        id="passwordBox"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment= {
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end" >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment> }
                        fullWidth
                        value={formData?.password}
                        onChange={(e)=> setFormData({...formData, password: e.target.value})}
                        onKeyDown={checkError}
                        onKeyUp={checkEnable}
                    />
                    <Button variant="contained" fullWidth disabled={disable} onClick={registerUser}>
                        Register
                    </Button>
                </Stack>
            </Box>
            <Button variant="contained" fullWidth onClick={gotoLogin}>
                Already a member?
            </Button>
        </div>
    );
}
