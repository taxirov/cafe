import { writable, type Writable } from "svelte/store";

export type Order = {
    id: number,
    title: string,
    desc: string,
    user_id: number,
    room_id: number,
    total_price: number,
    status: boolean,
    created_date: string,
    update_date: string
}

export const orderStore: Writable<Order[]> = writable([])