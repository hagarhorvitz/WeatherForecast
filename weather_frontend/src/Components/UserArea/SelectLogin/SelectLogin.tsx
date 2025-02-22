import { useState } from "react";
import css from "./SelectLogin.module.css";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { LoginForm } from "../LoginForm/LoginForm";

export function SelectLogin(): JSX.Element {

    const [isSelect, setIsSelect] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");

    function handleRadioChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
        setIsSelect(true);
    }

    return (
        <div className={css.SelectLogin}>
            <FormControl>
                <FormLabel id="selectLogin">Select to login by username or email</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="selectLogin"
                    name="selectLogin"
                    value={value}
                    onChange={handleRadioChange}
                >
                    <FormControlLabel value="username" control={<Radio />} label="Username" />
                    <FormControlLabel value="email" control={<Radio />} label="Email" />
                </RadioGroup>
            </FormControl>
        {
            isSelect && <LoginForm loginBy={value} />
        }
        </div>
    );
}
