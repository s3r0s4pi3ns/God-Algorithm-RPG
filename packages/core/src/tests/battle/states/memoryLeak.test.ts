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
        memoryLeak.deactivate()
        expect(memoryLeak.isActive).toBeFalsy()

    })
})