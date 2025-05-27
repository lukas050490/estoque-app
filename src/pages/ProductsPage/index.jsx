import { useState, useEffect } from "react";
import ProductForm from "../../components/ProductsForm";
import { Container, Content } from "./styles";
import Button from "../../components/Button";
import { useNavigate } from 'react-router-dom';
import ProductList from "../../components/ProductList";
import { api } from "../../services/api";

const Products = () => {
  
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  return (
    <Container>
      <h2 >Cadastro de Produtos</h2>
      <Button className="btn-voltar" onClick={() => navigate("/")}>Voltar</Button>
      <ProductForm
        editProduct={editProduct}
        setEditProduct={setEditProduct}
        fetchProducts={fetchProducts}
      
      />
      <Content>
        <h3>Produtos Cadastrados</h3>
        <ProductList
          products={products}
          onEdit={setEditProduct}
          fetchProducts={fetchProducts}
        />
      </Content>
    </Container>
  );
};

export default Products;
