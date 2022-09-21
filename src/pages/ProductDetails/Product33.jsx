// React, Router & Redux imports
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { addProduct } from '../../utils/cartReducer'

// Overige imports
import styled from 'styled-components'
import data from '../../products.json';

// Import all images
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../../assets/images', false, /\.(png|jpe?g|svg)$/));
const productimages = importAll(require.context('../../assets/images/products', false, /\.(png|jpe?g|svg)$/));

export default function Product33() {
  const [slide, setSlide] = useState(productimages[data[8].image1])
  const dispatch = useDispatch();

  let amount = 1

 const nextSlide = () => {
  
    if (slide == productimages[data[8].image1]) {
      setSlide(productimages[data[8].image2])
    } else {
      setSlide(productimages[data[8].image1])
    }
  }

  return (
    <Wrapper>
      <p className="breadcrumbs"><Link to="/">Home</Link> <img alt="" src={images['right-arrow.svg']} /> <Link to="/producten">Producten</Link> <img alt="" src={images['right-arrow.svg']} /> <Link to={`/${data[8].category}`}>Halsbanden</Link> <img alt="" src={images['right-arrow.svg']} /> {data[8].productname}</p>
      <div className="container">
      <div className="slide-container">
      <div className="slide-images">
      <img alt="pijl links" className="slide-arrow left" onClick={nextSlide} src={images['arrow-left.svg']} />
      <img alt="product" src={slide} />
      <img alt="pijl rechts" className="slide-arrow right" onClick={nextSlide} src={images['arrow-right.svg']} />
      </div>
      <p onClick={nextSlide}>● ●</p></div>
      <div className="product-info">
      <h1>{data[8].productname}</h1>
      <h2>€{data[8].price}</h2>
      <p>{data[8].description}</p>
      <input min="1" placeholder="1" onChange={(e) => amount = e.target.value} type="number" />
      <button onClick={() => dispatch(addProduct({ id: `${data[8].id}`, amount: `${amount}` }))}><img alt="winkelmandje" className="cart" src={images['shopping-cart-add.svg']} /> Bestel</button>
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

.container {
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
    font-style: normal;
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
  .container {
    padding-bottom: 7rem;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10rem;
    text-align: center;
    width: 100%;
    margin-top: 1rem;
    height: 100%;
  }

  .slide-container {
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 100%;
    justify-content: flex-start;

    .slide-images {
      width: 100%;
    }

    img {
      width: 60%;
      margin: auto;
    }

    .slide-arrow {
      position: absolute;
    }

    .left {
      top: 18rem;
      left: 0;
    }

    .right {
      top: 18rem;
      right: 0;
    }
  }

  .product-info {
    margin-top: -3rem;
    width: 100%;
  }
 
}
`