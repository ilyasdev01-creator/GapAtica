import { Routes , Route } from "react-router-dom"
import NavBar from "./components/NavBar.tsx"
import Home from "./pages/Home.tsx"
import Explore from "./pages/Explore.tsx"
import Contact from "./pages/Contact.tsx"
import About from "./pages/About.tsx"
import Footer from "./components/Footer.tsx"

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element = {<Home />} />

        <Route path="/explore" element = {<Explore />} />

        <Route path="/contact" element = {<Contact />} />

        <Route path="/about" element = {<About />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App