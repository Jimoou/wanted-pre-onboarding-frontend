import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const navigate = new useNavigate();
    const logout = () => {
        localStorage.removeItem("JWT");
        navigate("/signin");
    }
    
    return (
        <div className="Appbar">
            <nav className="navbar bg-primary navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">홈</Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/signin">로그인</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signup">회원가입</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/todo">TODO</Link>
                            </li>
                            <li className="nav-item">
                                <p className="nav-link active" onClick={logout}>로그아웃</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}