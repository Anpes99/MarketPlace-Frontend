import React from "react";
import { useField } from "formik";

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name); // useField has to be under Formik component to work
  const showError = meta.touched && meta.error;

  return (
    <div>
      <input
        type={props.type ? props.type : "text"}
        className="form__input u-margin-auto-vertical"
        onChange={(event) => helpers.setValue(event.target.value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <div className="form__error-message">{meta.error}</div>}
    </div>
  );
};

export default FormikTextInput;
