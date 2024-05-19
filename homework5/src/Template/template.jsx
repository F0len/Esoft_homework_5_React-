import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/SidebarPage";
import "./template.css"

function TemplatePage() {

  return (
    <>
    <Header />
      <div className="template-page">
        <div className="main-content">
          <Outlet />
        </div>
        <div className="Sidebar">
         <Sidebar/>
        </div>
      </div>
    </>
  );
}

export default TemplatePage;