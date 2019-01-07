import { IGetPlayerResponse } from "../../models/IGetPlayerResponse";
import { IWinLoss } from "../../models/IWinLoss";
import { ErrorReason } from "../ErrorReason";
import { IResponse } from "../IResponse";
import { request } from "../Request";

const OPEN_DOTA_API_URL = "https://api.opendota.com/api";
const createApiUrl = (action: string): string => `${OPEN_DOTA_API_URL}/${action}`;

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

  public static async getWinLoss(steamId: string): Promise<IResponse<IWinLoss>> {
    return request<IWinLoss>(createApiUrl(`players/${steamId}/wl`));
  }
}
