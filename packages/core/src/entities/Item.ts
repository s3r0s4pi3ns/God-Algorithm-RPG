import { Player } from "./Player";

export interface ItemShape {
    id: string;
    name: string;
    description: string;
    quantity: number;
}

export interface ItemResult {
    success: boolean;
    message: string;
    playersInvolved: Player[]
}

export abstract class Item {
    id: string;
    name: string;
    description: string;
    quantity: number;

    constructor({ id, name, description, quantity }: ItemShape) {
        this.id = id
        this.name = name;
        this.description = description;
        this.quantity = quantity;
    }

    abstract canBeUsed(player: Player, targets: Player[]): boolean
    abstract consume(player: Player, targets: Player[]): ItemResult

    public setQuantity(quantity: number): void {
        if (typeof quantity !== 'number' || Number.isNaN(quantity)) {
            throw new Error(`The quantity parameter for item ${this.name} is not a valid integer`)
        }

        if (quantity < 0) this.quantity = 0;

        this.quantity = quantity;
    }
}