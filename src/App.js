import { api } from "./utils/api";

function App() {
  api.auth().then((res) => console.log(res));
  // .then((data) => console.log(data));
  return <div className="App">Hello world</div>;
}

export default App;
