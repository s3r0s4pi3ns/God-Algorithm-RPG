import { Player } from "./Player";

export interface BattleStateParams {
    id: string
    name: string
    description: string
    affectedPlayers: Player[]
    turns: Turns
    isActive?: boolean
}

export interface BattleStateResult {
    state: BattleState
    message: string
    turns: Turns
}

export interface Turns {
    remaining: number;
    used: number;
    step: number
}

export type BattleStateResultApplied = { [key: string]: BattleStateResult }
export abstract class BattleState {
    id: string
    name: string
    description: string
    affectedPlayers: Player[]
    turns: Turns
    isActive: boolean = true

    constructor({ id, name, description, affectedPlayers, turns, isActive = true }: BattleStateParams) {
        this.id = id
        this.name = name
        this.description = description
        this.affectedPlayers = affectedPlayers
        this.turns = turns
        this.isActive = Boolean(isActive)
    }

    activate(turns: number = 0): void {
        this.turns.remaining += turns
        this.isActive = true;
    }

    deactivate(): void {
        this.isActive = false
    }

    incrementStep(value: number) {
        this.turns.step += value
    }

    decrementStep(value: number) {
        this.turns.step -= value
    }

    expiresIn(): number {
        return this.turns.remaining
    }

    spendTurn(): void {
        this.turns.remaining -= this.turns.step
        this.turns.used += this.turns.step

        if (this.turns.remaining <= 0) this.deactivate()
    }

    apply(): BattleStateResultApplied {
        this.spendTurn()
        const results: BattleStateResultApplied = {}

        this.affectedPlayers.forEach(player => {
            results[player.id] = this.effect()
        })

        return results
    }

    abstract effect(): BattleStateResult
}