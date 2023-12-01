import { writable, type Writable } from "svelte/store";

export type Room = {
    id: number,
    name: string,
    desc: string | null,
    image: string | null,
    booked: number,
    capacity: number,
    create_date: string,
    update_date: string
}

export const roomStore: Writable<Room[]> = writable([])