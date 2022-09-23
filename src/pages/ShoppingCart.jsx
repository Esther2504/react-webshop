// React, Router & Redux imports
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeProduct, clearCart, changeProduct } from '../utils/cartReducer';
import { Link } from 'react-router-dom';

// Overige imports
import styled from 'styled-components';
import { data } from '../products';

// Images import functie
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../assets/images', false, /\.(png|jpe?g|svg)$/));
const productimages = importAll(require.context('../assets/images/products', false, /\.(png|jpe?g|svg)$/));

export default function ShoppingCart() {
  const products = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  // Totaalprijs wordt berekend
  let subtotal = 0;
  data.forEach((product) => {
    products.filter(cartproduct => (product.id === cartproduct.id) ? (
      subtotal += Number(product.price * cartproduct.amount)
    )
      : null
    )
  })

  let shipping = 0;
  if (subtotal < 20 && subtotal > 0) {
    shipping = 2.50
  }

  return (
    <Wrapper>
      {Object.keys(products).length > 0 ?
        <>
          <div>
            {products.map((cartproduct) =>
              <Product key={Math.random()} {...cartproduct} />)
            }
          </div>
          <button className="clear-cart" onClick={() => dispatch(clearCart())}>Leeg winkelwagen</button>
          <div className="total">
            <p><span>Subtotaal:</span><span className="total-price">€{subtotal.toFixed(2)}</span></p>
            <p><span>Verzendkosten*:</span><span className="total-price">€{shipping.toFixed(2)}</span></p>
            <hr></hr>
            <p><span><b>Totaal:</b></span><span className="total-price"><b>€{(subtotal + shipping).toFixed(2)}</b></span></p>
            <button className="order-button">Bestel</button>
            <p style={{ fontSize: "0.7rem", marginTop: "-0.6rem" }}>*Gratis verzending vanaf €20</p>
          </div>
        </>
        :
        <div className="empty-cart">
          <img alt="" src={images['empty-cart-image.png']} />
          <h1>Je winkelwagen is leeg</h1>
          <Link to="/producten"><button>Verder winkelen</button></Link>
        </div>
      }
    </Wrapper>
  )
}

// Producten winkelwagen
export function Product({ id, amount }) {
  const dispatch = useDispatch()

  return (
    <ProductsWrapper>
      {data.map((product) =>
        product.id === `${id}` ? (
          <div key={Math.random()} className="product">
            <img alt={product.productname} className="img" src={productimages[product.productimage]} />
            <div className="product-info">
              <Link to={`../${product.category}/${product.id}`}>
                <h2>{product.productname}</h2>
                <p>€{product.price}</p>
              </Link>
              <div className="product-amount">
                <button onClick={() => dispatch(changeProduct({ id: `${id}`, action: `dec` }))}>-</button>
                <p>{amount}</p>
                <button onClick={() => dispatch(changeProduct({ id: `${id}`, action: `inc` }))}>+</button>
              </div>
            </div>
            <button onClick={() => dispatch(removeProduct({ id: `${id}` }))}>Verwijder</button>
          </div>
        )
          : null
      )
      }
      <hr></hr>
    </ProductsWrapper>
  )
}

const Wrapper = styled.div`
display: flex;
color: rgb(52, 85, 109);
justify-content: space-between;
padding-bottom: 1rem;

hr {
  width: 90%;
  margin-left: 0;
}

.clear-cart {
  align-self: flex-end;
  position: relative;
  right: 13.5rem;
  top: 1rem;
  border-style: none;
  background-color: #49abcc;
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
}

.total {
  background-color: rgb(52, 85, 109, 0.1);
  width: 14rem;
  height: 11rem;
  margin-top: 3rem;
  padding-left: 1rem;
  margin-right: 4rem;

 p {
  display: flex;
  justify-content: space-between;
  width: 90%;
 }
}

.order-button {
  border-style: none;
  background-color: #49abcc;
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  position: relative;
  left: 9.5rem;
  top: 0.3rem;
  }

  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    button {
      width: 6rem;
      height: 3rem;
      color: white;
      border-style: none;
      border-radius: 0.5rem;
      font-size: 1rem;
    }
  }

@media only screen and (max-width: 870px) {
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 13rem;

  .total {
    margin-right: 0;
  }

  .clear-cart {
    right: 0;
    align-self: center;
  }

  .empty-cart {
    text-align: center;

  img {
    width: 80%;
  }
}
  }
`

const ProductsWrapper = styled.div`
flex-direction: column;
justify-self: flex-start;

img {
  width: 14rem;
  margin-right: 1rem;
}

hr {
  width: 100%;
  margin-left: 1rem;
}

button {
  border: 1px solid white;
  background-color: #49abcc;
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
}

input {
  width: 2rem;
  margin-right: 1rem;
}

p {
  font-style: italic;
}

.product {
  display: flex;
  align-items: center;
  width: 38rem;
  margin-left: 2rem;
}

.product-amount {
  display: flex;
  height: 2rem;
  align-items: center;

  p {
    font-style: normal;
    width: 1.5rem;
    text-align: center;
  }
}

.product-info {
  width: 18rem;
}

a {
  text-decoration: none;
  color: inherit;
}

a h2:hover {
  cursor: pointer;
  text-decoration: underline;
}

@media only screen and (max-width: 870px) {
  .product {
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-left: 0;
  }

  .product-amount {
    justify-content: center;
  }
}
`