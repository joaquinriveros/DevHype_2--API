import { ChangeEvent, useState } from "react";

// Generic interface for useForm
interface FormValues {
  [key: string]: string | number;
}

export const useForm = <T extends FormValues>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);

  const handleChanges = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [`${name}`]: value });
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return {
    values,
    handleChanges,
    resetForm,
  };
};
