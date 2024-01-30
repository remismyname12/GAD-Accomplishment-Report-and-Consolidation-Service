import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./views/components/GuestLayout";
import Login from "./views/unauthorizedVieew/Login";

const router = createBrowserRouter([
    {
        path: 'guest/',
        element: <GuestLayout />,
        children:[
            {
                path: '',
                element: <Login />
            }
        ]
    }
])

export default router;