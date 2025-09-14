const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#000",
        color: "#03e9f4",
        padding: "10px 0",
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        fontSize: "14px",
      }}
    >
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center text-center text-md-start">
        
        <div className="d-flex align-items-center justify-content-center mb-2 mb-md-0">
          <img
            src="https://api.iconify.design/mdi:filmstrip.svg"
            alt="Hackflix Logo"
            height="24"
            className="me-2"
            style={{ filter: "drop-shadow(0 0 4px #03e9f4)" }}
          />
        <a style={{ color: "#03e9f4" }} href="/">Hackflix</a>
        </div>
        
        <div
          className="text-center"
          style={{
            fontWeight: "300",
            color: "#03e9f4",
            textShadow: "0 0 2px #03e9f4",
            flexGrow: 1,
          }}
        >
          © {new Date().getFullYear()} Todos los derechos reservados.
        </div>

        <div>
          <ul className="nav justify-content-center">
            {["Acerca de", "Privacidad", "Licencia", "Contacto"].map((text, i) => (
              <li className="nav-item" key={i}>
                <a
                  href="#"
                  className="nav-link px-2"
                  style={{
                    color: "#03e9f4",
                    transition: "0.3s",
                    fontSize: "14px",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#050801";
                    e.target.style.backgroundColor = "#03e9f4";
                    e.target.style.boxShadow =
                      "0 0 5px #03e9f4, 0 0 25px #03e9f4";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#03e9f4";
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;





