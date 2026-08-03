import { Routes, Route } from "react-router-dom";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/AuthContext";
import CartProvider from "./context/CartContext";

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <div className="container">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/checkout/:id" element={<Checkout />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </div>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
