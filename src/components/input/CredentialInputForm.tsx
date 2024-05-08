import { CredentialInput } from "@/types/user";
import { FC, FormEvent } from "react";
import { InputFormGenerator, InputFormItem } from "./InputFormGenerator";

interface CredentialInputFormProbs {
  handleSubmit: (event: FormEvent, input: CredentialInput) => void;
  buttonLabel: string;
}

const CredentialInputForm: FC<CredentialInputFormProbs> = ({ handleSubmit, buttonLabel }) => {
  
  const inputMap = [
    { name: "username", label: "Username", type: "text", value: "" },
    { name: "password", label: "Password", type: "password", value: "" }
  ];

  const onSubmit = (e: FormEvent, input: InputFormItem[]) => {
    e.preventDefault();

    const credentialInput: CredentialInput = {
      username: input.find(item => item.name === "username")?.value || "",
      password: input.find(item => item.name === "password")?.value || ""
    };

    handleSubmit(e, credentialInput);
  }

  return (
    <InputFormGenerator inputArray={inputMap} handleSubmit={onSubmit} buttonLabel={buttonLabel}/>
  )
}

export default CredentialInputForm;