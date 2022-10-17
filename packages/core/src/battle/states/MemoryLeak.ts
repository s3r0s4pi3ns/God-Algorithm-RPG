import { BattleState, BattleStateParams, BattleStateResult, Turns } from "../../entities/BattleState";

export class MemoryLeak extends BattleState {
    static readonly MINIMUM_TURNS = 2

    constructor({
        affectedPlayers,
        turns = { remaining: MemoryLeak.MINIMUM_TURNS, used: 0, step: 1 } }:
        Pick<BattleStateParams, 'affectedPlayers' | 'turns'>
    ) {
        super({
            id: 'memory-leak',
            name: "Memory leak",
            description: "A normal memory leak",
            affectedPlayers,
            turns
        })
    }

    static new({
        affectedPlayers,
        turns = { remaining: MemoryLeak.MINIMUM_TURNS, used: 0, step: 1 } }:
        Pick<BattleStateParams, 'affectedPlayers' | 'turns'>): MemoryLeak {
        return new this({ affectedPlayers, turns })
    }

    effect(): BattleStateResult {
        return {
            message: "Memory leak applied",
            turns: this.turns
        }
    }
}