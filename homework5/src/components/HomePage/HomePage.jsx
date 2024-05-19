import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MovieCard from '../MovieCard/MovieCard';
import './HomePage.css'
import { fetchMovies } from '../../reduser/moviesSlice';

const filterOnType =(movies , type) => {
  return movies.filter((movie) => movie.type === type);
}

const sortMovies = (movies, sortBy) =>{
  if (sortBy === 'ratingAsc') {
    return [...movies].sort((a, b) => a.rating - b.rating);
  } else if (sortBy === 'ratingDesc') {
    return [...movies].sort((a, b) => b.rating - a.rating);
  }
}

const HomePage = () => {
  const movies = useSelector((state) => state.movies.movies);
  const loading = useSelector((state) => state.movies.loading);
  const error = useSelector((state) => state.movies.error);

  const [sortedMovies, setSortedMovies] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [sortType, setSortType] = useState('');

  const favoriteMovies = useSelector((state) => state.favoriteAndLater.favoriteMovies);
  const laterMovies = useSelector((state) => state.favoriteAndLater.laterMovies);

  const dispatch = useDispatch();
  
  useEffect(() => {
    if(movies && movies.length ==0){
      dispatch(fetchMovies());
    }
  }, [dispatch, movies]);


  useEffect(() => {
    let filteredMovies = movies;

    if (filterType) {
      filteredMovies = filterOnType(movies, filterType);
    } 
    if (sortType) {
      const sorted = sortMovies(filteredMovies, sortType);
      setSortedMovies(sorted);
    } else {
      setSortedMovies(filteredMovies);
    }
  }, [movies, filterType, sortType]);

  const handleSortByRating = (sortBy) => {
    setSortType(sortBy);
  };

  const handleFilterByType = (type) => {
    setFilterType(type);
  };
  
  return (
    <div>
      <div className="movie-list">
      <button className={`sort-button  ${sortType=="ratingAsc" ? 'active' : ''} button`} onClick={() => handleSortByRating('ratingAsc')}>Сортировать по возрастанию рейтинга</button>
      <button className={`sort-button  ${sortType=="ratingDesc" ? 'active' : ''} button`} onClick={() => handleSortByRating('ratingDesc')}>Сортировать по убыванию рейтинга</button>
      <button className={`sort-button  ${filterType=="Фильм" ? 'active' : ''} button`} onClick={() => handleFilterByType('Фильм')}>Фильмы</button>
      <button className={`sort-button  ${filterType=="Сериал" ? 'active' : ''} button`} onClick={() => handleFilterByType('Сериал')}>Сериалы</button>
    
      {loading ? (
        <div className="loading-spinner"></div>
      ) : error ? (
        <div className="error-message">Error: {error}</div>
      ) : (
        
        sortedMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={favoriteMovies.includes(movie)}
            isWatchLater={laterMovies.includes(movie)}
          />
        ))
      )}
    
  
    
      </div>
    </div>
  );
};

export default HomePage;
