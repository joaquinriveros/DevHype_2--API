import { useState } from "react";

export const useFormOwn = <T extends Object>(initialState: T) => {
  const [values, setValues] = useState<T>(initialState);

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetForm = () => {
    setValues(initialState);
  };

  return {
    values,
    handleChanges,
    resetForm,
  };
};
