import logo from "../../assets/images/logo.jpg";
import "../../assets/css/institucional.css";

export default function Header() {
  return (
    <header className="header-bar">
      <img src={logo} alt="Logo institucional" className="logo-institucional" />
    </header>
  );
}
