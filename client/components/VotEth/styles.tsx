import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Title = styled.h1`
  text-transform: uppercase;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0;
  marging-bottom: 20px;

  thead {
    font-weight: bold;
  }

  tbody {
    text-align: center;
  }
`
