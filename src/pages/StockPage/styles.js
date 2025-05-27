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

  .FilterDiv{

    input{
      height: 30px;
      width: 200px;
    }
    select{
      height: 30px;
      width: 200px;
    }
    label{
      margin-right: 5px;
      color: #0056b3;
      font-size: bold;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

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
