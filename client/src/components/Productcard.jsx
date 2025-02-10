import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BoltSharpIcon from "@mui/icons-material/BoltSharp";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/productcard.css"; 

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
        {/* Wishlist Icon */}
      <div className="wishlist-icon">
        <FavoriteBorderOutlinedIcon fontSize="medium" />
      </div>

      {/* Product Image */}
      <img
        src={product.images[0]}
        alt="Green Khaddi Georgette Bandhani Saree"
        className="product-img"
      />

      {/* Product Details */}
      <div className="product-details">
        <p className="product-title text-start">{product.name}</p>
        <p className="product-title text-start">
          MRP &#8377;<b>{product.price}</b>{" "}
        </p>
        <button className="ready-to-ship ">
          <BoltSharpIcon fontSize="xs" className="me-1" /> Ready To Ship
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
