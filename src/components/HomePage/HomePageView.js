import React, { useEffect, useState } from "react";
import { categories, locations } from "../../utils/data";
import SearchItems from "../SearchItems";
import axios from "axios";
import { toBase64 } from "../../utils/utils";

const HomePageView = ({ setUser, user }) => {
  const [newestItems, setItems] = useState([]);
  const [premiumItems, setPremiumItems] = useState([]);

  useEffect(async () => {
    let newestItems = await axios.get(
      `http://localhost:3001/api/items?page=1&count=9`
    );
    let premItems = await axios.get(
      `http://localhost:3001/api/subscriptions/premiumVisibility?count=16`
    );
    setItems(newestItems.data.docs);
    console.log(premItems);
    setPremiumItems(premItems.data);
  }, []);

  return (
    <div className="homepage">
      <section className="homepage__header">
        <SearchItems />
        <div className="gallery">
          {premiumItems.map((item, index) => (
            <figure className={`gallery__item gallery__item--${index + 1}`}>
              <div
                class="gallery__img"
                style={{
                  backgroundImage: `url(data:image/png;base64,${
                    item?.item.img?.data
                      ? toBase64(item?.item.img?.data.data)
                      : null
                  })`,
                }}
              ></div>
              <div className="gallery__name">{item.item.name}</div>
              <div className="gallery__price">{item.item.price}€</div>
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
              <figure className={`newest__item newest__item--${index + 1}`}>
                <div
                  class="newest__img"
                  style={{
                    backgroundImage: `url(data:image/png;base64,${
                      item?.img?.data ? toBase64(item?.img?.data.data) : null
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
              href={`http://localhost:3000/browse?category=${category}`}
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
