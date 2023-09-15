import React from "react";
// import Register from "./Register";
import '../css/App.css';
// import GetStores from "./GetStores";
import NavBar from "./NavBar";
import "../css/App.css"
import { Provider} from "react-redux";
import store from "./redux/store";
import "../css/global.scss"


function App(){

  return(
    <div className="App">
      
      <Provider store={store}>

        <NavBar />
        
      </Provider>
    </div>
  )
}

export default App;