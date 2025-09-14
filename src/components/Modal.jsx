function Modal({ isOpen, onClose, movie }) {
  if (!isOpen || !movie) return null;
  return (
    <div className="modal-overlay">
      <div>
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <button className="neon-button" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default Modal;
