import { Link } from "react-router-dom"
import "./Header.css"

export const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header-wrapper">
                <Link to={"/"}>
                    <img src="./logo.svg" alt="logo" className="logo" />
                </Link>
                <nav>
                    <Link to={"/"}>Головна</Link>
                    <Link to={"/variables"}>Змінні</Link>
                </nav>
            </div>
        </header>
    )
}