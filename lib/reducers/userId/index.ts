import { handleActions } from "redux-actions";
import { PlayerActions } from "../../actions/player";

const reducer = handleActions<string | undefined, string>(
  {
    [PlayerActions.SET_ID]: (state, action) => {
      return action.payload || "";
    },
  },
  "",
);

export { reducer };
