import { faker } from "@faker-js/faker";
import { pick } from "lodash";
import { MemoryLeak } from "../../../../battle/states/MemoryLeak";
import { Factory } from "../../factory";
import { PlayerFactory } from "../../PlayerFactory";

export class MemoryLeakFactory implements Factory<MemoryLeak> {
    create(params: Partial<MemoryLeak> = {}): MemoryLeak {
        return MemoryLeak.new(pick({
            id: 'memory-leak',
            name: "Memory leak",
            description: faker.lorem.sentence(10),
            affectedPlayers: [new PlayerFactory().create()],
            turns: { remaining: MemoryLeak.MINIMUM_TURNS, used: 0, step: 1 },
            ...params
        }, ['id', 'name', 'description', 'affectedPlayers', 'turns', 'isActive']))
    }
}
