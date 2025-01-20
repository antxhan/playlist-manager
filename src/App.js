import { getSpotifyToken } from "./utils/api";

function App() {
  getSpotifyToken().then((res) => console.log(res));
  return <div className="App">Hello world</div>;
}

export default App;
