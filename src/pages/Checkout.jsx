import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProducts } from "../data/Products";
import { CartContext } from "../context/CartContext";
import "../assets/css/checkout.css";

export default function Checkout() {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const products = getProducts();
        const selectedProduct = products.find(
            (p) => p.id === Number(id)
        );

        setProduct(selectedProduct);
    }, [id]);

    if (!product) {
        return <h3>Product not found.</h3>;
    }

    const incrementQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const totalPrice = (product.price * quantity).toFixed(2);

    const addToCartClick = () => {
        addToCart(product.id, quantity);
        navigate("/");
    };

    return (
        <div className="checkout">
            <h1 className="text-center">Checkout</h1>

            <h2>
                Name
                <span className="float-end">{product.name}</span>
            </h2>

            <p>
                Price
                <span className="float-end">
                    £{product.price}
                </span>
            </p>

            <p>
                Quantity

                <span className="float-end">

                    <button
                        className="btn btn-danger btn-sm"
                        onClick={decrementQuantity}
                    >
                        -
                    </button>

                    <input
                        type="number"
                        value={quantity}
                        readOnly
                        style={{
                            width: "60px",
                            textAlign: "center",
                            margin: "0 10px"
                        }}
                    />

                    <button
                        className="btn btn-success btn-sm"
                        onClick={incrementQuantity}
                    >
                        +
                    </button>

                </span>
            </p>

            <h4>
                Total
                <span className="float-end">
                    £{totalPrice}
                </span>
            </h4>

            <button
                className="btn btn-primary w-100"
                onClick={addToCartClick}
            >
                Buy Now
            </button>
        </div>
    );
}