import { faker } from "@faker-js/faker";
import { HardDrive } from "../../entities/HardDrive";
import { Factory } from "./factory";
import { pick } from "lodash";

export class HardDriveFactory implements Factory<HardDrive> {
  create(params: Partial<HardDrive> = {}): HardDrive {
    return pick(
      {
        model: faker.commerce.productName(),
        memory: faker.datatype.number({ min: 256, max: 1024 }),
        type: faker.helpers.arrayElement(["HDD", "SSD"]),
        ...params,
      },
      ["model", "memory", "type"] as (keyof HardDrive)[]
    );
  }
}
