import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: linear-gradient(to top, #1976d2 0%, #ffffff 100%);


  .ItensDiv{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.5rem;
    background-color: #f1f1f1;
    border-radius: 4px;
    margin-bottom: 0.5rem;

    span{
      font-size: 16px;
      color: #333;
    }
    p{
      font-size: 14px;
      color: #666;
    }
  }
`;

export const SectionInput = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  input{
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
  }

`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  h3{
    font-size: 28px;
  }
  .Totais {
    display: flex;
    flex-wrap: wrap;
    gap: 18px;
  }
`;

export const Result = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  padding: 20px 24px;
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 220px;
  max-width: 350px;

  p {
    margin: 0;
    font-size: 1.1rem;
  }

  .product-name {
    font-weight: bold;
    font-size: 1.25rem;
    color: #2d4373;
    margin-bottom: 8px;
  }
  .entrada {
    color: #2e7d32;
    font-weight: 500;
  }
  .saida {
    color: #c62828;
    font-weight: 500;
  }
  .saldo {
    color: #1565c0;
    font-weight: 600;
    font-size: 1.15rem;
  }
`;