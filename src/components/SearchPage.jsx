import NeonButton from "./NeonButton";
import GenreFilter from "./GenreFilter";
import ReactStars from "./RatingStars";
import { useState } from "react";

function SearchPage({
  searchQuery,
  setSearchQuery,
  movies,
  openModal,
  selectedGenre,
  onGenreChange,
  filterStars,
  onFilterChange,
}) {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedRating, setSelectedRating] = useState(0);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const searchMovies = async (reset = false) => {
    if (!searchQuery.trim()) return;

    setLoading(true);

    const currentPage = reset ? 1 : page;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=f8b72e2ad393e8b2b49f71b711db5fa0&query=${encodeURIComponent(
      searchQuery
    )}&page=${currentPage}&language=es`;

    try {
      let response = await fetch(url);
      let data = await response.json();
      let results = data.results;

      if (selectedRating > 0) {
        results = results.filter((movie) => movie.vote_average >= selectedRating * 2);
      }

      if (selectedGenres.length > 0) {
        results = results.filter((movie) =>
          movie.genre_ids && selectedGenres.some((genreId) => movie.genre_ids.includes(genreId))
        );
      }

      if (reset) {
        setMovies(results);
        setPage(2);
      } else {
        setMovies((prev) => [...prev, ...results]);
        setPage(currentPage + 1);
      }
    } catch (error) {
      console.error("Error al buscar películas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenreChange = (newSelectedGenres) => {
    setSelectedGenres(newSelectedGenres);
    if (searchQuery.trim()) {
      setPage(1);
      searchMovies(true);
    }
  };

  return (
    <div className="container text-center">
      <div style={{ textAlign: "center" }}>
        <h2 className="neon-title"> Buscá tu película favorita</h2>
        <input
          id="buscar"
          type="text"
          placeholder="Buscar por título..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="neon-input"
        />
      </div>

      <div style={{ margin: "30px 0" }}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h3 className="neon-title" style={{ fontSize: "2rem" }}>
            Filtrá por rating
          </h3>
          <ReactStars
            className="stars"
            count={5}
            value={filterStars}
            onChange={onFilterChange}
            size={40}
            color1="lightgray"
            color2="#ffd700"
            half={false}
            edit={true}
          />
        </div>

        <GenreFilter
          selectedGenre={selectedGenre}
          onGenreChange={onGenreChange}
        />
      </div>

      <div className="movie-grid">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/sin-imagen.png"
              }
              alt={movie.title}
              className="movie-poster"
            />
            <h3>
              {movie.title} ({movie.release_date?.slice(0, 4)})
            </h3>
            <p>⭐ {movie.vote_average}</p>
            <div className="button-wrapper">
              <NeonButton onClick={() => openModal(movie)}>Info</NeonButton>
            </div>
          </div>
        ))}
      </div>
      {loading && <p className="neon-text">Cargando películas...</p>}
    </div>
  );
}

export default SearchPage;
