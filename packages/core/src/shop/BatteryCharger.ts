import { Item, ItemResult, ItemShape } from "../entities/Item";
import { Laptop } from "../entities/Laptop";
import { Player } from "../entities/Player";

export class BatteryCharger extends Item {
    rechargeQuantity: number;

    constructor(data: ItemShape, rechargeQuantity: number) {
        super(data)
        this.rechargeQuantity = rechargeQuantity;
    }

    canBeUsed(player: Player, targets: Player[]): boolean {
        return player.accessLaptop().getParts().battery < Laptop.MAX_BATTERY_PERCENTAGE;
    }

    consume(player: Player, targets: Player[]): ItemResult {
        player.accessLaptop().setBattery(this.rechargeQuantity)

        if (targets.length) {
            targets.forEach(target => target.accessLaptop().setBattery(this.rechargeQuantity))
        }

        return {
            success: true,
            message: `Increased the battery life by ${this.rechargeQuantity}%`,
            playersInvolved: [player]
        }
    }
}