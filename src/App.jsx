import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Account from "./pages/Account"
import Profile from "./pages/Profile"
import AddArticle from "./pages/AddArticle"

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/Profile" element={<Profile/>}></Route>
          <Route path="/Account" element={<Account/>}></Route>
          <Route path="/AddArticle" element={<AddArticle/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
