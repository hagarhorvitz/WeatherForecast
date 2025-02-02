import { useState } from "react";
import css from "./RegisterForm.module.css";
import { RegisterUserProps } from "../../../Models/RegisterUserProps";
import { userService } from "../../../Services/UserService";
import { Alert, Box, Button, Stack, TextField, Typography } from "@mui/material";

export function RegisterForm(): JSX.Element {
    const [formData, setFormData] = useState<RegisterUserProps>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState<string | null>(null);

    const [objError, setObjError] = useState({
        firstnameError: false,
        lastnameError: false,
        emailError: false,
        passwordError: false
    });

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // const validateForm = (): boolean => {
    //     if (
    //         formData.first_name.length < 2 ||
    //         formData.first_name.length > 45 ||
    //         formData.last_name.length < 2 ||
    //         formData.last_name.length > 45 ||
    //         formData.email.length < 5 ||
    //         formData.email.length > 80 ||
    //         formData.password.length < 4 ||
    //         formData.password.length > 20
    //     ) {
    //         return false;
    //     }
    //     return true;
    // };
    function checkError():void {
        objError.firstnameError = (formData?.first_name?.length < 2 && formData?.first_name?.length !== 0) ? true : false;
        console.log(`objError.firstnameError: ${objError.firstnameError}`)
        objError.lastnameError = (formData?.last_name?.length < 2 && formData?.last_name?.length !== 0) ? true : false;
        console.log(`objError.last_name: ${objError.lastnameError}`)
        objError.emailError = (formData?.email?.length < 5 && formData?.email?.length !== 0) ? true : false;
        console.log(`objError.emailError: ${objError.emailError}`)
        objError.passwordError = (formData?.password?.length < 4 && formData?.password?.length !== 0 && formData?.password?.length > 20) ? true : false;
        console.log(`objError.passwordError: ${objError.passwordError}`)
        setObjError({ ...objError });
    };

    function checkEnable(){
        (credentials?.email?.length > 5 && credentials?.password?.length >= 6) ? setDisable(false) : setDisable(true);
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        if (!validateForm()) {
            setError(
                "Validation failed. Please ensure all fields meet the required length."
            );
            return;
        }

        setError(null);
        try {
            await userService.register(formData);
        } catch (err) {
            setError(`Registration failed, please try again: ${err}`);
        }
    };

    return (
        <div className={css.RegisterForm}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ maxWidth: 400, mx: "auto", mt: 4 }}
            >
                <Typography variant="h5" gutterBottom>
                    Register
                </Typography>
                <Stack spacing={2}>
                    <TextField
                        label="First Name"
                        name="first_name"
                        variant="outlined"
                        fullWidth
                        value={formData?.first_name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Last Name"
                        name="last_name"
                        variant="outlined"
                        fullWidth
                        value={formData.last_name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        variant="outlined"
                        type="email"
                        fullWidth
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    {error && <Alert severity="error">{error}</Alert>}
                    <Button type="submit" variant="contained" fullWidth>
                        Register
                    </Button>
                </Stack>
            </Box>
        </div>
    );
}
