import React, { useEffect, useState } from "react";
import SearchItems from "../SearchItems";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toBase64 } from "../../utils/utils";
import useUser from "../../hooks/useUser";

const formatQueryParams = (currentPage, plusToPage, category, location) => {
  let queryParams = `?page=${currentPage + plusToPage}`;
  queryParams = category ? queryParams + `&category=${category}` : queryParams;
  queryParams = location ? queryParams + `&location=${location}` : queryParams;
  return queryParams;
};

const ItemsPageView = () => {
  const [data, setData] = useState([]);
  const [userFavourites, setUserFavourites] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const user = useUser();

  let currentPage = Number(searchParams.get("page"));
  if (!currentPage) currentPage = 1;

  const handleFavourite = async (itemId, isFavourite) => {
    console.log("rgserg");

    if (user) {
      if (!isFavourite) {
        console.log("user: ", user);
        setUserFavourites(userFavourites.concat(itemId));
        const result = await axios.post(
          `http://localhost:3001/api/users/${user.data.username}/favourites/${itemId}`
        );
        console.log(result);
      } else if (isFavourite) {
        setUserFavourites(userFavourites.filter((id) => id !== itemId));
        const result = await axios.delete(
          `http://localhost:3001/api/users/${user.data.username}/favourites/${itemId}`
        );
        console.log(result);
      }
    }
  };

  let category = searchParams.get("category");
  console.log(category);
  let location = searchParams.get("location");

  let queryParams = `?page=${currentPage}`;
  queryParams = category ? queryParams + `&category=${category}` : queryParams;
  queryParams = location ? queryParams + `&location=${location}` : queryParams;

  console.log(location);

  let pages;

  useEffect(async () => {
    let result = await axios.get(
      `/api/items${formatQueryParams(currentPage, 0, category, location)}`
    );
    console.log("res: ", result);
    setData(result);
    console.log(result);
  }, []);
  useEffect(async () => {
    if (user)
      setUserFavourites(user.data.favourites.map((favourite) => favourite.id));
  }, [user]);

  console.log(userFavourites[0]);
  return (
    <div className="items-page">
      <div className="items-page__nav">
        <SearchItems />
      </div>
      <div className="items-page__list">
        <div className="u-margin-top-small u-margin-left-small">
          category: {category ? category : "all"} location:{" "}
          {location ? location : "all"}
        </div>
        <div className=" heading-4 u-margin-left-small">
          items found: {data?.data?.totalDocs}
        </div>
        <div>
          {data?.data?.docs.map((item, index) => {
            return (
              <div className={`items-page__item items-page__item${index + 1}`}>
                <div
                  className="items-page__img"
                  style={{
                    backgroundImage: `url(data:image/png;base64,${
                      item?.img?.data ? toBase64(item?.img?.data.data) : null
                    })`,
                  }}
                ></div>
                <span className="items-page__price">{item.price}€</span>
                <span className="items-page__location">
                  {item.location}, {item.user.name}
                </span>
                <span className="items-page__date"> {item.date}</span>
                {!userFavourites.includes(item.id) && (
                  <svg
                    onClick={() => {
                      handleFavourite(item.id, false);
                    }}
                    className="items-page__star"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                  >
                    <title>star-empty</title>
                    <path d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798zM16 23.547l-6.983 3.671 1.334-7.776-5.65-5.507 7.808-1.134 3.492-7.075 3.492 7.075 7.807 1.134-5.65 5.507 1.334 7.776-6.983-3.671z"></path>
                  </svg>
                )}
                {userFavourites.includes(item.id) && (
                  <svg
                    onClick={() => {
                      handleFavourite(item.id, true);
                    }}
                    className="items-page__star"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                  >
                    <title>star-full</title>
                    <path d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798z"></path>
                  </svg>
                )}
              </div>
            );
          })}
        </div>
        <div className="pagination u-margin-top-auto">
          {data?.data?.prevPage && (
            <a
              className="pagination__item"
              href={`/browse${formatQueryParams(
                currentPage,
                -1,
                category,
                location
              )}`}
            >
              prev
            </a>
          )}
          <span className="pagination__item">{currentPage}</span>
          {data?.data?.nextPage && (
            <a
              className="pagination__item"
              href={`/browse${formatQueryParams(
                currentPage,
                1,
                category,
                location
              )}`}
            >
              next
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemsPageView;
