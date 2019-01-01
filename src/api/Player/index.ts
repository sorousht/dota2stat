import { IGetPlayerResponse } from "../../models/IGetPlayerResponse";
import { ErrorReason } from "../ErrorReason";
import { IResponse } from "../IResponse";
import { request } from "../Request";

export class PlayerApi {
  public static async getProfile(steamId: string): Promise<IResponse<IGetPlayerResponse>> {
    const url = `https://api.opendota.com/api/players/${steamId}`;

    const response = await request<IGetPlayerResponse>(url);

    if (response.data
      && response.data.profile
      && response.data.profile.steamid) {
      return response;
    }

    return {
      error: ErrorReason.NOT_FOUND,
      success: false,
    };
  }
}
