import { writable, type Writable } from "svelte/store";
import type { ProductInOrder } from "./productInOrder.store";

export type Order = {
    id: number,
    title: string,
    desc: string,
    user: { id: number, name: string },
    room: { id: number, name: string },
    products: ProductInOrder[],
    total_price: number,
    status: boolean,
    created_date: string,
    update_date: string
}

export const orderStore: Writable<Order[]> = writable([])