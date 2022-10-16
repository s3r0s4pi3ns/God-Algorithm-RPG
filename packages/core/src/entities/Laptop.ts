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
  static readonly MAX_BATTERY_PERCENTAGE: number = 100;
  static readonly LOW_BATTERY_ALARM_PERCENTAGE: number = 15;

  private parts: LaptopParams;

  constructor(params: LaptopParams) {
    this.parts = {
      ...params,
      battery: this.ensureBatteryDoesNotExceedPercentage(params.battery),
    };
  }

  public static new(params: LaptopParams): Laptop {
    return new this(params);
  }

  public getParts(): LaptopParams {
    return this.parts;
  }

  public setBattery(value: number): void {
    this.getParts().battery = this.ensureBatteryDoesNotExceedPercentage(value);
  }

  public hasBattery(): boolean {
    return this.getParts().battery > 0;
  }

  public isLowBattery(): boolean {
    return this.getParts().battery <= Laptop.LOW_BATTERY_ALARM_PERCENTAGE;
  }

  public isFullBattery(): boolean {
    return this.getParts().battery === Laptop.MAX_BATTERY_PERCENTAGE;
  }

  /**
   * This method ensure the battery never exceed the 100%
   * @param battery
   * @returns The battery value to set in the laptop
   */
  private ensureBatteryDoesNotExceedPercentage(battery: number): number {
    if (battery < 0) return 0;

    return battery > Laptop.MAX_BATTERY_PERCENTAGE
      ? Laptop.MAX_BATTERY_PERCENTAGE
      : battery;
  }
}
