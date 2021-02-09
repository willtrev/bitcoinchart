import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p{
    margin-top: 20px;
  }
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #D0BCD5;
`;

export const CurrencyBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;

export const LoadingContainer = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;

    h2{
      margin-top: 10px;
    }
`;


