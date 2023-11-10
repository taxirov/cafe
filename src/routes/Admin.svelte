<script>
    import { UserEndpoint } from '../api/user.api';
    import { navigate } from 'svelte-navigator';

    if(screen.width < 450){ navigate('/admin') }

    const userEndpoint = new UserEndpoint()
    const token = localStorage.getItem('token')
    // check token
    async function getVerify() {
        try {
            const res = await userEndpoint.verify(token)
            if(res.status === 401 && res.status === 403) {
                navigate('/')
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

