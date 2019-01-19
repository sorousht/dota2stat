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

export interface IUnpackedStoreEntity<T> {
  pending: boolean;
  virgin: boolean;
  hasError: boolean;
  hasValue: boolean;
  value?: T;
  error?: string;
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

  public static unpack<T>(entity: IStoreEntity<T>): IUnpackedStoreEntity<T> {
    const { error, status, value } = entity;
    const pending = status === EntityStatus.PENDING;
    const virgin = status === EntityStatus.NONE && !value;
    const hasError = status === EntityStatus.REJECTED;
    const hasValue = status === EntityStatus.FULFILLED && !!entity.value;

    return {
      error,
      hasError,
      hasValue,
      pending,
      value,
      virgin,
    };
  }
}
