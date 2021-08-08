import React, { useContext } from "react";
import Context from "../context";

import "./Home.scss";
import { WeatherIcon } from "../components/WeatherIcon";
import { CircularProgress } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import { convertTime } from "../helpers/ConvertTimeStamp";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  alert: {
    textAlign: "left",
    margin: "-3em auto 4em",
  },
}));

export const Home = () => {
  const { weather, errors, cityData, loading } = useContext(Context);
  const classes = useStyles();

  const { alerts } = weather;

  return loading ? (
    <CircularProgress color="secondary" />
  ) : (
    <div className="weather-result">
      {Object.keys(weather).length !== 0 ? (
        <>
          {alerts
            ? alerts.map((data, key) => {
                return (
                  <Alert
                    className={classes.alert}
                    key={key}
                    variant="filled"
                    severity="warning"
                  >
                    <AlertTitle>
                      {data.event}{" "}
                      <small>
                        {`(${convertTime(data.start)} - ${convertTime(
                          data.end
                        )})`}
                      </small>
                    </AlertTitle>
                    <p>{data.description}</p>
                    <small>{data.sender_name}</small>
                  </Alert>
                );
              })
            : null}

          <h3 className="location">
            {`${cityData.results[0].formatted}`}
            {/* {`${cityData.results[0].components.city}, ${cityData.results[0].components.city_district}, ${cityData.results[0].components.country}`} */}
          </h3>
          <div className="temp">{Math.round(weather.current.temp)}°C</div>

          <WeatherIcon data={weather.current.weather} />

          <p className="description">
            {weather.current.weather[0].description}
          </p>
        </>
      ) : errors ? (
        <p className="description">{errors}</p>
      ) : null}
    </div>
  );
};
