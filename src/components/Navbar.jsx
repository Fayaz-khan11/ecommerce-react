import { Link as Links } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
    const { user, signOut } = useContext(AuthContext);
    const { totalCount } = useContext(CartContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(!!user);
    }, [user]);


    const style = {
        textDecoration: "none",
        marginLeft: "10px",
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Links to="/" className="navbar-brand">
                    Shoping Hub
                </Links>
            </div>
            <div className="navbar-links">
                <Links to="/" style={style}>
                    Home
                </Links>
                <Links to="/cart" style={style}>
                    Cart ({isLoggedIn ? totalCount : (0)})
                </Links>
                {user ? (
                    <>
                        <span style={{ marginLeft: "10px" }}>{user.name}</span>
                        <button
                            onClick={signOut}
                            style={{ ...style, border: "none", background: "none", cursor: "pointer" }}
                        >
                            <span className="btn btn-secondary">Logout</span>
                        </button>
                    </>
                ) : (
                    <>
                        <Links to="/auth" style={style}>
                            <span className="btn btn-secondary">Login</span>
                        </Links>
                        <Links to="/auth" style={style}>
                            <span className="btn btn-primary">Sign up</span>
                        </Links>
                    </>
                )}
            </div>
        </nav>
    );
}
