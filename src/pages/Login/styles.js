import styled from "styled-components";
import BackgroundImage from "../../assets/background-login.png";
import {Link as ReactLink} from 'react-router-dom';


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  h1{
    font-size: 2rem;
    margin-bottom: 20px;
  }
`;

export const Form = styled.form`
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #0056b3;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 1);

  div {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 20px;

    label {
      font-size: 1rem;
      margin-bottom: 5px;
      color: #0056b3;
      font-weight: bold;
    }

    input {
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
      font-size: 1rem;
    }

    p{
      color: red;
      font-size: 0.8rem;
      margin-top: 5px;
      height: 10px;
    }
  }

  strong{
    font-size: 0.9rem;
    margin-top: 10px;
    font-weight: bold;
  }

`;

export const Link = styled(ReactLink)`
  color: #0056b3;
  text-decoration: none;
  font-size: 0.9rem;
  margin-top: 10px;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;