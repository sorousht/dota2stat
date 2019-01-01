import { IProfile } from "./IProfile";

export interface IGetPlayerResponse {
    tracked_until: string;
    rank_tier: number;
    solo_competitive_rank: string;
    competitive_rank: string;
    leaderboard_rank: number;
    mmr_estimate: {
      estimate: number;
    };
    profile: IProfile;
}
