// import { api } from "./utils/api";
import Player from "./components/Nav/Player";

function App() {
	// KEEP COMMENTED OUT FOR NOW
	// api.auth().then((res) => console.log(res));
	return (
		<div className="App">
			<div>Hello world</div>
			<div className="bottom--temp">
				<Player />
			</div>
		</div>
	);
}

export default App;
