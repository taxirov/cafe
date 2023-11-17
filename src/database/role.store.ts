import { writable, type Writable } from "svelte/store";

export type Role = {
    id: number,
    name: string,
    created_date: string,
    update_date: string
}

export const roleStore: Writable<Role[]> = writable([])