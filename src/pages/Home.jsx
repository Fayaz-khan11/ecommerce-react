import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../data/Products.js";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
    const { cartCounts, addToCart } = useContext(CartContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { user, signOut } = useContext(AuthContext);


    const navigate = useNavigate();
    const products = getProducts();

    const viewDetail = (productId) => {
        navigate(`/checkout/${productId}`);
    };


    useEffect(() => {
        setIsLoggedIn(!!user);
    }, [user]);

    return (
        <div className="home">
            <div className="welcome-title">
                <p style={{
                    color: 'red',
                    textAlign: 'center'
                }}>Welcome to our Shop</p>
            </div>
            <div className="row">
                {products &&
                    products.map((product) => {
                        return (
                            <div className="col-md-4 mb-3" key={product.id}>
                                <div className="card" style={{ width: "18rem" }}>
                                    <img style={{ height: "170px" }}
                                        src={product.image}
                                        className="card-img-top"
                                        alt={product.name}
                                    />
                                    <div className="card-body" style={{ height: "238px" }}>
                                        <h5>{product.name}</h5>
                                        <p>{product.description}</p>
                                        <p>£{product.price}</p>

                                        <button className="btn btn-secondary" onClick={() => viewDetail(product.id)}>
                                            view details
                                        </button>
                                        <button className="btn btn-primary ms-1" onClick={() => addToCart(product.id)}>
                                            Add to cart ({isLoggedIn ? cartCounts[product.id] : 0})
                                        </button>
                                    </div>``
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    )
}