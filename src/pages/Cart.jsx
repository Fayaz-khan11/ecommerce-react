import { Link } from "react-router-dom";
import { useContext } from "react";
import { getProducts } from "../data/Products";
import { CartContext } from "../context/CartContext";

export default function Cart() {
    const { cartCounts } = useContext(CartContext);
    const products = getProducts();
    const cartEntries = Object.entries(cartCounts);

    if (cartEntries.length === 0) {
        return (
            <div className="cart">
                <h1 className="text-center">Your cart is empty</h1>
                <p className="text-center">Add a product from the Home page to view it here.</p>
            </div>
        );
    }

    const cartItems = cartEntries
        .map(([productId, quantity]) => {
            const product = products.find((p) => p.id === Number(productId));
            return product ? { ...product, quantity } : null;
        })
        .filter(Boolean);

    const totalAmount = cartItems
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(2);

    return (
        <div className="cart">
            <h1 className="text-center">Cart</h1>
            <div className="row">
                {cartItems.map((item) => (
                    <div className="col-md-6 mb-3" key={item.id}>
                        <div className="card" style={{ width: "100%" }}>
                            <img
                                style={{ height: "170px", objectFit: "cover" }}
                                src={item.image}
                                className="card-img-top"
                                alt={item.name}
                            />
                            <div className="card-body">
                                <h5>{item.name}</h5>
                                <p>{item.description}</p>
                                <p>Price: £{item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Subtotal: £{(item.price * item.quantity).toFixed(2)}</p>
                                <Link to={`/checkout/${item.id}`} className="btn btn-primary">
                                    View product
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <h4>Total amount: £{totalAmount}</h4>
            </div>
        </div>
    );
}
