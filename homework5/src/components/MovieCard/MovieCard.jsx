import { FaStar, FaClock } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addFavoriteMovie, removeFavoriteMovie, addWatchLaterMovie, removeWatchLaterMovie } from '../../reduser/favoriteAndLaterMovieSlice';
import './MovieCard.css'
import React from 'react';
const MovieCard = ({ movie, isFavorite, isWatchLater }) => {
  const {
    id,
    title,
    image,
    country,
    genres,
    release_year,
    rating,
    duration,
    actors,
  } = movie;

  const dispatch = useDispatch();

  const handleAddToFavoritesClick = () => {
    isFavorite ? dispatch(removeFavoriteMovie(id)) : dispatch(addFavoriteMovie(movie));
  };

  const handleAddToWatchLaterClick = () => {
    isWatchLater ? dispatch(removeWatchLaterMovie(id)) : dispatch(addWatchLaterMovie(movie));
  };


  return (
    <div className="movie-card">
      <img className="movie-image" src={image} alt={title} />

      <div className="movie-details">
        <div className="info-row">
          <Link className='link' to={`/films/${id}`}>{title}</Link>
        </div>
        <div className="info-row">
          <p>{release_year} | {duration}</p>
        </div>
        <div className="info-row">
          <p><strong>Страна:</strong> {country}</p>
          <p><strong>Жанры: </strong>
          {genres.map((genre, index) => (
  <React.Fragment key={index}>
    <Link className='link-genre' to={`/search?title=&genres=${encodeURIComponent(genre)}`}>{genre}</Link>
    {index < genres.length - 1 && ", "}
  </React.Fragment>
))}

          </p>
        </div>
        <div className="info-row">
          <p><strong>Актёры:</strong> {actors.join(', ')}</p>
        </div>
      </div>

      <div className="rating-section">
        <p><strong>Рейтинг:</strong> {rating}</p>
        <div className="actions">
          <button className={`action-button ${isFavorite ? 'active' : ''}`} onClick={handleAddToFavoritesClick}>
            <FaStar />
          </button>
          <button className={`action-button ${isWatchLater ? 'active' : ''}`} onClick={handleAddToWatchLaterClick}>
            <FaClock />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
