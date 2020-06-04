import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";

const  composeEnchancers = composeWithDevTools({});

export const store = createStore(rootReducer, composeEnchancers(applyMiddleware(thunk)))