<script>
	import { Router, Link, Route, navigate } from "svelte-navigator";

	import Home from "./routes/Home.svelte";
	import About from "./routes/About.svelte";
	import Blog from "./routes/Blog.svelte";
    import Login from "./routes/Login.svelte";
	import Register from "./routes/Register.svelte"
    import Demo from "./routes/Demo.svelte";

    import MobileHome from "./routes/MobileHome.svelte";
    import MobileProfile from "./routes/MobileProfile.svelte";
	import MobileOrders from "./routes/MobileOrders.svelte";
    import MobileRooms from "./routes/MobileRooms.svelte";
	import MobileAdd from "./routes/MobileAdd.svelte";

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
	<Route path='/demo' component={Demo}/>
	
	<Route path='/mobile' component={MobileHome}/>
	<Route path='/mprofile' component={MobileProfile}/>
	<Route path='/morders' component={MobileOrders}/>
	<Route path='/mrooms' component={MobileRooms}/>
	<Route path="/madd" component={MobileAdd}/>
</Router>