import React from "react";
import { useField } from "formik";

type Props = {
  name:string,
  type?: string,
  placeholder:string
}

const FormikTextInput = ({ name, type, placeholder, ...props }:Props) => {
  const [field, meta, helpers] = useField(name); // useField has to be under Formik component to work
  const showError = meta.touched && meta.error;

  return (
    <div>
      <input
        type={type ? type : "text"}
        className="form__input u-margin-auto-vertical"
        onChange={(event) => helpers.setValue(event.target.value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        placeholder={placeholder}
        {...props}
      />
      {showError && <div className="form__error-message">{meta.error}</div>}
    </div>
  );
};

export default FormikTextInput;
