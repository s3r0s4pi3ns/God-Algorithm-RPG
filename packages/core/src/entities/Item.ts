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

    abstract canBeUsedOnPlayer(player: Player): boolean

    abstract consume(player: Player): ItemResult

    public setQuantity(quantity: number): void {
        this.ensureQuantityIsValidInteger(quantity)

        if (quantity < 0) this.quantity = 0;

        this.quantity = quantity;
    }

    public incrementQuantity(value: number): void {
        this.setQuantity(this.quantity + value)
    }

    public reduceQuantity(value: number): void {
        this.setQuantity(this.quantity - value)
    }

    /**
     * 
     * @param quantity 
     * @throws Error - When the quantity is not a valid argument
        */
    private ensureQuantityIsValidInteger(quantity: number): void {
        if (typeof quantity !== 'number' || Number.isNaN(quantity)) {
            throw new Error(`The quantity parameter for item ${this.name} is not a valid integer`)
        }
    }
}