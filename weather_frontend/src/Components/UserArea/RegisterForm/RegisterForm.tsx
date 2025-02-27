import { useEffect, useState } from "react";
import css from "./RegisterForm.module.css";
import { RegisterUserProps } from "../../../Models/RegisterUserProps";
import { userService } from "../../../Services/UserService";
import { Box, Button, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNotify } from "../../../Context/NotifyContext";
import { useAuth } from "../../../Context/AuthContext";

export function RegisterForm(): JSX.Element {

    const { notify } = useNotify();
    const { setUser } = useAuth();

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

    // function checkError(): void {
    //     if (formData?.first_name?.length < 2 && formData?.first_name?.length !== 0) objError.firstnameError = true; else objError.firstnameError = false
    //     if (formData?.last_name?.length < 2 && formData?.last_name?.length !== 0) objError.lastnameError = true; else objError.lastnameError = false
    //     if (formData?.email?.length < 5 && formData?.email?.length !== 0) objError.emailError = true; else objError.emailError = false
    //     if ((formData?.password?.length < 4 || formData?.password?.length > 20) && formData?.password?.length !== 0) objError.passwordError = true; else objError.passwordError = false
    //     setObjError({ ...objError });
    // };

    function checkEnable() {
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
            const userData = await userService.register(formData)
            console.log("registerForm userData: ", userData);
            setUser(userData);
            notify.success("Registered successfully!\nPlease check your mail and make sure you received a confirmation email with your info", 5000)
            navigate("/home")
        }
        catch (err) {
            notify.error(err, 4500);
        }
    };

    const gotoLogin = () => navigate("/login")

    const styleLabel = {
        color: "#004a4d",
        alignSelf: 'flex-start',
        paddingLeft: 1,
        fontSize: 'large',
        fontWeight: '500',
    };
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
                    <InputLabel htmlFor="firstNameBox"
                        sx={styleLabel}>
                        First Name:
                    </InputLabel>
                    <OutlinedInput required
                        error={objError.firstnameError}
                        id="firstNameBox"
                        name="first_name"
                        type="text"
                        fullWidth
                        value={formData?.first_name}
                        onChange={(e) => {
                            setFormData({ ...formData, first_name: e.target.value });
                            setObjError({ ...objError, firstnameError: (e.target.value.length < 2 && e.target.value.length !== 0) ? true : false });
                        }}
                        onKeyUp={checkEnable}
                    />
                    <InputLabel htmlFor="lastNameBox"
                        sx={styleLabel}>
                        Last Name:
                    </InputLabel>
                    <OutlinedInput required
                        error={objError.lastnameError}
                        id="lastNameBox"
                        name="last_name"
                        type="text"
                        fullWidth
                        value={formData?.last_name}
                        onChange={(e) => {
                            setFormData({ ...formData, last_name: e.target.value });
                            setObjError({ ...objError, lastnameError: (e.target.value.length < 2 && e.target.value.length !== 0) ? true : false });
                        }}
                        onKeyUp={checkEnable}
                    />
                    <InputLabel htmlFor="emailBox"
                        sx={styleLabel}>
                        Email:
                    </InputLabel>
                    <OutlinedInput required
                        error={objError.emailError}
                        id="emailBox"
                        name="email"
                        type="email"
                        fullWidth
                        value={formData?.email}
                        onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            setObjError({ ...objError, emailError: (e.target.value.length < 5 && e.target.value.length !== 0) ? true : false });
                        }}
                        onKeyUp={checkEnable}
                    />
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
                        onChange={(e) => {
                            setFormData({ ...formData, password: e.target.value });
                            setObjError({ ...objError, passwordError: ((e.target.value.length < 4 || e.target.value.length > 20) && e.target.value.length !== 0) ? true : false });
                        }}
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
