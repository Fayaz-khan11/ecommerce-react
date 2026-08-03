import { createContext, useEffect, useState } from "react";

export const CartContext = createContext(null);

const CART_COUNTS_KEY = "cartCounts";

function getStoredCartCounts() {
    return JSON.parse(localStorage.getItem(CART_COUNTS_KEY) || "{}");
}

export default function CartProvider({ children }) {
    const [cartCounts, setCartCounts] = useState(() => getStoredCartCounts());

    useEffect(() => {
        localStorage.setItem(CART_COUNTS_KEY, JSON.stringify(cartCounts));
    }, [cartCounts]);

    const addToCart = (productId, quantity = 1) => {
        setCartCounts((prevCounts) => ({
            ...prevCounts,
            [productId]: (prevCounts[productId] || 0) + quantity,
        }));
    };

    const totalCount = Object.values(cartCounts).reduce(
        (acc, count) => acc + count,
        0
    );

    return (
        <CartContext.Provider value={{ cartCounts, addToCart, totalCount }}>
            {children}
        </CartContext.Provider>
    );
}
