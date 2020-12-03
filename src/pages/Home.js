import React, { useContext, useState } from "react";
import Context from "../context";
import axios from "axios";

export const Home = () => {
  const { mainState, setMainState } = useContext(Context);
  const [city, setCity] = useState(mainState.location);
  const [weather, setWeather] = useState({});

  const apiURL = process.env.REACT_APP_WEATHER_BASE_URL;
  const weatherAPIKey = process.env.REACT_APP_WEATHER_API_KEY;

  const onSubmit = (event) => {
    event.preventDefault();
    if (!city) return;

    setMainState({ location: city, lang: mainState.lang });
    fetchWeather(city);
  };

  const fetchWeather = async (city) => {
    try {
      const res = await axios.get(
        `${apiURL}weather?q=${city}&appid=${weatherAPIKey}&units=metric&lang=${mainState.lang}`
      );
      const watherData = res.data;

      setCity(watherData.name);
      setWeather(watherData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
      <pre>{JSON.stringify(weather, null, 2)}</pre>
    </div>
  );
};
