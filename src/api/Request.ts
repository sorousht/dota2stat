import { ErrorReason } from "./ErrorReason";
import { IResponse } from "./IResponse";

export async function request<T>(url: string): Promise<IResponse<T>> {
  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    return {
      data,
      success: true,
    };
  }

  switch (response.status) {
    case 404:
      return {
        error: ErrorReason.NOT_FOUND,
        success: false,
      };
    default:
      return {
        error: ErrorReason.UNKNOWN,
        success: false,
      };
  }
}
