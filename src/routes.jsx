import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Film from "./pages/Film";
import Header from "./components/Header";
import Error from "./pages/Error"
import Favorites from "./pages/Favorites";

export default function RoutesApp() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/filme/:id" element={<Film />} />
                <Route path="/favoritos" element={<Favorites />} />

                <Route path='*' element={<Error />} />
            </Routes>
        </BrowserRouter>
    )
}