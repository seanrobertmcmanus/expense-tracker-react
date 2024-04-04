import React from "react";
import { useFormContext } from "react-hook-form";
import classes from "../../styles/inputs/darkTextInput.module.css";
import { TextInput } from "@mantine/core";

interface Props {
  label: string;
  type: string;
  id: string;
  placeholder?: string;
  errorEnabled?: boolean;
  dark?: boolean;
  required?: boolean;
}

export default function CTextInput({
  label,
  type,
  id,
  placeholder,
  errorEnabled,
  dark,
  required,
}: Props) {
  const { register } = useFormContext();
  const {
    formState: { errors },
  } = useFormContext();
  const errorMessage = (errors[id]?.message as string) || null;

  const darkStyle = {
    input: {
      backgroundColor: "#374151",
      color: "#f3f4f6",
    },
    label: {
      color: "#f3f4f6",
    },
  };

  const deafaultStyle = {
    input: {
      backgroundColor: "#fff",
      color: "#111827",
    },
    label: {
      color: "#111827",
    },
  };

  return (
    <div className={`${classes.input_wrapper}`}>
      <TextInput
        label={label}
        type={type}
        id={id}
        placeholder={placeholder}
        error={errorEnabled ? errorMessage : ""}
        styles={dark ? darkStyle : deafaultStyle}
        required={required}
        {...register(id)}
      />
    </div>
  );
}
