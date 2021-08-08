import React, { useContext } from "react";
import Context from "../context";
import { WeatherIcon } from "../components/WeatherIcon";
import { convertTime, convertDate } from "../helpers/ConvertTimeStamp";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  item: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  dateText: {
    fontSize: "11px",
    color: "#c3c3c3",
  },
  temp: {
    color: "#fff",
  },
  icon: {
    width: "100%",
    maxWidth: "35px",
  },
  description: {
    textTransform: "capitalize",
    color: "#fff",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
  },
  card: {
    background: "rgba(0,0,0,0.3)",
    minHeight: "170px",
  },
}));

export const Daily = () => {
  const { weather, cityData, loading, errors } = useContext(Context);
  const classes = useStyles();

  return (
    <div>
      <div className="weather-result">
        <Grid container spacing={2} className={classes.root}>
          {weather.daily &&
            weather.daily.map((h, k) => {
              if (k != 0) {
                return (
                  <Grid key={k} item xs={6} sm={2} className={classes.item}>
                    <Card className={classes.card}>
                      <CardContent>
                        <Typography className={classes.dateText} gutterBottom>
                          {`${convertDate(h.dt)}`}
                        </Typography>
                        <Typography
                          className={classes.temp}
                          variant="h3"
                          component="h2"
                        >
                          {Math.round(h.temp.max)}°C
                        </Typography>
                        <div className={classes.iconContainer}>
                          <div className={classes.icon}>
                            <WeatherIcon data={h.weather} />
                          </div>
                        </div>
                        <Typography
                          component="p"
                          className={classes.description}
                        >
                          {h.weather[0].description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              }
            })}
        </Grid>
      </div>
    </div>
  );
};
