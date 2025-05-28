import { useEffect, useState } from "react";
import { Container } from "./styles";
import Button from "../Button";
import { api } from "../../services/api";




export default function StockForm({ onRegisterMovement }) {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [type, setType] = useState("entrada");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    async function fetchProducts() {

      const response = await api.get("http://localhost:3001/products");
      setProducts(response.data);
    }

    fetchProducts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const qty = parseFloat(quantity);

    if (!productId || isNaN(qty) || qty <= 0) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    onRegisterMovement(productId, type, qty);
    alert("Movimentação registrada com sucesso!");
    setQuantity("");
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <h2>Registrar Movimentação</h2>

        <div className="SelectDiv">
          <label>Produto</label>
          <select value={productId} onChange={(e) => setProductId(e.target.value)}>
            <option value="">Selecione um produto</option>
            {products.map((prod) => (
              <option key={prod.id} value={prod.id}>
                {prod.name} ({prod.category?.name})
              </option>
            ))}
          </select>
        </div>

        <div className="SelectDiv">
          <label>Tipo de movimentação</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </select>
        </div>

        <div className="InputDiv">
          <label>Quantidade</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Ex: 5 ou 2.5"
          />
        </div>

        <Button type="submit">Registrar</Button>
      </form>
    </Container>
  );
}
