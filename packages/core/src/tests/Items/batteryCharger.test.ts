import { describe, it, expect } from 'vitest'
import { BatteryChargerFactory } from '../factories/Items/BatteryChargerFactory'

describe("Battery charger item functionality", () => {
    it('should throw an error when set new quantity is NaN', () => {
        const item = new BatteryChargerFactory().create()

        expect(() => item.setQuantity(NaN)).toThrowError(`The quantity parameter for item ${item.name} is not a valid integer`)
    })

    it('should throw an error when set new quantity is not a valid number', () => {
        const item = new BatteryChargerFactory().create()

        expect(() => item.setQuantity('100')).toThrowError(`The quantity parameter for item ${item.name} is not a valid integer`)
        expect(() => item.setQuantity(undefined)).toThrowError(`The quantity parameter for item ${item.name} is not a valid integer`)
        expect(() => item.setQuantity(true)).toThrowError(`The quantity parameter for item ${item.name} is not a valid integer`)
    })
})