import NeonButton from "./NeonButton";
import GenreFilter from "./GenreFilter";
import ReactStars from "./RatingStars";
import { useState, useEffect } from "react";

function SearchPage({
  searchQuery,
  setSearchQuery,
  movies,
  setMovies,
  openModal,
  selectedGenres,
  onGenreChange,
  filterStars,
  onFilterChange,
}) {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const ratingThresholds = {
    1: 0,
    2: 2,
    3: 4,
    4: 6,
    5: 8,
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Ejecutar búsqueda cuando cambian los parámetros
  useEffect(() => {
    if (searchQuery.trim()) {
      searchMovies(true);
    }
  }, [searchQuery, selectedGenres, filterStars]);

  const searchMovies = async (reset = false) => {
    if (!searchQuery.trim()) return;

    setLoading(true);

    const currentPage = reset ? 1 : page;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=cacf577c0c05da73a88ae76d3eda6396&query=${encodeURIComponent(
      searchQuery
    )}&page=${currentPage}&language=es`;

    try {
      let response = await fetch(url);
      let data = await response.json();
      let results = data.results;

      // Aplicar filtro de rating
      if (filterStars > 0) {
        results = results.filter((movie) => movie.vote_average >= ratingThresholds[filterStars]);
      }

      // Aplicar filtro de géneros
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

  return (
    <div style={{ minHeight: '100vh', background: '#050801' }}>
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

          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '2rem', 
            marginBottom: '2rem',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <GenreFilter
              selectedGenres={selectedGenres}
              onGenreChange={onGenreChange}
            />
          </div>
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
    </div>
  );
}

export default SearchPage;
