import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./views/unauthorizedView/main_views/GuestLayout";
import AddUser from "./views/authorizedView/admin/AddUser";
import ManageUsers from "./views/authorizedView/admin/ManageUsers";
import AdminLayout from "./views/authorizedView/AdminLayout";

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
                path: 'adduser',
                element: <AddUser />
            },

            {
                path: 'manageusers',
                element: <ManageUsers />
            }
        ]
    },
])

export default router;