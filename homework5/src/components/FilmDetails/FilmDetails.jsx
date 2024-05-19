import { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovies } from '../../reduser/moviesSlice';
import MovieCard from '../MovieCard/MovieCard';
import Comments from '../Comments/Comments';

import './FilmDetails.css'

const filterMovieGenres = (movies ,categories, id ) => {

  if (!categories || !Array.isArray(categories) || categories.length < 0) {
    return [];
  }

  const filteredMovies = movies.filter(movie => {
    if(movie.id == id){
      return false;
    }
    else if (categories.length === 1) {
      return movie.genres.includes(categories[0]);
      
    } else if (categories.length >= 2) {
      const matchingCategories = categories.filter(category => movie.genres.includes(category));
      return matchingCategories.length >= 2; 

    }
    return false; 
 
  });

  return filteredMovies.slice(0, 4);
}


const FilmDetailsPage = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  
  const movies = useSelector((state) => state.movies.movies);
  const loading = useSelector((state) => state.movies.loading);
  const error = useSelector((state) => state.movies.error);
  const film = movies.find((movie) => movie.id === parseInt(id));
  const [relatedMovies, setrelatedMovies] = useState([]);

  const favoriteMovies = useSelector((state) => state.favoriteAndLater.favoriteMovies);
  const laterMovies = useSelector((state) => state.favoriteAndLater.laterMovies);


  useEffect(() => {
    if(movies && movies.length ==0){
      dispatch(fetchMovies());
    }
  }, [dispatch, movies]);

  useEffect(() => {
    if (film) {
      window.scrollTo(0, 0);
      setrelatedMovies(()=>filterMovieGenres(movies,film.genres, film.id));
    }
  }, [movies,film]);

  if (loading) {
    return <div className="loading-spinner"></div>; 
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!film) {
    return <div>
      <p>Фильм не найден</p>
    </div>;
  }

  const { title, image, country, genres, release_year, rating, duration, actors, full_description } = film;
  
  return (
    
    <>
    <div className="film-details">
    <div className="film-image">
      <img src={image} alt={title} />
    </div>
    <div className="film-info">
      <h2>{title}</h2>
      <p><strong>Страна:</strong> {country}</p>
      <p><strong>Жанры:</strong> {genres.join(', ')}</p>
      <p><strong>Год:</strong> {release_year}</p>
      <p><strong>Рейтинг:</strong> {rating}</p>
      <p><strong>Продолжительность:</strong> {duration}</p>
      <p><strong>Актёры:</strong> {actors.join(', ')}</p>
      <p><strong>Описание:</strong> {full_description}</p>
    </div>
    
  </div>
  <div className='film-like'>
  <h3>Похожие фильмы</h3>
  {relatedMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={favoriteMovies.includes(movie)}
            isWatchLater={laterMovies.includes(movie)}
          />
        ))}
    </div>

    <Comments movieId={id}/>
    </>
  );
};

export default FilmDetailsPage;