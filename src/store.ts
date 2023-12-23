import { writable, type Writable } from "svelte/store";
// types
export type Role = { id: number, name: string, users: number, create_date: string, update_date: string }
export type User = { id: number, name: string, username: string, image: null | string, phone: string, email: string, salary: number, role: string, status: number, orders: number, create_date: string, update_date: string }
export type Room = { id: number, name: string, desc: string | null, image: string | null, booked: boolean, capacity: number, create_date: string, update_date: string }
export type Category = { id: number, name: string, desc: string | null, image: string | null, products: Product[], create_date: string, update_date: string }
export type Product = { id: number, name: string, price: number, category_id: number, desc: string | null, image: string | null, create_date: string, update_date: string }
export type ProductInOrder = {
    id: number,
    user: {
        id: number,
        name: string,
        role: {
            id: number,
            name: string,
            create_date: string,
            updated_date: string
        }
    },
    order_id: number,
    order: {
        id: number,
        room: null | { id: number, name: string }
    },
    product: {
        id: number,
        name: string,
        price: number,
        image: null,
        category_id: number
    },
    count: number,
    total_price: number,
    status: number,
    create_date: string,
    update_date: string
}
export type Order = { id: number, title: string, desc: string | null, user: { id: number, name: string }, room: { id: number, name: string } | null, products: ProductInOrder[], total_price: number, status: number, create_date: string, update_date: string }
// role store
export const roleStore: Writable<Role[]> = writable([])
// user store
export const userDataStore: Writable<User> = writable()
export const userStore: Writable<User[]> = writable([])
// room store
export const roomStore: Writable<Room[]> = writable([])
// category store
export const categoryStore: Writable<Category[]> = writable([])
// product store
export const productStore: Writable<Product[]> = writable([])
// order store
export const orderStore: Writable<Order[]> = writable([])
// product in order store
export const productInOrderStore: Writable<ProductInOrder[]> = writable([])
// order store
export const pageStore: Writable<number[]> = writable([])
export const firstFourPageStore: Writable<number[]> = writable([])
export const lastFourPageStore: Writable<number[]> = writable([])
