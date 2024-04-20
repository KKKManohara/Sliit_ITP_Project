// App.js
import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PortfolioAdmin from './components/PortfolioAdmin';
// import portfolioAdmin from './pages/PortfolioAdmin';
import CreatePost from './pages/CreatePost';
// import CreatePost from './components/CreatePost';
import EditPost from './pages/EditPost';
// import EditPost from './components/EditPost';
import PostDetails from './pages/PostDetails';
// import PostDetails from './components/PostDetails';
import AdminNavbar from './pages/AdminNavbar';
// import AdminNavbar from './components/AdminNavbar';
import AddImage from './pages/AddImage';
// import AddImage from './components/AddImage';

import UserUi from './pages/UserUI';






function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <AdminNavbar></AdminNavbar>
        <Routes>

          <Route path="/" element={<PortfolioAdmin />} exact/>
          <Route path="/add" element={<CreatePost />} />
          <Route path="/addimage" element={<AddImage />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostDetails />} />

          <Route path="/UserUi" element={<UserUi/>} />
          
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

