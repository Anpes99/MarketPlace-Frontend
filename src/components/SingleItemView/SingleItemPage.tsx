import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {toBase64} from "../../utils/utils"
// @ts-expect-error
import tesla from "./tesla.png";



const SingleItemPage =  ()=>{
    const [item, setItem]: any = useState(null)


    const itemId = useParams().itemId
    useEffect(()=>{

        async function fetch(){
            const result = await axios.get(`/api/items/${itemId}`)
            console.log(result)
            setItem(result.data)
        }
        fetch()
    },[])
    return <div className="singleitem-page">

        <div className="singleitem-page__item">
            <h2 className="singleitem-page__heading heading-4">
                <a href="" >ajoneuvot</a>/<a href="" >autot</a></h2>
        <div
                  className="singleitem-page__img"
                  style={{
                    backgroundImage: `url(data:image/png;base64,${
                      item?.img?.data ? toBase64(item?.img?.data.data) : null
                    })`,
                  }}
                ></div>
<div className="singleitem-page__info" >
    <div className="singleitem-page__general">
        <div  ><div className="singleitem-page__info-item" >Name:</div><span className="u-fontweight-500" >{item?.name}</span></div>
        <div  ><div className="singleitem-page__info-item" >Price:</div><span className="u-fontweight-500" >{item?.price}</span></div>
        <div  ><div className="singleitem-page__info-item" >Location:</div><span className="u-fontweight-500" >{item?.location}</span></div>

    </div>
    <div className="singleitem-page__contact">
        <div><div className="singleitem-page__info-item" >Time created:</div><span className="u-fontweight-500" >{item?.createdAt}</span></div>
        <div><div className="singleitem-page__info-item" >Seller:</div><span className="u-fontweight-500" >{item?.user?.username}</span></div>
    </div>
            <p className="singleitem-page__desc" >{item?.desc}</p>

</div>
        </div>
    </div>
}



export default SingleItemPage