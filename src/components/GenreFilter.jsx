import { useState, useEffect } from "react";
import "../NeonStyles.css";

const API_KEY = "cacf577c0c05da73a88ae76d3eda6396";
const BASE_URL = "https://api.themoviedb.org/3";

function GenreFilter({ selectedGenre, onGenreChange }) {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es-ES`
      );
      const data = await response.json();
      setGenres(data.genres || []);
    } catch (error) {
      console.error("Error al obtener géneros:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenreChange = (e) => {
    const genreId = e.target.value === "" ? null : parseInt(e.target.value);
    onGenreChange(genreId);
  };

  if (isLoading) {
    return <div className="neon-text">Cargando géneros...</div>;
  }

  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <h3 className="neon-title" style={{ fontSize: "2.5rem" }}>
        Filtrá por género
      </h3>
      <select
        value={selectedGenre || ""}
        onChange={handleGenreChange}
        className="neon-select"
        style={{
          padding: "10px 15px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "2px solid #00ffff",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "#00ffff",
          boxShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
          cursor: "pointer",
          minWidth: "200px"
        }}
      >
        <option value="">Todos los géneros</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GenreFilter;