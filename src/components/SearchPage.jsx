import NeonButton from "./NeonButton";
import GenreFilter from "./GenreFilter";
import ReactStars from "./RatingStars";

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
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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

      {/* Filtros adicionales para la búsqueda */}
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
    </div>
  );
}

export default SearchPage;
