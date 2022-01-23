import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Notification from "./Notification";
import { locations } from "../utils/data";
import { categories } from "../utils/data";

const SellItemForm = ({ userId }) => {
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
    <div className="sellFormWrapper">
      <div style={{ paddingBottom: "1rem" }}>
        <strong>Submit an item for sale:</strong>
      </div>
      <div className="sellLocation">
        <div className="itemInfoNames1">
          <div>location*</div>
          <div>category*</div>
        </div>
        <div
          style={{
            paddingTop: "0.5rem",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {" "}
          <div
            className={locationNotGiven ? "input-group error" : "input-group"}
          >
            <select
              id="sellItemFormLocation"
              onChange={(event) => {
                setLocation(event.target.value);
                setLocationNotGiven(false);
              }}
              onBlur={() => {
                console.log(location);
                location === "maakunta"
                  ? setLocationNotGiven(true)
                  : setLocationNotGiven(false);
              }}
            >
              <option
                style={{ backgroundColor: "white", width: "90%" }}
                value={null}
              >
                maakunta
              </option>
              {locations.map((maakunta) => (
                <option
                  style={{ backgroundColor: "white", width: "90%" }}
                  value={maakunta}
                  key={maakunta}
                >
                  {maakunta}
                </option>
              ))}
            </select>
            <span className="error-message">location is required</span>
          </div>
          <div
            className={categoryNotGiven ? "input-group error" : "input-group"}
          >
            {" "}
            <select
              id="sellItemFormCategory"
              onChange={(event) => {
                setItemCategory(event.target.value);
                setCategoryNotGiven(false);
              }}
              onBlur={() => {
                itemCategory === "select a category"
                  ? setCategoryNotGiven(true)
                  : setCategoryNotGiven(false);
              }}
            >
              <option
                style={{ backgroundColor: "white", width: "90%" }}
                value={null}
              >
                select a category
              </option>
              {categories.map((category) => (
                <option
                  style={{ backgroundColor: "white", width: "90%" }}
                  value={category}
                  key={category}
                >
                  {category}
                </option>
              ))}
            </select>
            <span className="error-message">category is required</span>
          </div>
        </div>
      </div>

      <div className="itemInfo">
        <div className="itemInfoNames2">
          <div>name*</div>
          <div>price*</div>
          <div style={{ marginTop: "2.1rem" }}>describe</div>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div
            className={nameNotGiven ? "input-group error" : "input-group"}
            style={{ width: "100%" }}
          >
            <input
              id="sellItemFormName"
              className="nameInput"
              onChange={(event) => {
                setItemName(event.target.value);
                setNameNotGiven(false);
              }}
              onBlur={() => {
                console.log(itemName);
                itemName == "" ? setNameNotGiven(true) : setNameNotGiven(false);
              }}
            />
            <div className="error-message">name is required</div>
          </div>
          <div
            className={priceNotGiven ? "input-group error" : "input-group"}
            style={{ width: "100%", marginTop: "0.4rem" }}
          >
            <input
              id="sellItemFormPrice"
              style={{ maxWidth: "5rem", width: "100%" }}
              onChange={(event) => {
                setItemPrice(event.target.value);
                setPriceNotGiven(false);
              }}
              onBlur={() => {
                itemPrice === ""
                  ? setPriceNotGiven(true)
                  : setPriceNotGiven(false);
              }}
            />
            <strong style={{ paddingTop: "0.2rem", paddingLeft: "0.1rem" }}>
              {" "}
              €
            </strong>
            <div className="error-message">price is required</div>
          </div>

          <div
            className="input-group"
            style={{ width: "100%", marginTop: "1rem" }}
          >
            <textarea
              id="sellItemFormDesc"
              onChange={(event) => setItemDesc(event.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="formSelectImage">
        <span
          style={{
            width: "8rem",
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "1rem",
          }}
        >
          select image:
        </span>
        <span>
          <input
            id="sellItemFormImage"
            style={{ width: "13rem", display: "flex", flexWrap: "wrap" }}
            type="file"
            onChange={(event) => setSelectedFile(event.target.files[0])}
          />
        </span>
      </div>

      <div
        id="formSubmitNotification"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "2rem",
        }}
      >
        <Notification ref={formSuccessNotificationRef} />
      </div>

      <button
        id="sellItemFormSubmit"
        style={{ alignSelf: "center" }}
        onClick={handleSubmitItem}
      >
        Submit item for sale
      </button>
    </div>
  );
};

export default SellItemForm;
