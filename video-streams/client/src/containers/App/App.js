import React from "react";
import { Route } from "react-router-dom";

import MainPage from "../pages/MainPage";
import StreamCreate from "../pages/StreamCreate";
import StreamEdit from "../pages/StreamEdit";
import StreamShow from "../pages/StreamShow";

const App = () => {
  return (
    <div>
      <Route path="/" exact component={MainPage} />
      <Route path="/streams/new" component={StreamCreate} />
      <Route path="/streams/edit" component={StreamEdit} />
      <Route path="/streams/show" component={StreamShow} />
    </div>
  );
};

export default App;
