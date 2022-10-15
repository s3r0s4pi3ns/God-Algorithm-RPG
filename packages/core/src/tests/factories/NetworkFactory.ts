import { faker } from "@faker-js/faker";
import { Factory } from "./factory";
import { Network } from "../../entities/Network";
import { pick } from "lodash";

export class NetworkFactory implements Factory<Network> {
  create(params: Partial<Network> = {}): Network {
    return pick(
      {
        device: faker.internet.userAgent(),
        connected: Math.random() >= 0.5,
        ipv4: faker.internet.ipv4(),
        ipv6: faker.internet.ipv6(),
        ssh: {
          open: Math.random() >= 0.5,
          port: faker.datatype.number(65535),
          password: faker.internet.password(),
        },
        speed: {
          value: faker.datatype.number(1000),
          unit: "MB/S",
          type: faker.helpers.arrayElement([
            "2G",
            "3G",
            "4G",
            "5G",
            "WI-FI",
            "GSPR",
          ]),
        },
        ...params,
      },
      [
        "device",
        "connected",
        "ipv4",
        "ipv6",
        "ssh",
        "speed",
      ] as (keyof Network)[]
    );
  }
}
