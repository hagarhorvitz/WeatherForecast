import { useState } from "react";
import css from "./SelectLogin.module.css";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { LoginForm } from "../LoginForm/LoginForm";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

export function SelectLogin(): JSX.Element {

    const [isSelect, setIsSelect] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");

    function handleRadioChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
        setIsSelect(true);
    }

    const styleRadio = {
        color: "rgb(0, 16, 87)",
        padding: "0.8vw",
        "&.Mui-checked": {
            color: "rgb(0, 25, 138)",
        },
    };
    return (
        <div className={css.SelectLogin}>
            <FormControl sx={{fontSize: "1.6vw"}} >
                <FormLabel id="selectLogin"
                    sx={{
                        color: "rgb(0, 16, 87)", fontSize: "1.6vw", fontWeight: "bolder",
                        "&.Mui-focused": {
                            color: "rgb(0, 21, 116)",
                        }
                    }}
                >
                    Please select login option:</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="selectLogin"
                    name="selectLogin"
                    value={value}
                    onChange={handleRadioChange}
                    sx={{ justifyContent: 'space-between'}}>
                    <FormControlLabel value="username"
                        control={<Radio sx={styleRadio}
                                        icon={<RadioButtonUncheckedIcon sx={{ fontSize: '1.5vw' }} />}
                                        checkedIcon={<RadioButtonCheckedIcon sx={{ fontSize: '1.5vw' }} />} />}
                        label="Username"
                        componentsProps={{
                            typography: {
                                sx: {
                                    fontSize: "1.5vw",
                                    color: "rgb(0, 16, 87)",
                                },
                            },
                        }} />
                    <FormControlLabel value="email"
                        control={<Radio sx={styleRadio}
                                        icon={<RadioButtonUncheckedIcon sx={{ fontSize: '1.5vw' }} />}
                                        checkedIcon={<RadioButtonCheckedIcon sx={{ fontSize: '1.5vw' }} />} />}
                        label="Email"
                        componentsProps={{
                            typography: {
                                sx: {
                                    fontSize: "1.4vw",
                                    color: "rgb(0, 16, 87)",
                                },
                            },
                        }} />
                </RadioGroup>
            </FormControl>
            {
                isSelect && <LoginForm loginBy={value} />
            }
        </div>
    );
}
