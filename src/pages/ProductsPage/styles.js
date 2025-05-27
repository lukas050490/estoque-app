import styled from "styled-components";


export const Container = styled.div`
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  padding-top: 20rem;
  background: linear-gradient(to bottom, #1976d2 0%, #ffffff 100%);

  .btn-voltar {
    width: 100%;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

