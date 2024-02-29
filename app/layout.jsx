import "../assets/styles/globals.css";
import AuthProvider from "../components/AuthProvider";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
    title: "PropertyPulse | Find The Perfect Rental",
    description:
        "Find your dream rental property with PropertyPulse. We have a wide range of properties to choose from.",
};

const MainLayout = ({ children }) => {
    return (
        <AuthProvider>
            <html lang="en">
                <body>
                    <NavBar />
                    <main>{children}</main>
                    <Footer />
                    <ToastContainer />
                </body>
            </html>
        </AuthProvider>
    );
};

export default MainLayout;
