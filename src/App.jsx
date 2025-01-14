import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";
import TopDoctors from "./components/TopDoctors";

import Layout from "@/routes/layout";
import DashboardPage from "@/routes/dashboard/page";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <DashboardPage />,
                },
                {
                    path: "doctors",
                    element: <TopDoctors />,
                },
                {
                    path: "inactive",
                    element: <h1 className="title">Inactive Doctor</h1>,
                },
                {
                    path: "patients",
                    element: <h1 className="title">Patients </h1>,
                },
                {
                    path: "pharmacy",
                    element: <h1 className="title">Pharmacy </h1>,
                },
                {
                    path: "clinics",
                    element: <h1 className="title">Clinics </h1>,
                },
                {
                    path: "cites",
                    element: <h1 className="title">Cites </h1>,
                },
                {
                    path: "specialization",
                    element: <h1 className="title">Specialization </h1>,
                },
                {
                    path: "settings",
                    element: <h1 className="title">Settings </h1>,
                },
            ],
        },
    ]);
    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
