import { useForm } from 'react-hook-form';

const CommentForm = ({ onSubmit }) => {
  const { register, handleSubmit, reset } = useForm();

  const handleFormSubmit = (data) => {
   
    onSubmit(data.comment);
    reset(); 
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <textarea
          {...register("comment")}
          name="comment"
          placeholder="Введите ваш комментарий..."
        />
        <button className='button' type="submit">Добавить комментарий</button>
      </form>
    </div>
  );
};
export default CommentForm;