import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./views/unauthorizedView/main_views/GuestLayout";
import AdminLayout from "./views/authorizedView/AdminLayout";
import ManageUsers from "./views/authorizedView/admin/ManageUsers";
import Forms from "./views/authorizedView/admin/Forms";

const router = createBrowserRouter([
    {
        path: '/',
        element: <GuestLayout />
    },

    {
        path: '/admin',
        element: <AdminLayout />,
        children:[
            {
                path: 'manageusers',
                element: <ManageUsers />
            },
            {
                path: 'forms',
                element: <Forms />
            }
        ]
    },
])

export default router;