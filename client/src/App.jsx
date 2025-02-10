import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
 
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProductListing from "./pages/ProductListing";
 
import './App.css'
// import Navbar from "./components/Navbar";
import Navbar from "./includes/Navbar";
import ProductDetails from "./pages/ProductDetails";
import Dashboard from "./pages/Dashboard"; 
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logout, setUser } from "./redux/state";


 
function App() {

  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      if (token && !user) {
        try {
          const response = await fetch("http://localhost:3001/auth/user", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          if (response.ok) {
            dispatch(setUser(data.user));
          } else {
            dispatch(logout());
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          dispatch(logout());
        }
      }
    };
    fetchUser();
  }, [token, dispatch]);



  return (
    <>
      <BrowserRouter>
        <Routes> 
          <Route path="/" element={<IndexPage />} />
 
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/productlisting" element={<ProductListing />} />
 
          <Route path="/" element={<Navbar />} />
          <Route path="/product-details/:productId" element={<ProductDetails />} />

          <Route path="/dashboard" element={<Dashboard />} /> 
 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
