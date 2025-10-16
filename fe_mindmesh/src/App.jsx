import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Account from "./pages/Account"
import Profile from "./pages/Profile"
import AddArticle from "./pages/AddArticle"
import Login from "./pages/Login"
import TestPage from "./pages/TestPage"


function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/Profile" element={<Profile/>}></Route>
          <Route path="/Account" element={<Account/>}></Route>
          <Route path="/AddArticle" element={<AddArticle/>}></Route>
          <Route path="/Login" element={<Login/>}></Route>
          <Route path="/TestPage" element={<TestPage/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
