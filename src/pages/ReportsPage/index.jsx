import { useState, useEffect } from "react";
import { Container, SectionInput, Section, Result } from "./styles";
import Button from "../../components/Button";
import { useNavigate } from 'react-router-dom';
import { api } from "../../services/api";

const Reports = () => {
  const [products, setProducts] = useState([]);
  const [stockMovements, setStockMovements] = useState([]);
  const [filterInput, setFilterInput] = useState({ day: "", month: "", year: "" });
  const [filter, setFilter] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const [productsRes, movementsRes] = await Promise.all([
        api.get("/products"),
        api.get("/stock"),
      ]);
      setProducts(productsRes.data);
      setStockMovements(movementsRes.data);
    }
    fetchData();
  }, []);

  const getProductName = (id) =>
    products.find((p) => p.id === id)?.name || "Desconhecido";

  const handleChange = (e) => {
    setFilterInput({ ...filterInput, [e.target.name]: e.target.value });
  };

  const applyFilter = () => {
    setFilter(filterInput);
  };

  const clearFilter = () => {
    setFilter(null);
    setFilterInput({ day: "", month: "", year: "" });
  };



  const filteredMovements = stockMovements.filter((m) => {
    if (!filter) return false;

    const movementDate = new Date(m.date);
    const filterDay = filter.day.padStart(2, "0");
    const filterMonth = filter.month.padStart(2, "0");
    const filterYear = filter.year.padStart(4, "0");

    const movementDay = String(movementDate.getDate()).padStart(2, "0");
    const movementMonth = String(movementDate.getMonth() + 1).padStart(2, "0");
    const movementYear = String(movementDate.getFullYear());

   
    if (filter.day && filter.month && filter.year) {
      return (
        movementDay === filterDay &&
        movementMonth === filterMonth &&
        movementYear === filterYear
      );
    }
    
    if (!filter.day && filter.month && filter.year) {
      return (
        movementMonth === filterMonth &&
        movementYear === filterYear
      );
    }
    
    if (!filter.day && !filter.month && filter.year) {
      return movementYear === filterYear;
    }
    return false;
  });

  const calculateProductBalances = () => {
    if (!filter) return [];

    let filterDateLimit;
    if (filter.day && filter.month && filter.year) {
      
      filterDateLimit = new Date(`${filter.year}-${filter.month.padStart(2, "0")}-${filter.day.padStart(2, "0")}T23:59:59`);
    } else if (!filter.day && filter.month && filter.year) {
      
      const year = Number(filter.year);
      const month = Number(filter.month);
      const lastDay = new Date(year, month, 0).getDate(); // último dia do mês
      filterDateLimit = new Date(`${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}T23:59:59`);
    } else if (!filter.day && !filter.month && filter.year) {
     
      filterDateLimit = new Date(`${filter.year}-12-31T23:59:59`);
    } else {
      return [];
    }

    return products.map((product) => {
      const initialQuantity = Number(product.quantity) || 0;

      const productMovements = stockMovements.filter((mov) => {
        if (mov.product_id !== product.id) return false;
        const movementDate = new Date(mov.date);
        return movementDate <= filterDateLimit;
      });

      const totalEntrada = productMovements
        .filter((mov) => mov.type === "entrada")
        .reduce((acc, curr) => acc + Number(curr.quantity), 0);

      const totalSaida = productMovements
        .filter((mov) => mov.type === "saida")
        .reduce((acc, curr) => acc + Number(curr.quantity), 0);

      const saldo = initialQuantity + totalEntrada - totalSaida;

      return {
        name: product.name,
        totalEntrada,
        totalSaida,
        saldo,
      };
    });
  };


  return (
    <Container>
      <h2>
        Relatórios de Estoque
      </h2>
      <h3>você pode gerenciar o relatório pelo dia preenchendo a data completa,
        por mês preenchendo mês e ano e por ano preenchendo apenas o ano.</h3>
      <Button onClick={() => navigate("/")}>Voltar</Button>

      <SectionInput>
        <input
          type="text"
          name="day"
          placeholder="Dia (ex: 01)"
          value={filterInput.day}
          onChange={handleChange}
        />
        <input
          type="text"
          name="month"
          placeholder="Mês (ex: 04)"
          value={filterInput.month}
          onChange={handleChange}
        />
        <input
          type="text"
          name="year"
          placeholder="Ano (ex: 2025)"
          value={filterInput.year}
          onChange={handleChange}
        />
        <Button
          onClick={applyFilter}
        >
          Buscar
        </Button>
        <Button
          onClick={clearFilter}
        >
          Limpar Filtro
        </Button>
      </SectionInput>

      <ul>
        {filter === null ? (
          <p>Nenhum movimento listado. Clique em "Buscar" para aplicar o filtro.</p>
        ) : filteredMovements.length === 0 ? (
          <p>
            {stockMovements.length === 0
              ? "Nenhum movimento no estoque encontrado"
              : "Nenhum movimento corresponde ao filtro"}
          </p>
        ) : (
          filteredMovements.map((mov) => (
            <li key={mov.id}>
              <div className="ItensDiv">
                <span>{getProductName(mov.product_id)}</span>
                <span>{mov.type === "entrada" ? "+" : "-"} {mov.quantity}</span>
              </div>
              <p>{new Date(mov.date).toLocaleDateString()}</p>
            </li>
          ))
        )}
      </ul>

      <Section>
        <h3>Totais</h3>
        <div className="Totais">
          {filter === null ? (
            <p>Nenhum total disponível. Aplique um filtro para visualizar os totais.</p>
          ) : (
            calculateProductBalances().map((product) => (
              <Result key={product.name}>
                <p className="product-name">{product.name}</p>
                <p className="entrada">Entradas: {product.totalEntrada}</p>
                <p className="saida">Saídas: {product.totalSaida}</p>
                <p className="saldo">Saldo: {product.saldo}</p>
              </Result>
            ))
          )}
        </div>
      </Section>
    </Container>
  );
};

export default Reports;

