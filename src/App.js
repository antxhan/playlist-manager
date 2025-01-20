import { getSpotifyToken } from "./utils/api";

function App() {
  getSpotifyToken().then((res) => res.json().then((data) => console.log(data)));
  return <div className="App">Hello world</div>;
}

export default App;
