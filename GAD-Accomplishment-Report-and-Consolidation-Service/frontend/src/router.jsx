import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./views/unauthorizedView/main_views/GuestLayout";
import DefaultLayout from "./views/authorizedView/DefaultLayout";
import AddUser from "./views/authorizedView/admin/AddUser";

const router = createBrowserRouter([
    {
        path: '/',
        element: <GuestLayout />
    },

    {
        path: '/admin',
        element: <DefaultLayout />,
        children:[
            {
                path: 'adduser',
                element: <AddUser />
            }
        ]
    },
])

export default router;