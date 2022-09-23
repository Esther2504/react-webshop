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

import HomePage from './pages/HomePage';
import ShoppingCart from './pages/ShoppingCart';
import Login from './pages/Login';
import { ProductOverview } from './pages/productoverviews/ProductOverview.jsx';
import ProductDetails from './pages/productdetails/ProductDetails';
import ProductCategory from './pages/productoverviews/ProductCategory';
import SearchResults from './pages/productoverviews/SearchResults';
import NotFound from './pages/NotFound';

const root = ReactDOM.createRoot(document.getElementById('root'));
let persistor = persistStore(store);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <ScrollToTop />
        <ToastContainer position="bottom-right" hideProgressBar={true} autoClose={1500} newestOnTop={true} />
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />

            <Route path="/producten" element={<ProductOverview />} />
            <Route path="/:category" element={<ProductCategory />} />
            <Route path="/:category/:product" element={<ProductDetails />} />

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
