<script>
	import { Router, Route } from "svelte-navigator";

	// admin desktop sidebar
	import Admin from "./mobile/Admin.svelte";
    import Demo from "./mobile/Demo.svelte";
	import Home from "./mobile/Home.svelte";
	
	// auth pages
    import Login from "./auth/Login.svelte";
	import Register from "./auth/Register.svelte";
	import Check from "./auth/Check.svelte";

	// admin mobile navbar
    import MobileHome from "./mobile/MobileHome.svelte";
    import MobileProfile from "./mobile/MobileProfile.svelte";
	import MobileOrders from "./mobile/MobileOrders.svelte";
    import MobileRooms from "./mobile/MobileRooms.svelte";
	import MobileAdd from "./mobile/MobileAdd.svelte";

	// waiter mobile navbar
	import WaiterOrders from "./mobile/WaiterOrders.svelte";
	import Products from "./mobile/Products.svelte"
	import WaiterAdd from "./mobile/WaiterAdd.svelte";
	import WaiterProfile from "./mobile/WaiterProfile.svelte"
    
</script>

<Router>
	<Route path='/' component={Home}/>
	<Route path="/admin" component={Admin}/>
	<Route path='/demo' component={Demo}/>
	
	<!-- auth -->
	<Route path='/login' component={Login}/>
	<Route path='/register' component={Register}/>
	<Route path='/check' component={Check}/>

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