import styled from "styled-components";
export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  
`;

export const ContainerUp = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  .Inputdiv{
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

  .Selectdiv{
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
`;

export const ContainerDown = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;

  
`;