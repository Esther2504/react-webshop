// React, Router & Redux imports
import React from 'react'
import { Link } from 'react-router-dom';

// Overige imports
import styled from 'styled-components';

// Import all images
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../assets/images/social-media', false, /\.(png|jpe?g|svg)$/));

export default function Footer() {
  return (
    <Wrapper>
      <div>
        <p>Klantenservice</p>
        <p>Contact opnemen</p>
        <p>Bestellen en Leveren</p>
        <p>Betalen</p>
        <p>Retourneren</p>
      </div>
      <div>
        <p>Ontdek</p>
        <Link to="/producten">Alle producten</Link>
        <Link to="/manden">Manden</Link>
        <Link to="/speelgoed">Speelgoed</Link>
        <Link to="/halsbanden">Halsbanden</Link>
      </div>
      <div className="social-media">
        <p>Wil je ons volgen?</p>
        <img alt="facebook" src={images["facebook.svg"]} />
        <img alt="instagram" src={images["instagram.svg"]} />
        <img alt="linkedin" src={images["linkedin.svg"]} />
        <img alt="twitter" src={images["twitter.svg"]} />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 7rem;
  background-color: #49abcc;
  color: white;
  display: flex;
  justify-content: space-evenly;
  padding-top: 2rem;

  a {
    text-decoration: none;
    color: white;
    display: block;
    cursor: pointer;
    }

    a:hover {
      text-decoration: underline;
    }

  p {
    margin: 0;
    cursor: pointer;
  }
  p:first-child {
    font-weight: bold;
  }

  p:hover {
    text-decoration: underline;
  }

  p:first-child:hover {
    text-decoration: none;
  }

  img {
    width: 2rem;
  }

  .social-media img {
    padding: 0.2rem;
    cursor: pointer;
  }

  @media only screen and (max-width: 750px) {
    flex-direction: column;
    height: 20rem;
    align-items: center;
    padding: 0;
    text-align: center;
  }
`