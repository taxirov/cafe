<script>
	import { Router, Link, Route, navigate } from "svelte-navigator";
	import Home from "./routes/Home.svelte";
	import About from "./routes/About.svelte";
	import Blog from "./routes/Blog.svelte";
    import BlogPost from "./routes/BlogPost.svelte";
    import Login from "./routes/Login.svelte";
	import Register from "./routes/Register.svelte"

    let isLogin = localStorage.getItem('show')
	// console.log(!isLogin)
    if(isLogin === false){
        navigate('/login')
    }
    
</script>

<Router>
	<Route path="/" component={Home}/>
	<Route path='/login' component={Login}/>
	<Route path='/register' component={Register}/>
</Router>