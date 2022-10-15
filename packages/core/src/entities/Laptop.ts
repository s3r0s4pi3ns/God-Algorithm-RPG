import { OPERATING_SYSTEM } from "../types/enums";
import { HardDrive } from "./HardDrive";
import { Network } from "./Network";

export interface LaptopParams {
    battery: number;
    durability: number;
    powerUsage: number;
    operatingSystem: OPERATING_SYSTEM;
    cores: number;
    graphicCard: string;
    processor: string;
    hardDrive: HardDrive;
    network: Network;
    description?: string;
}

export class Laptop {
    protected build: LaptopParams;

    constructor(params: LaptopParams) {
        this.build = this.buildLaptop(params);
    }

    public static new(params: LaptopParams): Laptop {
        return new this(params);
    }

    private buildLaptop(params: LaptopParams): LaptopParams {
        return (this.build = {
            ...params,
            ...{
                battery: this.ensureBatteryDoesNotExceedPercentage(params.battery),
            },
        });
    }

    private ensureBatteryDoesNotExceedPercentage(battery: number): number {
        const MAX_BATTERY_PERCENTAGE = 100

        return battery > MAX_BATTERY_PERCENTAGE ? MAX_BATTERY_PERCENTAGE : battery;
    }
}
