import React, { useContext, useState } from "react";
import { Formik } from "formik";
import FormikTextInput from "../Formik/FormikTextInput";
import * as yup from "yup";
import useSignIn from "../../hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const initialValues = {
  name: "",
  location: "",
  category: "",
  price: "",
  description: "",
};

const validationSchema = yup.object().shape({
  name: yup.string().required("Username is required"),
  location: yup.string().required("Location is required"),
  category: yup.string().required("Category is required"),
  price: yup.number().min(0).required("Price is required"),
  description: yup.string(),
});

export const FormikContainer = ({ onSubmit }) => {
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <div className="ffformik">
          <FormikTextInput name="name" placeholder="Name" />
          <FormikTextInput name="location" placeholder="Location" />
          <FormikTextInput name="category" placeholder="Category" />
          <FormikTextInput type="number" name="price" placeholder="Price" />
          <FormikTextInput name="description" placeholder="Description" />

          <a className="sell__button  btn btn--light" onClick={handleSubmit}>
            Submit Item For Sale
          </a>
        </div>
      )}
    </Formik>
  );
};

const SellItemForm = () => {
  const [signIn, success, error] = useSignIn();
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { name, location, category, price, description } = values;

    try {
      const forma = new FormData();
      forma.append("image", selectedFile);
      forma.append("name", name);
      forma.append("desc", description);
      forma.append("price", price);
      forma.append("category", category);
      forma.append("location", location);

      let response = await axios.post(
        "http://localhost:3001/api/items",
        forma,
        {
          headers: {
            Authorization: `bearer ${JSON.parse(
              localStorage.getItem("loggedInMarketPlaceUser")
            )}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("item succesfully posted for sale");
      } else {
        console.log("something went wrong");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="sell__form">
      <FormikContainer onSubmit={onSubmit} />{" "}
      <div className="sell__form__file-upload">
        <div className="heading-3">Photo upload</div>
        <input
          id="sell-form__file-upload"
          className="file-upload"
          type="file"
          onChange={(event) => setSelectedFile(event.target.files[0])}
        />
      </div>
    </div>
  );
};

export default SellItemForm;
