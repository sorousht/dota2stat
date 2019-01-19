import { combineReducers } from "redux";
import { IState } from "./state";
import { reducer as userReducer } from "./user";
import { reducer as userIdReducer } from "./userId";
import { winLossReducer } from "./winLoss";

export const createRootReducer = () => combineReducers<IState>({
  user: userReducer as any,
  userId: userIdReducer as any,
  winLoss: winLossReducer as any,
});
