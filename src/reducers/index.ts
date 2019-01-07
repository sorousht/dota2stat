import { connectRouter } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import { handleActions, ReducerMapValue } from "redux-actions";
import { fulfilled, pending, rejected } from "../actions";
import { IResponse } from "../api/IResponse";
import { IStoreEntity, StoreEntity } from "./IStoreEntity";
import { IState } from "./state";
import { reducer as userReducer } from "./user";
import { reducer as userIdReducer } from "./userId";
import { winLossReducer } from "./winLoss";

export const createRootReducer = (history: History) => combineReducers<IState>({
  router: connectRouter(history),
  user: userReducer as any,
  userId: userIdReducer as any,
  winLoss: winLossReducer as any,
});

export const handleStoreEntityActions = <T>(
  name: string,
  handleFulfilled?: ReducerMapValue<IStoreEntity<T>, IResponse<T>>,
  handleRejected?: ReducerMapValue<IStoreEntity<T>, IResponse<T>>,
  handlePending?: ReducerMapValue<IStoreEntity<T>, IResponse<T>>) => handleActions<IStoreEntity<T>, IResponse<T>>(
  {
    [fulfilled(name)]: (state, action) => {
      if (!action.payload) {
        return state;
      }

      const { success, error, data } = action.payload;

      if (success && !!data) {
        return StoreEntity.fulfilled(data);
      }

      return StoreEntity.rejected(error);
    },
    [rejected(name)]: (state, action) => {
      if (!action.payload) {
        return state;
      }

      const { error } = action.payload;

      return StoreEntity.rejected(error);
    },
    [pending(name)]: () => StoreEntity.pending(),
  },
  StoreEntity.empty(),
);
