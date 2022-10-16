import { Item, ItemResult, ItemShape } from "../entities/Item";
import { Laptop } from "../entities/Laptop";
import { Player } from "../entities/Player";

export interface BatteryChargerShape extends ItemShape {
    rechargeQuantity: number;
}
export class BatteryCharger extends Item {
    rechargeQuantity: number;

    constructor(data: BatteryChargerShape) {
        super(data)
        this.rechargeQuantity = data.rechargeQuantity;
    }

    public static new(data: BatteryChargerShape): BatteryCharger {
        return new this(data);
    }

    canBeUsedOnPlayer(player: Player): boolean {
        return player.accessLaptop().getParts().battery < Laptop.MAX_BATTERY_PERCENTAGE;
    }

    consume(player: Player): ItemResult {
        player
            .accessLaptop()
            .setBattery(player.accessLaptop().getParts().battery + this.rechargeQuantity)

        return {
            success: true,
            message: `Increased the battery life by ${this.rechargeQuantity}%`,
            playersInvolved: [player]
        }
    }
}