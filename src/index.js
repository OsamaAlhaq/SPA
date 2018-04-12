import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import App from "./components/App.js";
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

render(
  <Provider store={createStore(reducers, applyMiddleware(thunk))}>
      <App />
  </Provider>,
  document.getElementById("root")
);
