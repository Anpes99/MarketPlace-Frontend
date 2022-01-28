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
  email: "",
  name: "",

};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  email: yup.string().required("Email is required"),
  name: yup.string().required("Name is required"),
});


export const SignUpContainer = ({ onSubmit,setSignUpVisible}) => {
  console.log("here2")

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }:any) => (
        <div className="ffformik">
          <h3 className="heading-3" >Sign Up</h3>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput name="name" placeholder="Name" />
          <FormikTextInput name="email" placeholder="Email" />
          <FormikTextInput name="password" placeholder="Password" />

          <a className="btn btn--light" onClick={handleSubmit}>
            Sign Up
          </a>
          <h3 className="ffformik__small-text" onClick={()=>{setSignUpVisible(false)}} >Sign In</h3>
        </div>
      )}
    </Formik>
  );
};


type Props = {
  username:string,
  name:string,
  email:string,
  password:string,
}
//type props = Array<{signIn:({ username, password }:Credentials)=>Promise<AxiosResponse<any, any>>, success?:boolean, error?: unknown|null}>
const SignUp = ({setSignUpVisible}) => {
  const [signIn, error] : any= useSignIn();
  const navigate = useNavigate();


  const onSubmit = async (values: Props):Promise<any> => {
    console.log("here3")

    try {
      const response = await axios.post("api/users", values)
      if (response.status !== 200) {
        console.log("error while creating new user ", response);
      } else {
        console.log("success user created");
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer setSignUpVisible={setSignUpVisible} onSubmit={onSubmit} />;
};

export default SignUp;
