import { RouterState } from "connected-react-router";
import { get as getCookie } from "js-cookie";
import { IProfile } from "../models/IProfile";
import { IStoreEntity, StoreEntity } from "./IStoreEntity";

export interface IState {
  readonly userId?: string;
  readonly user: IStoreEntity<IProfile>;
  router: RouterState;
}

const userId = getCookie("user");

export const initialState: IState = {
  router: {} as any,
  user: StoreEntity.empty(),
  userId,
};
