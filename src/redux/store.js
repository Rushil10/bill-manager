import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import billReducer from "./bills/billReducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  bills: billReducer,
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware)
  )
);

export default store;
