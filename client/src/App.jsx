import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import NoPage from "./pages/NoPage";
import Profile from "./pages/Profile";
import RequireAuth from "./components/RequireAuth";
import { ToastContainer, Zoom } from "react-toastify";

function App() {
  return (
    <Router>
      <ToastContainer autoClose={3000} transition={Zoom} />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="about" element={<About />} />

          {/* Protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="home" element={<Home />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* catch all */}
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
