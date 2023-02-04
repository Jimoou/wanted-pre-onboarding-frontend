import { Link } from "react-router-dom";

export const Navbar = () => {
    const logout = () => {
        localStorage.removeItem("JWT");
        window.location.replace("/signin")
    }

    return (
        <div className="Appbar">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">홈</Link>
                    <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/signin">로그인</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signup">회원가입</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/todo">TODO</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={logout} to="/signin">로그아웃</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}