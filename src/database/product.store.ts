import { writable, type Writable } from "svelte/store";

export type Product = {
    id: number,
    name: string,
    price: number,
    category_id: number,
    desc: string | null,
    image: string | null,
    create_date: string,
    update_date: string
}

export const productStore: Writable<Product[]> = writable([])