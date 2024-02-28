import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { About } from "./pages/About";
import LoginPage from "./pages/Login/LoginPage";
import { Store } from "./pages/Store";
import { ShoppingCartProvider } from "./context/ShoppingCartContext"

function App() {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
      </ShoppingCartProvider>
  );
}

export default App;
