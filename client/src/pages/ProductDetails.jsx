import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Get productId from URL
import "../styles/productDetails.css";
import Navbar from "../includes/Navbar";
import { useSelector } from "react-redux";

const ProductDetails = () => {
  const { productId } = useParams(); // Get productId from URL
  const [product, setProduct] = useState(null); // Store product data
  const [loading, setLoading] = useState(true); // Show loading state
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0, show: false });

  const  productR = [ 
    
      {
        user: "Priya Sharma",
        text: "Absolutely loved this saree! The fabric is so soft and comfortable. The floral design is even better in person.",
        rating: 5,
        images: [
          "https://res.cloudinary.com/dez41esfq/image/upload/v1739117032/sarees/fccrcrucieuixdq9sj89.jpg",
          "https://res.cloudinary.com/dez41esfq/image/upload/v1739117032/sarees/cnfnc3c9nhslmiceipbp.jpg",
        ],
        videos: [],
      },
      {
        user: "Aditi Patel",
        text: "Very elegant saree. Got so many compliments at the wedding!",
        rating: 4,
        images: [
          "https://res.cloudinary.com/dez41esfq/image/upload/v1739117032/sarees/fccrcrucieuixdq9sj89.jpg",
        ],
        videos: [],
      },
      {
        user: "Neha Verma",
        text: "Nice saree, but the color was slightly different from the pictures. Still loved it!",
        rating: 3,
        images: ["https://picsum.photos/200"],
        videos: [],
      },
    ]
  
  

  const user = useSelector((state) => state.user?.user); // Check full user object
  console.log("Redux Store:", user);
  console.log("User ID:", user?._id);

  useEffect(() => {
    // Fetch product details from API
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/product-related/get-details/${productId}`);
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setProduct(data);
          setSelectedImage(data.images[0]);
        } else {
          console.error("Error fetching product:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!user?._id) {
      alert("Please log in to add items to cart.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/cart-related/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.images[0],
        }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("Product added to cart!");
      } else {
        alert("Error adding product to cart.");
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y, show: true });
  };

  const handleMouseLeave = () => {
    setZoomPosition({ ...zoomPosition, show: false });
  };

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <>
      <Navbar />
      <div className="product-container">
        <div className="upper-making-center">
          <div className="upper-container">
            {/* Thumbnails */}
            <div className="images-products">
              <div className="thumbnails">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="thumbnail"
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>

              {/* Main Image with Zoom Effect */}
              <div className="main-image-container">
                <div
                  className="zoom-image"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    backgroundImage: `url(${selectedImage})`,
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    backgroundSize: zoomPosition.show ? "150%" : "100%",
                  }}
                ></div>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="product-disc">
              <div className="product-details-container">
                <h2>{product.name}</h2>
                <p><strong>Style No:</strong> {product.styleNo}</p>
                <p>⭐⭐⭐⭐ {product.reviews.length} Reviews</p>
                <p className="price">M.R.P. ₹{product.price}</p>
                <p>Inclusive of all taxes</p>
                <p className="delivery-date">
                  Est Delivery by: <strong>{product.estimatedDelivery}</strong>
                </p>
                <hr />

                {/* Product Specifications */}
                <div className="product-specifications">
                  <p><strong>Fabric:</strong> {product.fabric}</p>
                  <p><strong>Category:</strong> {product.category}</p>
                  <p><strong>Work Type:</strong> {product.workType}</p>
                  <p><strong>Occasion:</strong> {product.occasion}</p>
                  <p><strong>Color:</strong> {product.color}</p>
                </div>



                <hr />

                {/* Product Description */}
                <div className="product-description">
                  <h3>Product Description</h3>
                  <p>{product.description}</p>
                </div>

                <hr />
                <div className="cart-buttons">
                  <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
                  <button className="buy-now">Buy Now</button>
                </div>

                <p className="viewing-info">
                  {product.viewers} people are viewing this item. Don’t wait!
                </p>

                <h3>100% Purchase Protection</h3>
                <ul className="protection-info">
                  <li>✅ 5 days easy returns</li>
                  <li>✅ Assured Quality</li>
                  <li>✅ Free shipping*</li>
                </ul>
              </div>
            </div>
          </div>

          
        </div>
        
      </div>
      {/* Product Reviews Section */}
<div className="product-reviews">
  <h3>Customer Reviews</h3>

  {/* Review Form */}

<div className="reviews-and-sent-reviews">

  <div className="review-form">
    <textarea
      placeholder="Write your review..."
      className="review-input"
    ></textarea>
    <input type="file" className="review-upload" multiple accept="image/*,video/*" />
    <button className="submit-review">Submit Review</button>
  </div>

  {/* Existing Reviews */}
  <div className="reviews-list">
    {productR.map((review, index) => (
      <div key={index} className="review">
        <p><strong>{review.user}</strong></p>
        <p>{review.text}</p>
        {/* Show images & videos if available */}
        <div className="review-media">
          {review.images && review.images.map((img, i) => (
            <img key={i} src={img} alt={`Review ${i}`} className="review-image" />
          ))}
          {review.videos && review.videos.map((vid, i) => (
            <video key={i} controls className="review-video">
              <source src={vid} type="video/mp4" />
            </video>
          ))}
        </div>
      </div>
    ))}
  </div>

  </div>


</div>

    </>
  );
};

export default ProductDetails;
