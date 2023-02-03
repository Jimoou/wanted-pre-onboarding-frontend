import { Link } from "react-router-dom";
export const Navbar = () => {
    return (
        <div className="Appbar">
            <nav class="navbar bg-primary navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div class="container-fluid">
                    <Link class="navbar-brand" to="/">홈</Link>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link class="nav-link active" to="/signin">로그인</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/signup">회원가입</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}