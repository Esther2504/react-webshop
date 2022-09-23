// React, Router & Redux imports
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addProduct } from '../../utils/cartReducer';
import { useParams } from 'react-router-dom';

// Overige imports
import styled from 'styled-components';
import { data } from '../../products';

// Import all images
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../../assets/images', false, /\.(png|jpe?g|svg)$/));
const productimages = importAll(require.context('../../assets/images/products', false, /\.(png|jpe?g|svg)$/));

export default function Product() {
  const [sorting, setSorting] = useState()
  const [color, setColor] = useState()
  const [minprice, setMinPrice] = useState("0")
  const [maxprice, setMaxPrice] = useState("1500")
  const [amount, setAmount] = useState(1)
  const dispatch = useDispatch()

  // Sorteren op prijs
  if (sorting === "low") {
    data.sort(function (a, b) {
      return a.price - b.price;
    });
  } else if (sorting === "high") {
    data.sort(function (a, b) {
      return b.price - a.price;
    });
  }

  // Bij leeghalen velden worden alle producten weer getoond
  if (minprice === "") {
    setMinPrice("0")
  } else if (maxprice === "") {
    setMaxPrice("1500")
  }

  const { category } = useParams();
  let filteredData = data.filter(item => item.category === category)

  let products = filteredData
  if (color) {
    products = filteredData.filter(product => (product.color).includes(color))
  }

  return (
    <Wrapper>
      <p className="breadcrumbs"><Link to="/">Home</Link> <img alt="" src={images['right-arrow.svg']} /> <Link to="/producten">Producten</Link> <img alt="" src={images['right-arrow.svg']} /> {filteredData[0].category[0].toUpperCase() + filteredData[0].category.substring(1)}</p>
      <div className="container">
        <div className='filters'>
          <div>
            <p><b>Prijs</b></p>
            <div className="sorting">
              <select onChange={(e) => setSorting(e.target.value)}>
                <option value="">Sorteer:</option>
                <option value="low" onClick={() => setSorting("low")}>laag - hoog</option>
                <option value="high" onClick={() => setSorting("high")}>hoog - laag</option>
              </select>
            </div>
            <div>
              € <input onChange={(e) => setMinPrice(e.target.value)}></input>-
              € <input onChange={(e) => setMaxPrice(e.target.value)}></input>
            </div>
          </div>
          <div>
            <p><b>Kleur</b></p>
            <div className="color-filters">
              <button style={{ backgroundColor: "red" }} onClick={() => setColor("rood")} />
              <button style={{ backgroundColor: "blue" }} onClick={() => setColor("blauw")} />
              <button style={{ backgroundColor: "green" }} onClick={() => setColor("groen")} />
              <button style={{ backgroundColor: "yellow" }} onClick={() => setColor("geel")} />
              <button style={{ backgroundColor: "gray" }} onClick={() => setColor("grijs")} />
              <button style={{ backgroundColor: "white", border: "1px solid black" }} onClick={() => setColor("wit")} />
              <button style={{ backgroundColor: "black" }} onClick={() => setColor("zwart")} />
              <button style={{ backgroundColor: "brown" }} onClick={() => setColor("bruin")} />
              <button style={{ backgroundColor: "orange" }} onClick={() => setColor("oranje")} />
              <button style={{ backgroundColor: "pink" }} onClick={() => setColor("roze")} />
              <button style={{ backgroundColor: "purple" }} onClick={() => setColor("paars")} />
              <button style={{ background: `url(${images['colors.jpg']})`, backgroundSize: "3rem" }} onClick={() => setColor("")} />
            </div>
          </div>
        </div>
        <div className="products-container">
          {products.map((product) =>
            product.price >= parseInt(minprice) && product.price <= parseInt(maxprice) ? (
              <div className="product" key={Math.random()}>
                <Link to={`${product.id}`}>
                  <div>
                    <img alt={product.productname} src={productimages[product.productimage]} />
                    <h1>{product.productname}</h1>
                    <p>€{product.price}</p>
                  </div>
                </Link>
                <div>
                  <input min="1" placeholder="1" onChange={(e) => setAmount(e.target.value)} type="number" />
                  <button onClick={() => { dispatch(addProduct({ id: `${product.id}`, amount: `${amount}` })); setAmount(1) }}>
                    <img alt="winkelmandje" className="cart" src={images['shopping-cart-add.svg']} /> In winkelwagen</button>
                </div>
              </div>
            )
              : null
          )}
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
a {
  text-decoration: none;
  color: #34556d;
}

input {
  width: 1.5rem;
  max-width: 100%;
  margin-right: 0.6rem;
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
      max-width: 100%;
    }
  }

  .container {
    margin: 1rem auto;
    text-align: center;
    min-height: 100vh;
    display: flex;
  }

.filters {
  width: 14rem;
  max-width: 100%;
  height:  17rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 1rem auto 2rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border: 2px solid #49abcc;

  .sorting {
    margin-bottom: 1rem;
  }

  .color-filters {
    width: 8rem;
    max-width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
       
    button {
      width: 1.8rem;
      max-width: 100%;
      height: 1.8rem;
      border-radius: 1rem;
    }
  }
}

.products-container {
  display: flex;
  width: 56rem;
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

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

@media only screen and (max-width: 950px) {
  .container {
    padding-bottom: 7rem;
    flex-direction: column;
    align-items: center;
  }

  .filters {
    width: 23rem;
    max-width: 100%;
    height: 10rem;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
    margin: 2rem 0 0;
  }

  .products-container {
    flex-direction: column;
    align-items: center;
    max-width: 100%;
  }

  .product {
    margin-bottom: 2rem;
  }
}
`