import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import SellItemForm from "./SellItemForm";

const SellView = ({ userId }) => {
  return (
    <div className="sell">
      <SellItemForm />
    </div>
  );
};

export default SellView;
