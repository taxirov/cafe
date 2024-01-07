<script lang="ts">
    import { bookStore, type Book } from "../store";
    import { BookEndpoint } from '../api';

    const bookEndpoint = new BookEndpoint()
    const token = localStorage.getItem('token')

    export let show: boolean
    export let close: () => void
    export let book_id: number

    async function delete_book() {
        let id = book_id
        try {
            const res = await bookEndpoint.delete(id, token)
            const book: Book = res.data.book 
            bookStore.update(b => { return b.filter(v => v.id != book.id)})
            close()
        } catch (error) { console.log(error) }
    }

</script>

<div class={"h-screen w-screen bg-black/70 fixed top-0 left-0 bottom-0 right-0 z-[999] justify-center items-center " + (show ? "flex" : "hidden")}>
    <div class="bg-white p-8 flex flex-col gap-3 w-4/5 md:w-fit h-fit rounded-md shadow-md overflow-y-auto">
        <p class="text-xl text-center font-bold">Bronni o'chirish</p>
        <div class="flex flex-col gap-3">
            <p class="text-md font-medium text-center">Bronni o'chirishni tasdiqlaysizmi?</p>
        </div>
        <div class="flex justify-between">
            <button on:click={() => close()} class="py-2 px-4 rounded-md text-stone-100 font-semibold bg-red-500">Yopish</button>
            <button on:click={delete_book} class="py-2 px-4 rounded-md text-stone-100 font-semibold bg-green-500">Tasdiqlash</button>
        </div>
    </div>
</div>