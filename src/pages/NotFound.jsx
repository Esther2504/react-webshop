import React from 'react'
import styled from 'styled-components'

export default function NotFound() {
  return (
    <Wrapper>
    <h1>404</h1>
    <h2>Pagina niet gevonden</h2>
    <img src={process.env.PUBLIC_URL + "images/empty-cart-image.png"} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
text-align: center;
`