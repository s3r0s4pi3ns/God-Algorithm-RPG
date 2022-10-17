import { describe, expect, it } from 'vitest'
import { MemoryLeak } from '../../../battle/states/MemoryLeak'
import { MemoryLeakFactory } from '../../factories/battle/states/MemoryLeakFactory'


describe("Memory leak basic functionality", () => {
    it("should initialize with minimal turns if not defined on constructor", () => {
        const memoryLeak = new MemoryLeakFactory().create()

        expect(memoryLeak.turns).toStrictEqual({ remaining: MemoryLeak.MINIMUM_TURNS, used: 0, step: 1 })
    })

    it("should initialize as active when no argument passed", () => {
        const memoryLeak = new MemoryLeakFactory().create()

        expect(memoryLeak.isActive).toBeTruthy()
    })

    it("should be able to activate and deactivate the state", () => {
        const memoryLeak = new MemoryLeakFactory().create({ turns: { remaining: 2, used: 0, step: 1 } })

        memoryLeak.deactivate()
        expect(memoryLeak.isActive).toBeFalsy()
        expect(memoryLeak.turns.remaining).toBe(2)
        memoryLeak.activate()
        expect(memoryLeak.isActive).toBeTruthy()
        expect(memoryLeak.turns.remaining).toBe(2)
    })


    it("should be able to activate and deactivate the state adding extra turns on activation", () => {
        const memoryLeak = new MemoryLeakFactory().create({ turns: { remaining: 2, used: 0, step: 1 } })

        memoryLeak.deactivate()
        expect(memoryLeak.turns.remaining).toBe(2)
        memoryLeak.activate(3)
        expect(memoryLeak.turns.remaining).toBe(5)
    })
})