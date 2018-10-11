import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import { rootReducer } from "./store";

// enable Redux Devtools extension
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reduxStore = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export default reduxStore;
