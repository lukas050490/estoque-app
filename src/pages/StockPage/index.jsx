import { useEffect, useState } from "react";
import StockForm from "../../components/StockForm";
import { Container, Content } from "./styles";
import Button from "../../components/Button";
import { useNavigate } from 'react-router-dom';
import { api } from "../../services/api";

const Stock = () => {
  const [products, setProducts] = useState([]);
  const [movements, setMovements] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsRes, movementsRes] = await Promise.all([
          api.get("http://localhost:3001/products"),
          api.get("http://localhost:3001/stock") // Rota que você criar
        ]);
        setProducts(productsRes.data);
        setMovements(movementsRes.data);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      }
    }

    fetchData();
  }, []);

  const addMovement = async (movement) => {
    try {
      const response = await api.post("http://localhost:3001/stock", movement);
      setMovements((prev) => [...prev, response.data]);
    } catch (err) {
      console.error("Erro ao registrar movimentação:", err);
    }
  };

  const movementsWithProduct = movements.map((mov) => {
    const product = products.find((p) => p.id === mov.product_id);
    return {
      ...mov,
      product,
    };
  });

  const filteredMovements = movementsWithProduct.filter((mov) => {
    const matchesCategory =
      selectedCategory === "" || mov.product?.category?.name === selectedCategory;

    const matchesDate =
      selectedDate === "" ||
      new Date(mov.date).toISOString().split("T")[0] === selectedDate;

    return matchesCategory && matchesDate;
  });


  return (
    <Container>
      <h2>Movimentações de Estoque</h2>
      <Button onClick={() => navigate("/")}>Voltar</Button>
      <StockForm onRegisterMovement={(productId, type, quantity) => {
        addMovement({
          product_id: productId,
          quantity,
          type,
          date: new Date().toISOString(),
        });
      }} />

      <div className="FilterDiv">
        <label>Filtrar por Data</label>
        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
      </div>

      <div className="FilterDiv">
        <label>Filtrar por Categoria</label>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Todas</option>
          {[...new Set(products.map((prod) => prod.category?.name))].map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <Content>
        <h3>Movimentações Recentes</h3>
        {filteredMovements.length === 0 ? (
          <p>Nenhuma movimentação registrada.</p>
        ) : (
          <ul>
            {filteredMovements.map((mov) => (
              <li key={mov.id}>
                <div className="ItensDiv">
                  <span>
                    {mov.product?.name || 'Desconhecido'} ({mov.product?.category?.name || ''})
                  </span>
                  <span>{mov.type === "entrada" ? "+" : "-"} {mov.quantity}</span>
                </div>
                <p>{new Date(mov.date).toLocaleString("pt-BR")}</p>
              </li>
            ))}
          </ul>
        )}
      </Content>
    </Container>
  );
};

export default Stock;
