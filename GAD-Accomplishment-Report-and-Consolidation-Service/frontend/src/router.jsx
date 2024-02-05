import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./views/unauthorizedView/main_views/GuestLayout";
import AddUser from "./views/authorizedView/admin/components/ManageUser/AddUserModal";
import ManageUsers from "./views/authorizedView/admin/ManageUsers";
import AdminLayout from "./views/authorizedView/AdminLayout";
import ArchivedUser from "./views/authorizedView/admin/components/ManageUser/ArchivedUser";

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
            },

            {
                path:'archiveduser',
                element: <ArchivedUser />
            }
        ]
    },
])

export default router;