import { faker } from "@faker-js/faker";
import { pick } from "lodash";
import { BatteryCharger, BatteryChargerShape } from "../../../shop/BatteryCharger";
import { Factory } from "../factory";

export class BatteryChargerFactory implements Factory<BatteryCharger> {
    create(params: Partial<BatteryCharger | BatteryChargerShape> = {}): BatteryCharger {
        return BatteryCharger.new(pick({
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            quantity: faker.datatype.number({ min: 1, max: 99 }),
            rechargeQuantity: faker.helpers.arrayElement([15, 30, 45, 60, 75, 100]),
            ...params
        }, ['id', 'name', 'description', 'quantity', 'rechargeQuantity']))
    }
}
