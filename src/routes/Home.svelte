<script lang="ts">
    import { navigate } from 'svelte-navigator'
    let role = JSON.parse(localStorage.getItem('payload')).role
    if(role == "admin"){ navigate('/admin') } else { navigate('/mwaiter') }
</script>