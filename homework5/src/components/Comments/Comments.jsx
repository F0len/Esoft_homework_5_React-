import CommentForm from '../Comments/CommentsForm';
import { useSelector, useDispatch } from 'react-redux';
import { addComments } from '../../reduser/commentsSlice';
import './Comments.css'

const Comments = ({movieId}) => {

  const comments = useSelector((state) => { return state.comments.comments.filter(comment => comment.movieId === movieId);});
 
  const dispatch = useDispatch();

  const handleAddComment = (comment) => {
    const newComment = {
      id: comments.length + 1,
      movieId: movieId,
      user: 'Анонимный пользователь',
      text: comment,
    };
    dispatch(addComments(newComment));
  };


  return (
    <>
    <CommentForm onSubmit={handleAddComment} />
    <div className="comments-list">
      <h2>Комментарии к фильму</h2>
      {comments.map((comment) => (
        <div key={comment.id} className="comment-item">
          <strong>{comment.user}:</strong> {comment.text}
        </div>
      ))}
    </div>
    
    </>
  );
};

export default Comments;