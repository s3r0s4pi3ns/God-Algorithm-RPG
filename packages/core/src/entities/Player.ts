import { RANK, PROGRAMMING_LANGUAGE, JOB_POSITION } from "../types/enums";
import { Laptop } from "./Laptop";

export interface PlayerParams {
    id: string;
    programmingLanguage: PROGRAMMING_LANGUAGE;
    rank: RANK;
    jobPosition: JOB_POSITION;
    laptop: Laptop;
}

export class Player {
    id: string;
    programmingLanguage: PROGRAMMING_LANGUAGE;
    rank: RANK;
    jobPosition: JOB_POSITION
    private readonly laptop: Laptop;

    constructor(params: PlayerParams) {
        this.id = params.id
        this.programmingLanguage = params.programmingLanguage
        this.rank = params.rank
        this.jobPosition = params.jobPosition
        this.laptop = params.laptop
    }

    public static new(params: PlayerParams): Player {
        return new this(params);
    }

    public accessLaptop(): Laptop {
        return this.laptop
    }

    public canUseLaptop(): boolean {
        return this.accessLaptop().hasBattery()
    }
}