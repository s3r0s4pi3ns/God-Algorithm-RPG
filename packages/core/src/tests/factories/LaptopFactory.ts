import { faker } from '@faker-js/faker';
import { Factory } from './factory';
import { pick } from 'lodash';
import { Laptop, LaptopParams } from '../../entities/Laptop';
import { OPERATING_SYSTEM } from '../../types/enums';
import { NetworkFactory } from './NetworkFactory';
import { HardDriveFactory } from './HardDriveFactory';

export class LaptopFactory implements Factory<Laptop> {
    create(params: Partial<Laptop | LaptopParams> = {}): Laptop {
        return Laptop.new(pick({
            battery: faker.datatype.number(100),
            cores: faker.datatype.number(8),
            durability: faker.datatype.number(100),
            powerUsage: faker.datatype.number(10),
            graphicCard: faker.commerce.productName(),
            processor: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            operatingSystem: faker.helpers.arrayElement(
                Object.values(OPERATING_SYSTEM)
            ),
            network: new NetworkFactory().create(),
            hardDrive: new HardDriveFactory().create(),
            ...params
        }, ['battery',
            'cores',
            'durability',
            'powerUsage',
            'graphicCard',
            'processor',
            'description',
            'operatingSystem',
            'network',
            'hardDrive'] as (keyof LaptopParams)[]));
    }

}