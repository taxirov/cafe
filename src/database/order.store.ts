import { writable, type Writable } from "svelte/store";
import type { Product } from "./product.store";

export type Order = {
    id: number,
    title: string,
    desc: string,
    user_name: string,
    room_name: string,
    products: Product[]
    total_price: number,
    status: boolean,
    created_date: string,
    update_date: string
}

export const orderStore: Writable<Order[]> = writable([])