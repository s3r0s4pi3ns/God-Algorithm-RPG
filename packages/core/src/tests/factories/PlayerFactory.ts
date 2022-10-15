import { faker } from "@faker-js/faker";
import { pick } from "lodash";
import { Factory } from "./factory";
import { Player, PlayerParams } from "../../entities/Player";
import { JOB_POSITION, PROGRAMMING_LANGUAGE, RANK } from "../../types/enums";
import { LaptopFactory } from "./LaptopFactory";

export class PlayerFactory implements Factory<Player> {
  create(params: Partial<Player | PlayerParams> = {}): Player {
    return Player.new(
      pick(
        {
          id: faker.datatype.uuid(),
          programmingLanguage: faker.helpers.arrayElement(
            Object.values(PROGRAMMING_LANGUAGE)
          ),
          jobPosition: faker.helpers.arrayElement(Object.values(JOB_POSITION)),
          rank: faker.helpers.arrayElement(Object.values(RANK)),
          laptop: new LaptopFactory().create(),
          ...params,
        },
        ["id", "programmingLanguage", "rank", "jobPosition", "laptop"]
      )
    );
  }
}
