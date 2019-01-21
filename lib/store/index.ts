import {
  applyMiddleware,
  createStore,
} from "redux";
import promiseMiddleware from "redux-promise-middleware";

// tslint:disable-next-line:no-implicit-dependencies
import { composeWithDevTools } from "redux-devtools-extension";
import { createRootReducer } from "../reducers";
import { IState, initialState } from "../reducers/state";
import { logger } from "./middlewares/Logger";

export function configureStore() {
  const middlewares = [
    promiseMiddleware(),
    logger,
  ];
  // compose enhancers
  const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
  // create store
  return createStore(
    createRootReducer(),
    initialState,
    enhancer,
  );
}
