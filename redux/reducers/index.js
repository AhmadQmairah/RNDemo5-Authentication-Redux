import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { checkForExpiredToken } from "../actions/auth";
import authReducer from "../reducers/AurhReducer";

const middlewares = [thunk];

const enhancer = composeWithDevTools({
  // Options: https://github.com/jhen0409/react-native-debugger#options
})(applyMiddleware(...middlewares));

const rootReducer = combineReducers({
  rootAuth: authReducer
});

const store = createStore(rootReducer, enhancer);

export default store;
