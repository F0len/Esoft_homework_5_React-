import { BrowserRouter, Route, Routes } from "react-router-dom"
import TemplatePage from "./Template/template";
import PageNotFound from "./components/NotFoundPage/pageNotFound";
import HomePage from "./components/HomePage/HomePage";
import FilmDetailsPage from "./components/FilmDetails/FilmDetails";
import SearchMoviesForm from "./components/SearchPage/SearchPage";


function Router() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<TemplatePage />}>
               <Route index  element={<HomePage />} />
               <Route path="search" element={<SearchMoviesForm />}>             
               </Route>
               <Route path="films/:id" element={<FilmDetailsPage/>} />
            </Route>
            <Route element={<PageNotFound />} path="*" />
         </Routes>
      </BrowserRouter>
   );
}

export default Router