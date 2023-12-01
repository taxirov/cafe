import { writable, type Writable } from "svelte/store";

export type ProductInOrder = {
    id: number,
    user: { id: number, name: string }
    order_id: number,
    product: { id: number, name: string, price: number, image: string | null },
    count: number,
    total_price: number,
    status: number,
    create_date: string,
    update_date: string
}

export const productInOrderStore: Writable<ProductInOrder[]> = writable([])