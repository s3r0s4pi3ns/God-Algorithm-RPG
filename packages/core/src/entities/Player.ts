import { RANK, PROGRAMMING_LANGUAGE, JOB_POSITION } from "../types/enums";
import { Item, ItemResult } from "./Item";
import { Laptop } from "./Laptop";

export interface PlayerParams {
  id: string;
  programmingLanguage: PROGRAMMING_LANGUAGE;
  rank: RANK;
  jobPosition: JOB_POSITION;
  items: Item[];
  laptop: Laptop;
}

export class Player {
  id: string;
  programmingLanguage: PROGRAMMING_LANGUAGE;
  rank: RANK;
  jobPosition: JOB_POSITION;
  private readonly items: Item[] = []
  private readonly laptop: Laptop;

  constructor(params: PlayerParams) {
    this.id = params.id;
    this.programmingLanguage = params.programmingLanguage;
    this.rank = params.rank;
    this.jobPosition = params.jobPosition;
    this.items = params.items || [];
    this.laptop = params.laptop;
  }

  public static new(params: PlayerParams): Player {
    return new this(params);
  }

  public accessLaptop(): Laptop {
    return this.laptop;
  }

  public accessItems(): Item[] {
    return this.items;
  }

  public findItemBy(value: string | number, key: keyof Item = 'id',): Item | undefined {
    return this.accessItems().find((item: Item) => item[key] === value)
  }

  /**
   * 
   * @param id 
   * @param target 
   * @returns
   * @throws Error - The item cannot be found on player inventory
   */
  public useItem(id: string, target: Player = this): ItemResult {
    const item = this.findItemBy(id)

    if (typeof item === 'undefined') {
      throw new Error(`The item ${id} cannot be found on player inventory`);
    }

    const result = item.consume(target)

    if (result.success) item.reduceQuantity(1)

    return result
  }

  public canUseLaptop(): boolean {
    return this.accessLaptop().hasBattery();
  }

  public switchProgrammingLanguage(language: PROGRAMMING_LANGUAGE): Player {
    this.programmingLanguage = language;

    return this;
  }
}
