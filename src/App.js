import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Context from "./context";
import { Home } from "./pages/Home";

export default function App() {
  const userLanguage = navigator.language.substring(0, 2);
  const [mainState, setMainState] = useState({
    location: "Bydgoszcz",
    lang: userLanguage,
  });

  return (
    <Context.Provider value={{ mainState, setMainState }}>
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route path="/" exact component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    </Context.Provider>
  );
}
