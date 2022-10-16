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
        return !Boolean(player.accessLaptop().isFullBattery());
    }

    consume(player: Player): ItemResult {
        if (this.canBeUsedOnPlayer(player)) {
            player
                .accessLaptop()
                .setBattery(player.accessLaptop().getParts().battery + this.rechargeQuantity)

            return {
                success: true,
                message: `Increased the battery life by ${this.rechargeQuantity}%`,
                playersInvolved: [player]
            }
        }

        return {
            success: false,
            message: `The player ${player.id} is full battery`,
            playersInvolved: [player]
        }
    }
}