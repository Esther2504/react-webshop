import React from 'react'
import styled from 'styled-components'

// Images import functie
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}
const images = importAll(require.context('../assets/images', false, /\.(png|jpe?g|svg)$/));

export default function NotFound() {
  return (
    <Wrapper>
      <h1>404</h1>
      <h2>Pagina niet gevonden</h2>
      <img alt="" src={images['empty-cart-image.png']} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
text-align: center;

@media only screen and (max-width: 870px) {
  padding-bottom: 15rem;
  img {
    width: 80%;
  }
}
`