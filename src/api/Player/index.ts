import { GetPlayerResponse } from "../../models/GetPlayerResponse";
import { request } from "../Request";
import { IResponse } from "../IResponse";
import { ErrorReason } from "../ErrorReason";

export class PlayerApi {
  static async getProfile(steamId: string): Promise<IResponse<GetPlayerResponse>> {
    const url = `https://api.opendota.com/api/players/${steamId}`;

    const response = await request<GetPlayerResponse>(url);

    if (response.data 
        && response.data.profile
        && response.data.profile.steamid) {
      return response;
    }

    return {
      success: false,
      error: ErrorReason.NOT_FOUND,
    };
  }
}