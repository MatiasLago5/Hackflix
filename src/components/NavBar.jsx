import "./NeonStylesNav.css";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg neon-nav">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <a href="/Error404" className="neon-button"style={{ margin: 0 }}>
          Filtro
        </a>

        <a href="/" className="navbar-brand neon-button">
          Hackflix
        </a>

        <a href="/buscar" className="neon-button" style={{ margin: 0 }}>
          Buscar
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
