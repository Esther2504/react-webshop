import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ScrollToTop from './ScrollToTop';

// Redux imports
import { Provider } from 'react-redux';
import store from './utils/store';

// Toast imports
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Persist imports
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

// Router imports
import { HashRouter, Routes, Route } from 'react-router-dom';

import Manden from './pages/ProductOverviews/Manden.jsx';
import Speelgoed from './pages/ProductOverviews/Speelgoed.jsx';
import HomePage from './pages/HomePage';
import ShoppingCart from './pages/ShoppingCart';
import Halsbanden from './pages/ProductOverviews/Halsbanden';
import Product11 from './pages/ProductDetails/Product11';
import Product12 from './pages/ProductDetails/Product12';
import Product13 from './pages/ProductDetails/Product13';
import Product21 from './pages/ProductDetails/Product21';
import Product22 from './pages/ProductDetails/Product22';
import Product23 from './pages/ProductDetails/Product23';
import Product31 from './pages/ProductDetails/Product31';
import Product32 from './pages/ProductDetails/Product32';
import Product33 from './pages/ProductDetails/Product33';
import Login from './pages/Login';
import { ProductOverview } from './pages/ProductOverviews/ProductOverview.jsx';
import SearchResults from './pages/ProductOverviews/SearchResults';
import NotFound from './pages/NotFound';

const root = ReactDOM.createRoot(document.getElementById('root'));
let persistor = persistStore(store);

root.render( 
  <React.StrictMode>
    <Provider store={store}>
    <HashRouter>
    <ScrollToTop />
    <ToastContainer position="bottom-right" hideProgressBar={true} autoClose={1500} newestOnTop={true}/>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    <Routes>
      <Route path="/">
        <Route index element={<HomePage />} />
        <Route path="/producten" element={<ProductOverview />} />

        <Route path="/manden" element={<Manden />} />
        <Route path="/manden/product11" element={<Product11 />} />
        <Route path="/manden/product12" element={<Product12 />} />
        <Route path="/manden/product13" element={<Product13 />} />

        <Route path="/speelgoed" element={<Speelgoed />} />
        <Route path="/speelgoed/product21" element={<Product21 />} />
        <Route path="/speelgoed/product22" element={<Product22 />} />
        <Route path="/speelgoed/product23" element={<Product23 />} />

        <Route path="/halsbanden" element={<Halsbanden />} />
        <Route path="/halsbanden/product31" element={<Product31 />} />
        <Route path="/halsbanden/product32" element={<Product32 />} />
        <Route path="/halsbanden/product33" element={<Product33 />} />

        <Route path="/login" element={<Login />} />
        <Route path="/winkelwagen" element={<ShoppingCart />} />
        <Route path="/zoekresultaten" element={<SearchResults />} />
        <Route path="*" element={<NotFound />} />
        </Route>
    </Routes>
    </HashRouter>
    </Provider>
  </React.StrictMode>
);
