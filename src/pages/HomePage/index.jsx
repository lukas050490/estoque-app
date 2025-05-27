import { Container } from "./styles";
import { Link } from "react-router-dom";


const Home = () => {
    return (
        <Container>
        <h1>Bem vindo ao Stock Resolver !</h1>
        <h3>Este programa foi feito para ajudar você a organizar seu estoque, por onde vamos começar?</h3>
        <div className="divLinks">
            <h2>O que você deseja fazer?</h2>
            <ul>
                <li><Link to="/produtos">Cadastrar Produtos</Link></li>
                <li><Link to="/estoque">Gerenciar Estoque</Link></li>
                <li><Link to="/relatorios">Gerar Relatórios</Link></li>
            </ul>
        </div>
        </Container>
    );
}

export default Home;