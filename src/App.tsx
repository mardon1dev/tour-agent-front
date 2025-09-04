import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import Places from "./pages/places/Places";
import Stays from "./pages/stays/Stays";
import Navbar from "./components/navbar/Navbar";
import Header from "./components/header/Header";
import Login from "./pages/login/Login";
import AddEditUser from "./pages/users/AddEditUser";
import SingleUser from "./pages/users/SingleUser";
import AddEditPlace from "./pages/places/AddEditPlace";
import SinglePlace from "./pages/places/SinglePlace";

const App = () => {
  const location = useLocation();

  if (location.pathname === "/login") {
    // ✅ Login layout
    return (
      <div className="flex h-screen justify-center items-center bg-neutral-200">
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    );
  }

  // ✅ Main app layout
  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="w-full relative h-full flex flex-col">
        <Header />
        <div className="p-2 bg-neutral-300 h-full overflow-hidden rounded-none">
          <div className="p-2 bg-white w-full rounded-md h-full overflow-y-scroll shadow-2xl">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<SingleUser />} />
              <Route path="/users/add-user" element={<AddEditUser />} />
              <Route path="/users/edit-user/:id" element={<AddEditUser />} />
              <Route path="/places" element={<Places />} />
              <Route path="/places/:id" element={<SinglePlace />} />
              <Route path="/places/add-place" element={<AddEditPlace />} />
              <Route path="/places/edit-place/:id" element={<AddEditPlace />} />
              <Route path="/stays" element={<Stays />} />
              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
