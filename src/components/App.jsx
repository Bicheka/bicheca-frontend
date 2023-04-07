import React from "react";
// import Register from "./Register";
import '../css/App.css';
// import GetStores from "./GetStores";
import { Provider } from "react-redux";
import store from "./redux/store";
import NavBar from "./NavBar";

function App(){

  // const [islogged , setIsLogged] = React.useState(false);

  // const handleLogin = () => {
  //   setIsLogged(true);
  // }

  return(
    <div className="App">
      {/* <Register /> */}
      <Provider store={store}>
        
        <NavBar />
        
      </Provider>
    </div>
  )
}

export default App;