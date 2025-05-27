import styled from "styled-components";


export const Container = styled.div`
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: auto;
  min-height: 100vh;
  padding: 2rem 0 2rem 0;
  background: linear-gradient(to bottom, #1976d2 0%, #ffffff 100%);
  overflow-x: hidden;
  overflow-y: auto;
  
  .btn-voltar {
    width: 100%;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

