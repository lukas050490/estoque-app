import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StockProvider } from "./context/StockContext";
import Home from "./pages/HomePage";
import Products from "./pages/ProductsPage";
import Stock from "./pages/StockPage";
import Reports from "./pages/ReportsPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./routes/PrivateRoute";



function App() {
  return (

    <StockProvider>
      <Router>
        <Routes>
          <Route path="/cadastro" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/produtos" element={<PrivateRoute><Products /></PrivateRoute>} />
          <Route path="/estoque" element={<PrivateRoute><Stock /></PrivateRoute>} />
          <Route path="/relatorios" element={<PrivateRoute><Reports /></PrivateRoute>} />
        </Routes>
      </Router>
    </StockProvider>

  );
}

export default App;
