export interface IGetPlayerResponse {
    tracked_until: string;
    rank_tier: number;
    solo_competitive_rank: string;
    competitive_rank: string;
    leaderboard_rank: number;
    mmr_estimate: {
      estimate: number;
    };
    profile: {
      account_id: number,
      personaname: string,
      name: string,
      cheese: number,
      steamid: number,
      avatar: string,
      avatarmedium: string,
      avatarfull: string,
      profileurl: string,
      last_login: string,
      loccountrycode: string,
      is_contributor: boolean,
    };
}
