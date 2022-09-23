// React, Router & Redux imports
import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../utils/cartReducer';

// Overige imports
import styled from 'styled-components';
import { data } from '../../products';

// Import images functie
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}
const images = importAll(require.context('../../assets/images', false, /\.(png|jpe?g|svg)$/));
const productimages = importAll(require.context('../../assets/images/products', false, /\.(png|jpe?g|svg)$/));

export default function SearchResults() {
  const searchterm = useSelector((state) => state.search.text)
  const [amount, setAmount] = useState(1)
  const dispatch = useDispatch()

  return (
    <Wrapper>
      <>
        <h1>Zoekresultaten voor "{searchterm}"</h1>
        <div className="products-container">
          {data.map((product) =>
            (product.keywords).includes(searchterm.toLowerCase()) ? (
              <div key={Math.random()} className="product">
                <Link to={`../${product.category}/${product.id}`}>
                  <div className="product-info">
                    <img alt={product.productname} className="img" src={productimages[product.productimage]}></img>
                    <h1>{product.productname}</h1>
                    <p>€{product.price}</p>
                  </div>
                </Link>
                <div>
                  <input min="1" placeholder="1" onChange={(e) => setAmount(e.target.value)} type="number" />
                  <button onClick={() => { dispatch(addProduct({ id: `${product.id}`, amount: `${amount}` })); setAmount(1) }}><img alt="winkelmandje" className="cart" src={images['shopping-cart-add.svg']} /> In winkelwagen</button>
                </div>
              </div>
            )
              : null
          )}
        </div>
      </>
    </Wrapper>
  )
}

const Wrapper = styled.div`
margin: auto;
text-align: center;
min-height: 95vh;

input {
  width: 2rem;
  margin-right: 1rem;
}

a {
  text-decoration: none;
  color: #34556d;
}

img {
  width: 20rem;
}

.products-container {
  display: flex;
  width: 100%;
  margin: 2rem;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1rem;

  p {
    font-size: 1rem;
    margin-top: -1rem;
  }

  img {
    width: 13rem;
    max-width: 100%;
  }

  h1 {
    font-size: 1.5rem;
  }

  button {
    font-size: 0.9rem;

    img {
      width: 0.8rem;
      max-width: 100%;
    }
  }
}

.product {
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  width: 18rem;
  height: 22rem;
  display: flex;
  flex-direction: column;
  background-color: white;
  max-width: 100%;
  transition: all .2s ease-in-out;
}

.product:hover {
  transform: scale(1.05);
}

p {
font-size: 1.3rem;
margin-top: -1rem;
}

button {
  border: 1px solid white;
  background-color: #49abcc;
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  input[type=number] {
    -moz-appearance: textfield;
  }

@media only screen and (max-width: 870px) {
    padding-bottom: 9rem;
  
    .products-container {
      flex-direction: column;
      align-items: center;
      width: 100%;
      margin: 0;
      flex-wrap: wrap;
    }
  
    .product {
      margin-bottom: 2rem;
    }
  }
`
