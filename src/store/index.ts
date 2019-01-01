import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import {
  applyMiddleware,
  createStore,
} from "redux";
import promiseMiddleware from "redux-promise-middleware";

// tslint:disable-next-line:no-implicit-dependencies
import { composeWithDevTools } from "redux-devtools-extension";
import { createRootReducer } from "../reducers";
import { initialState, IState } from "../reducers/state";
import { logger } from "./middlewares/Logger";

export const history = createBrowserHistory();

function configureStore(initial?: IState) {
  const middlewares = [
    promiseMiddleware(),
    routerMiddleware(history),
    logger,
  ];
  // compose enhancers
  const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
  // create store
  return createStore(
    createRootReducer(history),
    initial,
    enhancer,
  );
}

// pass an optional param to rehydrate state on app start
const store = configureStore(initialState);

// export store singleton instance
export { store };
