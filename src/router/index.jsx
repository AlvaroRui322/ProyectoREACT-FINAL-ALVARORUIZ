import {createBrowserRouter} from "react-router-dom";
import LayoutPublic from "../layouts/LayoutPublic.jsx";
import NotFound from "../pages/NotFound.jsx";
import Home from "../pages/Home.jsx";
import Register from "../pages/Register.jsx";
import Userprofile from "../pages/Userprofile.jsx";
import Myteams from "../pages/Myteams.jsx";
import Favorites from "../pages/Favorites.jsx";
import Contact from "../pages/Contact.jsx";
import Login from "../pages/Login.jsx";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<LayoutPublic/>,
        errorElement:<NotFound />,
        children: [
            {
                index:true,
                element: <Home/>

            },
            {
                path: "/register",
                element: <Register/>,

            },
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: "/contact",
                element: <Contact/>
            },
            {
                path: "/profile",
                element: <Userprofile/>,

            },
            {
                path: "/profile/teams",
                element: <Myteams/>
            },
            {
                path: "/profile/favorites",
                element: <Favorites/>
            }
        ]
    }
])