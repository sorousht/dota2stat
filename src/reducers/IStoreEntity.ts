import { FULFILLED, PENDING, REJECTED } from "redux-promise-middleware";
import { ErrorReason } from "../api/ErrorReason";

export interface IStoreEntity<T> {
  value: T | undefined;
  status: EntityStatus;
  error: string | undefined;
}

export enum EntityStatus {
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
  PENDING = "pending",
  NONE = "none",
}

export class StoreEntity {
  public static fulfilled<T>(value: T): IStoreEntity<T> {
    return {
      error: undefined,
      status: EntityStatus.FULFILLED,
      value,
    };
  }

  public static rejected<T>(error: string | undefined): IStoreEntity<T> {
    return {
      error: error || ErrorReason.UNKNOWN,
      status: EntityStatus.REJECTED,
      value: undefined,
    };
  }

  public static pending<T>(): IStoreEntity<T> {
    return {
      error: undefined,
      status: EntityStatus.PENDING,
      value: undefined,
    };
  }

  public static empty<T>(): IStoreEntity<T> {
    return {
      error: undefined,
      status: EntityStatus.NONE,
      value: undefined,
    };
  }
}
