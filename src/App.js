// import { api } from "./utils/api";

import { auth } from "./utils/auth";

function App() {
  // KEEP COMMENTED OUT FOR NOW
  // api.auth().then((res) => console.log(res));
  return (
    <div className="App">
      <div>Hello world</div>
      <button onClick={() => auth.logIn()}>Log in</button>
    </div>
  );
}

export default App;
