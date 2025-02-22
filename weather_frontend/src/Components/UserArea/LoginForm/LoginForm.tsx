import { useEffect, useState } from "react";
import css from "./LoginForm.module.css";
import { userService } from "../../../Services/UserService";
import { Box, Button, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CredentialProps } from "../../../Models/CredentialProps";
import { useNotify } from "../../../Context/NotifyContext";
import { useAuth } from "../../../Context/AuthContext";

interface LoginProps {
    loginBy: string;
}

export function LoginForm({ loginBy }: LoginProps): JSX.Element {
    const { notify } = useNotify();
    const { setUser } = useAuth();

    const [formData, setFormData] = useState<CredentialProps>({
        identifier: loginBy,
        identifierValue: "",
        password: "",
    });
    const [disable, setDisable] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isPressed, setIsPressed] = useState<boolean>(false);

    const [objError, setObjError] = useState({
        identifierError: false,
        passwordError: false
    });

    function checkError(): void {
        // if ((formData?.username?.length < 4 && formData?.username?.length !== 0) || (formData?.email?.length < 4 && formData?.email?.length !== 0)) objError.identifierError = true; else objError.identifierError = false
        if (formData?.identifierValue?.length < 4 && formData?.identifierValue?.length !== 0) objError.identifierError = true; else objError.identifierError = false
        if (formData?.password?.length < 4 && formData?.password?.length !== 0 && formData?.password?.length > 20) objError.passwordError = true; else objError.passwordError = false
        setObjError({ ...objError });
    };

    function checkEnable() {
        // if ((formData?.username?.length || formData?.email?.length) > 4 && formData?.password?.length >= 4) setDisable(false); else setDisable(true)
        if (formData?.identifierValue?.length > 4 && formData?.password?.length >= 4) setDisable(false); else setDisable(true)
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
            const userData = await userService.login(formData);
            console.log("loginForm userData: ", userData);
            setUser(userData);
            notify.success("Login successfully!", 4000)
            navigate("/home")
        }
        catch (err) {
            notify.error(err, 4500);
        }
    };
    const styleLabel = {
        color: "#004a4d",
        alignSelf: 'flex-start',
        paddingLeft: 1,
        fontSize: 'large',
        fontWeight: '500',
    };

    return (
        <div className={css.LoginForm}>
            <Typography variant="h5" gutterBottom>
                Login
            </Typography>
            <Box
                component="form"
                onKeyDown={handleKeyDown}
                sx={{ maxWidth: 400, mx: "auto", mt: 4 }}
            >
                <Stack spacing={2}>
                    {
                        loginBy === "username" && <div>
                            <InputLabel htmlFor="usernameBox"
                                sx={styleLabel}>
                                Username:
                            </InputLabel>
                            <OutlinedInput
                                error={objError.identifierError}
                                id="usernameBox"
                                name="username"
                                type="text"
                                fullWidth
                                value={formData?.identifierValue}
                                onChange={(e) => setFormData({ ...formData, identifier: e.target.name, identifierValue: e.target.value })}
                                onKeyDown={checkError}
                                onKeyUp={checkEnable}
                            />
                        </div>
                    }
                    {
                        loginBy === "email" && <div>
                            <InputLabel htmlFor="emailBox"
                                sx={styleLabel}>
                                Email:
                            </InputLabel>
                            <OutlinedInput
                                error={objError.identifierError}
                                id="emailBox"
                                name="email"
                                type="email"
                                fullWidth
                                value={formData?.identifierValue}
                                onChange={(e) => setFormData({ ...formData, identifier: e.target.name, identifierValue: e.target.value })}
                                onKeyDown={checkError}
                                onKeyUp={checkEnable}
                            />
                        </div>
                    }

                    <InputLabel htmlFor="passwordBox"
                        sx={styleLabel}>
                        Password:
                    </InputLabel>
                    <OutlinedInput required
                        error={objError.passwordError}
                        id="passwordBox"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end" >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>}
                        fullWidth
                        value={formData?.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        onKeyDown={checkError}
                        onKeyUp={checkEnable}
                    />
                    <Button variant="contained" fullWidth disabled={disable} onClick={loginUser}>
                        Login
                    </Button>
                </Stack>
            </Box>
        </div>
    );
}
