import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.tsx";
import Home from "./pages/Home.tsx";
import Explore from "./pages/Explore.tsx";
import Contact from "./pages/Contact.tsx";
import About from "./pages/About.tsx";
import Footer from "./components/Footer.tsx";
import Docs from "./pages/Docs.tsx";
import FrontEndExplore from "./components/FrontEndExplore.tsx";
import ReactTailwind from "./tests/ReactTailwind.tsx";
import Login from "./components/Login.tsx";
import VueTailwind from "./tests/VueTailwind.tsx";
import AngularTailwind from "./tests/AngularTailwind.tsx";
import NextjsTailwind from "./tests/NextjsTailwind.tsx";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Home />} />

        <Route path="/explore" element={<Explore />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/about" element={<About />} />

        <Route path="/docs" element={<Docs />} />

        <Route path="/frontend-explore" element={<FrontEndExplore />} />

        <Route
          path="/frontend-explore/react-tailwind"
          element={<ReactTailwind />}
        />

        <Route
          path="/frontend-explore/vue-tailwind"
          element={<VueTailwind />}
        />
        <Route
          path="/frontend-explore/angular-tailwind"
          element={<AngularTailwind />}
        />
        <Route
          path="/frontend-explore/next-tailwind"
          element={<NextjsTailwind />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
