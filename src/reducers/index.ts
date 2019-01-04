import { connectRouter } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import { IState } from "./state";
import { reducer as userReducer } from "./user";
import { reducer as userIdReducer } from "./userId";

export const createRootReducer = (history: History) => combineReducers<IState>({
  router: connectRouter(history),
  user: userReducer as any,
  userId: userIdReducer as any,
});
