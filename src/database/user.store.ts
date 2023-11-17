import { writable, type Writable } from "svelte/store";

export type User = {
    id: number,
    name: string,
    username: string,
    image: null | string,
    phone: string,
    salary: number,
    role: string,
    joined_date: string,
    update_date: string
  }

export const adminKey: Writable<string> = writable()
export const userDataStore: Writable<User> = writable()
export const userStore: Writable<User[]> = writable([])