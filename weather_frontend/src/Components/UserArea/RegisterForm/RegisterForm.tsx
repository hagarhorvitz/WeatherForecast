import { useEffect, useState } from "react";
import css from "./RegisterForm.module.css";
import { RegisterUserProps } from "../../../Models/RegisterUserProps";
import { userService } from "../../../Services/UserService";
import { Box, Button, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, styled, Typography } from "@mui/material";
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
        color: "#001057",
        alignSelf: 'flex-start',
        paddingLeft: "1vw",
        paddingTop: "0.6vw",
        fontSize: '1.8vw',
        fontWeight: '500',
    };
    const styleInput = {
        color: "#001057",
        fontSize: '1.7vw',
        // textAlign: "center",
        alignContent: "center",
        border: "1.4px solid #001057",
        boxSizing: "border-box",
    };

    const RegisterButton = styled(Button)({
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: '1.5vw',
        color: '#64b1f0',
        width: '50%',
        padding: '0.3vw 1vw',
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

      const GoToLoginButton = styled(Button)({
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: '1.1vw',
        color: '#001057',
        width: '20%',
        padding: '0.3vw 1vw',
        border: '1px groove rgb(102, 185, 253)',
        backgroundColor: '#64b1f0',
        fontFamily: [
            'Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'
        ].join(','),
        '&:hover': {
            fontWeight: '700',
            border: '2px outset rgb(102, 185, 253)',
            borderRadius: '5px',
            boxShadow: '0 1px 5px 0 rgba(0, 10, 54, 0.205), 0 2px 10px 0 rgba(0, 10, 54, 0.205)',
        },
        '&:active': {
            boxShadow: 'none',
            border: '2px inset rgba(104, 187, 255, 0.51)',
        },
      });

    return (
        <div className={css.RegisterForm}>
            <Box
                component="form"
                onKeyDown={handleKeyDown}
                sx={{ maxWidth: "75%", margin: "auto", px: "3vw", py: "auto" }}
            >
                <Typography variant="h3" gutterBottom
                    sx={{ color: "#001057", fontWeight: "bold", fontSize: "2.5vw", textAlign: "center", p: "auto", m: "0", textShadow: "0 0 5px rgb(116, 192, 255)" }}>
                    Register
                </Typography>
                <Stack spacing={0.1}>
                    <InputLabel htmlFor="firstNameBox"
                        sx={styleLabel}>
                        First Name:
                    </InputLabel>
                    <OutlinedInput required
                        sx={styleInput}
                        error={objError.firstnameError}
                        id="firstNameBox"
                        name="first_name"
                        type="text"
                        size="small"
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
                        sx={styleInput}
                        error={objError.lastnameError}
                        id="lastNameBox"
                        name="last_name"
                        type="text"
                        size="small"
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
                        sx={styleInput}
                        error={objError.emailError}
                        id="emailBox"
                        name="email"
                        type="email"
                        size="small"
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
                        onKeyUp={checkEnable}
                    />
                </Stack>
                {/* <button disabled={disable} className={css.RegisterButton} onClick={registerUser}>
                    Register
                </button> */}
                <Stack spacing={0.8} 
                    direction="column"
                    sx={{ alignItems: "center", px: "auto", mx: "auto", mt: "1.2vw" }}>
                <RegisterButton 
                    variant="contained" 
                    disabled={disable} 
                    onClick={registerUser}>
                        Register
                </RegisterButton>
                <GoToLoginButton 
                    variant="contained" 
                    onClick={gotoLogin}>
                        Already a member?
                </GoToLoginButton>
                {/* <button className={css.RegisterButton} onClick={gotoLogin}>
                    Already a member?
                </button> */}
                </Stack>
            </Box>
            {/* <button className={css.RegisterButton} onClick={gotoLogin}>
                Already a member?
            </button> */}
        </div>
    );
}
