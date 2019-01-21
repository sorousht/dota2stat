import { get as getCookie } from "js-cookie";
import { IPlayer } from "../models/IPlayer";
import { IWinLoss } from "../models/IWinLoss";
import { IStoreEntity, StoreEntity } from "./IStoreEntity";

export interface IState {
  readonly userId?: string;
  readonly user: IStoreEntity<IPlayer>;
  readonly winLoss: IStoreEntity<IWinLoss>;
}

const userId = getCookie("user");

export const initialState: IState = {
  user: StoreEntity.empty(),
  userId,
  winLoss: StoreEntity.empty(),
};
