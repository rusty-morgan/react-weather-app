import React, { useState, useEffect } from "react";
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import Context from "./context";

import {
  Divider,
  IconButton,
  InputBase,
  Paper,
  makeStyles,
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import RoomIcon from "@material-ui/icons/Room";

import { Home } from "./pages/Home";
import { Hourly } from "./pages/Hourly";

import axios from "axios";
import TopBar from "./components/TopBar/TopBar";
import { Daily } from "./pages/Daily";

export default function App() {
  const userLanguage = navigator.language.substring(0, 2);
  const [mainState, setMainState] = useState({
    city: "",
    lang: userLanguage,
  });

  const coords = [];
  setCoordinates();
  function setCoordinates() {
    navigator.geolocation.getCurrentPosition(function (position) {
      coords.push({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [cityData, setCityData] = useState({});
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiURL = process.env.REACT_APP_WEATHER_BASE_URL;
  const weatherAPIKey = process.env.REACT_APP_WEATHER_API_KEY;

  const apiOpenDataURL = process.env.REACT_APP_OPENCAGEDATA_BASE_URL;
  const openDataAPIKey = process.env.REACT_APP_OPENCAGEDATA_API_KEY;

  useEffect(() => {
    if (coords.length) {
      fetchWeatherWithCurrentCoords();
    }
    // eslint-disable-next-line
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!city) return;

    setMainState({ ...mainState, city });

    getCoordsFromCityName(city).then((cityData) => {
      console.log(cityData);
      if (typeof cityData !== "undefined") {
        fetchWeather(cityData.results[0].geometry);
      }
    });
  };

  const fetchWeather = async (coords) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${apiURL}/onecall?lat=${coords.lat}&lon=${coords.lng}&appid=${weatherAPIKey}&units=metric&lang=${mainState.lang}`
      );
      const weatherData = res.data;

      setWeather(weatherData);
      setLoading(false);
    } catch (error) {
      setWeather({});
      setErrors("Location not found");
    }
  };

  function fetchWeatherWithCurrentCoords() {
    getCityFromCoords(coords[0]).then((cityData) => {
      setCity(cityData.results[0].formatted);
      fetchWeather(coords[0]);
    });
  }

  const getCityFromCoords = async (coords) => {
    try {
      const res = await axios.get(
        `${apiOpenDataURL}/json?key=${openDataAPIKey}&q=${coords.lat}+${coords.lng}`
      );

      const cityData = res.data;

      setCityData(cityData);
      return cityData;
    } catch (error) {
      setErrors("Location not found");
    }
  };

  const getCoordsFromCityName = async (city) => {
    try {
      const res = await axios.get(
        `${apiOpenDataURL}/json?key=${openDataAPIKey}&q=${city}`
      );

      const cityData = res.data;

      if (!res.data.results.length) {
        setWeather({});
        throw "Location not found";
      }
      setCityData(cityData);
      return cityData;
    } catch (error) {
      setErrors("Location not found");
    }
  };

  const useStyles = makeStyles((theme) => ({
    appBar: {
      background: "transparent",
    },
    toolBar: {
      justifyContent: "center",
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }));
  const classes = useStyles();

  return (
    <Context.Provider
      value={{ mainState, coords, errors, weather, cityData, loading }}
    >
      <BrowserRouter>
        <TopBar Link={Link} classes={classes} />

        <div className="search-weather">
          <Paper onSubmit={onSubmit} component="form" className="root">
            <InputBase
              className="search-input"
              placeholder="Search City"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton
              color="primary"
              className={classes.iconButton}
              onClick={() => fetchWeatherWithCurrentCoords()}
            >
              <RoomIcon />
            </IconButton>
          </Paper>
        </div>
        <div className="container">
          <Switch>
            <Route path="/hourly" component={Hourly} />
            <Route path="/daily" component={Daily} />
            <Route path="/" exact component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    </Context.Provider>
  );
}
