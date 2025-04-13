import { useEffect, useState } from "react";
import css from "./LoginForm.module.css";
import { userService } from "../../../Services/UserService";
import { Box, Button, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, styled, Typography } from "@mui/material";
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
        color: "#001057",
        alignSelf: 'flex-start',
        paddingLeft: "1vw",
        paddingTop: "1vw",
        fontSize: '1.9vw',
        fontWeight: '500',
    };
    const styleInput = {
        color: "#001057",
        fontSize: '1.8vw',
        textAlign: "center",
        border: "1.4px solid #001057",
        boxSizing: "border-box",
    };
    const LoginButton = styled(Button)({
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: '1.8vw',
        color: '#64b1f0',
        width: '50%',
        padding: '0.4vw 1vw',
        margin: ' 2vw auto 0.1vw',
        // border: '1px solid #001057',
        // lineHeight: 1.5,
        backgroundColor: '#001057',
        fontFamily: [
            'Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'
        ].join(','),
        '&:focus': {
            color: '#64b1f0',
            backgroundColor: '#001057',
            boxShadow: '0 0 10px 1px rgba(0, 8, 46, 0.21)',
        },
        '&:hover': {
            color: '#001057',
            backgroundColor: '#64b1f0',
            fontWeight: '700',
            border: '2px outset rgb(102, 185, 253)',
            borderRadius: '5px',
            boxShadow: '0 1px 5px 0 rgba(0, 10, 54, 0.205), 0 2px 10px 0 rgba(0, 10, 54, 0.205)',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: 'rgb(104, 187, 255)',
            border: '2px inset rgba(104, 187, 255, 0.51)',
        },
      });

    return (
        <div className={css.LoginForm}>
            <Box
                component="form"
                onKeyDown={handleKeyDown}
                sx={{ maxWidth: "75%", margin: "auto", px: "3vw", py: "0.5vw" }}
            >
                <Typography variant="h3" gutterBottom
                    sx={{ color: "#001057", fontWeight: "bold", fontSize: "2.7vw", textAlign: "center", mt: "1vw", mb: "0.5vw", textShadow: "0 0 5px rgb(116, 192, 255)" }}>
                    Login
                </Typography>
                <Stack spacing={0.8}>
                    {
                        loginBy === "username" && <div style={{ textAlign: "start" }}>
                            <InputLabel htmlFor="usernameBox"
                                sx={styleLabel}>
                                Username:
                            </InputLabel>
                            <OutlinedInput
                                sx={styleInput}
                                error={objError.identifierError}
                                id="usernameBox"
                                name="username"
                                type="text"
                                fullWidth
                                size="small"
                                value={formData?.identifierValue}
                                onChange={(e) => {
                                    setFormData({ ...formData, identifier: e.target.name, identifierValue: e.target.value });
                                    setObjError({ ...objError, identifierError: (e.target.value.length < 4 && e.target.value.length !== 0) ? true : false });
                                }} onKeyUp={checkEnable}
                            />
                        </div>
                    }
                    {
                        loginBy === "email" && <div style={{ textAlign: "start" }}>
                            <InputLabel htmlFor="emailBox"
                                sx={styleLabel}>
                                Email:
                            </InputLabel>
                            <OutlinedInput
                                sx={styleInput}
                                error={objError.identifierError}
                                id="emailBox"
                                name="email"
                                type="email"
                                fullWidth
                                size="small"
                                value={formData?.identifierValue}
                                onChange={(e) => {
                                    setFormData({ ...formData, identifier: e.target.name, identifierValue: e.target.value });
                                    setObjError({ ...objError, identifierError: (e.target.value.length < 5 && e.target.value.length !== 0) ? true : false });
                                }}
                                onKeyUp={checkEnable}
                            />
                        </div>
                    }

                    <InputLabel htmlFor="passwordBox"
                        sx={styleLabel}>
                        Password:
                    </InputLabel>
                    <OutlinedInput required
                        sx={styleInput}
                        error={objError.passwordError}
                        id="passwordBox"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment className="MuiInputAdornment-sizeSmall" position="end">
                                <IconButton
                                    sx={{ color: "#001057", fontSize: "2.4vw" }}
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end" >
                                    {showPassword ? <VisibilityOff fontSize="inherit"/> : <Visibility fontSize="inherit"/>}
                                </IconButton>
                            </InputAdornment>}
                        size="small"
                        value={formData?.password}
                        onChange={(e) => {
                            setFormData({ ...formData, password: e.target.value });
                            setObjError({ ...objError, passwordError: ((e.target.value.length < 4 || e.target.value.length > 20) && e.target.value.length !== 0) ? true : false });
                        }}
                        onKeyUp={checkEnable} />
                    {/* <Button variant="contained" fullWidth disabled={disable} onClick={loginUser}>
                        Login
                    </Button> */}
                </Stack>
                <LoginButton 
                    variant="contained" 
                    disabled={disable} 
                    onClick={loginUser}>
                        Login
                </LoginButton>
            </Box>
        </div>
    );
}
