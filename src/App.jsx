import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./NeonStyles.css";
import Footer from "./components/Footer";
import ReactStars from "./components/RatingStars";
import NeonButton from "./components/NeonButton";
import NavBar from "./components/NavBar";
import BackgroundDiv from "./components/header";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
import SearchPage from "./components/SearchPage";
import NotFound404 from "./components/NotFound404";
import Loader from "./components/Loader";

const API_KEY = "cacf577c0c05da73a88ae76d3eda6396";
const BASE_URL = "https://api.themoviedb.org/3";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStars, setFilterStars] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const ratingThresholds = {
    1: 0,
    2: 2,
    3: 4,
    4: 6,
    5: 8,
  };

  useEffect(() => {
    closeModal();
  }, [location.pathname]);

  useEffect(() => {
    fetchMovies(1, true);
  }, [searchQuery, filterStars]);

  const fetchMovies = (pageToFetch, isNewSearch = false) => {
    setIsLoading(true);

    const ratingFilter =
      filterStars > 0
        ? `&vote_average.gte=${ratingThresholds[filterStars]}`
        : "";
    const endpoint = searchQuery
      ? `${BASE_URL}/search/movie?api_key=${API_KEY}&language=es-ES&query=${encodeURIComponent(
          searchQuery
        )}&page=${pageToFetch}`
      : `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-ES&sort_by=popularity.desc${ratingFilter}&page=${pageToFetch}`;

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        if (isNewSearch) {
          setMovies(data.results || []);
        } else {
          setMovies((prev) => [...prev, ...(data.results || [])]);
        }
        setHasMore(data.page < data.total_pages);
      })
      .catch((error) => console.error("Error al buscar películas:", error))
      .finally(() => setIsLoading(false));
  };

  const fetchMoreMovies = () => {
    const nextPage = page + 1;
    fetchMovies(nextPage);
    setPage(nextPage);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleFilterChange = (value) => {
    setFilterStars(value);
    setPage(1);
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  return (
    <>
      {isLoading && <Loader />}

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <NavBar />
              <BackgroundDiv />
              <div className="container text-center">
                <div style={{ textAlign: "center" }}>
                  <h3 className="neon-title" style={{ fontSize: "4rem" }}>
                    Filtrá por rating
                  </h3>
                  <ReactStars
                    className="stars"
                    count={5}
                    value={filterStars}
                    onChange={handleFilterChange}
                    size={60}
                    color1="lightgray"
                    color2="#ffd700"
                    half={false}
                    edit={true}
                  />
                </div>
              </div>
              <InfiniteScroll
                dataLength={movies.length}
                next={fetchMoreMovies}
                hasMore={hasMore}
                loader={<p className="neon-text">Cargando más películas...</p>}
                endMessage={
                  <p className="neon-text">
                    ¡No hay más películas para mostrar!
                  </p>
                }>
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
                        <NeonButton onClick={() => openModal(movie)}>
                          Info
                        </NeonButton>
                      </div>
                    </div>
                  ))}
                </div>
              </InfiniteScroll>
            </div>
          }
        />
        <Route path="/pelicula/:id" element={<MovieDetails />} />
        <Route
          path="/buscar"
          element={
            <div>
              <NavBar />
              <SearchPage
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                movies={movies}
                openModal={openModal}
              />
            </div>
          }
        />
        <Route
          path="*"
          element={
            <div>
              <NavBar />
              <NotFound404 />
            </div>
          }
        />
      </Routes>

      {isModalOpen && selectedMovie && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="neon-title">{selectedMovie.title}</h2>
            <p>{selectedMovie.overview || "Sin descripción disponible."}</p>
            <div>
              <Link to={`/pelicula/${selectedMovie.id}`}>
                <button className="neon-button">Ver más</button>
              </Link>
              <button onClick={closeModal} className="neon-button">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default App;
