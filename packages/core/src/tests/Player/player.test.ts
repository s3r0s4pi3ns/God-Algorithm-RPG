import { describe, it, expect, vi } from "vitest";
import { Player } from "../../entities/Player";
import { PROGRAMMING_LANGUAGE } from "../../types/enums";
import { BatteryChargerFactory } from "../factories/Items/BatteryChargerFactory";
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

describe("Player items inventory", () => {
  it("should throw an error if item selected is not found on player inventory", () => {
    const player = new PlayerFactory().create({
      items: []
    });

    expect(() => player.useItem("fake id")).toThrowError(`The item fake id cannot be found on player inventory`)
  })

  it("should find an item by his multiple properties", () => {
    const batteryChargerItem = new BatteryChargerFactory().create();
    const player = new PlayerFactory().create({ items: [batteryChargerItem] });

    expect(player.findItemBy(batteryChargerItem.id)).toBe(batteryChargerItem)
    expect(player.findItemBy(batteryChargerItem.name, 'name')).toBe(batteryChargerItem)
    expect(player.findItemBy(batteryChargerItem.description, 'description')).toBe(batteryChargerItem)
    expect(player.findItemBy(batteryChargerItem.quantity, 'quantity')).toBe(batteryChargerItem)
  })

  it("should reduce quantity when item is used", () => {
    const batteryChargerItem = new BatteryChargerFactory().create({ quantity: 1 });
    const itemSpy = vi.spyOn(batteryChargerItem, 'reduceQuantity')
    const player = new PlayerFactory().create({ items: [batteryChargerItem] });

    expect(batteryChargerItem.quantity).toBe(1)
    player.useItem(batteryChargerItem.id)

    expect(itemSpy).toHaveBeenCalledOnce()
    expect(batteryChargerItem.quantity).toBe(0)

  })
})
