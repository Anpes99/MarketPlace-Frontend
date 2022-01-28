import React, { useEffect, useState } from "react";
import { categories, locations } from "../../utils/data";
import SearchItems from "../SearchItems";
import axios from "axios";
import { toBase64 } from "../../utils/utils";
import { useNavigate } from "react-router-dom";


const HomePageView = () => {
  const [newestItems, setItems] = useState([]);
  const [premiumItems, setPremiumItems] = useState([]);
  const navigate = useNavigate()


  useEffect(() => {
    
    async function fetchData() {let newestItems = await axios.get(`/api/items?page=1&limit=12`);
    let premItems = await axios.get(
      `/api/items?limit=16&premium=true&shuffle=true`
    );
    console.log(newestItems);
    setItems(newestItems.data.docs);
    console.log(premItems);
    setPremiumItems(premItems.data.docs);}
    fetchData()
  }, []);

  return (
    <div className="homepage">
      <section className="homepage__header">
        <SearchItems />
        <div className="gallery">
          {premiumItems.map((item, index) => (
            <figure className={`gallery__item gallery__item--${index + 1}`}>
              <div
                className="gallery__img"
                style={{
                  backgroundImage: `url(data:image/png;base64,${
                    item?.img?.data ? toBase64(item?.img?.data.data) : null
                  })`,
                }}
              ></div>
              <div className="gallery__name">{item.name}</div>
              <div className="gallery__price">{item.price}€</div>
            </figure>
          ))}
        </div>
      </section>
      <div className="newest">
        <h2 className="heading-2 heading-2--light u-margin-top-small newest__heading">
          Newest items
        </h2>
        <div className="newest__items-box">
          {newestItems.map((item, index) => {
            if (index > 11) {
              return null;
            }
            return (
              <figure onClick={()=>{navigate(`/item/${item?.id}`)}} className={`newest__item newest__item--${index + 1}`}>
                <div
                  className="newest__img"
                  style={{
                    backgroundImage: `url(data:image/png;base64,${
                      item?.img?.data ? toBase64(item?.img?.data?.data) : null
                    })`,
                  }}
                ></div>
                <div className="gallery__name">{item.name}</div>
                <div className="gallery__price">{item.price}€</div>
              </figure>
            );
          })}
        </div>
      </div>
      <div className="popular-categories">
        <h2 className="u-margin-top-small heading-2 heading-2--light">
          Popular categories
        </h2>
        <div className="popular-categories__listbox">
          {categories.map((category) => (
            <a
              className="popular-categories__list-item"
              onClick={()=>navigate(`/browse?category=${category}`)}

            >
              {category}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePageView;
