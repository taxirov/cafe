<script>
    import { UserEndpoint } from '../api/user.api';
    import { navigate } from 'svelte-navigator';

    const userEndpoint = new UserEndpoint()
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user'))

    // check token
    async function getVerify() {
        try {
            const res = await userEndpoint.getTokenVerify(token)
            if(res.status == 200) {
                if(user.role === 'admin') {
                    if(screen.width < 500) {
                        navigate('/m')
                    } else {
                        console.log('verify success')
                    }
                } else {
                    navigate('/w')
                }
            } else {
                navigate('/login')
            }
        } catch(error) {
            console.log(error)
        }
    }   getVerify()

</script>

<svelte:head>
    <title>Admin sahifasi</title>
</svelte:head>

