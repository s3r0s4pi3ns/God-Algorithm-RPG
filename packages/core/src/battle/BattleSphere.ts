import { BattleState, BattleStateResultApplied } from "../entities/BattleState"
import { Player } from "../entities/Player"

export class BattleSphere {
    private readonly players: Player[]
    private globalStates: BattleState[]

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

    public applyGlobalStates(): BattleStateResultApplied[] {
        const results = this.globalStates.map(state => state.apply())

        this.cleanUpGlobalStates()

        return results;
    }

    private cleanUpGlobalStates(): void {
        this.globalStates = this.globalStates.filter(state => state.isActive && state.expiresIn() > 0)
    }
}