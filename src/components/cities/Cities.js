import classes from "./Cities.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { remove } from "../../store/citySlice";
import { useSelector } from "react-redux";
import { refresh } from "../../store/citySlice";
import { useState } from "react";

const Cities = () => {
  const reducerCity = useSelector((state) => state.cities);
  const [findCityInput, setFindCityInput] = useState("");
  const [ableToRefresh, setAbleToRefresh] = useState(true);
  const [timeleft, setTimeleft] = useState(60);

  const filteredCities = reducerCity.filter((item) =>
    item.payload.name.toLocaleLowerCase("en-GB").includes(findCityInput)
  );

  const dispatch = useDispatch();

  let refreshed = [];

  const refreshHandler = () => {
    const fetchDataAction = async (cityName) => {
      const data = await axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=008ad9989bf7a9b2e874bb945d0840f0&units=metric`
        )
        .catch((err) => {
          alert(`Something went wrong! ${err}`);
        });
      refreshed.push({
        name: data.data.name,
        country: data.data.sys.country,
        weather: data.data.weather[0].main,
        temp: data.data.main.temp,
        icon: `http://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`,
      });
      dispatch(refresh(refreshed));
    };
    reducerCity.map((el) => {
      fetchDataAction(el.payload.name);
    });
    refreshed = [];
    setAbleToRefresh(false);

    const countDown = setInterval(() => {
      setTimeleft((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      setAbleToRefresh(true);
      clearInterval(countDown);
      setTimeleft(60);
    }, 60000);

    if (timeleft < 0) {
      clearInterval(countDown);
      setTimeleft(60);
    }
  };

  return (
    <div className={classes.citiesContainer}>
      {reducerCity.length > 0 && (
        <div className={classes.refreshAndSearch}>
          <button
            className={classes.refreshButton}
            onClick={refreshHandler}
            disabled={!ableToRefresh}
          >
            <svg
              className={classes.refreshIcon}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>{" "}
            {ableToRefresh ? "Refresh" : `Refresh after ${timeleft}s`}
          </button>
          {reducerCity.length > 1 && (
            <div className={classes.findCity}>
              <input
                type="text"
                placeholder="search by city name"
                className={classes.findCityInput}
                value={findCityInput}
                onChange={(e) => setFindCityInput(e.target.value.toLowerCase())}
                maxLength="15"
              />
              <svg
                className={classes.searchIcon}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          )}
        </div>
      )}

      <div className={classes.cities}>
        {findCityInput && filteredCities.length < 1 && (
          <p className={classes.errorText}>Cannot find "{findCityInput}"</p>
        )}
        {findCityInput && filteredCities.length > 0 && (
          <p className={classes.errorText}>
            Search results for "{findCityInput}":
          </p>
        )}
        {(filteredCities ? filteredCities : reducerCity).map((el, ind) => {
          return (
            <div className={classes.cityContainer} key={ind}>
              <div className={classes.cityNameAndIcon}>
                <h1 className={classes.cityName}>
                  {el.payload.name}, {el.payload.country}
                </h1>
                <img
                  src={el.payload.icon}
                  alt="weather icon"
                  className={classes.weatherIcon}
                />
              </div>
              <p className={classes.mainWeather}>{el.payload.weather}</p>
              <div className={classes.temp}>
                <h1 className={classes.degree}>{el.payload.temp} °C</h1>
              </div>
              <svg
                className={classes.deleteIcon}
                onClick={() => dispatch(remove({ index: ind }))}
                xmlns="http://www.w3.org/2000/svg"
                width="192"
                height="192"
                fill="#000000"
                viewBox="0 0 256 256"
              >
                <rect width="256" height="256" fill="none"></rect>
                <line
                  x1="216"
                  y1="56"
                  x2="40"
                  y2="56"
                  fill="none"
                  stroke="#000000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></line>
                <line
                  x1="104"
                  y1="104"
                  x2="104"
                  y2="168"
                  fill="none"
                  stroke="#000000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></line>
                <line
                  x1="152"
                  y1="104"
                  x2="152"
                  y2="168"
                  fill="none"
                  stroke="#000000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></line>
                <path
                  d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56"
                  fill="none"
                  stroke="#000000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></path>
                <path
                  d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56"
                  fill="none"
                  stroke="#000000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></path>
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cities;
