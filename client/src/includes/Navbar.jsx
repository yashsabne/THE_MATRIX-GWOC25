import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/state";

const Navbar = () => {
  const dispatch = useDispatch();
  const searchInputRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const typed = new Typed(searchInputRef.current, {
      strings: ["Search for silk sarees", "Search for cotton sarees", "Search for linen sarees"],
      typeSpeed: 60,
      backSpeed: 60,
      loop: true,
      attr: "placeholder",
      smartBackspace: true,
    });

    return () => typed.destroy();
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg border-bottom bg-white sticky-top mt-2 px-3">
        <div className="container-fluid px-0 custom-navbar-width">
          {/* Logo */}
          <a className="navbar-brand" href="/">
            <h2 className="bodoni-moda-bodoni" style={{ marginTop: "5px" }}>
              yash
            </h2>
          </a>

          {/* Desktop Menu */}
          <div className="collapse navbar-collapse d-none d-lg-flex">
            <ul className="navbar-nav me-auto px-3">
              <li className="nav-item"><a className="nav-link active" href="#">Silk</a></li>
              <li className="nav-item ms-4"><a className="nav-link active" href="#">Cotton</a></li>
              <li className="nav-item ms-4"><a className="nav-link active" href="#">Linen</a></li>
              <li className="nav-item ms-4"><a className="nav-link active" href="#">Regional</a></li>
              <li className="nav-item ms-4"><a className="nav-link active" href="#">Banarasiya</a></li>
              <li className="nav-item ms-4"><a className="nav-link active" href="#">About us</a></li>
            </ul>
          </div>

          {/* Search Bar */}
          <form className="d-flex px-4 mx-auto" role="search">
            <input
              ref={searchInputRef}
              className="form-control form-control-sm rounded-start"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{
                backgroundColor: "rgb(243, 243, 243)",
                fontSize: "0.775rem",
                height: "35px",
                width: "200px",
                borderTopRightRadius: "0",
                borderBottomRightRadius: "0",
                textAlign: "center",
              }}
            />
            <button className="btn btn-sm btn-dark rounded-end rounded-0" type="submit">
              <SearchIcon fontSize="small" />
            </button>
          </form>

          {/* Icons Section (Right-Aligned) */}
          <div className="d-flex align-items-center ms-auto">
            <WhatsAppIcon className="me-3 nav-icons" fontSize="medium" />
            <FavoriteBorderOutlinedIcon className="me-3 nav-icons" fontSize="medium" />
            <ShoppingBagOutlinedIcon className="me-3 nav-icons" fontSize="medium" />

            {/* Account Icon or First Letter */}
            <div
              className="account-menu-container ms-3"
              onMouseEnter={() => setAccountMenuOpen(true)}
              onMouseLeave={() => setAccountMenuOpen(false)}
              onClick={() => setAccountMenuOpen((prev) => !prev)}
              style={{ position: "relative", cursor: "pointer" }}
            >
              {user && user._id ? (
                <div className="user-initial-circle">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              ) : (
                <AccountCircleOutlinedIcon className="nav-icons" fontSize="medium" />
              )}
              {accountMenuOpen && (
                <div className="account-dropdown">
                  {user && user._id ? (
                    <>
                      <Link to="/admin" className="account-dropdown-item">Admin</Link>
                      <a role="button" className="account-dropdown-item" onClick={() => dispatch(logout())}>
                        Logout
                      </a>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="account-dropdown-item">Login</Link>
                      <Link to="/signup" className="account-dropdown-item">Signup</Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar Toggle Button (Hidden on Desktop) */}
            <button className="btn d-lg-none" onClick={() => setSidebarOpen(true)}>
              <MenuIcon fontSize="large" />
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar (Mobile Navigation) */}
      <div className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`} onClick={() => setSidebarOpen(false)}></div>
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>
          <CloseIcon fontSize="large" />
        </button>
        <ul className="sidebar-menu">
          <li><a href="#">Silk</a></li>
          <li><a href="#">Cotton</a></li>
          <li><a href="#">Linen</a></li>
          <li><a href="#">Regional</a></li>
          <li><a href="#">Banarasiya</a></li>
          <li><a href="#">About us</a></li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
