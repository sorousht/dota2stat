import { RouterState } from "connected-react-router";
import { IProfile } from "../models/IProfile";
import { IStoreEntity, StoreEntity } from "./IStoreEntity";

export interface IState {
  readonly user: IStoreEntity<IProfile>;
  router: RouterState;
}

export const initialState: IState = {
  router: {} as any,
  user: StoreEntity.empty(),
};
