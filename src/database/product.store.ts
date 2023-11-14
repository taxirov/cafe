import { writable, type Writable } from "svelte/store";

export type Product = {
    id: number,
    name: string,
    price: number,
    category_id: number,
    desc: string,
    image: string,
    created_date: string,
    update_date: string
}

export const productStore: Writable<Product[]> = writable([])