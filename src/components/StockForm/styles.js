import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);


  form{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    
    h2{
      color:  #007bff;
    }

    .SelectDiv{
      label{
        font-size: 18px;
        gap:5px;
      }
      select{
      height:30px;
      width: 100%;
      padding: 5px;
      }
    }

    .InputDiv{
      label{
        font-size: 18px;
        gap:5px;
      }
      input{
      height:30px;
      width: 100%;
      padding: 5px;
      }
    }
  }
`;