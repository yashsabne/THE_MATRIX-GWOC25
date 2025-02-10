import Carousel from "../includes/Carousel";
import Navbar from "../includes/Navbar";
import "../styles/navbar.css";
  
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import React from "react";
import VideoCarousel from "../components/VideoCaraousel";
import NewProducts from "../components/NewProducts";
import Footer from "../includes/Footer";
 
const IndexPage = () => {
  return (
    <>
      <Navbar />
      <Carousel />
      <VideoCarousel/>
      <NewProducts/>
      <Footer/>
    
    </>
  );
};

export default IndexPage;
 