import { BattleState, BattleStateResult, Turns } from "../../entities/BattleState";
import { Player } from "../../entities/Player";

export class MemoryLeak extends BattleState {
    static readonly MINIMUM_TURNS = 2

    constructor(
        affectedPlayers: Player[],
        turns: Turns = { remaining: MemoryLeak.MINIMUM_TURNS, used: 0, step: 1 }
    ) {
        super({
            id: 'memoryleak',
            name: "Memory leak",
            description: "A normal memory leak",
            affectedPlayers,
            turns
        })
    }

    apply(): BattleStateResult {
        if (this.turns.remaining > 0) {
            this.spendTurn()
            return {
                message: "Memory leak applied",
                turns: this.turns
            }
        }

        return {
            message: "Turns for memory leak are over, the state was not applied",
            turns: this.turns
        }
    }
}