import styled from "styled-components";

export const Grid = styled.div`
  max-width: 442px;
  margin: 2rem auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
`;

export const Content = styled.div`
  width: 98px;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  & p {
    font-size: 1rem;
  }
`;
