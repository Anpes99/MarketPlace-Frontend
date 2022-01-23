import React, { useContext } from "react";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import * as yup from "yup";
import useSignIn from "../../hooks/useSignIn";
import { useNavigate } from "react-router-dom";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});
/*
  const validationSchema = yup.object().shape({
    repoOwner: yup
      .string()
      .required('repository owner is required'),
    repoName: yup
      .string()
      .required('repository name is required'),
    rating: yup
      .number()
      .required('rating is required'),
    rediv: yup
      .string()
  });
*/

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <div className="ffformik">
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput name="password" placeholder="Password" />

          <a className="btn btn--light" onClick={handleSubmit}>
            Submit
          </a>
        </div>
      )}
    </Formik>
  );
};

const SignIn = () => {
  const [signIn, success, error] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      if (error || !success) {
        console.log(error);
        console.log("error while logging in: ", error?.message);
      }
      if (success) {
        console.log("success");
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
