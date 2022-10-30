export enum GameMode {
    UserToComputer = 1,
    ComputerToComputer,
    UserToUser,
}

export enum PlayerType {
    PlayerOne = 1,
    PlayerTwo,
}

export enum CurrentPlayer {
    PlayerOne = 1,
    PlayerTwo,
}

export interface IPlayer {
    name: string;
    point: number;
    selection: string | null;
    playerType: PlayerType;
    displaySelection: boolean;
}

export interface IGame {
    mode: GameMode;
    playerOne: IPlayer;
    playerTwo: IPlayer;
    currentPlayer: CurrentPlayer;
    stopUserInteraction: boolean;
    winningPlayer: IPlayer | null;
    message: string;
    status: number;
}

export type Item = {
    name: string;
};

export type GameType = {
    game: IGame;
};

export type PlayerModeProps = {
    children: JSX.Element | JSX.Element[] | string | string[];
    mode: GameMode;
};

export interface IPlayerProps {
    playerType: PlayerType;
}

export interface ItemProps {
    name: string;
    player: IPlayer;
}

export interface IWinningOptions {
    [key: string]: string;
}
