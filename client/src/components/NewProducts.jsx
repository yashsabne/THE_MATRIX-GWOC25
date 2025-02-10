import { useRef } from "react";
import "../styles/newproducts.css"; // Import custom CSS

const products = [
  {
    img: "https://www.rishabhagarwal.com/wp-content/new-uploads/2019/05/AR_Wedding_Blog_070.jpg", // Replace with actual images
    title: "Light Blue Crushed Tissue Saree Embro...",
    price: "₹ 11,995",
  },
  {
    img: "https://www.rishabhagarwal.com/wp-content/new-uploads/2019/05/AR_Wedding_Blog_070.jpg",
    title: "Green Bandhani Lehenga Set With Za...",
    price: "₹ 23,799",
  },
  {
    img: "https://www.rishabhagarwal.com/wp-content/new-uploads/2019/05/AR_Wedding_Blog_070.jpg",
    title: "Royal Blue Bandhani Lehenga Set Wit...",
    price: "₹ 23,799",
  },
  {
    img: "https://www.rishabhagarwal.com/wp-content/new-uploads/2019/05/AR_Wedding_Blog_070.jpg",
    title: "Beige Palazzo Set With Beads Sequin...",
    price: "₹ 22,499",
  },
  {
    img: "https://www.rishabhagarwal.com/wp-content/new-uploads/2019/05/AR_Wedding_Blog_070.jpg",
    title: "Orange Floral Print Pleated Gown Wit...",
    price: "₹ 20,990",
  },
];

const NewProducts = () => {
  const carouselRef = useRef(null);

  return (
    <div className="container">
      <h2 className="text-center mb-4 josefin-sans-josefin">New This Week</h2>

      <div ref={carouselRef} className="product-carousel d-flex">
        {products.map((product, index) => (
          <div key={index} className="product-card rounded-0">
            <img
              src={product.img}
              alt={product.title}
              className="product-img rounded-0"
            />
            <p className="product-title text-start">{product.title}</p>
            <p className="product-price text-start">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewProducts;
