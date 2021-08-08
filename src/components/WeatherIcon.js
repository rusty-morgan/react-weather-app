import React from "react";

export const WeatherIcon = ({ data }) => {
  function getDayNightIcon() {
    return data[0].icon.slice(-1);
  }
  function getCode() {
    return data[0].id;
  }
  const dn = getDayNightIcon();
  const code = getCode();
  return (
    <img
      className="icon"
      src={`../icons/svg/${code + dn}.svg`}
      alt={`${code + dn}.svg`}
    />
  );
};
