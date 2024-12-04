import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/UserContext.jsx';
import { logOut } from '../config/firebase.jsx';

const Navbar = () => {
    const { currentUser: user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg bg-danger">
            <div className="container">
                <Link to="/" className="btn btn-secondary">Home</Link>

                {!user && (
                    <>
                        <NavLink to="/register" className="btn btn-secondary">Register</NavLink>
                        <NavLink to="/login" className="btn btn-secondary">Login</NavLink>
                    </>
                )}

                {user && (
                    <>
                        <NavLink to="/profile" className="btn btn-secondary">
                            <img
                                src={'../assets/default-avatar.jpg'}
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    marginRight: '8px',
                                }}
                            />
                            {'profile'}
                        </NavLink>
                        <button onClick={handleLogout} className="btn btn-secondary">Cerrar sesión</button>
                    </>
                )}

                <NavLink to="/contact" className="btn btn-secondary">Contact</NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
