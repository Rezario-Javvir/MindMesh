import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Account from "./pages/Account";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TestPage from "./pages/TestPage";
import AddArticle from "./pages/AddArticle";
import ArticlePage from "./pages/ArticlePage";
import ProfileVisit from "./pages/ProfileVisit";
import EditArticle from "./pages/EditArticle";
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/TestPage" element={<TestPage />} />
          <Route path="/AddArticle" element={<AddArticle />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/article/:articleId" element={<ArticlePage />} />
          <Route path="/profile/user/:userId" element={<ProfileVisit />} />
          <Route path="/article/edit/:id" element={<EditArticle />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;