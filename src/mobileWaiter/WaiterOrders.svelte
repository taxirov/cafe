<script lang="ts">
    import { navigate } from "svelte-navigator";
    import { UserEndpoint } from "../api";
    import WaiterNavbar from "../components/WaiterNavbar.svelte";

    const token = localStorage.getItem('token')
    const userEndpoint = new UserEndpoint()

    // check token 
    async function getVerify() {
        try {
            const res = await userEndpoint.getTokenVerify(token)
            if(res.status === 200) {
                console.log('Verify succes')
            } else {
                navigate('/login')
            }
        } catch(error) {
            console.log(error)
        }
    }
    getVerify()
</script>

<svelte:head>
    <title>Ofisiant</title>
</svelte:head>

<section class="grid grid-rows-2">
    <section>
        
    </section>
    <WaiterNavbar></WaiterNavbar>
</section>