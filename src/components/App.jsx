import React from "react";
// import Register from "./Register";
import '../css/App.css';
import Login from "./Login";

function App(){

  // const [joke, setJoke] = React.useState("");

  

  // const getJoke = () => {
  //   Axios.get("https://official-joke-api.appspot.com/random_joke")
  //   .then((response) => {
  //     setJoke(response.data.setup + "..." + response.data.punchline);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })
  // }
  return(
    <div className="App">
      {/* <Register /> */}
      <Login />
    </div>
  )
}

export default App;