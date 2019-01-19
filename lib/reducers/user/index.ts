import { handleActions } from "redux-actions";
import {
  fulfilled,
  pending,
  rejected,
} from "../../actions";
import { PlayerActions } from "../../actions/player";
import { IResponse } from "../../api/IResponse";
import { IPlayer } from "../../models/IPlayer";
import {
  IStoreEntity,
  StoreEntity,
} from "../IStoreEntity";

const reducer = handleActions<IStoreEntity<IPlayer>, IResponse<IPlayer>>(
  {
    [fulfilled(PlayerActions.GET)]: (state, action) => {
      if (!action.payload) {
        return state;
      }

      const { success, error, data } = action.payload;

      if (success && !!data) {
        return StoreEntity.fulfilled(data);
      }

      return StoreEntity.rejected(error);
    },
    [rejected(PlayerActions.GET)]: (state, action) => {
      if (!action.payload) {
        return state;
      }

      const { error } = action.payload;

      return StoreEntity.rejected(error);
    },
    [pending(PlayerActions.GET)]: () => StoreEntity.pending(),
    [PlayerActions.CLEAR]: () => StoreEntity.empty(),
  },
  StoreEntity.empty(),
);

export { reducer };
