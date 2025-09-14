import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";

const API_KEY = "cacf577c0c05da73a88ae76d3eda6396";
const BASE_URL = "https://api.themoviedb.org/3";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-ES`)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.error("Error al cargar película:", err));
  }, [id]);

  if (!movie) return <p>Cargando detalles...</p>;

  return (
    <div>
      <NavBar />
      <h1 className="neon-title" style={{ fontSize: "4rem" }}>{movie.title}</h1>
      <div className="container text-center movieDetails">
        <div className="row">
          
          <div className="col-6">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/300x450?text=Sin+imagen"
              }
              alt={movie.title}
              className="movie-poster-det"
            />
          </div>
          <div className="col-6 text-start">
            <p>{movie.overview}</p>
            <p>Fecha de estreno: {movie.release_date}</p>
            <p>Duración: {movie.runtime} minutos</p>
            <p>Géneros: {movie.genres.map((g) => g.name).join(", ")}</p>
            <p>Rating: ⭐ {movie.vote_average}</p>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
