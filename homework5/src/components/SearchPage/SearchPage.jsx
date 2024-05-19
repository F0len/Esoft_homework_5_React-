import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovies } from '../../reduser/moviesSlice';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from '../MovieCard/MovieCard';
import './SearchPage.css';

const filterMovies = (movies, title, selectedGenres) => {

  return movies.filter(movie => {
    let isTitleMatch;
    let isGenreMatch;

    if (title != "") {
      const movieTitle = movie.title.toLowerCase();
      const searchQuery = title.toLowerCase();
      isTitleMatch = movieTitle.includes(searchQuery);
    }
    else isTitleMatch = true;

    if (selectedGenres.length != 0) {
      const hasMatchingGenre = selectedGenres.filter(genre => movie.genres.includes(genre));
      isGenreMatch = hasMatchingGenre.length == selectedGenres.length;
    }
    else isGenreMatch = true;

    return isTitleMatch && isGenreMatch;
  });

}

const genresList = [
  "Драма", "Криминал", "Боевик", "Анимация", "Комедия",
  "Приключения", "Романтика", "Фэнтези", "Триллер"
];

const SearchPage = () => {

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const movies = useSelector((state) => state.movies.movies);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredMovies, setfilteredMovies] = useState([]);
  const favoriteMovies = useSelector((state) => state.favoriteAndLater.favoriteMovies);
  const laterMovies = useSelector((state) => state.favoriteAndLater.laterMovies);
  const dispatch = useDispatch();


  useEffect(() => {
    if(movies && movies.length ==0){
      dispatch(fetchMovies());
    }
  }, [dispatch, movies]);

  useEffect(() => {

    const title = searchParams.get('title');
    const category = searchParams.get('genres');
    const categoryArr = category ? category.split(',') : [];

    if (title != null || categoryArr.length != 0) {
      setfilteredMovies(() => filterMovies(movies, title, categoryArr));
    }
  }, [movies, searchParams]);


  const onSubmit = (data) => {
    const { title, genres } = data;
    const selectedGenres = Array.isArray(genres) ? genres.join(',') : [];
    navigate(`/search?title=${encodeURIComponent(title)}&genres=${encodeURIComponent(selectedGenres)}`);
  };

  return (
    <div>
      <h2>Поиск фильма</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <input className='searchTitle' type="text" placeholder="Поиск по названию" {...register("title")} />
        </label>
        <fieldset>
          <legend>Жанры:</legend>
          {genresList.map((genre) => (
          <label key={genre}>
            <input type="checkbox" {...register("genres")} value={genre} />
            {genre}
          </label>
        ))}
        </fieldset>
        <button className="button" type="submit">Поиск</button>
      </form>

      <div>
        <div>
          <h2>Результаты поиска</h2>
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={favoriteMovies.includes(movie)}
              isWatchLater={laterMovies.includes(movie)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;