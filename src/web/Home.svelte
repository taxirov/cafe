<script lang="ts">
    import { navigate } from "svelte-navigator";
    import { UserEndpoint } from "../api";

    const userEndpoint = new UserEndpoint();
    const token = localStorage.getItem("token");

    // check token
    async function checkToken() {
        if (token) {
            try {
                const res = await userEndpoint.getTokenVerify(token);
                const user = res.data.user;
                localStorage.setItem("user", JSON.stringify(user));
                if (user.role === "admin") {
                    navigate("/m");
                } else {
                    navigate("/w");
                }
            } catch (error) {
                navigate("/login");
            }
        } else {
            navigate("/login");
        }
    }
    checkToken();
</script>
