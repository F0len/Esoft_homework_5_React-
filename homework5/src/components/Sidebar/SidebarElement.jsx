import { FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import './SidebarElement.css';

const SidebarElement = ({ id, title, image, onDelete }) => {

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="film-list-item">
      <div className="film-details-sidebar">
      <img src={image} alt={title} className="film-image-sidebar" />
        <Link to={`/films/${id}`} className="film-title-sidebar">
          {title}
        </Link>
        <button onClick={handleDelete} className="delete-button-sidebar">
        <FaTrash/>
        </button>
      </div>
    </div>
  );
};

export default SidebarElement;
