<script lang="ts">
    import AcceptEditStatusUser from "../modalsAdmin/AcceptEditStatusUser.svelte";
    import EditUserModal from "../modalsAdmin/EditUserModal.svelte";
    import type { User } from "../store";

    export let user: User
    export let index: number

    let showEditUser: boolean = false
    let showEditStatus: boolean = false

</script>
<AcceptEditStatusUser show={showEditStatus} close={() => { showEditStatus = false }} id={user.id} status={user.status}></AcceptEditStatusUser>
<EditUserModal u_id={user.id} u_name={user.name} u_email={user.email} u_phone={user.phone} u_salary={user.salary} u_username={user.username} show={showEditUser} close={() => { showEditUser = false }}/>
<tr>
    <td class="text-center">{index + 1}</td>
    {#if user.status == 1}
        <td class="text-center text-zinc-100 font-bold bg-green-500">{user.name}</td>
    {:else}
        <td class="text-center text-zinc-100 font-bold bg-red-500">{user.name}</td>
    {/if}
    <td class="text-center">{user.role}</td>
    {#if screen.width > 500}
        <td class="text-center">{user.orders}</td>
        <td class="text-center">{user.phone}</td>
    {/if}
    <td class="text-center">
        <button on:click={() => { showEditUser = true }} class="px-3 py-1 rounded-md font-semibold bg-blue-500 text-zinc-100">{#if screen.width > 500} Tahrirlash {/if} <i class="bi bi-pencil" /></button>
        {#if user.status == 1}
            <button on:click={() => { showEditStatus = true}} class="px-3 py-1 rounded-md font-semibold bg-red-500 text-zinc-100">{#if screen.width > 500} Ishdan olish {/if} <i class="bi bi-person-fill-x" /></button>
        {:else}
            <button on:click={() => { showEditStatus = true}} class="px-3 py-1 rounded-md font-semibold bg-green-500 text-zinc-100">{#if screen.width > 500} Ishga tiklash {/if} <i class="bi bi-person-check" /></button>
        {/if}
    </td>
</tr>