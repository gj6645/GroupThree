import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Main from "./components/Main"
import Authors from "./components/Authors"


function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/authors"> <Authors /> </Route>
          <Route path="/"> <Main /> </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;