import { writable, type Writable } from "svelte/store";

export type User = {
  id: number,
  name: string,
  username: string,
  image: null | string,
  phone: string,
  email: string,
  salary: number,
  role: string,
  orders: number,
  create_date: Date,
  update_date: Date
}

export const userDataStore: Writable<User> = writable()
export const userStore: Writable<User[]> = writable([])