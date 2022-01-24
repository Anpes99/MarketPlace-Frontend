import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import SellItemForm from "./SellItemForm";

const SellView = ({ userId }) => {
  const [itemName, setItemName] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  //const [categories, setCategories] = useState([])
  const [selectedFile, setSelectedFile] = useState(null);
  const [location, setLocation] = useState("");
  const [locationNotGiven, setLocationNotGiven] = useState(false);
  const [categoryNotGiven, setCategoryNotGiven] = useState(false);
  const [nameNotGiven, setNameNotGiven] = useState(false);
  const [priceNotGiven, setPriceNotGiven] = useState(false);

  const formSuccessNotificationRef = useRef();

  /*
    useEffect(()=>{
      axios.get('/api/categories').then(result => {setCategories(result.data)})
    
    
    },[])*/

  const handleSubmitItem = () => {
    if (window.localStorage.getItem("loggedInUser")) {
      console.log("location:  ", location);
      const forma = new FormData();
      forma.append("image", selectedFile);
      forma.append("name", itemName);
      forma.append("desc", itemDesc);
      forma.append("price", Number(itemPrice));
      forma.append("category", itemCategory);
      forma.append("location", location);
      forma.append(
        "token",
        JSON.parse(window.localStorage.getItem("loggedInUser")).token
      );

      axios
        .post("http://localhost:3001/api/items", forma, {
          headers: {
            Authorization: `bearer ${JSON.parse(
              localStorage.getItem("loggedInUser")
            )}`,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data.name == "TokenExpiredError") {
            window.localStorage.removeItem("loggedInUser");
            formSuccessNotificationRef.current.createNotification(
              true,
              "session timed out. You need to log in again."
            );
          } else if (res.request.status === 200) {
            formSuccessNotificationRef.current.createNotification(
              false,
              "Item successfully posted for sale"
            );
          } else {
            formSuccessNotificationRef.current.createNotification(
              true,
              "Something went wrong. Item wasn't posted for sale"
            );
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.name == "TokenExpiredError") {
            window.localStorage.removeItem("loggedInUser");
            formSuccessNotificationRef.current.createNotification(
              true,
              "session timed out. You need to log in again."
            );
          } else {
            formSuccessNotificationRef.current.createNotification(
              true,
              "Something went wrong. Item wasn't posted for sale"
            );
          }
        });
    } else {
      window.localStorage.removeItem("loggedInUser");
      formSuccessNotificationRef.current.createNotification(
        true,
        "You need to be logged in to submit items for sale."
      );
    }
  };

  return (
    <div className="sell">
      <SellItemForm />
    </div>
  );
};

export default SellView;
