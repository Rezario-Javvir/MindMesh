import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Account from "./pages/Account"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Register from "./pages/Register"
import TestPage from "./pages/TestPage"
import AddArticle from "./pages/AddArticle"
import ArticlePage from "./pages/ArticlePage" 
import ProfileVisit from "./pages/ProfileVisit" 

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/Profile" element={<Profile/>}></Route>
          <Route path="/Account" element={<Account/>}></Route>
          <Route path="/Login" element={<Login/>}></Route>
          <Route path="/Register" element={<Register/>}></Route>
          <Route path="/TestPage" element={<TestPage/>}></Route>
          <Route path="/AddArticle" element={<AddArticle/>}></Route>
          <Route path="/article/:articleId" element={<ArticlePage/>}></Route> 
          <Route path="/profile/user/:userId" element={<ProfileVisit/>}></Route> 
            
        </Routes>
      </Router>
    </div>
  )
}

export default App