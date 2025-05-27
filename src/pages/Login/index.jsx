import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Button from "../../components/Button";
import { Container, Form, Link } from "./styles";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const navigate = useNavigate()


  const schema = yup
    .object({
      email: yup.string().email('Digite um  email valido.').required('O email é obrigatório'),
      password: yup.string().min(6,'A senha tem que ter pelo menos seis caracteres.').required('Digite uma senha.'),
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
    const {data:{token}} = await toast.promise(
      api.post('/session',{
        email: data.email,
        password: data.password,
      }),
      {
        pending: '🥱Fazendo login...',
        success: { 
          render() {
            setTimeout(() => {
              navigate('/')
            }, 2000)
             return '🤩Login feito com sucesso!';
          },
        },
        error: '😒Erro ao fazer login.',
      }
    )
    localStorage.setItem('token',token);
  }




  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input type="email" placeholder="email" {...register("email")} />
          <p>{errors?.email?.message}</p>
        </div>
        <div>
          <label>Senha</label>
          <input type="password" placeholder="Senha" {...register("password")}/>
          <p>{errors?.password?.message}</p>
        </div>

        <Button type="submit">Entrar</Button>
        <strong>Esqueceu a senha?<Link> Clique Aqui!</Link></strong> 
        <strong>Não tem uma conta?<Link to="/cadastro">Clique Aqui!</Link></strong>
      </Form>
    </Container>
  );
}

export default Login;