import React from "react";
import "./App.css";

import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import SingleRoom from "./pages/SingleRoom";
import Error from "./pages/Error";

import Navbar from "./components/Navbar";

import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        {/* we need to add the property exact so other pages will not other individual pages */}
        <Route exact path="/" component={Home} />
        <Route exact path="/rooms" component={Rooms} />

        {/* in single room, we need to render different data, since every room has its own different class, so to do that we need to add some property - :slug */}
        <Route exact path="/rooms/:slug" component={SingleRoom} />

        {/* by using switch we can make sure that pages type incorrectly will automatically redirect the page into the error page. */}
        <Route component={Error} />
      </Switch>
    </div>
  );
}

export default App;
