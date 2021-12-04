import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Main from "./pages/Main"
import Authors from "./pages/Authors"
import Category from "./pages/Category"
import AllTasks from "./pages/AllTasks"
import CompletedTasks from "./pages/CompletedTasks"
import PriorityOptions from "./pages/PriorityOptions"
import CategoryOptions from "./pages/CategoryOptions"
import UserManual from "./pages/UserManual"



function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/priorityoptions"> <PriorityOptions /></Route>
          <Route path="/categoryoptions"> <CategoryOptions /></Route>
          <Route path="/completedtasks"> <CompletedTasks /> </Route>
          <Route path="/category"> <Category /></Route>
          <Route path="/alltasks"> <AllTasks /></Route>
          <Route path="/usermanual"> < UserManual /></Route>
          <Route path="/authors"> <Authors /> </Route>
          <Route path="/"> <Main /> </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;