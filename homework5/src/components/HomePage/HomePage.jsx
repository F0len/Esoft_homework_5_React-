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
  
  const [selectedMoviesOnType, setSelectedMoviesOnType] = useState([]);
  const [sortedMovies, setsortedMovies] = useState([]);
  const [filterType, setfilterType] = useState('');
  const [typeSort, settypeSort] = useState('');

  const favoriteMovies = useSelector((state) => state.favoriteAndLater.favoriteMovies);
  const laterMovies = useSelector((state) => state.favoriteAndLater.laterMovies);

  const dispatch = useDispatch();
  
  useEffect(() => {
    if(movies && movies.length ==0){
      dispatch(fetchMovies());
    }
  }, [dispatch, movies]);


  const handleSortByRating = (sortBy) => {
    settypeSort (()=>sortBy);
    setsortedMovies(()=> sortMovies(movies,sortBy));
    setfilterType (()=>'');
    
  };

  const handleFilterByType = (type) => {
    setSelectedMoviesOnType(() => filterOnType(movies,type));
    setfilterType(()=> type);
    settypeSort(()=>'');
  };

let moviesToDisplay = movies;
  if (filterType) {
    
    moviesToDisplay = selectedMoviesOnType;
  } else if (typeSort)  {
    moviesToDisplay = sortedMovies;
  }
  
  return (
    <div>
      <div className="movie-list">
      <button className='sort-button button' onClick={() => handleSortByRating('ratingAsc')}>Сортировать по возрастанию рейтинга</button>
      <button className='sort-button button' onClick={() => handleSortByRating('ratingDesc')}>Сортировать по убыванию рейтинга</button>
      <button className='sort-button button' onClick={() => handleFilterByType('Фильм')}>Фильмы</button>
      <button className='sort-button button' onClick={() => handleFilterByType('Сериал')}>Сериалы</button>
    
      {loading ? (
        <div className="loading-spinner"></div>
      ) : error ? (
        <div className="error-message">Error: {error}</div>
      ) : (
        
        moviesToDisplay.map((movie) => (
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
