<script lang="ts">
    import type { Role } from "../store";
    import EditRoleModal from "../modalsAdmin/EditRoleModal.svelte";
    import AcceptDeleteRole from "../modalsAdmin/AcceptDeleteRole.svelte";

    export let role: Role
    export let index: number

    let showEditRole: boolean = false
    let showDeleteRole: boolean = false

</script>
<AcceptDeleteRole role_id={role.id} show={showDeleteRole} close={() => { showDeleteRole = false }}></AcceptDeleteRole>
<EditRoleModal role={role} show={showEditRole} close={() => { showEditRole = false }}></EditRoleModal>
<tr>
    <td class="text-center">{index + 1}</td>
    <td class="text-center">{role.name}</td>
    <td class="text-center">{role.users}</td>
    <td class="text-center">
        <button on:click={() => { showEditRole = true }} class="px-3 py-1 rounded-md bg-blue-500 font-semibold text-zinc-100">{#if screen.width > 500} Tahrirlash{/if} <i class="bi bi-pencil" /></button>
        <button on:click={() => { showDeleteRole = true }} class="px-3 py-1 rounded-md bg-red-500 font-semibold text-zinc-100">{#if screen.width > 500} O'chirish{/if} <i class="bi bi-trash" /></button>
    </td>
</tr>