<script>
	import { Router, Route } from "svelte-navigator";

	// admin desktop sidebar
	import Admin from "./routes/Admin.svelte";
    import Login from "./routes/Login.svelte";
	import Register from "./routes/Register.svelte";
    import Demo from "./routes/Demo.svelte";
	import Home from "./routes/Home.svelte";

	// admin mobile navbar
    import MobileHome from "./routes/MobileHome.svelte";
    import MobileProfile from "./routes/MobileProfile.svelte";
	import MobileOrders from "./routes/MobileOrders.svelte";
    import MobileRooms from "./routes/MobileRooms.svelte";
	import MobileAdd from "./routes/MobileAdd.svelte";

	// waiter mobile navbar
	import WaiterOrders from "./routes/WaiterOrders.svelte";
	import Products from "./routes/Products.svelte"
	import WaiterAdd from "./routes/WaiterAdd.svelte";
	import WaiterProfile from "./routes/WaiterProfile.svelte"
    
</script>

<Router>
	<Route path='/' component={Home}/>
	<Route path="/admin" component={Admin}/>
	<Route path='/login' component={Login}/>
	<Route path='/register' component={Register}/>
	<Route path='/demo' component={Demo}/>
	
	<Route path='/m' component={MobileHome}/>
	<Route path='/mprofile' component={MobileProfile}/>
	<Route path='/morders' component={MobileOrders}/>
	<Route path='/mrooms' component={MobileRooms}/>
	<Route path="/madd" component={MobileAdd}/>

	<Route path='/w' component={WaiterOrders}/>
	<Route path='/products' component={Products}/>
	<Route path='/wadd' component={WaiterAdd}/>
	<Route path='/wprofile' component={WaiterProfile}/>
</Router>