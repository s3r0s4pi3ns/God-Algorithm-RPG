import { BattleState } from "../entities/BattleState"
import { Player } from "../entities/Player"

export class BattleSphere {
    private readonly players: Player[]
    private readonly globalStates: BattleState[]

    constructor(players: Player[], globalStates: BattleState[] = []) {
        this.players = players
        this.globalStates = globalStates
    }

    public accessPlayers(): Player[] {
        return this.players
    }

    public accessGlobalStates(): BattleState[] {
        return this.globalStates
    }
}