import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Main from "./pages/Main"
import Authors from "./pages/Authors"
import Sample from "./pages/Sample"



function App() {
  return (
    <div>
      <Router>
        <Switch>
        <Route path="/sample"> <Sample /></Route>
          <Route path="/authors"> <Authors /> </Route>
          <Route path="/"> <Main /> </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;