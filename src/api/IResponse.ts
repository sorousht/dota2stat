import { ErrorReason } from "./ErrorReason";

export interface IResponse<T> {
  success: boolean;
  data?: T;
  error?: ErrorReason;
}