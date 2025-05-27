import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Button from "../../components/Button";
import { Container, Form, Link } from "./styles";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const Register = () => {
  const navigate = useNavigate()

  const schema = yup
    .object({
      name: yup.string().required('O nome é obrigatório'),
      email: yup.string().email('Digite um  email valido.').required('O email é obrigatório'),
      password: yup.string().min(6, 'A senha tem que ter pelo menos seis caracteres.').required('Digite uma senha.'),
      confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'As senhas não conferem').required('Confirme sua senha.'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {

    try {
      const { status } = await api.post('/users', {
        name: data.name,
        email: data.email,
        password: data.password,
      },
        {
          validateStatus: () => true,
        }
      )

      if (status === 200 || status === 201) {
        setTimeout(() => {
          navigate('/login')
        }, 2000)
        return toast.success('🤩Cadastro criado com sucesso!')
      } else if (status === 409) {
        toast.error('😒Email já cadastrado.')
      } else {
        throw new Error()
      }
    } catch (error) {
      toast.error('😒Falha no sistema!Tente novamente.')
    }

  }




  return (
    <Container>
      <h1>Vamos criar uma conta e organizar seu estoque?</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <input type="text" placeholder="Nome" {...register("name")} />
          <p>{errors?.email?.message}</p>
        </div>
        <div>
          <label>Email</label>
          <input type="email" placeholder="email" {...register("email")} />
          <p>{errors?.email?.message}</p>
        </div>
        <div>
          <label>Senha</label>
          <input type="password" placeholder="Senha" {...register("password")} />
          <p>{errors?.password?.message}</p>
        </div>
        <div>
          <label>Confirmar Senha</label>
          <input type="password" placeholder="Senha" {...register("confirmPassword")} />
          <p>{errors?.confirmPassword?.message}</p>
        </div>

        <Button type="submit">Criar Conta</Button>
        <strong>Já tem conta? <Link to="/login">Clique Aqui!</Link></strong>
      </Form>
    </Container>
  );
}

export default Register;