<script>
    import { Tabs } from '@svelteuidev/core';
    import { Camera, EnvelopeClosed, Gear } from 'radix-icons-svelte';
    import { UserEndpoint } from '../api/user.api';
    import { navigate } from 'svelte-navigator';

    const userEndpoint = new UserEndpoint()
    const token = localStorage.getItem('token')
    if(!token) {
        navigate('/login')
    }
    async function getVerify() {
        try {
            const res = await userEndpoint.verify(token)
            if(res.status === 401 && res.status === 403) {
                navigate('/login')
            } else {
                console.log('Verify succes')
            }
        } catch(error) {
            console.log(error)
        }
    }
    getVerify()

</script>

<svelte:head>
    <title>Bosh sahifa</title>
</svelte:head>

<h1>Bosh sahifa</h1>