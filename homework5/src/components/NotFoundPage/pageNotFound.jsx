import { useNavigate } from 'react-router-dom';
function PageNotFound() {  

  const navigate = useNavigate();
  
  const nav = ()=>{
    navigate('/');
  }
  
  return (
    <div>
      <h1>Страницы не существует</h1>
      <button onClick={nav}>На главную</button>
    </div>
  );
}

export default PageNotFound;