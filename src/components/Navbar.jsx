import { Link as Links } from "react-router-dom";
export default function Navbar() {
    const style = {
        textDecoration: 'none',
        marginLeft: '10px',
        color: 'black'
    }
    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Links to="/" className="navbar-brand">Shoping Hub</Links>
                </div>
                <div className="navbar-links">
                    <Links to="/" style={style}>Home</Links>
                    <Links to="/checkout" style={style}>Cart</Links>
                    <Links to="/auth" style={style}><span className="btn btn-secondary">
                        Login</span></Links>
                    <Links to="/auth" style={style}><span className="btn btn-primary">
                        Sign up</span></Links>
                </div>

            </nav>
        </>
    )
}