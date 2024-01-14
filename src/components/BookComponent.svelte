<script lang="ts">
    import AcceptDeleteBook from "../modalsAll/AcceptDeleteBook.svelte";
    import EditBookModal from "../modalsAll/EditBookModal.svelte";
    import type { Book } from "../store";

    const token = localStorage.getItem('token')

    export let book: Book

    let showEdit: boolean = false
    let showDelete: boolean = false

</script>
<EditBookModal book={book} show={showEdit} close={() => { showEdit = false}}></EditBookModal>
<AcceptDeleteBook book_id={book.id} show={showDelete} close={() => { showDelete = false }}></AcceptDeleteBook>
<div class="flex flex-col gap-2 bg-white rounded-xl shadow-md p-5">
    <div class="flex justify-between pb-1 border-b-2">
        <p class="font-medium text-xl">Sana:</p>
        <p class="font-semibold text-xl">{book.booked_date.toUpperCase()}</p>
    </div>
    <div class="flex justify-between pb-1 border-b-2">
        <p class="font-medium text-xl">Mijoz:</p>
        <p class="font-semibold text-xl">{book.booker_name}</p>
    </div>
    <div class="flex justify-between pb-1 border-b-2">
        <p class="font-medium text-xl">Narxi:</p>
        <p class="font-semibold text-xl">{book.price} so'm</p>
    </div>
    <div class="flex justify-between pb-1 border-b-2">
        <p class="font-medium text-xl">Soni:</p>
        <p class="font-semibold text-xl">{book.person} kishilik</p>
    </div>
    <div class="flex items-center justify-between">
        <p class="font-medium text-xl">Xona:</p>
        <p class="font-bold py-1 px-4 rounded-xl bg-violet-500 text-zinc-100 text-md">{book.room.name}</p>
    </div>
    <div class="grid grid-cols-2 gap-3 pt-3">
        {#if book.status == 1}
            <button on:click={() => { showEdit = true }} class="px-4 py-2 bg-indigo-500 text-stone-100 font-bold rounded-xl"><i class="bi bi-pencil"></i> Tahrirlash</button>
        {/if}
        {#if book.status == 0}
            <button disabled class="px-4 py-2 bg-red-300 text-stone-100 font-bold rounded-xl"> Tugatilgan</button>
        {/if}
        <button on:click={() => { showDelete = true }} class="px-4 py-2 bg-red-500 text-stone-100 font-bold rounded-xl"><i class="bi bi-trash"></i> O'chirish</button>
    </div>
</div>