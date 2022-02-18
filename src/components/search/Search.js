import { useRef, useState } from "react";
import axios from "axios";
import classes from "./Search.module.css";
import { useSelector, useDispatch } from "react-redux";
import { add } from "../../store/citySlice";

const Search = () => {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  const inputRef = useRef();

  const addCityHandler = (e) => {
    e.preventDefault();

    const fetchDataAction = async (cityName) => {
      const data = await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=008ad9989bf7a9b2e874bb945d0840f0&units=metric`
        )
        .catch((err) => {
          alert(`Cannot find "${input}". Try another city name!`);
        });

      dispatch(
        add({
          name: data.data.name,
          country: data.data.sys.country,
          weather: data.data.weather[0].main,
          temp: data.data.main.temp,
          icon: `http://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`,
        })
      );
    };

    fetchDataAction(inputRef.current.value.toLowerCase());

    setInput("");
  };

  return (
    <div className={classes.searchBarContainer}>
      <form onSubmit={addCityHandler} className={classes.form}>
        <div className={classes.labelContainer}>
          <label className={classes.label} htmlFor="search">
            Add new city:
          </label>
        </div>

        <div className={classes.inputContainer}>
          <input
            className={classes.searchInput}
            id="search"
            type="text"
            required
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value.toLowerCase())}
          />

          <button className={classes.searchButton}>
            <svg
              className={classes.addIcon}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <p>Add</p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
