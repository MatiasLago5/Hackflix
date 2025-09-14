import NeonButton from "./NeonButton";

function SearchPage({
  searchQuery,
  setSearchQuery,
  movies,
  openModal,
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
