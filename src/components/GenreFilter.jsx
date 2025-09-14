import { useState, useEffect } from "react";
import "../NeonStyles.css";

const API_KEY = "cacf577c0c05da73a88ae76d3eda6396";
const BASE_URL = "https://api.themoviedb.org/3";

function GenreFilter({ selectedGenres, onGenreChange }) {
  const [genres, setGenres] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es`
        );
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error al obtener géneros:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreToggle = (genreId) => {
    const updatedGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter(id => id !== genreId)
      : [...selectedGenres, genreId];
    
    onGenreChange(updatedGenres);
  };

  const clearAllGenres = () => {
    onGenreChange([]);
  };

  const getSelectedGenresText = () => {
    if (selectedGenres.length === 0) return "Seleccionar géneros";
    if (selectedGenres.length === 1) {
      const genre = genres.find(g => g.id === selectedGenres[0]);
      return genre ? genre.name : "Género seleccionado";
    }
    return `${selectedGenres.length} géneros seleccionados`;
  };

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".genre-filter-container")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="genre-filter-container">
      <div className="genre-filter-dropdown">
        <button 
          className="genre-filter-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {getSelectedGenresText()}
          <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
        </button>
        
        {isOpen && (
          <div className="genre-dropdown-content">
            <div className="genre-actions">
              <button 
                className="clear-all-btn"
                onClick={clearAllGenres}
              >
                Limpiar todo
              </button>
            </div>
            
            <div className="genre-list">
              {genres.map((genre) => (
                <label key={genre.id} className="genre-option">
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(genre.id)}
                    onChange={() => handleGenreToggle(genre.id)}
                  />
                  <span className="checkmark"></span>
                  {genre.name}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GenreFilter;