
import { Container, Root, Td, Th } from "./styles";
import Button from "../Button";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { FormatPrice } from "../../utils/FormatPrice";
import { formatDateToInput } from "../../utils/FormatDate";


export default function ProductList({ products, onEdit, fetchProducts }) {

  const [categories, setCategories] = useState([]);

  const handleDelete = async (id) => {
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data));
  }, []);

  const getCategoryName = (categoryId) => {
    const cat = categories.find((c) => String(c.id) === String(categoryId));
    return cat ? cat.name : "-";
  };

  if (products.length === 0) {
    return <p>Nenhum produto cadastrado ainda.</p>;
  }


  return (
    <Container>
      <Root>
        <thead>
          <tr>
            <Th>Nome</Th>
            <Th>Tipo</Th>
            <Th>Unidade</Th>
            <Th>Quantidade</Th>
            <Th>Preço (R$)</Th>
            <Th>Validade</Th>
            <Th>Category</Th>
            <Th>Ações</Th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod.id}>
              <Td>{prod.name}</Td>
              <Td>{prod.type === 'unit' ? 'Unitário' : 'Perecível'}</Td>
              <Td>{prod.unit}</Td>
              <Td>{prod.quantity}</Td>
              <Td>{FormatPrice(prod.price || '-')}</Td>
              <Td>{prod.type === 'perishable' ? formatDateToInput(prod.expiry) : '-'}</Td>
              <Td>{getCategoryName(prod.category_id)}</Td>
              <Td>
                <Button
                  onClick={() => onEdit(prod)}
                >
                  Editar
                </Button>
                <Button
                  onClick={() => handleDelete(prod.id)}
                >
                  Excluir
                </Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Root>
    </Container>
  );
}
