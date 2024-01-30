import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./views/components/GuestLayout";

const router = createBrowserRouter([
    {
        path: 'guest/',
        element: <GuestLayout />
    }
])

export default router;