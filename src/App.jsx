import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { Home } from "./pages/Home/Home";
import { Pods } from "./pages/Pods/Pods";
import { Liquids } from "./pages/Liquids/Liquids";
import { Cartridges } from "./pages/Cartridges/Cartridges";
import { CategoryProducts } from "./pages/CategoryProducts/CategoryProducts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Liquids />} />
          <Route path="pods" element={<Pods />} />
          <Route path="cartridges" element={<Cartridges />} />
          <Route
            path="liquids/:categorySlug"
            element={<CategoryProducts />}
          />
          <Route
            path="pods/:categorySlug"
            element={<CategoryProducts />}
          />
          <Route
            path="cartridges/:categorySlug"
            element={<CategoryProducts />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
