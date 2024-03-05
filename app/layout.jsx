import "../assets/styles/globals.css";
import AuthProvider from "../components/AuthProvider";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { ToastContainer } from "react-toastify";
import { GlobalProvider } from "@/context/GlobalContext";
import "react-toastify/dist/ReactToastify.css";
import "photoswipe/dist/photoswipe.css";

export const metadata = {
    title: "PropertyPulse | Find The Perfect Rental",
    description:
        "Find your dream rental property with PropertyPulse. We have a wide range of properties to choose from.",
};

const MainLayout = ({ children }) => {
    return (
        <GlobalProvider>
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
        </GlobalProvider>
    );
};

export default MainLayout;
