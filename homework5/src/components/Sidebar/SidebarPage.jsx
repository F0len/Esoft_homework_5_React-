import { useSelector,useDispatch } from 'react-redux';
import SidebarElement from './SidebarElement';
import { removeFavoriteMovie, removeWatchLaterMovie } from '../../reduser/favoriteAndLaterMovieSlice';
import './Sidebar.css'

const Sidebar = () => {
    const favoriteMovies = useSelector((state) => state.favoriteAndLater.favoriteMovies);
    const laterMovies = useSelector((state) => state.favoriteAndLater.laterMovies);
    const dispatch = useDispatch();

    const handleremoveFavoriteMovie = (id) => {
      dispatch(removeFavoriteMovie(id));
    };
    const handleremoveWatchLaterMovie = (id) => {
      dispatch(removeWatchLaterMovie(id));
    };
    
  return (
    <div className="sidebar">
      <h2>Любимые фильмы</h2>
        {favoriteMovies.map(movie => (
          <SidebarElement
          key={movie.id}
          id={movie.id}
          title={movie.title}
          image={movie.image}
          onDelete={handleremoveFavoriteMovie}
          ></SidebarElement>
        ))}
    
      <h2>Посмотреть позже</h2>
      {laterMovies.map(movie => (
          <SidebarElement
          key={movie.id}
          id={movie.id}
          title={movie.title}
          image={movie.image}
          onDelete={handleremoveWatchLaterMovie}
          ></SidebarElement>
        ))}
      
    </div>
  );
};

export default Sidebar;
