import { writable, type Writable } from "svelte/store";
import type { Product } from "./product.store";

export type ProductInOrder = {
    id: number,
    user_name: string,
    product: Product,
    count: number,
    created_date: string,
    update_date: string
}

export const productInOrderStore: Writable<ProductInOrder[]> = writable([])