import React, { useEffect, useState } from "react";
import SearchItems from "../SearchItems";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toBase64 } from "../../utils/utils";

const formatQueryParams = (currentPage, plusToPage, category, location) => {
  let queryParams = `?page=${currentPage + plusToPage}`;
  queryParams = category ? queryParams + `&category=${category}` : queryParams;
  queryParams = location ? queryParams + `&location=${location}` : queryParams;
  return queryParams;
};

const ItemsPageView = ({ setUser, user }) => {
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  let currentPage = Number(searchParams.get("page"));
  if (!currentPage) currentPage = 1;

  const handleFavourite = (itemId) => {};

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
                <svg
                  onClick={() => {
                    handleFavourite(item.id);
                  }}
                  className="items-page__star"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                >
                  <title>star</title>
                  <path d="M16 23l9 6-4-10 9-6h-10l-4-10-4 10h-10l9 6-4 10 9-6zM16 21.753l-6.8 4.547 3.2-7.7-7.2-4.6h7.5l3.3-8.5 3.3 8.5h7.5l-7.2 4.6 3.2 7.7-6.8-4.547z"></path>
                </svg>
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
