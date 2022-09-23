// React, Router & Redux imports
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

// Overige imports
import styled from 'styled-components';
import { data } from '../../products';
import TopNav from './TopNav';
import BottomNav from './BottomNav';

export default function NavBar() {
  const products = useSelector((state) => state.cart)
  const searchterm = useSelector((state) => state.search.text)

  // Doorgeven productenaantal winkelmand aan styled components
  let total = 0;
  data.forEach((product) => {
    products.filter(cartproduct => (product.id === cartproduct.id) ? (
      total += Number(cartproduct.amount)
    ) : null
    )
  })

  // Zoeken met enter key
  useEffect(() => {
    document.querySelector(".input").addEventListener("keyup", function (event) {
      event.preventDefault();
      if (event.key === 'Enter') {
        document.querySelector(".search-link").click();
      }
    });
  }, [searchterm])

  return (
    <Wrapper total={total}>
      <TopNav />
      <BottomNav />
    </Wrapper>
  )
}

const Wrapper = styled.div`
.top-nav {
  width: 100vw;

  img {
    width: 5rem;
    cursor: pointer;
  }

  .cart, .login {
    width: 2rem;
    margin-left: 1rem;
  }

  .login-cart {
      margin-left: auto;
      margin-right: 1rem;
      margin-top: 1rem;
    }

    display: flex;
    justify-content: flex-end;
}

.loginpopup {
  border: 1px solid white;
  position: absolute;
  width: 8rem;
  height: auto;
  text-align: center;
  background-color: #49abcc;
  color: white;
  font-size: 0.9rem;
  right: 2rem;
  padding: 0.2rem;
  z-index: 6;
  
  .signin {
    width: 8rem;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  p {
    margin-top: 1.5rem;
    margin-bottom: 0;
    font-size: 0.9rem;
  }

  .close {
    position: absolute;
    top: -1.4rem;
    right: 5px;
    cursor: pointer;
  }

  button {
    background-color: white;
    color: black;
    width: 6rem;
    height: 2rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
}

.searchbar {
  margin: auto;
  position: relative;
  left: 7rem;
  input {
    height: 1.2rem;
    width: 20rem;
    border: 2px solid #49abcc;
    border-radius: 0.5rem;
  }
}

.searchbar input:focus {
  outline: none;
}

button {
  height: 1.5rem;
  width: 3rem;
  background-color: #49abcc;
  color: white;
  border: 2px solid #49abcc;
  border-radius: 0.5rem;
  position: relative;
  top: 0rem;
  left: 0.2rem;
}

.bottom-nav-desktop {
  width: 100vw;
  height: 3rem;
  line-height: 3rem;
  background-color: #49abcc;
  display: flex;
  gap: 2rem;
  padding: 0 1rem;
  list-style: none;
  margin-top: 0;

  a {
    font-weight: 540;
    transition: all 0.25s linear;
    position: relative;
    text-decoration: none;
    color: white;
  }
  
  a:before {
    content: "";
    display: block;
    width: 100%;
    height: 3px;
    background-color: white;
    position: absolute;
    left: 0;
    bottom: 10px; 
    transform-origin: center; 
    transform: scale(0);
    transition: 0.25s linear;
  }
  
  a:hover:before {
    transform: scale(1);
  }
}

.login-cart::after {
  content: "${props => props.total}";
  display: inline-block;
  width: 1.2rem;
  background-color: #49abcc;
  color: white;
  border-radius: 4rem;
  text-align: center;
  position: relative;
  top: -1.5rem;
  right: 0.7rem;
  font-size: 1rem;
}

.bottom-nav-mobile {
  width: 100vw;
  height: 9.7rem;
  background-color: #49abcc;
  list-style: none;
  position: absolute;
  top: 1.2rem;
  text-align: center;
  font-size: 1rem;
  z-index: 4;
  padding: 0;
  left: -0.1rem;
  right: 0;
  animation: growDown 300ms ease-in-out forwards;
  transform-origin: top center;

  a {
    text-decoration: none;
    color: white; 
    padding: 0;
  }

  a:hover {
    text-decoration: underline;
  }

  hr {
    left: 0;
  }
}

.searchbar-mobile {
  width: 20rem;
  position: relative;
  left: 6.5rem;
  top: 0.8rem;
  z-index: 4;
  max-width: 100%;

  input {
    height: 1.2rem;
    width: 12rem;
    border: 2px solid #49abcc;
    border-radius: 0.5rem;
    max-width: 100%;
  }

  button {
    border: 1px solid white;
  }
}

.searchbar input:focus {
  outline: none;
}

.hamburger {
  width: 100vw;
  height: 3rem;
  display: none;
  left: 0;
  border-radius: 0;
  top: -1.5rem;
}

.hamburger-menu,
.hamburger-menu::before,
.hamburger-menu::after {
  display: block;
  background-color: white;
  position: absolute;
  height: 4px;
  width: 30px;
  transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1);
  border-radius: 2px;
  top: 0.8rem;
}

.hamburger-menu::before {
  content: '';
  margin-top: -5px;
}

.hamburger-menu::after {
  content: '';
  margin-top: 3px;
}

@keyframes growDown {
  0% {
      transform: scaleY(0)
  }
  80% {
      transform: scaleY(1.1)
  }
  100% {
      transform: scaleY(1)
  }
}

@media only screen and (max-width: 750px) {
  .searchbar {
    margin: auto;
    position: relative;
    left: 1rem;
    display: none;
  
    input {
      height: 1.2rem;
      width: 10rem;
      border: 2px solid #49abcc;
      border-radius: 0.5rem;
    }
  }

  .bottom-nav a {
    display: none;
  }

  .hamburger {
    display: block;
  }

  .hamburger-menu-close,
  .hamburger-menu-close::before {
  display: block;
  background-color: white;
  position: absolute;
  height: 4px;
  width: 30px;
  border-radius: 2px;
}

.hamburger-menu-close {
  transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1);
  transform: rotate(45deg);
  top: 1.2rem;
}

.hamburger-menu-close::before {
  content: '';
  transform: rotate(90deg);
}
}

@media only screen and (max-width: 430px) {
  .searchbar {
    display: none;
  }
  .searchbar-mobile {
    width: 19rem;
  }
  .hamburger {
    width: 100%;
  }
}

@media only screen and (max-width: 390px) {
.searchbar-mobile {
  width: 14rem;
  left: 3.3rem;
  
  input {
  width: 9rem;
}
}
}
`