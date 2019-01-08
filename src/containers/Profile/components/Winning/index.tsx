// tslint:disable-next-line:no-submodule-imports
import { Divider, H2, Text } from "@blueprintjs/core";
// tslint:disable-next-line:no-submodule-imports
import { SKELETON } from "@blueprintjs/core/lib/esm/common/classes";
import classNames from "classnames";
import React from "react";
import { IPlayer } from "../../../../models/IPlayer";
import { IWinLoss } from "../../../../models/IWinLoss";
import { IStoreEntity, StoreEntity } from "../../../../reducers/IStoreEntity";
import styles from "./style.module.scss";
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
    return styles.low;
  }

  return styles.good;
};

export const WinLoss: React.SFC<IProps> = ({ winLoss, onGetWinLoss, steamId, player }) => {
  const unpackedWinLoss = StoreEntity.unpack(winLoss);
  const unPackedPlayer = StoreEntity.unpack(player);

  if (unpackedWinLoss.virgin) {
    onGetWinLoss(steamId);
  }

  const rate = unpackedWinLoss.value ? getWinningRate(unpackedWinLoss.value) : 0;
  const winLossSkeleton = unpackedWinLoss.pending ? SKELETON : "";
  const playerSkeleton = unPackedPlayer.pending ? SKELETON : "";

  return (
    <div className={classNames(styles.stats)}>
      <div className={classNames(styles.block, winLossSkeleton)}>
        <Text className="bp3-text-muted">
          Matches
        </Text>
        <H2>
          {unpackedWinLoss.value ? unpackedWinLoss.value.lose + unpackedWinLoss.value.win : 0}
        </H2>
      </div>
      <Divider />
      <div className={classNames(styles.block, winLossSkeleton)}>
        <Text className="bp3-text-muted">
          WINS
        </Text>
        <H2>
          {unpackedWinLoss.value ? unpackedWinLoss.value.win : 0}
        </H2>
      </div>
      <Divider />
      <div className={classNames(styles.block, winLossSkeleton)}>
        <Text className="bp3-text-muted">
          LOSES
        </Text>
        <H2>
          {unpackedWinLoss.value ? unpackedWinLoss.value.lose : 0}
        </H2>
      </div>
      <Divider />
      <div className={classNames(styles.block, winLossSkeleton)}>
        <Text className="bp3-text-muted">
          WINRATE
        </Text>
        <H2 className={classNames("bp3-heading")}>
          <span className={getWinrateColor(rate)}>{rate}%</span>
        </H2>
      </div>
      <Divider />
      <div className={classNames(styles.block, unPackedPlayer)}>
        <Text className="bp3-text-muted">
          MMR
        </Text>
        <H2>
          <span className={styles.mmr}>{unPackedPlayer.value ? unPackedPlayer.value.mmr_estimate.estimate : 0}</span>
        </H2>
      </div>
    </div>
  );
};
