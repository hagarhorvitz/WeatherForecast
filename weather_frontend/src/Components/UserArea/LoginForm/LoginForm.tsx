import { useEffect, useState } from "react";
import css from "./LoginForm.module.css";
import { userService } from "../../../Services/UserService";
import { Box, Button, IconButton, InputAdornment, OutlinedInput, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CredentialProps } from "../../../Models/CredentialProps";
import { useNotify } from "../../../Context/NotifyContext";
import { useAuth } from "../../../Context/AuthContext";

export function LoginForm(): JSX.Element {
    const { notify } = useNotify();
    const { setToken } = useAuth();

    const [formData, setFormData] = useState<CredentialProps>({
        identifier: "",
        password: "",
    });
    const [disable, setDisable] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const [objError, setObjError] = useState({
        identifierError: false,
        passwordError: false
    });

    function checkError():void {
        if (formData?.identifier?.length < 4 && formData?.identifier?.length !== 0) objError.identifierError = true; else objError.identifierError = false
        if (formData?.password?.length < 4 && formData?.password?.length !== 0 && formData?.password?.length > 20) objError.passwordError = true; else objError.passwordError = false
        setObjError({ ...objError });
    };

    function checkEnable(){
        if (formData?.identifier?.length > 4 && formData?.password?.length >= 4) setDisable(false); else setDisable(true)
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
            loginUser();
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
    async function loginUser() {
        try {
            const token = await userService.login(formData);
            setToken(token);
            notify.success("Login successfully!", 4000)
            navigate("/home")
        }
        catch (err) {
            notify.error(err, 4500);
        }
    };
    return (
        <div className={css.LoginForm}>
			<Box
                component="form"
                onKeyDown={handleKeyDown}
                sx={{ maxWidth: 400, mx: "auto", mt: 4 }}
            >
                <Typography variant="h5" gutterBottom>
                    Register
                </Typography>
                <Stack spacing={2}>
                    <OutlinedInput
                        error={objError.identifierError}
                        label="Username"
                        id="usernameBox"
                        name="username"
                        type="text"
                        fullWidth
                        value={formData?.identifier}
                        onChange={(e)=> setFormData({...formData, identifier: e.target.value})}
                        onKeyDown={checkError}
                        onKeyUp={checkEnable}
                    />
                    <OutlinedInput
                        error={objError.identifierError}
                        label="Email"
                        id="emailBox"
                        name="email"
                        type="email"
                        fullWidth
                        value={formData?.identifier}
                        onChange={(e)=> setFormData({...formData, identifier: e.target.value})}
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
                    <Button variant="contained" fullWidth disabled={disable} onClick={loginUser}>
                        Register
                    </Button>
                </Stack>
            </Box>
        </div>
    );
}
