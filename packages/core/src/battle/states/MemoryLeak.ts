import { BattleState, BattleStateParams, BattleStateResult, Turns } from "../../entities/BattleState";

type MemoryLeakParams = Pick<BattleStateParams, 'affectedPlayers' | 'turns'>
export class MemoryLeak extends BattleState {
    static readonly MINIMUM_TURNS = 2

    constructor({
        affectedPlayers,
        turns = { remaining: MemoryLeak.MINIMUM_TURNS, used: 0, step: 1 }
    }: MemoryLeakParams
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
        turns = { remaining: MemoryLeak.MINIMUM_TURNS, used: 0, step: 1 }
    }: MemoryLeakParams): MemoryLeak {
        return new this({ affectedPlayers, turns })
    }

    effect(): BattleStateResult {
        return {
            state: this,
            message: "Memory leak applied",
            turns: this.turns
        }
    }
}