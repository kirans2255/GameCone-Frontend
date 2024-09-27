import Adminlayout from "./adminlayout";
import { Outlet } from "react-router-dom";

const Layoutside = () => {
    return (
        <div className="flex h-screen overflow-hidden">

            <div className="w-94 overflow-y-auto">
                <Adminlayout />
            </div>

            <div className="flex-1 h-full overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );  
};

export default Layoutside;
