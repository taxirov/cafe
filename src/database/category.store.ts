import { writable, type Writable } from "svelte/store";

export type Category = {
    id: number,
    name: string,
    desc: string,
    image: string,
    created_date: string,
    update_date: string
}

export const categoryStore: Writable<Category[]> = writable([])