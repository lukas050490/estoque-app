import styled from "styled-components";
import BackgroundImageHome from "../../assets/background-register.png";
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
   background-image: url(${BackgroundImageHome});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

  h1{
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3{
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: #333;
  }

  .divLinks{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 600px;
    margin-top: 2rem;

    h2{
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #333;
    }

    ul{
      list-style-type: none;
      padding: 0;
      display: flex;
      gap: 10px;

      li{
        margin-bottom: 1rem;
        font-size: 1.2rem;
        border: 1px solid #007BFF;
        border-radius: 5px;
        width: 200px;
        height:100px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f8f9fa;
        box-shadow: 0 2px 4px rgba(74, 97, 229, 0.1);
        transition: background-color 0.3s ease, transform 0.3s ease;

        a{
          text-decoration: none;
          color: #007BFF;
          transition: color 0.3s ease;

          &:hover{
            color: #0056b3;
          }
        }
      }
    }
  }
`;