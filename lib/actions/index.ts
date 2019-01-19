// tslint:disable-next-line:no-submodule-imports
import curry from "lodash/curry";
enum AsyncStatus {
  FULFILLED = "FULFILLED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}

const create = (status: string, action: string): string => {
  return `${action}_${status}`;
};

export const fulfilled = curry(create)(AsyncStatus.FULFILLED);
export const rejected = curry(create)(AsyncStatus.REJECTED);
export const pending = curry(create)(AsyncStatus.PENDING);
