import { describe, it, expect } from "vitest";
import { Player } from "../../entities/Player";
import { PROGRAMMING_LANGUAGE } from "../../types/enums";
import { LaptopFactory } from "../factories/LaptopFactory";
import { PlayerFactory } from "../factories/PlayerFactory";

describe("Player basic functionality", () => {
  it("should be allowed to switch programming language", () => {
    const player = new PlayerFactory().create({
      programmingLanguage: PROGRAMMING_LANGUAGE.PHP,
    });

    player.switchProgrammingLanguage(PROGRAMMING_LANGUAGE.PYTHON);

    expect(player.programmingLanguage).toBe(PROGRAMMING_LANGUAGE.PYTHON);
  });

  it("The swithProgrammingLanguage method should be chained and return the player instance", () => {
    const player = new PlayerFactory().create({
      programmingLanguage: PROGRAMMING_LANGUAGE.PHP,
    });

    expect(
      player.switchProgrammingLanguage(PROGRAMMING_LANGUAGE.CPLUS)
    ).toBeInstanceOf(Player);
    expect(
      player.switchProgrammingLanguage(PROGRAMMING_LANGUAGE.CPLUS).id
    ).toBe(player.id);

    player
      .switchProgrammingLanguage(PROGRAMMING_LANGUAGE.PHP)
      .switchProgrammingLanguage(PROGRAMMING_LANGUAGE.JAVA);

    expect(player.programmingLanguage).toBe(PROGRAMMING_LANGUAGE.JAVA);
  });

  it("should be able to use the laptop if has battery", () => {
    const player = new PlayerFactory().create({
      laptop: new LaptopFactory().create({ battery: 56 }),
    });

    expect(player.canUseLaptop()).toBeTruthy();

    player.accessLaptop().setBattery(0);
    expect(player.canUseLaptop()).toBeFalsy();

    player.accessLaptop().setBattery(-10);
    expect(player.accessLaptop().getParts().battery).toBe(0);
    expect(player.canUseLaptop()).toBeFalsy();
  });
});
