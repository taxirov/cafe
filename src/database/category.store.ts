import { writable, type Writable } from "svelte/store";
import type { Product } from "./product.store";

export type Category = {
    id: number,
    name: string,
    desc: string | null,
    image: string | null,
    products: Product[],
    create_date: string,
    update_date: string
}

export const categoryStore: Writable<Category[]> = writable([])