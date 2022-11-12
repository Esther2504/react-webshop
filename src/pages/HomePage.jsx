// React, Router & Redux imports
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

// Overige imports
import styled from 'styled-components';

// Images import functie
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}
const images = importAll(require.context('../assets/images', false, /\.(png|jpe?g|svg)$/));
const productimages = importAll(require.context('../assets/images/products', false, /\.(png|jpe?g|svg)$/));

export default function HomePage() {


  useEffect(() => {
      // Fade in content
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show')
      } else {
        entry.target.classList.remove('show')
      }
    }
    )
  })

    const hiddenElements = document.querySelectorAll('.hidden')
    hiddenElements.forEach((i) => observer.observe(i))
  }, []);

  return (
    <Wrapper>
      <div className="banner">
        <div className="banner-message">
          <h1>Alleen het beste voor je hond</h1>
          <Link to="/producten"><button>Shop now</button></Link>
        </div>
        <img className="homepage-image" alt="two dogs running" src={images['homepageimage.png']} />
      </div>
      <div className="category-container hidden">
        <Link className="manden" to="/manden">
          <img alt="hond in mand" src={productimages['manden.jpg']} />
          <p>Manden</p>
        </Link>

        <Link className="speelgoed" to="/speelgoed">
          <img alt="hond met bal" src={productimages['speelgoed.jpg']} />
          <p>Speelgoed</p>
        </Link>

        <Link className="halsbanden" to="/halsbanden">
          <img alt="hond met halsband" src={productimages['halsbanden.jpg']} />
          <p>Halsbanden</p>
        </Link>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
width: 80%;
min-height: 100vh;
margin: 3rem auto 0 auto;
display: flex;
flex-direction: column;

.banner {
  display: flex;
  flex-direction: row;
  color: #34556d;
  margin: 0;
}

.banner-message {
  display: flex;
  width: 60%;
  flex-direction: column;
  align-self: center;
 font-size: 2.3rem;
}

.homepage-image {
  width: 40%;
  jusitfy-self: flex-end;
}

button {
  width: 180px;
  height: 50px;
  background-color: #49abcc;
  color: white;
  border-style: none;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  cursor: pointer;
}

.category-container {
  margin: 5rem 0;
  display: flex;
  justify-content: space-between;

  a {
    width: 90%;
    text-decoration: none;
    text-align: center;
    transition: all .2s ease-in-out;
  }
  
  img {
    width: 90%;
    background-size: 33vw;
    border: 3px solid #49abcc;
    border-radius: 99%;
  }

  p {
    color: white;
    background-color: #49abcc;
    text-align: center;
    margin: 10px auto;
    font-size: 1.3rem;
    width: 50%;
    padding: 0.2rem;
    border-radius: 1rem;
  }
}

.hidden {
opacity: 0;
transition: all 7s;
}

.show {
  opacity: 1;
}

.category-container {
  a:hover {
  transform: scale(1.05);
  }
}

@media(prefers-reducer-motion) {
  .hidden {
    transition: none;
    }
}

@media only screen and (max-width: 750px) {
  padding-bottom: 5rem;

  .category-container {
  flex-direction: column;
  align-items: center;

  a {
    margin: 30px;
  }
  }

  .banner {
    flex-direction: column;
    align-items: center;

    .banner-message {
      text-align: center;
      align-items: center;
    }
  }
}

@media only screen and (max-width: 430px) {
.homepage-image {
  width: 20rem;
}

@media only screen and (max-width: 340px) {
  .homepage-image {
    width: 15rem;
  }

  .category-container a {
    width: 10rem;
    // height: 10rem;
    background-size: 10rem;
  }

  p {
    margin-top: 8rem;
  }
}
`