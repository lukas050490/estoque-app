import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useEffect, useState } from "react"
import { Container, ContainerUp, ContainerDown } from "./styles"
import Button from "../Button"
import { api } from "../../services/api"
import { toast } from "react-toastify";




const schema = yup.object({
  name: yup.string().required("Nome obrigatório"),
  type: yup.string().required(),
  unit: yup.string().required(),
  quantity: yup.string().required("Quantidade obrigatória"),
  price: yup.number().typeError("Preço inválido").positive().required("Preço obrigatório"),
   expiry: yup
    .date()
    .nullable()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
    ),
  category: yup.string().required("Categoria obrigatória"),
}).required()

export default function ProductForm({ editProduct, setEditProduct, fetchProducts }) {
  const [categories, setCategories] = useState([])

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      type: "unit",
      unit: "un",
      quantity: "",
      price: "",
      expiry: "",
      category: "",
    },
  })

  useEffect(() => {
    async function loadCategories() {
      try {
        const { data } = await api.get("/categories")
        setCategories(data)
      } catch (err) {
        console.error("Erro ao carregar categorias:", err)
      }
    }
    loadCategories()
  }, [])

  useEffect(() => {
    if (editProduct) {
      reset({
        ...editProduct,
        expiry: editProduct.expiry
          ? new Date(editProduct.expiry).toISOString().split("T")[0]
          : "",
        category: String(editProduct.category), // certifique-se de que seja string
      })
    } else {
      reset({
        name: "",
        type: "unit",
        unit: "un",
        quantity: "",
        price: "",
        expiry: "",
        category: "",
      })
    }
  }, [editProduct, reset])

  // const onSubmit = async (data) => {
  //   console.log("onSubmit chamado", data);
  //   const payload = {
  //     name: data.name,
  //     type: data.type,
  //     unit: data.unit,
  //     quantity: Number(data.quantity),
  //     price: Number(data.price),
  //     expiry: data.type === "perishable" ? data.expiry : null,
  //     category_id: Number(data.category),
  //   };

  //   try {
  //     if (editProduct) {
  //       await api.put(`/products/${editProduct.id}`, payload);
  //       setEditProduct(null);
  //     } else {
  //       await api.post("/products", payload);
  //     }

  //     fetchProducts();
  //     reset();
  //   } catch (err) {
  //     console.error("Erro ao salvar produto!", err);
  //   }
  // };

  const onSubmit = async (data) => {
    console.log("onSubmit chamado", data);
    const payload = {
      name: data.name,
      type: data.type,
      unit: data.unit,
      quantity: Number(data.quantity),
      price: Number(data.price),
      expiry: data.type === "perishable" ? data.expiry : null,
      category_id: Number(data.category),
    };

    const toastId = toast.loading("Criando produto...");

    try {
      if (editProduct) {
        await api.put(`/products/${editProduct.id}`, payload);
        setEditProduct(null);
        toast.update(toastId, { render: "Produto atualizado com sucesso!", type: "success", isLoading: false, autoClose: 2000 });
      } else {
        await api.post("/products", payload);
        toast.update(toastId, { render: "Produto criado com sucesso!", type: "success", isLoading: false, autoClose: 2000 });
      }

      fetchProducts();
      reset();
    } catch (err) {
      toast.update(toastId, { render: "Erro ao salvar produto!", type: "error", isLoading: false, autoClose: 3000 });
      console.error(err);
    }
  };

  const handleCancel = () => {
    reset()
    setEditProduct(null)
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ContainerUp>

          <div className="Inputdiv">
            <label>Nome do Produto</label>
            <input type="text" {...register("name")} />
            {errors.name && <span>{errors.name.message}</span>}
          </div>

          <div className="Selectdiv">
            <label>Tipo</label>
            <select {...register("type")}>
              <option value="unit">Unitário</option>
              <option value="perishable">Perecível</option>
            </select>
          </div>

          <div className="Selectdiv">
            <label>Unidade</label>
            <select {...register("unit")}>
              <option value="un">Unidade</option>
              <option value="kg">Kg</option>
              <option value="cx">Caixa</option>
              <option value="lt">Litro</option>
            </select>
          </div>

          <div className="Inputdiv">
            <label>Quantidade</label>
            <input type="number" {...register("quantity")} />
            {errors.quantity && <span>{errors.quantity.message}</span>}
          </div>

          <div className="Inputdiv">
            <label>Preço de Custo (R$)</label>
            <input type="number" step="0.01" {...register("price")} />
            {errors.price && <span>{errors.price.message}</span>}
          </div>

          <div className="Selectdiv">
            <label>Categoria</label>
            <select {...register("category")}>
              <option value="">Selecione</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {errors.category && <span>{errors.category.message}</span>}
          </div>

          {/* Condicional para campo de validade */}
          {watch("type") === "perishable" && (
            <div className="Inputdiv">
              <label>Validade</label>
              <input type="date" {...register("expiry")} />
              {errors.expiry && <span>{errors.expiry.message}</span>}
            </div>
          )}
        </ContainerUp>

        <ContainerDown>
          {editProduct && (
            <Button type="button" onClick={handleCancel}>
              Cancelar
            </Button>
          )}
          <Button type="submit">
            {editProduct ? "Atualizar" : "Adicionar"}
          </Button>
        </ContainerDown>
      </form>
    </Container>
  )
}
