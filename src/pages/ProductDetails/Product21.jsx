// React, Router & Redux imports
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { addProduct } from '../../utils/cartReducer'

// Overige imports
import styled from 'styled-components'
import data from '../../products.json';

export default function Product21() {
  const [slide, setSlide] = useState(`/images/products/${data[3].image1}`)
  const dispatch = useDispatch();

  let amount = 1

 const nextSlide = () => {
  console.log('click')
    if (slide == `/images/products/${data[3].image1}`) {
      setSlide(`/images/products/${data[3].image2}`)
    } else {
      setSlide(`/images/products/${data[3].image1}`)
    }
  }

  return (
    <Wrapper>
      <p className="breadcrumbs"><Link to="/">Home</Link> <img src={process.env.PUBLIC_URL + "/images/right-arrow.svg"} /> <Link to="/producten">Producten</Link> <img src={process.env.PUBLIC_URL + "/images/right-arrow.svg"} /> <Link to={`/${data[3].category}`}>Speelgoed</Link> <img src={process.env.PUBLIC_URL + "/images/right-arrow.svg"} /> {data[3].productname}</p>
      <div className="content">
      <div className="slide-container">
      <div className="slide-images">
      <img className="slide-arrow" onClick={nextSlide} src={process.env.PUBLIC_URL + "/images/arrow-left.svg"} />
      <img src={process.env.PUBLIC_URL + slide} />
      <img className="slide-arrow" onClick={nextSlide} src={process.env.PUBLIC_URL + "/images/arrow-right.svg"} />
      </div>
      <p onClick={nextSlide}>● ●</p></div>
      <div className="product-info">
      <h1>{data[3].productname}</h1>
      <h2>€{data[3].price}</h2>
      <p>{data[3].description}</p>
      <input min="1" placeholder="1" onChange={(e) => amount = e.target.value} type="number" />
      <button onClick={() => dispatch(addProduct({ id: `${data[3].id}`, amount: `${amount}` }))}><img alt="winkelmandje" className="cart" src={process.env.PUBLIC_URL + "/images/shopping-cart-add.svg"} /> Bestel</button>
      </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
img {
  width: 25rem;
  border-radius: 3rem;
}

button {
  border: 1px solid white;
  background-color: #49abcc;
  color: white;
  cursor: pointer;
  font-size: 1rem;
}

input {
  width: 2rem;
  margin-right: 1rem;
}

p {
  font-style: italic;
}

.breadcrumbs {
  font-style: normal;
  position: absolute;
  top: 6.5rem;
  left: 0.5rem;
  
    a {
      text-decoration: none;
      color: black;
    }
  
    a:hover {
      text-decoration: underline;
    }
  
    img {
      width: 0.7rem;
    }
  }

.content {
  display: flex;
  align-items: center;
  width: 55rem;
  margin: auto;
  justify-content: space-between;
  height: 100vh;
  margin-top: -2rem;
  }  

.slide-images {
  display: flex;
  width: 29rem;
  justify-content: space-between;

  .slide-arrow {
    width: 1.5rem;
    cursor: pointer;
  }
}

.slide-container {
  text-align: center;

  p {
    cursor: pointer;
  }
}

.product-info {
  width: 23rem;
  font-size: 90%;
  margin-top: -3rem;

  button {
    font-size: 0.9rem;

    img {
      width: 0.8rem;
    }
  }
}

@media only screen and (max-width: 870px) {
  .content {
    padding-bottom: 7rem;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10rem;
    text-align: center;
    width: 100%;
    margin-top: 1rem;
  }

  .product-info {
    margin-top: 0;  
  }
}
`