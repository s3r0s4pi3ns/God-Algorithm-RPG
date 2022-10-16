import { describe, it, expect } from 'vitest'
import { Laptop } from '../../entities/Laptop'
import { BatteryChargerFactory } from '../factories/Items/BatteryChargerFactory'
import { LaptopFactory } from '../factories/LaptopFactory'
import { PlayerFactory } from '../factories/PlayerFactory'

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
        expect(() => item.setQuantity([])).toThrowError(`The quantity parameter for item ${item.name} is not a valid integer`)
        expect(() => item.setQuantity({})).toThrowError(`The quantity parameter for item ${item.name} is not a valid integer`)
    })

    it('should be able to be used if the player laptop is below the max battery percentage', () => {
        const player = new PlayerFactory().create({
            items: [new BatteryChargerFactory().create({ rechargeQuantity: 15 })],
            laptop: new LaptopFactory().create({ battery: 50 })
        })

        expect(player.accessItems()[0].canBeUsedOnPlayer(player)).toBeTruthy()
        expect(player.accessItems()[0].consume(player)).toStrictEqual({
            success: true,
            playersInvolved: [player],
            message: `Increased the battery life by 15%`
        })
        expect(player.accessLaptop().getParts().battery).toBe(65)
    })

    it("should not be able to be used if the player laptop is full battery", () => {
        const player = new PlayerFactory().create({
            items: [new BatteryChargerFactory().create({ rechargeQuantity: 15 })],
            laptop: new LaptopFactory().create({ battery: Laptop.MAX_BATTERY_PERCENTAGE })
        })
        expect(player.accessItems()[0].canBeUsedOnPlayer(player)).toBeFalsy()
    })

    it("should not recharge more than the laptop maximum if the rechargeQuantity exceeds the laptop battery after fill", () => {
        const player = new PlayerFactory().create({
            items: [new BatteryChargerFactory().create({ rechargeQuantity: 15 })],
            laptop: new LaptopFactory().create({ battery: 90 })
        })
        expect(player.accessItems()[0].canBeUsedOnPlayer(player)).toBeTruthy()
        player.accessItems()[0].consume(player)
        expect(player.accessLaptop().isFullBattery()).toBeTruthy()
    })
})