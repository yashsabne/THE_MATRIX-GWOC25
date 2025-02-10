import React, {  useState } from "react";
import "../styles/dashboard.css";
import OrderContainer from "../components/OrdersContainer";
import InventoryProducts from "../components/InventoryProducts";
import NewProductAdd from "../components/NewProductAdd";
 
/**
 * 
 * @returns https://api.whatsapp.com/send?phone=+917276462261&text=Hello
 * 
 */

const Dashboard = () => {

    const [activeTab, setActiveTab] = useState("list-products-yash");

    return (
        <div className="admin-container-yash">

            <aside className="sidebar-admin-yash">
                <h2 style={{ marginRight: '20px' }} >Kashvi</h2>
                <ul>
                    <li className={activeTab === "add-product-yash" ? "active-yash" : ""} onClick={() => setActiveTab("add-product-yash")}>
                        + Add Product
                    </li>
                    <li className={activeTab === "list-products-yash" ? "active-yash" : ""} onClick={() => setActiveTab("list-products-yash")}>
                        ✔ Listed Products
                    </li>
                    <li className={activeTab === "orders-yash" ? "active-yash" : ""} onClick={() => setActiveTab("orders-yash")}>
                        ✔ Orders
                    </li>
                </ul>
            </aside>
 
            <div className="admin-content">
                <div className="admin-header">
                    <h2>{activeTab === "add-product-yash" ? "Add New Product" : activeTab === "list-products-yash" ? "All Products List" : "Order Management"}</h2>
                    <button className="logout-btn-yash">Logout</button>
                </div>

                {activeTab === "add-product-yash" && (
                  <NewProductAdd/>
                )}


                {/* Product Table Section */}
                {activeTab === "list-products-yash" && (
                    <InventoryProducts/>
                )}

                {/* Orders Section */}
                {activeTab === "orders-yash" && (
                    <OrderContainer/>
                )}


            </div>
        </div>
    );
};

export default Dashboard;   