import React, { useContext } from "react";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import * as yup from "yup";
import useSignIn from "../../hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import { Credentials } from "../../types/types";
import axios, { AxiosResponse } from "axios";
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

export const SignInContainer = ({ onSubmit,setSignUpVisible }) => {
  console.log("here2")

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }:any) => (
        <div className="ffformik">
          <h3 className="heading-3" >Sign In</h3>

          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput name="password" placeholder="Password" />
          <a className="btn btn--light" onClick={handleSubmit}>
            Submit
          </a>
          <h3 className="ffformik__small-text"  onClick={()=>{setSignUpVisible(true)}} >not registered?</h3>
        </div>
      )}
    </Formik>
  );
};
//type props = Array<{signIn:({ username, password }:Credentials)=>Promise<AxiosResponse<any, any>>, success?:boolean, error?: unknown|null}>
const SignIn = ({setSignUpVisible}) => {
  const [signIn, error] : any= useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values: Credentials):Promise<any> => {
    const { username, password } = values;
    console.log("here3")

    try {
      const response = await signIn({ username, password });
      if (response.status !== 200) {
        console.log(error);
        console.log("error while logging in: ", error?.message);
      } else {
        console.log("success");
        window.location.href="/";
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer setSignUpVisible={setSignUpVisible} onSubmit={onSubmit} />;
};

export default SignIn;
