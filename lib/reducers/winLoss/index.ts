import { handleActions } from "redux-actions";
import {
  fulfilled,
  pending,
  rejected,
} from "../../actions";
import { PlayerActions } from "../../actions/player";
import { IResponse } from "../../api/IResponse";
import { IWinLoss } from "../../models/IWinLoss";
import {
  IStoreEntity,
  StoreEntity,
} from "../IStoreEntity";

export const winLossReducer = handleActions<IStoreEntity<IWinLoss>, IResponse<IWinLoss>>(
  {
    [fulfilled(PlayerActions.GET_WIN_LOSS)]: (state, action) => {
      if (!action.payload) {
        return state;
      }

      const { success, error, data } = action.payload;

      if (success && !!data) {
        return StoreEntity.fulfilled(data);
      }

      return StoreEntity.rejected(error);
    },
    [rejected(PlayerActions.GET_WIN_LOSS)]: (state, action) => {
      if (!action.payload) {
        return state;
      }

      const { error } = action.payload;

      return StoreEntity.rejected(error);
    },
    [pending(PlayerActions.GET_WIN_LOSS)]: () => StoreEntity.pending(),
    [PlayerActions.CLEAR]: () => StoreEntity.empty(),
  },
  StoreEntity.empty(),
);
