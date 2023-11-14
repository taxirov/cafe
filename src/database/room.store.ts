import { writable, type Writable } from "svelte/store";

export type Room = {
    id: number,
    name: string,
    desc: string,
    image: string,
    booked: boolean,
    capacity: number,
    created_date: string,
    update_date: string
}

export const roomStore: Writable<Room[]> = writable([])