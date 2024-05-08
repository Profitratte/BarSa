import { Button, TextField } from "@mui/material";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";

export interface InputFormItem {
    name: string;
    label: string;
    type: string;
    value: string;
}

interface InputFormGeneratorProbs {
    inputArray: InputFormItem[]
    handleSubmit: (event: FormEvent, input: any) => void;
    buttonLabel: string;
}

export const InputFormGenerator: FC<InputFormGeneratorProbs> = ({ inputArray, handleSubmit, buttonLabel }) => {
    const [inputs, setInputs] = useState<InputFormItem[]>(inputArray);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(inputs => inputs.map(input => {
            if (input.name === name) {
                return { ...input, value: value };
            }
            return input;
        }));
    }

    return (
        <div className="">
            <form onSubmit={(e) => handleSubmit(e, inputs)}>
                {inputs.map((item) => {
                    if (item.type === "text" || item.type === "password") {
                        return (
                            <TextField
                                key={item.name}
                                type={item.type}
                                name={item.name}
                                label={item.label}
                                variant="outlined"
                                fullWidth
                                value={item.value ?? ""}
                                onChange={handleChange}
                                margin="normal"
                            />
                        )
                    }
                })}
                <Button type="submit" variant="contained" color="primary">{buttonLabel}</Button>
            </form>

        </div>
    );
}