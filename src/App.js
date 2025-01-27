import "./App.css";
import { useAuth } from "./hooks/useAuth";
import Layout from "./Layout";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";

function App() {
	const isSignedIn = useAuth();

	return <Layout>{isSignedIn ? <Home /> : <SignIn />}</Layout>;
}

export default App;
