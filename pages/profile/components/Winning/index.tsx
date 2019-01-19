import { Divider, H2, Text } from "@blueprintjs/core";
import classNames from "classnames";
import React from "react";
import { IPlayer } from "../../../../lib/models/IPlayer";
import { IWinLoss } from "../../../../lib/models/IWinLoss";
import { IStoreEntity, StoreEntity } from "../../../../lib/reducers/IStoreEntity";
import "./style.module.scss";
interface IProps {
  winLoss: IStoreEntity<IWinLoss>;
  onGetWinLoss: (steamId: string) => void;
  steamId: string;
  player: IStoreEntity<IPlayer>;
}

const getWinningRate = (winLoss: IWinLoss): number => {
  const { win, lose } = winLoss;
  const total = win + lose;

  return total > 0 ? Number(Math.round(win * 100 / total)) : 0;
};

const getWinrateColor = (rate: number): string => {
  if (rate < 50) {
    return "low";
  }

  return "good";
};

export const WinLoss: React.SFC<IProps> = ({ winLoss, onGetWinLoss, steamId, player }) => {
  const unpackedWinLoss = StoreEntity.unpack(winLoss);
  const unPackedPlayer = StoreEntity.unpack(player);

  if (unpackedWinLoss.virgin) {
    onGetWinLoss(steamId);
  }

  const rate = unpackedWinLoss.value ? getWinningRate(unpackedWinLoss.value) : 0;
  const winLossSkeleton = unpackedWinLoss.pending ? "bp3-skeleton" : "";
  const playerSkeleton = unPackedPlayer.pending ? "bp3-skeleton" : "";

  return (
    <div className="winloss-stats">
      <div className={classNames("block", winLossSkeleton)}>
        <Text className="bp3-text-muted">
          Matches
        </Text>
        <H2>
          {unpackedWinLoss.value ? unpackedWinLoss.value.lose + unpackedWinLoss.value.win : 0}
        </H2>
      </div>
      <Divider />
      <div className={classNames("block", winLossSkeleton)}>
        <Text className="bp3-text-muted">
          WINS
        </Text>
        <H2>
          {unpackedWinLoss.value ? unpackedWinLoss.value.win : 0}
        </H2>
      </div>
      <Divider />
      <div className={classNames("block", winLossSkeleton)}>
        <Text className="bp3-text-muted">
          LOSES
        </Text>
        <H2>
          {unpackedWinLoss.value ? unpackedWinLoss.value.lose : 0}
        </H2>
      </div>
      <Divider />
      <div className={classNames("block", winLossSkeleton)}>
        <Text className="bp3-text-muted">
          WINRATE
        </Text>
        <H2 className={classNames("bp3-heading")}>
          <span className={getWinrateColor(rate)}>{rate}%</span>
        </H2>
      </div>
      <Divider />
      <div className={classNames("block", unPackedPlayer)}>
        <Text className="bp3-text-muted">
          MMR
        </Text>
        <H2>
          <span className="mmr">{unPackedPlayer.value ? unPackedPlayer.value.mmr_estimate.estimate : 0}</span>
        </H2>
      </div>
    </div>
  );
};
